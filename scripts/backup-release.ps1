param(
  [ValidatePattern('^[a-zA-Z0-9_-]+$')]
  [string]$Label = 'before-update',
  [ValidatePattern('^[a-fA-F0-9]{7,40}$')]
  [string]$PreviousCommit
)

$ErrorActionPreference = 'Stop'
$repoRoot = Split-Path -Parent $PSScriptRoot
$dist = Join-Path $repoRoot 'dist'
if (!(Test-Path -LiteralPath (Join-Path $dist 'index.html'))) {
  throw 'dist/index.html is missing; no release backup was created.'
}

$stamp = Get-Date -Format 'yyyy-MM-dd_HH-mm-ss-fff'
$backupRoot = Join-Path $repoRoot 'release-backups'
$backupDir = Join-Path $backupRoot "$stamp-$Label"
New-Item -ItemType Directory -Path $backupDir | Out-Null
$currentArchive = Join-Path $backupDir 'current-site.zip'
Compress-Archive -Path (Join-Path $dist '*') -DestinationPath $currentArchive -CompressionLevel Optimal

$archive = [IO.Compression.ZipFile]::OpenRead($currentArchive)
try {
  foreach ($required in @('index.html', 'app.js', 'style.css')) {
    if (!$archive.GetEntry($required)) { throw "Backup is missing $required" }
  }
  $fileCount = $archive.Entries.Count
} finally { $archive.Dispose() }

$commit = (& git -C $repoRoot rev-parse HEAD).Trim()
if ($LASTEXITCODE -ne 0) { throw 'Could not identify the source commit.' }
$previousArchive = $null
if ($PreviousCommit) {
  $previousArchive = Join-Path $backupDir 'previous-local-site.zip'
  & git -C $repoRoot archive --format=zip "--output=$previousArchive" "${PreviousCommit}:dist"
  if ($LASTEXITCODE -ne 0) { throw 'Could not archive the previous local release.' }
}

$manifest = [ordered]@{
  createdAtUtc = [DateTime]::UtcNow.ToString('o')
  label = $Label
  sourceCommit = $commit
  currentArchive = 'current-site.zip'
  currentArchiveSha256 = (Get-FileHash -LiteralPath $currentArchive -Algorithm SHA256).Hash
  files = $fileCount
  previousLocalCommit = $PreviousCommit
  previousLocalArchive = if ($previousArchive) { 'previous-local-site.zip' } else { $null }
  previousProductionDeployment = $null
  note = 'Local release backup. Record the existing Vercel production deployment before publishing.'
}
$manifest | ConvertTo-Json -Depth 4 | Set-Content -LiteralPath (Join-Path $backupDir 'manifest.json') -Encoding utf8
[pscustomobject]@{ BackupDirectory = $backupDir; Files = $fileCount; SourceCommit = $commit; Verified = $true }
