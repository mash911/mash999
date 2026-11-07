from __future__ import annotations

import json
import re
import uuid
from functools import partial
from http.server import HTTPServer, SimpleHTTPRequestHandler
from pathlib import Path


ROOT = Path(__file__).resolve().parent
EXPORT_FOLDERS: dict[str, Path] = {}
FILE_NAME = re.compile(r"^sana-album-\d{2,4}(?:-cover)?\.png$")
MAX_IMAGE_BYTES = 30 * 1024 * 1024


class AlbumHandler(SimpleHTTPRequestHandler):
    def end_headers(self) -> None:
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def _json(self, status: int, payload: dict) -> None:
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _same_origin(self) -> bool:
        origin = self.headers.get("Origin")
        return origin in (None, "http://127.0.0.1:4173", "http://localhost:4173")

    def do_POST(self) -> None:
        if not self._same_origin():
            self._json(403, {"error": "origin_not_allowed"})
            return
        if self.path == "/api/select-folder":
            self._select_folder()
            return
        if self.path == "/api/save-image":
            self._save_image()
            return
        self._json(404, {"error": "not_found"})

    def _select_folder(self) -> None:
        try:
            import tkinter as tk
            from tkinter import filedialog

            window = tk.Tk()
            window.withdraw()
            window.attributes("-topmost", True)
            window.lift()
            window.update()
            desktop = Path.home() / "Desktop"
            initial_folder = desktop if desktop.is_dir() else ROOT
            selected = filedialog.askdirectory(
                parent=window,
                title="اختر مجلد حفظ صور الألبوم",
                initialdir=str(initial_folder),
                mustexist=True,
            )
            window.destroy()
        except Exception as error:
            self._json(501, {"error": "folder_picker_unavailable", "detail": str(error)})
            return

        if not selected:
            self._json(409, {"cancelled": True})
            return

        folder = Path(selected).resolve()
        if not folder.is_dir():
            self._json(400, {"error": "invalid_folder"})
            return
        folder_id = uuid.uuid4().hex
        EXPORT_FOLDERS[folder_id] = folder
        self._json(200, {"folderId": folder_id, "folderName": folder.name or str(folder)})

    def _save_image(self) -> None:
        folder = EXPORT_FOLDERS.get(self.headers.get("X-Album-Folder", ""))
        file_name = self.headers.get("X-Album-File", "")
        try:
            length = int(self.headers.get("Content-Length", "0"))
        except ValueError:
            length = 0

        if folder is None or not folder.is_dir():
            self._json(400, {"error": "folder_session_expired"})
            return
        if not FILE_NAME.fullmatch(file_name):
            self._json(400, {"error": "invalid_file_name"})
            return
        if length < 8 or length > MAX_IMAGE_BYTES:
            self._json(413, {"error": "invalid_image_size"})
            return

        content = self.rfile.read(length)
        if not content.startswith(b"\x89PNG\r\n\x1a\n"):
            self._json(415, {"error": "invalid_png"})
            return

        target = folder / file_name
        if target.exists():
            stem, suffix, counter = target.stem, target.suffix, 2
            while target.exists():
                target = folder / f"{stem}-{counter}{suffix}"
                counter += 1
        temporary = target.with_suffix(target.suffix + ".part")
        try:
            temporary.write_bytes(content)
            temporary.replace(target)
        except OSError as error:
            try:
                temporary.unlink(missing_ok=True)
            except OSError:
                pass
            self._json(500, {"error": "write_failed", "detail": str(error)})
            return
        self._json(200, {"saved": True, "fileName": target.name})


if __name__ == "__main__":
    handler = partial(AlbumHandler, directory=str(ROOT))
    server = HTTPServer(("127.0.0.1", 4173), handler)
    print("SANA album editor: http://127.0.0.1:4173/", flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
