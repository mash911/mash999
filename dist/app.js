const $ = (id) => document.getElementById(id);
const canvas = $('preview');
const ctx = canvas.getContext('2d');
let WIDTH = 1920;
let HEIGHT = 1350;
const sanaBadge = new Image();
sanaBadge.src = 'assets/sana-badge.png';
const brandLayout = new Image();
brandLayout.src = 'assets/brand-layout.png';
const sanaLogo = new Image();
sanaLogo.src = 'assets/sana-logo.png';
// Original fixed Instagram mark layer.  Its brand glyphs are extracted onto
// transparency below so the embedded dark/blue gradient can never form boxes.
const albumEssentials = new Image();
albumEssentials.src = 'assets/overlay.png';
const albumGradientTop = new Image();
albumGradientTop.src = 'assets/album-gradient-top.png';
const albumGradientLeft = new Image();
albumGradientLeft.src = 'assets/album-gradient-left.png';
const albumGradientRight = new Image();
albumGradientRight.src = 'assets/album-gradient-right.png';
const facebookBrandLayout = new Image();
facebookBrandLayout.src = 'assets/facebook-brand-layout.png';
const facebookCoverOverlay = new Image();
facebookCoverOverlay.src = 'assets/facebook-cover-overlay.png';
const quoteLogo = new Image();
quoteLogo.src = 'assets/quotes-logo.png';
const quoteDot = new Image();
quoteDot.src = 'assets/quotes-dot.png';
const quotesEssential = new Image();
quotesEssential.src = 'assets/quotes-essential.png';
const quotesLeftShade = new Image();
quotesLeftShade.src = 'assets/quotes-left-shade.png?v=27';
const quotesPanelClean = new Image();
quotesPanelClean.src = 'assets/quotes-panel-clean.png?v=31';
const quotesGlowWide = new Image();
quotesGlowWide.src = 'assets/quotes-glow-wide.png?v=27';
const quotesGlowLine = new Image();
quotesGlowLine.src = 'assets/quotes-glow-line.png?v=27';
const reporterEssential = new Image();
reporterEssential.src = 'assets/reporter-essential.png';
const reporterBadge = new Image();
reporterBadge.src = 'assets/reporter-badge.png';
const flagsMockupBlank = new Image();
flagsMockupBlank.src = 'assets/crossed-flags-blank-v2.png';
const flagLeftCloth = new Image();
flagLeftCloth.src = 'assets/crossed-flags-left-full-v3.png';
const flagRightCloth = new Image();
flagRightCloth.src = 'assets/crossed-flags-right-full-v3.png';
// Retained masks are also used by the legacy flag export helper.  Loading
// them here prevents that optional mode from blocking startup for every
// template.
const flagLeftMask = new Image();
flagLeftMask.src = 'assets/flag-left-mask.png';
const flagRightMask = new Image();
flagRightMask.src = 'assets/flag-right-mask.png';
const flagLeftCutMask = new Image();
flagLeftCutMask.src = 'assets/flag-left-cut-mask.png';
const flagRightCutMask = new Image();
flagRightCutMask.src = 'assets/flag-right-cut-mask.png';
const cleanBrandLayout = document.createElement('canvas');
cleanBrandLayout.width = 1920;
cleanBrandLayout.height = 1350;
const cleanAlbumEssentials = document.createElement('canvas');
cleanAlbumEssentials.width = 1920;
cleanAlbumEssentials.height = 1350;
const flagWarpCanvas = document.createElement('canvas');
flagWarpCanvas.width = 2048;
flagWarpCanvas.height = 1278;
const flagWarpContext = flagWarpCanvas.getContext('2d');
const flagArtCanvas = document.createElement('canvas');
flagArtCanvas.width = 1200;
flagArtCanvas.height = 800;
const flagArtContext = flagArtCanvas.getContext('2d');
const flagShadeCanvas = document.createElement('canvas');
flagShadeCanvas.width = 2048;
flagShadeCanvas.height = 1278;
const flagShadeContext = flagShadeCanvas.getContext('2d');
const BRAND_LOGO = { x: 495, y: 100, width: 146, height: 75 };

const QUOTE_DEFAULTS = {
  quoteText: `السوريون اليوم لديهم شعور جميل بلهفة إخوتنا العرب والمسلمين وفرحهم بالانتصار وتحرير دمشق.

تحرير دمشق أعاد ثقة السوريين بالدولة وأعاد الأمل ليس للسوريين فقط بل للمنطقة بأكملها.

مرت سوريا بـ 60 سنة من الفساد الإداري وسوء التخطيط، وهي الآن تقوم بإعادة بناء نفسها ومؤسساتها، ولهذه المرحلة ظروف خاصة نحاول فيها الاستفادة من كل التجارب رغم التحديات.

بعد تحرير دمشق كان هناك تهديد بالانقسام الداخلي والحروب الطائفية وتحديات البنى التحتية والطاقة والعقوبات، وتجاوزنا ذلك بسرعة كبيرة.

سوريا التي كان يراها العالم والإعلام مشكلة كبيرة تحولت إلى فرصة عظيمة يستفيد منها الجميع، وعادت لدورها الإقليمي والدولي.`,
  personName: 'أحمد الشرع',
  jobTitle: 'رئيس الجمهورية العربية السورية',
  quoteFont: 31,
  quoteLineHeight: 1.72,
  quoteY: 195,
  nameFont: 34,
  jobFont: 25,
  nameY: 985,
  quoteKashida: true,
  quoteConcentration: 35,
  quotePosition: 72,
  quoteKashidaSeed: 0
};

const REPORTER_DEFAULTS = {
  reporterTitle: `بدأ اجتماع طاولة مستديرة
بين وزارة الماليــــــة
والوفد الاقتصادي الأمريكي`,
  reporterManualLines: true,
  reporterJustify: true,
  reporterFont: 86,
  reporterLineHeight: 1.28,
  reporterY: 895
};

const settings = {
  title: $('title').value,
  manualLines: true,
  lineCount: 4,
  justify: true,
  concentration: 35,
  position: 80,
  fontSize: 78,
  lineHeight: 1.4,
  textWidth: 767,
  textX: 1355,
  textY: 800,
  guides: false
};

const MODE_CONFIGS = {
  instagram: {
    width: 1920,
    height: 1350,
    coverShade: 70,
    innerShade: 70,
    coverBlueShade: 70,
    label: 'ألبوم إنستا',
    editorTitle: 'الألبوم العرضي — إنستا',
    reference: 'assets/example.png',
    defaults: {
      title: `سفارة سوريا في بكين تقيم
حفل استقبال بمناسبة الذكرى
الـ70 لإقامة العلاقات
الدبلوماسية بين سوريا والصين`,
      language: 'ar', manualLines: true, lineCount: 4, justify: true, concentration: 35, position: 80,
      fontSize: 78, lineHeight: 1.4, textWidth: 767, textX: 1355, textY: 800, guides: false
    }
  },
  facebook: {
    width: 1920,
    height: 1080,
    coverShade: 100,
    innerShade: 70,
    coverBlueShade: 70,
    label: 'ألبوم فيس',
    editorTitle: 'الألبوم العرضي — فيس',
    reference: 'assets/facebook-example-cover.png',
    defaults: {
      title: `الرئيس أحمد الشرع يصل إلى
نيويورك للمشاركة في أعمال
الدورة الـ81 للجمعية العامة
للأمم المتحدة في واشنطن`,
      language: 'ar', manualLines: true, lineCount: 4, justify: true, concentration: 35, position: 80,
      fontSize: 80, lineHeight: 1.42, textWidth: 790, textX: 1000, textY: 475, guides: false
    }
  },
  quotes: {
    width: 1080,
    height: 1350,
    coverShade: 0,
    innerShade: 0,
    label: 'قالب تصريحات',
    editorTitle: 'قالب تصريحات سانا',
    reference: 'assets/quotes-reference.png',
    defaults: {
      title: '', manualLines: true, lineCount: 4, justify: false, concentration: 35, position: 80,
      fontSize: 78, lineHeight: 1.4, textWidth: 767, textX: 900, textY: 800, guides: false
    }
  },
  reporter: {
    width: 1080,
    height: 1350,
    coverShade: 100,
    innerShade: 100,
    coverBlueShade: 70,
    label: 'مراسل سانا',
    editorTitle: 'قالب مراسل سانا',
    reference: 'assets/reporter-reference.png',
    defaults: {
      title: '', manualLines: true, lineCount: 3, justify: false, concentration: 35, position: 80,
      fontSize: 86, lineHeight: 1.28, textWidth: 780, textX: 540, textY: 895, guides: false
    }
  },
  flags: {
    width: 2048,
    height: 1278,
    exportWidth: 8192,
    exportHeight: 5112,
    coverShade: 0,
    innerShade: 0,
    label: 'إنشاء علمين',
    editorTitle: 'إنشاء علمين متموّجين',
    reference: 'assets/crossed-flags-reference-v2.png',
    defaults: {
      title: '', manualLines: true, lineCount: 1, justify: false, concentration: 35, position: 80,
      fontSize: 78, lineHeight: 1.4, textWidth: 767, textX: 1200, textY: 800, guides: false
    }
  }
};

let currentMode = 'instagram';
const modeStates = {
  instagram: { slides: [], selected: 0, coverId: null, shade: MODE_CONFIGS.instagram.coverShade, blueShade: MODE_CONFIGS.instagram.coverBlueShade, settings: { ...MODE_CONFIGS.instagram.defaults } },
  facebook: { slides: [], selected: 0, coverId: null, shade: MODE_CONFIGS.facebook.coverShade, blueShade: MODE_CONFIGS.facebook.coverBlueShade, settings: { ...MODE_CONFIGS.facebook.defaults } },
  quotes: { slides: [], selected: 0, coverId: null, shade: MODE_CONFIGS.quotes.coverShade, quoteDraft: { ...QUOTE_DEFAULTS }, settings: { ...MODE_CONFIGS.quotes.defaults } },
  reporter: { slides: [], selected: 0, coverId: null, shade: MODE_CONFIGS.reporter.coverShade, blueShade: MODE_CONFIGS.reporter.coverBlueShade, settings: { ...MODE_CONFIGS.reporter.defaults } },
  flags: { slides: [], selected: 0, coverId: null, shade: MODE_CONFIGS.flags.coverShade, settings: { ...MODE_CONFIGS.flags.defaults } }
};

const flagState = {
  activeSide: 'left',
  left: { image: null, label: '', objectUrl: '' },
  right: { image: null, label: '', objectUrl: '' },
  defaultsLoaded: false
};

let slides = [];
let selected = 0;
let coverId = null;
let renderQueued = false;
let toastTimer;

function isAlbumMode() {
  return currentMode === 'instagram' || currentMode === 'facebook';
}

function isEnglishAlbumText() {
  return isAlbumMode() && (settings.language || 'ar') === 'en';
}

function titleFontFamily() {
  return isEnglishAlbumText()
    ? "NotoSansCondensedExtraBold, 'Arial Narrow', Arial, sans-serif"
    : 'GhroobBoldRound, Tahoma, sans-serif';
}

function currentModeShade() {
  return modeStates[currentMode]?.shade ?? MODE_CONFIGS[currentMode].coverShade;
}

function setAlbumShade(value) {
  modeStates[currentMode].shade = value;
  slides.forEach((slide) => { slide.shade = value; });
}

function currentModeBlueShade() {
  return modeStates[currentMode]?.blueShade ?? MODE_CONFIGS[currentMode].coverBlueShade ?? 0;
}

function setAlbumBlueShade(value) {
  modeStates[currentMode].blueShade = value;
  const cover = slides.find((slide) => slide.id === coverId);
  if (cover) cover.blueShade = value;
}

function currentQuoteDraft() {
  const state = modeStates.quotes;
  if (!state.quoteDraft) state.quoteDraft = { ...QUOTE_DEFAULTS };
  return state.quoteDraft;
}

function makeSlide(image, name) {
  const slide = {
    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
    image, name, zoom: 1, panX: 0, panY: 0,
    shade: isAlbumMode() ? currentModeShade() : MODE_CONFIGS[currentMode].innerShade,
    blueShade: currentMode === 'reporter' ? currentModeBlueShade() : 0,
    fit: 'cover'
  };
  if (currentMode === 'quotes') Object.assign(slide, currentQuoteDraft());
  if (currentMode === 'reporter') Object.assign(slide, REPORTER_DEFAULTS);
  return slide;
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

async function addFiles(fileList) {
  const files = [...fileList].filter((file) => file.type.startsWith('image/'));
  if (!files.length) return showToast('اختر ملفات صور صالحة');
  $('status').textContent = 'جارٍ تجهيز الصور…';
  const added = [];
  for (const file of files) {
    try {
      const url = URL.createObjectURL(file);
      added.push(makeSlide(await loadImage(url), file.name));
    } catch (_) {
      showToast(`تعذّر فتح ${file.name}`);
    }
  }
  if (!added.length) return;
  const firstNewIndex = slides.length;
  slides.push(...added);
  if (!coverId) {
    coverId = slides[0].id;
    slides[0].shade = isAlbumMode() ? currentModeShade() : MODE_CONFIGS[currentMode].coverShade;
    if (isAlbumMode()) slides[0].blueShade = currentModeBlueShade();
  }
  selected = firstNewIndex;
  syncControls();
  renderFilmstrip();
  scheduleRender();
  $('status').textContent = `تمت إضافة ${added.length} ${added.length === 1 ? 'صورة' : 'صور'}`;
  showToast(`تمت إضافة ${added.length} ${added.length === 1 ? 'صورة' : 'صور'}`);
}

function current() { return slides[selected]; }
function isCover(slide = current()) { return slide && slide.id === coverId; }

function drawBackground(target, slide) {
  target.save();
  target.fillStyle = '#d8e0e8';
  target.fillRect(0, 0, WIDTH, HEIGHT);
  if (!slide?.image) {
    target.fillStyle = '#71899b';
    target.textAlign = 'center';
    target.direction = 'rtl';
    target.font = '44px Segoe UI';
    target.fillText('أضف صورك لبدء الألبوم', WIDTH / 2, HEIGHT / 2 - 20);
    target.font = '25px Segoe UI';
    target.fillText('يمكنك الاختيار أو السحب أو اللصق', WIDTH / 2, HEIGHT / 2 + 35);
    target.restore();
    return;
  }
  const image = slide.image;
  const base = slide.fit === 'contain'
    ? Math.min(WIDTH / image.naturalWidth, HEIGHT / image.naturalHeight)
    : Math.max(WIDTH / image.naturalWidth, HEIGHT / image.naturalHeight);
  const scale = base * slide.zoom;
  const width = image.naturalWidth * scale;
  const height = image.naturalHeight * scale;
  const overflowX = Math.max(0, width - WIDTH) / 2;
  const overflowY = Math.max(0, height - HEIGHT) / 2;
  const x = (WIDTH - width) / 2 + (slide.panX / 100) * overflowX;
  const y = (HEIGHT - height) / 2 + (slide.panY / 100) * overflowY;
  target.drawImage(image, x, y, width, height);
  target.restore();
}

function wrapParagraph(target, paragraph, maxWidth) {
  const words = paragraph.trim().split(/\s+/).filter(Boolean);
  const lines = [];
  let line = '';
  words.forEach((word) => {
    const candidate = line ? `${line} ${word}` : word;
    if (line && target.measureText(candidate).width > maxWidth) {
      lines.push(line);
      line = word;
    } else line = candidate;
  });
  if (line) lines.push(line);
  return lines;
}

function balanceWords(target, text, count, maxWidth) {
  const words = text.replace(/\s+/g, ' ').trim().split(' ').filter(Boolean);
  if (!words.length) return [];
  const wanted = Math.min(count, words.length);
  const desired = Math.min(maxWidth, target.measureText(words.join(' ')).width / wanted);
  const states = Array.from({ length: wanted + 1 }, () => Array(words.length + 1).fill(null));
  states[0][0] = { cost: 0, lines: [] };

  for (let lineNumber = 1; lineNumber <= wanted; lineNumber++) {
    for (let end = lineNumber; end <= words.length; end++) {
      for (let start = lineNumber - 1; start < end; start++) {
        const previous = states[lineNumber - 1][start];
        if (!previous) continue;
        const line = words.slice(start, end).join(' ');
        const width = target.measureText(line).width;
        if (width > maxWidth) continue;
        const remainingWords = words.length - end;
        const remainingLines = wanted - lineNumber;
        if (remainingWords < remainingLines) continue;
        const cost = previous.cost + Math.pow(desired - width, 2);
        if (!states[lineNumber][end] || cost < states[lineNumber][end].cost) {
          states[lineNumber][end] = { cost, lines: [...previous.lines, line] };
        }
      }
    }
  }
  return states[wanted][words.length]?.lines || null;
}

function fitTextLines(target, text, count, maxWidth) {
  if (isEnglishAlbumText()) {
    const fontSize = settings.fontSize;
    target.font = `${fontSize}px ${titleFontFamily()}`;
    const lines = text
      .split(/\r?\n/)
      .flatMap((paragraph) => wrapParagraph(target, paragraph, maxWidth));
    return { lines, fontSize };
  }

  const hasWrittenBreaks = settings.manualLines && /\r?\n/.test(text.trim());
  for (let fontSize = settings.fontSize; fontSize >= 28; fontSize--) {
    target.font = `${fontSize}px ${titleFontFamily()}`;
    let lines;
    if (hasWrittenBreaks) {
      lines = text.split(/\r?\n/).flatMap((paragraph) => wrapParagraph(target, paragraph, maxWidth));
      if (lines.length > count) continue;
    } else {
      lines = balanceWords(target, text, count, maxWidth);
      if (!lines) continue;
    }
    if (lines.every((line) => target.measureText(line).width <= maxWidth)) return { lines, fontSize };
  }

  target.font = `28px ${titleFontFamily()}`;
  const fallback = wrapParagraph(target, text.replace(/\r?\n/g, ' '), maxWidth);
  return { lines: fallback.slice(0, count), fontSize: 28 };
}

const stretchable = /[بتثجحخسشصضطظعغفقكلمنهيئ]/;
const nonJoiningAfter = /[اأإآدذرزوؤء]/;
const lamAlef = /[اأإآٱ]/;
function removeLamAlefKashidas(text) {
  return String(text || '').replace(/لـ+([اأإآٱ])/g, 'ل$1');
}

function isLamAlefBoundary(text, index) {
  return text[index - 1] === 'ل' && lamAlef.test(text[index] || '');
}

function insertKashidaAtCursor(input) {
  if (input.selectionStart === input.selectionEnd && isLamAlefBoundary(input.value, input.selectionStart)) {
    showToast('لا توضع الكشيدة بين اللام والألف');
    return false;
  }
  input.setRangeText('ـ', input.selectionStart, input.selectionEnd, 'end');
  return true;
}

function kashidaSlots(line) {
  const slots = [];
  for (let i = 0; i < line.length - 1; i++) {
    const a = line[i], b = line[i + 1];
    if (a === 'ل' && lamAlef.test(b)) continue;
    if (stretchable.test(a) && !nonJoiningAfter.test(a) && /[\u0621-\u064A]/.test(b)) slots.push(i + 1);
  }
  return slots;
}

function justifyArabicLine(target, line, maxWidth, enabled, position, concentration, seed = 0) {
  if (!enabled || target.measureText(line).width >= maxWidth * .985) return line;
  const slots = kashidaSlots(line);
  if (!slots.length) return line;
  let ordered = [...slots].sort((a, b) => {
    const preferred = (position / 100) * line.length;
    return Math.abs(a - preferred) - Math.abs(b - preferred);
  });
  const rotation = Math.abs(seed) % ordered.length;
  ordered = [...ordered.slice(rotation), ...ordered.slice(0, rotation)];
  const activeCount = Math.max(1, Math.round(ordered.length * (1 - concentration * .0085)));
  const activeSlots = ordered.slice(0, activeCount);
  const counts = new Map(activeSlots.map((slot) => [slot, 0]));
  const buildLine = () => {
    let output = '';
    for (let index = 0; index < line.length; index++) {
      output += line[index];
      output += 'ـ'.repeat(counts.get(index + 1) || 0);
    }
    return output;
  };

  let output = line;
  for (let addition = 0; addition < 120; addition++) {
    const slot = activeSlots[addition % activeSlots.length];
    counts.set(slot, counts.get(slot) + 1);
    const candidate = buildLine();
    if (target.measureText(candidate).width > maxWidth) {
      counts.set(slot, counts.get(slot) - 1);
      break;
    }
    output = candidate;
    if (target.measureText(output).width >= maxWidth * .99) break;
  }
  return output;
}

function justifyArabic(target, line, maxWidth) {
  return justifyArabicLine(target, line, maxWidth, settings.justify, settings.position, settings.concentration);
}

function drawAlbumGradients(target, strength) {
  const opacity = Math.min(1, Math.max(0, strength / 100));
  const bottomY = HEIGHT - 745;
  target.save();
  target.globalAlpha = opacity;
  if (albumGradientTop.complete && albumGradientTop.naturalWidth) {
    target.drawImage(albumGradientTop, 0, 0, 1920, 557);
  }
  if (albumGradientLeft.complete && albumGradientLeft.naturalWidth) {
    target.drawImage(albumGradientLeft, 0, bottomY, 1353, 745);
  }
  if (albumGradientRight.complete && albumGradientRight.naturalWidth) {
    target.drawImage(albumGradientRight, WIDTH - 1352, bottomY, 1352, 745);
  }
  target.restore();
}

function drawBlueGradient(target, strength, cover) {
  const alpha = Math.min(1, Math.max(0, strength / 100));
  const gradient = target.createLinearGradient(0, cover ? 420 : 650, 0, HEIGHT);
  gradient.addColorStop(0, 'rgba(1,17,43,0)');
  gradient.addColorStop(.52, `rgba(7,38,84,${alpha * .42})`);
  gradient.addColorStop(1, `rgba(19,59,121,${alpha})`);
  target.save();
  target.fillStyle = gradient;
  target.fillRect(0, 0, WIDTH, HEIGHT);
  target.restore();
}

function drawFacebookCoverGradient(target, strength, clean = false) {
  const opacity = Math.min(1, Math.max(0, strength / 100));
  target.save();
  target.globalAlpha = opacity;
  if (!clean && facebookCoverOverlay.complete && facebookCoverOverlay.naturalWidth) {
    target.drawImage(facebookCoverOverlay, 0, 0, WIDTH, HEIGHT);
  } else {
    const gradient = target.createLinearGradient(0, 0, WIDTH, 0);
    gradient.addColorStop(0, 'rgba(25,56,109,1)');
    gradient.addColorStop(.34, 'rgba(31,70,135,.72)');
    gradient.addColorStop(.66, 'rgba(23,51,98,.22)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    target.fillStyle = gradient;
    target.fillRect(0, 0, WIDTH, HEIGHT);
  }
  target.restore();
}

function drawEnglishSanaBadge(target) {
  const blockLeft = settings.textX - settings.textWidth;
  const x = blockLeft + (currentMode === 'facebook' ? 10 : 0);
  const y = Math.max(40, settings.textY - (currentMode === 'facebook' ? 232 : 213));
  const width = 223;
  const height = 113;
  target.save();
  target.fillStyle = '#274f91';
  target.strokeStyle = 'rgba(255,255,255,.82)';
  target.lineWidth = 1.5;
  target.beginPath();
  target.roundRect(x, y, width, height, height / 2);
  target.fill();
  target.stroke();
  target.direction = 'ltr';
  target.textAlign = 'left';
  target.textBaseline = 'alphabetic';
  target.fillStyle = '#fff';
  target.font = `800 64px ${titleFontFamily()}`;
  target.fillText('SANA', x + 28, y + 77);
  target.restore();
}

function drawTitleBlock(target) {
  target.save();
  const english = isEnglishAlbumText();
  target.direction = english ? 'ltr' : 'rtl';
  target.textAlign = english ? 'left' : 'right';
  target.textBaseline = 'alphabetic';
  target.fillStyle = '#fff';
  target.font = `${settings.fontSize}px ${titleFontFamily()}`;
  const layout = fitTextLines(target, settings.title, settings.lineCount, settings.textWidth);
  const lines = layout.lines;
  const advance = layout.fontSize * settings.lineHeight;
  const textX = english ? settings.textX - settings.textWidth : settings.textX;
  target.font = `${layout.fontSize}px ${titleFontFamily()}`;
  lines.forEach((raw, index) => {
    const line = english ? raw : justifyArabic(target, raw, settings.textWidth);
    // The canvas maxWidth argument scales glyphs horizontally when a line is tight.
    // English is always drawn at its true Noto size; only words are reflowed inside the fixed block.
    if (english) target.fillText(line, textX, settings.textY + index * advance);
    else target.fillText(line, textX, settings.textY + index * advance, settings.textWidth);
  });
  target.restore();
}

function drawCover(target, slide, previewMode = false) {
  drawAlbumGradients(target, slide.shade);
  drawBlueGradient(target, slide.blueShade ?? currentModeBlueShade(), true);
  if (isEnglishAlbumText()) drawEnglishSanaBadge(target);
  else if (sanaBadge.complete && sanaBadge.naturalWidth) target.drawImage(sanaBadge, 1148, 587, 223, 113);
  drawTitleBlock(target);
  drawBrandLayout(target);
}

function drawInner(target, slide) {
  drawAlbumGradients(target, slide.shade);
  drawBlueGradient(target, slide.blueShade ?? currentModeBlueShade(), false);
  drawBrandLayout(target);
}

function prepareBrandLayout() {
  const layoutContext = cleanBrandLayout.getContext('2d');
  layoutContext.clearRect(0, 0, WIDTH, HEIGHT);
}

function prepareAlbumEssentials() {
  const essentialsContext = cleanAlbumEssentials.getContext('2d');
  essentialsContext.clearRect(0, 0, WIDTH, HEIGHT);
  if (!albumEssentials.complete || !albumEssentials.naturalWidth) return;

  essentialsContext.drawImage(albumEssentials, 0, 0, WIDTH, HEIGHT);
  const imageData = essentialsContext.getImageData(0, 0, WIDTH, HEIGHT);
  const data = imageData.data;

  // Preserve the exact white/grey glyphs (including anti-aliasing) and SANA
  // cyan from the approved source.  The blue/black pixels belong only to the
  // source gradient and must become transparent before this layer is drawn.
  for (let index = 0; index < data.length; index += 4) {
    const red = data[index];
    const green = data[index + 1];
    const blue = data[index + 2];
    const alpha = data[index + 3];
    const spread = Math.max(red, green, blue) - Math.min(red, green, blue);
    const brightness = red * 0.2126 + green * 0.7152 + blue * 0.0722;
    const isWhiteOrGrey = brightness > 112 && spread < 58;
    const isSanaCyan = blue > 135 && green > 105 && red < 155 && blue - red > 60;
    if (alpha < 10 || (!isWhiteOrGrey && !isSanaCyan)) data[index + 3] = 0;
  }
  essentialsContext.putImageData(imageData, 0, 0);
}

function drawAlbumEssentialRegion(target, x, y, width, height) {
  target.drawImage(cleanAlbumEssentials, x, y, width, height, x, y, width, height);
}

function drawInstagramEssentials(target) {
  target.save();

  // Top-left SANA mark.  The source logo is black, so make the mark white
  // and restore its small brand-colour dot separately.
  if (sanaLogo.complete && sanaLogo.naturalWidth) {
    target.filter = 'brightness(0) invert(1)';
    target.drawImage(sanaLogo, BRAND_LOGO.x, BRAND_LOGO.y, BRAND_LOGO.width, BRAND_LOGO.height);
    target.filter = 'none';
    target.fillStyle = '#34c3e8';
    target.beginPath();
    target.arc(500, 170, 5, 0, Math.PI * 2);
    target.fill();
  }

  // Top-right site mark.
  drawChainIcon(target, 1257, 111);
  target.direction = 'ltr';
  target.textAlign = 'left';
  target.textBaseline = 'middle';
  target.font = '34px Arial, sans-serif';
  target.fillStyle = '#fff';
  target.fillText('sana.sy', 1282, 111);

  // Bottom-left carousel position markers.
  [
    { x: 505, color: '#ffffff' },
    { x: 535, color: '#a7b4c8' },
    { x: 565, color: '#7286a4' }
  ].forEach(({ x, color }) => {
    target.fillStyle = color;
    target.beginPath();
    target.arc(x, 1240, 10, 0, Math.PI * 2);
    target.fill();
  });

  // Bottom-right agency signature, free of any source-image background.
  target.direction = 'rtl';
  target.textAlign = 'right';
  target.textBaseline = 'alphabetic';
  target.fillStyle = '#fff';
  target.font = '24px GhroobBoldRound, Tahoma, sans-serif';
  target.fillText('الوكالة العربية', 1450, 1221);
  target.font = '21px GhroobRegular, Tahoma, sans-serif';
  target.fillText('السورية للأنباء', 1450, 1247);
  target.restore();
}

function drawBrandLayout(target) {
  target.drawImage(cleanBrandLayout, 0, 0, WIDTH, HEIGHT);
  if (albumEssentials.complete && albumEssentials.naturalWidth) {
    // Exact source positions: logo, link, carousel markers, agency signature.
    drawAlbumEssentialRegion(target, 470, 78, 200, 120);
    drawAlbumEssentialRegion(target, 1220, 75, 260, 85);
    drawAlbumEssentialRegion(target, 460, 1185, 160, 100);
    drawAlbumEssentialRegion(target, 1255, 1185, 230, 100);
  } else {
    drawInstagramEssentials(target);
  }
}

function drawFacebookCover(target, slide) {
  const english = isEnglishAlbumText();
  drawFacebookCoverGradient(target, slide.shade, english);
  if (english) drawEnglishSanaBadge(target);
  else if (sanaBadge.complete && sanaBadge.naturalWidth) {
    target.drawImage(sanaBadge, 799, 243, 223, 113);
  }
  drawTitleBlock(target);
  drawFacebookBrandLayout(target);
}

function drawFacebookBrandLayout(target) {
  if (facebookBrandLayout.complete && facebookBrandLayout.naturalWidth) {
    target.drawImage(facebookBrandLayout, 0, 0, 1920, 1080);
  }
}

function drawFacebookInner(target, slide) {
  drawFacebookBrandLayout(target);
}

function drawChainIcon(target, x, y) {
  target.save();
  target.translate(x, y);
  target.rotate(-Math.PI / 4);
  target.strokeStyle = '#fff';
  target.lineWidth = 3;
  target.beginPath();
  target.roundRect(-16, -6, 23, 12, 6);
  target.roundRect(-2, -6, 23, 12, 6);
  target.stroke();
  target.restore();
}

function quoteTextLayout(target, slide) {
  const paragraphs = (slide.quoteText || '').split(/\n\s*\n/).map((text) => text.trim()).filter(Boolean);
  const maxWidth = 415;
  const maxBottom = 1085;
  for (let fontSize = Number(slide.quoteFont) || 31; fontSize >= 20; fontSize--) {
    target.font = `${fontSize}px GhroobRegular, Tahoma, sans-serif`;
    const advance = fontSize * (Number(slide.quoteLineHeight) || 1.72);
    const gap = fontSize * .9;
    const rows = [];
    paragraphs.forEach((paragraph, paragraphIndex) => {
      const paragraphRows = wrapParagraph(target, paragraph, maxWidth);
      paragraphRows.forEach((text, lineIndex) => {
        rows.push({
          text,
          paragraphStart: lineIndex === 0,
          paragraphEnd: lineIndex === paragraphRows.length - 1,
          gapBefore: paragraphIndex > 0 && lineIndex === 0 ? gap : 0
        });
      });
    });
    const total = rows.reduce((sum, row) => sum + advance + row.gapBefore, 0);
    if ((Number(slide.quoteY) || 195) + total <= maxBottom || fontSize === 20) {
      return { rows, fontSize, advance };
    }
  }
}

function drawJustifiedRtlLine(target, text, rightX, maxWidth, isLastLine, slide) {
  target.textAlign = 'right';
  const output = isLastLine
    ? text
    : justifyArabicLine(
      target,
      text,
      maxWidth,
      slide.quoteKashida,
      Number(slide.quotePosition ?? QUOTE_DEFAULTS.quotePosition),
      Number(slide.quoteConcentration ?? QUOTE_DEFAULTS.quoteConcentration),
      Number(slide.quoteKashidaSeed) || 0
    );
  target.fillText(output, rightX, 0, maxWidth);
}

function drawQuoteBackground(target, slide) {
  target.save();
  target.fillStyle = '#dfe4e7';
  target.fillRect(0, 0, WIDTH, HEIGHT);
  if (!slide?.image) {
    target.fillStyle = '#71899b';
    target.direction = 'rtl';
    target.textAlign = 'center';
    target.font = '31px GhroobRegular, Tahoma, sans-serif';
    target.fillText('الصق صورة أو اخترها', 218, 650);
    target.restore();
    return;
  }
  const image = slide.image;
  const photoWidth = 435;
  const base = slide.fit === 'contain'
    ? Math.min(photoWidth / image.naturalWidth, HEIGHT / image.naturalHeight)
    : Math.max(photoWidth / image.naturalWidth, HEIGHT / image.naturalHeight);
  const scale = base * slide.zoom;
  const width = image.naturalWidth * scale;
  const height = image.naturalHeight * scale;
  const overflowX = Math.max(0, width - photoWidth);
  const overflowY = Math.max(0, height - HEIGHT);
  const x = (photoWidth - width) / 2 + (slide.panX / 100) * (overflowX / 2);
  const y = (HEIGHT - height) / 2 + (slide.panY / 100) * (overflowY / 2);
  target.beginPath();
  target.rect(0, 0, 600, HEIGHT);
  target.clip();
  target.drawImage(image, x, y, width, height);
  target.restore();
}

function drawQuoteTemplate(target, slide) {
  target.save();

  if (quotesLeftShade.complete && quotesLeftShade.naturalWidth) {
    target.drawImage(quotesLeftShade, 0, 0, 1080, 1350);
  }
  if (quotesPanelClean.complete && quotesPanelClean.naturalWidth) {
    target.drawImage(quotesPanelClean, 0, 0, 1080, 1350);
  }
  if (quotesGlowWide.complete && quotesGlowWide.naturalWidth) {
    target.drawImage(quotesGlowWide, 412.5, 560, 45, 663);
  }
  if (quotesGlowLine.complete && quotesGlowLine.naturalWidth) {
    target.drawImage(quotesGlowLine, 427.5, 540, 15, 732);
  }

  target.direction = 'rtl';
  target.textAlign = 'right';
  target.textBaseline = 'top';
  const layout = quoteTextLayout(target, slide);
  const startY = Number(slide.quoteY) || 195;
  let y = startY;
  const dotYs = [];
  let lastTextBottom = startY;
  target.font = `${layout.fontSize}px GhroobRegular, Tahoma, sans-serif`;
  target.fillStyle = '#fff';
  for (const row of layout.rows) {
    y += row.gapBefore;
    if (row.paragraphStart) dotYs.push(y + layout.fontSize * .34);
    target.save();
    target.translate(0, y);
    drawJustifiedRtlLine(target, row.text, 922, 415, row.paragraphEnd, slide);
    target.restore();
    lastTextBottom = y + layout.fontSize * 1.08;
    y += layout.advance;
  }
  const lineTop = dotYs[0] ?? startY;
  const lineBottom = Math.max(lineTop + 40, lastTextBottom);
  target.strokeStyle = '#43c7e9';
  target.lineWidth = 2;
  target.beginPath(); target.moveTo(944, lineTop); target.lineTo(944, lineBottom); target.stroke();
  target.fillStyle = '#43c7e9';
  dotYs.forEach((dotY) => {
    if (quoteDot.complete && quoteDot.naturalWidth) target.drawImage(quoteDot, 935.5, dotY - 8.5, 17, 17);
    else { target.beginPath(); target.arc(944, dotY, 8, 0, Math.PI * 2); target.fill(); }
  });

  target.textAlign = 'right';
  target.textBaseline = 'top';
  target.font = `${Number(slide.nameFont) || 34}px GhroobRegular, Tahoma, sans-serif`;
  target.fillStyle = '#fff';
  const nameY = Number(slide.nameY) || 985;
  target.fillText(slide.personName || '', 375, nameY, 300);
  target.fillStyle = '#11bfe5';
  target.beginPath(); target.arc(392, nameY + 17, 7, 0, Math.PI * 2); target.fill();
  target.font = `${Number(slide.jobFont) || 25}px GhroobRegular, Tahoma, sans-serif`;
  const jobLines = wrapParagraph(target, slide.jobTitle || '', 330);
  jobLines.forEach((line, index) => target.fillText(line, 375, nameY + 44 + index * (Number(slide.jobFont) || 25) * 1.25, 330));

  if (quotesEssential.complete && quotesEssential.naturalWidth) {
    target.drawImage(quotesEssential, 75, 98, 930, 1151);
  }
  target.restore();
}

function drawQuoteMode(target, slide) {
  drawQuoteTemplate(target, slide);
}

function reporterTextLayout(target, slide) {
  const maxWidth = 780;
  const source = (slide.reporterTitle || '').trim();
  const manual = slide.reporterManualLines !== false;
  const fontSize = Number(slide.reporterFont) || REPORTER_DEFAULTS.reporterFont;
  target.font = `${fontSize}px GhroobBoldRound, Tahoma, sans-serif`;
  const writtenLines = source.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const writtenBlockFits = manual
    && writtenLines.length === 3
    && writtenLines.every((line) => target.measureText(line).width <= maxWidth);
  const lines = writtenBlockFits
    ? writtenLines
    : balanceWords(target, source, 3, maxWidth) || wrapParagraph(target, source.replace(/\r?\n/g, ' '), maxWidth);
  return { lines: lines.slice(0, 3), fontSize };
}

function drawReporterTitle(target, slide) {
  target.save();
  target.direction = 'rtl';
  target.textAlign = 'center';
  target.textBaseline = 'alphabetic';
  target.fillStyle = '#fff';
  const layout = reporterTextLayout(target, slide);
  const advance = layout.fontSize * (Number(slide.reporterLineHeight) || REPORTER_DEFAULTS.reporterLineHeight);
  const startY = Number(slide.reporterY) || REPORTER_DEFAULTS.reporterY;
  target.font = `${layout.fontSize}px GhroobBoldRound, Tahoma, sans-serif`;
  layout.lines.forEach((line, index) => {
    const output = justifyArabicLine(target, line, 780, slide.reporterJustify !== false, 80, 35, index);
    target.fillText(output, 540, startY + index * advance, 790);
  });
  target.restore();
}

function drawReporterMode(target, slide) {
  drawBlueGradient(target, slide.blueShade ?? currentModeBlueShade(), false);
  const strength = Math.min(1, Math.max(0, Number(slide.shade ?? 100) / 100));
  const topShade = target.createLinearGradient(0, 0, 0, HEIGHT * 0.58);
  topShade.addColorStop(0, `rgba(0,0,0,${strength * 0.36})`);
  topShade.addColorStop(0.45, `rgba(0,0,0,${strength * 0.14})`);
  topShade.addColorStop(1, 'rgba(0,0,0,0)');
  target.save();
  target.fillStyle = topShade;
  target.fillRect(0, 0, WIDTH, HEIGHT * 0.58);
  target.restore();
  drawReporterTitle(target, slide);
  if (reporterBadge.complete && reporterBadge.naturalWidth) {
    target.drawImage(reporterBadge, 508, 654, 441, 112);
  }
  if (reporterEssential.complete && reporterEssential.naturalWidth) {
    target.drawImage(reporterEssential, 75, 100, 930, 1150);
  }
}

function flagClipPath(target, side) {
  target.beginPath();
  if (side === 'left') {
    target.moveTo(1038, 615);
    target.bezierCurveTo(850, 675, 550, 825, 298, 893);
    target.bezierCurveTo(296, 1000, 345, 1170, 420, 1308);
    target.bezierCurveTo(650, 1284, 930, 1180, 1142, 1090);
    target.bezierCurveTo(1110, 940, 1068, 755, 1038, 615);
  } else {
    target.moveTo(1361, 615);
    target.bezierCurveTo(1550, 680, 1844, 825, 2098, 893);
    target.bezierCurveTo(2100, 1000, 2050, 1170, 1972, 1308);
    target.bezierCurveTo(1742, 1285, 1460, 1180, 1238, 1090);
    target.bezierCurveTo(1270, 940, 1327, 755, 1361, 615);
  }
  target.closePath();
}

function flagMeshPoint(side, u, v) {
  const wave = Math.sin(u * Math.PI * 6 + v * .7) * Math.sin(v * Math.PI);
  if (side === 'left') {
    const topX = 1038 + (298 - 1038) * u + Math.sin(Math.PI * u) * 12;
    const topY = 615 + (893 - 615) * u + Math.sin(Math.PI * u) * 24;
    const bottomX = 1142 + (420 - 1142) * u - Math.sin(Math.PI * u) * 18;
    const bottomY = 1090 + (1308 - 1090) * u + Math.sin(Math.PI * u) * 32;
    return {
      x: topX + (bottomX - topX) * v + wave * 8,
      y: topY + (bottomY - topY) * v + wave * 13
    };
  }
  const topX = 1361 + (2098 - 1361) * u - Math.sin(Math.PI * u) * 12;
  const topY = 615 + (893 - 615) * u + Math.sin(Math.PI * u) * 24;
  const bottomX = 1238 + (1972 - 1238) * u + Math.sin(Math.PI * u) * 18;
  const bottomY = 1090 + (1308 - 1090) * u + Math.sin(Math.PI * u) * 32;
  return {
    x: topX + (bottomX - topX) * v - wave * 8,
    y: topY + (bottomY - topY) * v + wave * 13
  };
}

function drawImageTriangle(target, image, source, destination) {
  const [s0, s1, s2] = source;
  const [d0, d1, d2] = destination;
  const denominator = s0.x * (s1.y - s2.y) + s1.x * (s2.y - s0.y) + s2.x * (s0.y - s1.y);
  if (!denominator) return;
  const a = (d0.x * (s1.y - s2.y) + d1.x * (s2.y - s0.y) + d2.x * (s0.y - s1.y)) / denominator;
  const c = (d0.x * (s2.x - s1.x) + d1.x * (s0.x - s2.x) + d2.x * (s1.x - s0.x)) / denominator;
  const e = (d0.x * (s1.x * s2.y - s2.x * s1.y) + d1.x * (s2.x * s0.y - s0.x * s2.y) + d2.x * (s0.x * s1.y - s1.x * s0.y)) / denominator;
  const b = (d0.y * (s1.y - s2.y) + d1.y * (s2.y - s0.y) + d2.y * (s0.y - s1.y)) / denominator;
  const d = (d0.y * (s2.x - s1.x) + d1.y * (s0.x - s2.x) + d2.y * (s1.x - s0.x)) / denominator;
  const f = (d0.y * (s1.x * s2.y - s2.x * s1.y) + d1.y * (s2.x * s0.y - s0.x * s2.y) + d2.y * (s0.x * s1.y - s1.x * s0.y)) / denominator;
  const centerX = (d0.x + d1.x + d2.x) / 3;
  const centerY = (d0.y + d1.y + d2.y) / 3;
  const overlap = 1.8;
  const expanded = destination.map((point) => {
    const length = Math.hypot(point.x - centerX, point.y - centerY) || 1;
    return {
      x: point.x + ((point.x - centerX) / length) * overlap,
      y: point.y + ((point.y - centerY) / length) * overlap
    };
  });
  target.save();
  target.beginPath();
  target.moveTo(expanded[0].x, expanded[0].y);
  target.lineTo(expanded[1].x, expanded[1].y);
  target.lineTo(expanded[2].x, expanded[2].y);
  target.closePath();
  target.clip();
  target.setTransform(a, b, c, d, e, f);
  target.drawImage(image, 0, 0);
  target.restore();
}

function drawWarpedFlag(target, image, side) {
  if (!image?.naturalWidth) return;
  const columns = 26;
  const rows = 12;
  const sw = image.naturalWidth;
  const sh = image.naturalHeight;
  flagWarpContext.setTransform(1, 0, 0, 1, 0, 0);
  flagWarpContext.globalCompositeOperation = 'source-over';
  flagWarpContext.clearRect(0, 0, flagWarpCanvas.width, flagWarpCanvas.height);
  flagWarpContext.imageSmoothingEnabled = true;
  flagWarpContext.imageSmoothingQuality = 'high';
  // Fill the entire cloth silhouette first. The mesh is drawn over this base,
  // so even its extreme inner and outer edges can never reveal the white mockup.
  flagWarpContext.save();
  if (side === 'left') {
    flagWarpContext.translate(1191, 0);
    flagWarpContext.scale(-1, 1);
    flagWarpContext.drawImage(image, 0, 546, 902, 770);
  } else {
    flagWarpContext.drawImage(image, 1214, 550, 893, 766);
  }
  flagWarpContext.restore();
  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const u0 = column / columns;
      const u1 = (column + 1) / columns;
      const v0 = row / rows;
      const v1 = (row + 1) / rows;
      const s00 = { x: u0 * sw, y: v0 * sh };
      const s10 = { x: u1 * sw, y: v0 * sh };
      const s01 = { x: u0 * sw, y: v1 * sh };
      const s11 = { x: u1 * sw, y: v1 * sh };
      const center = side === 'left' ? { x: 740, y: 930 } : { x: 1680, y: 930 };
      const overscan = (point) => ({
        x: center.x + (point.x - center.x) * 1.08,
        y: center.y + (point.y - center.y) * 1.12
      });
      const d00 = overscan(flagMeshPoint(side, u0, v0));
      const d10 = overscan(flagMeshPoint(side, u1, v0));
      const d01 = overscan(flagMeshPoint(side, u0, v1));
      const d11 = overscan(flagMeshPoint(side, u1, v1));
      drawImageTriangle(flagWarpContext, image, [s00, s10, s11], [d00, d10, d11]);
      drawImageTriangle(flagWarpContext, image, [s00, s11, s01], [d00, d11, d01]);
    }
  }
  const cutMask = side === 'left' ? flagLeftCutMask : flagRightCutMask;
  const shadeMask = side === 'left' ? flagLeftMask : flagRightMask;
  if (cutMask.complete && cutMask.naturalWidth) {
    flagWarpContext.setTransform(1, 0, 0, 1, 0, 0);
    flagWarpContext.globalCompositeOperation = 'destination-in';
    flagWarpContext.drawImage(cutMask, 0, 0, 2436, 1558);
  }
  target.save();
  target.globalCompositeOperation = 'source-over';
  target.drawImage(flagWarpCanvas, 0, 0);
  target.restore();
  if (flagsMockupBlank.complete && flagsMockupBlank.naturalWidth && shadeMask.complete && shadeMask.naturalWidth) {
    flagShadeContext.setTransform(1, 0, 0, 1, 0, 0);
    flagShadeContext.globalCompositeOperation = 'source-over';
    flagShadeContext.clearRect(0, 0, 2436, 1558);
    flagShadeContext.drawImage(flagsMockupBlank, 0, 0, 2436, 1558);
    flagShadeContext.globalCompositeOperation = 'destination-in';
    flagShadeContext.drawImage(shadeMask, 0, 0, 2436, 1558);
    target.save();
    target.globalCompositeOperation = 'multiply';
    target.globalAlpha = .68;
    target.drawImage(flagShadeCanvas, 0, 0);
    target.restore();
  }
}

function clipLineCorridor(target, x1, y1, x2, y2, halfWidth) {
  const length = Math.hypot(x2 - x1, y2 - y1) || 1;
  const nx = -(y2 - y1) / length * halfWidth;
  const ny = (x2 - x1) / length * halfWidth;
  target.moveTo(x1 + nx, y1 + ny);
  target.lineTo(x2 + nx, y2 + ny);
  target.lineTo(x2 - nx, y2 - ny);
  target.lineTo(x1 - nx, y1 - ny);
  target.closePath();
}

function drawFlagPoleOverlay(target) {
  if (!flagsMockupBlank.complete || !flagsMockupBlank.naturalWidth) return;
  target.save();
  target.beginPath();
  clipLineCorridor(target, 1045, 450, 1233, 1558, 19);
  clipLineCorridor(target, 1357, 450, 1205, 1558, 19);
  clipLineCorridor(target, 1025, 487, 1167, 1558, 3);
  clipLineCorridor(target, 1376, 487, 1260, 1558, 3);
  target.clip();
  target.globalCompositeOperation = 'source-over';
  target.drawImage(flagsMockupBlank, 0, 0, 2436, 1558);
  target.restore();
}

function drawFlagsMode(target) {
  target.save();
  target.fillStyle = '#168dc3';
  target.fillRect(0, 0, 2436, 1558);
  if (flagsMockupBlank.complete && flagsMockupBlank.naturalWidth) {
    target.drawImage(flagsMockupBlank, 0, 0, 2436, 1558);
  }
  drawWarpedFlag(target, flagState.left.image, 'left');
  drawWarpedFlag(target, flagState.right.image, 'right');
  drawFlagPoleOverlay(target);
  target.restore();
}

// V2 uses transparent cut-outs from the exact supplied mockup. The country flag
// is painted through the real cloth alpha, then the source folds are multiplied
// back above it so the result keeps the original fabric rather than looking flat.
const FLAGS_WIDTH = 2048;
const FLAGS_HEIGHT = 1278;
const FLAGS_SOURCE_WIDTH = 1587;
const FLAGS_SOURCE_HEIGHT = 991;
function prepareFlagArt(image, side) {
  flagArtContext.setTransform(1, 0, 0, 1, 0, 0);
  flagArtContext.clearRect(0, 0, flagArtCanvas.width, flagArtCanvas.height);
  flagArtContext.imageSmoothingEnabled = true;
  flagArtContext.imageSmoothingQuality = 'high';
  // Map the complete source flag to normalised cloth coordinates. Using
  // `cover` here cut both ends off wide flags (Malaysia is 1:2), which removed
  // the crescent/star and any emblem placed close to the hoist. The mesh below
  // handles the perspective; this preparatory canvas must never crop artwork.
  // The left flag is attached to a pole on its right edge. Mirror the whole
  // flag art before it reaches the fabric mesh so every country's hoist-side
  // symbols (for example the Philippine triangle) stay next to that pole.
  flagArtContext.save();
  if (side === 'left') {
    flagArtContext.translate(flagArtCanvas.width, 0);
    flagArtContext.scale(-1, 1);
  }
  flagArtContext.drawImage(image, 0, 0, flagArtCanvas.width, flagArtCanvas.height);
  flagArtContext.restore();
}

function flagMeshPointV3(side, u, v) {
  // u follows the cloth from its mast to the free edge. This lets the bands,
  // stars, and emblems tilt with the pole instead of remaining horizontal.
  // Keep the cloth motion continuous at the edge. The mesh is deliberately
  // allowed to extend just outside the visible fabric, then the real cloth
  // alpha trims it back; that prevents the white mock-up below from peeking
  // through on a waved outer edge.
  const clothU = Math.min(1, Math.max(0, u));
  const clothV = Math.min(1, Math.max(0, v));
  const fold = Math.sin(clothU * Math.PI * 3.2 + clothV * 1.4) * Math.sin(Math.PI * clothU);
  const bulge = Math.sin(Math.PI * clothU);
  if (side === 'left') {
    const topX = 895 + (304 - 895) * u - bulge * 18;
    const topY = 351 + (505 - 351) * u + bulge * 16;
    const bottomX = 1040 + (334 - 1040) * u + bulge * 24;
    const bottomY = 775 + (915 - 775) * u + bulge * 22;
    return {
      x: topX + (bottomX - topX) * v + fold * 13,
      y: topY + (bottomY - topY) * v + fold * 19
    };
  }
  // The right cloth's top hoist is farther right than its lower hoist. Using
  // the true apex keeps symbols near the pole (for example China's large
  // star) inside the fabric instead of cutting them along a false diagonal.
  const topX = 1275 + (1856 - 1275) * u + bulge * 18;
  const topY = 351 + (505 - 351) * u + bulge * 15;
  const bottomX = 1100 + (1800 - 1100) * u - bulge * 24;
  const bottomY = 770 + (930 - 770) * u + bulge * 24;
  return {
    x: topX + (bottomX - topX) * v - fold * 13,
    y: topY + (bottomY - topY) * v + fold * 19
  };
}

function drawWarpedFlagArt(target, side) {
  const columns = 28;
  const rows = 16;
  // Paint one narrow ring beyond every edge. It is clipped by the transparent
  // cloth layer below, so it can only fill the fabric's anti-aliased fringe.
  const sourceEdge = (value) => {
    if (value < 0) return Math.min(.004, -value * .05);
    if (value > 1) return Math.max(.996, 1 - (value - 1) * .05);
    return value;
  };
  for (let row = -1; row <= rows; row += 1) {
    for (let column = -1; column <= columns; column += 1) {
      const u0 = column / columns;
      const u1 = (column + 1) / columns;
      const v0 = row / rows;
      const v1 = (row + 1) / rows;
      const edgeU0 = sourceEdge(u0);
      const edgeU1 = sourceEdge(u1);
      const edgeV0 = sourceEdge(v0);
      const edgeV1 = sourceEdge(v1);
      const sourceU0 = side === 'left' ? 1 - edgeU0 : edgeU0;
      const sourceU1 = side === 'left' ? 1 - edgeU1 : edgeU1;
      const s00 = { x: sourceU0 * flagArtCanvas.width, y: edgeV0 * flagArtCanvas.height };
      const s10 = { x: sourceU1 * flagArtCanvas.width, y: edgeV0 * flagArtCanvas.height };
      const s01 = { x: sourceU0 * flagArtCanvas.width, y: edgeV1 * flagArtCanvas.height };
      const s11 = { x: sourceU1 * flagArtCanvas.width, y: edgeV1 * flagArtCanvas.height };
      const d00 = flagMeshPointV3(side, u0, v0);
      const d10 = flagMeshPointV3(side, u1, v0);
      const d01 = flagMeshPointV3(side, u0, v1);
      const d11 = flagMeshPointV3(side, u1, v1);
      drawImageTriangle(target, flagArtCanvas, [s00, s10, s11], [d00, d10, d11]);
      drawImageTriangle(target, flagArtCanvas, [s00, s11, s01], [d00, d11, d01]);
    }
  }
}

function drawFabricFlagV2(target, image, cloth, side) {
  if (!image?.naturalWidth || !cloth?.naturalWidth) return;
  flagWarpContext.save();
  flagWarpContext.setTransform(1, 0, 0, 1, 0, 0);
  flagWarpContext.globalCompositeOperation = 'source-over';
  flagWarpContext.clearRect(0, 0, FLAGS_WIDTH, FLAGS_HEIGHT);
  flagWarpContext.imageSmoothingEnabled = true;
  flagWarpContext.imageSmoothingQuality = 'high';
  prepareFlagArt(image, side);
  drawWarpedFlagArt(flagWarpContext, side);
  flagWarpContext.globalCompositeOperation = 'destination-in';
  flagWarpContext.drawImage(cloth, 0, 0, FLAGS_WIDTH, FLAGS_HEIGHT);
  flagWarpContext.restore();

  target.save();
  target.globalCompositeOperation = 'source-over';
  target.drawImage(flagWarpCanvas, 0, 0, FLAGS_WIDTH, FLAGS_HEIGHT);
  target.globalCompositeOperation = 'multiply';
  target.globalAlpha = .97;
  target.drawImage(cloth, 0, 0, FLAGS_WIDTH, FLAGS_HEIGHT);
  target.restore();
}

function drawFlagPoleOverlayV2(target) {
  if (!flagsMockupBlank.complete || !flagsMockupBlank.naturalWidth) return;
  const sx = FLAGS_WIDTH / FLAGS_SOURCE_WIDTH;
  const sy = FLAGS_HEIGHT / FLAGS_SOURCE_HEIGHT;
  const point = (x, y) => [x * sx, y * sy];
  target.save();
  target.beginPath();
  // Poles and cords remain above the animated fabric exactly as in the mockup.
  clipLineCorridor(target, ...point(695, 244), ...point(972, 991), 12 * sx);
  clipLineCorridor(target, ...point(978, 244), ...point(705, 991), 12 * sx);
  clipLineCorridor(target, ...point(681, 262), ...point(884, 714), 3 * sx);
  clipLineCorridor(target, ...point(992, 262), ...point(793, 714), 3 * sx);
  target.clip();
  target.drawImage(flagsMockupBlank, 0, 0, FLAGS_WIDTH, FLAGS_HEIGHT);
  target.restore();
}

function drawFlagsMode(target) {
  target.save();
  target.fillStyle = '#eeeeee';
  target.fillRect(0, 0, FLAGS_WIDTH, FLAGS_HEIGHT);
  if (flagsMockupBlank.complete && flagsMockupBlank.naturalWidth) {
    target.drawImage(flagsMockupBlank, 0, 0, FLAGS_WIDTH, FLAGS_HEIGHT);
  }
  drawFabricFlagV2(target, flagState.left.image, flagLeftCloth, 'left');
  drawFabricFlagV2(target, flagState.right.image, flagRightCloth, 'right');
  drawFlagPoleOverlayV2(target);
  target.restore();
}

function renderTo(target, slide, previewMode = false) {
  target.clearRect(0, 0, WIDTH, HEIGHT);
  if (currentMode === 'flags') {
    drawFlagsMode(target);
    return;
  }
  if (currentMode === 'quotes') drawQuoteBackground(target, slide);
  else drawBackground(target, slide);
  const activeSlide = slide || {
    shade: MODE_CONFIGS[currentMode].coverShade,
    blueShade: currentModeBlueShade(),
    ...(currentMode === 'quotes' ? currentQuoteDraft() : QUOTE_DEFAULTS),
    ...REPORTER_DEFAULTS
  };
  if (currentMode === 'quotes') {
    drawQuoteMode(target, activeSlide);
  } else if (currentMode === 'reporter') {
    drawReporterMode(target, activeSlide);
  } else if (currentMode === 'facebook') {
    if (!slide || isCover(slide)) drawFacebookCover(target, activeSlide);
    else drawFacebookInner(target, activeSlide);
  } else if (!slide || isCover(slide)) drawCover(target, activeSlide, previewMode);
  else drawInner(target, activeSlide);
}

function render() {
  renderQueued = false;
  renderTo(ctx, current(), true);
  updateOutputs();
  renderThumbCanvases();
}

function scheduleRender() {
  if (!renderQueued) { renderQueued = true; requestAnimationFrame(render); }
}

function updateOutputs() {
  const slide = current();
  $('zoomOut').value = `${(slide?.zoom || 1).toFixed(2)}×`;
  $('panXOut').value = slide?.panX || 0;
  $('panYOut').value = slide?.panY || 0;
  const shadeValue = isAlbumMode() ? currentModeShade() : (slide?.shade ?? MODE_CONFIGS[currentMode].coverShade);
  $('shadeOut').value = `${shadeValue}%`;
  const blueValue = currentMode === 'reporter'
    ? (slide?.blueShade ?? currentModeBlueShade())
    : currentModeBlueShade();
  $('blueShadeOut').value = `${blueValue}%`;
  $('concentrationOut').value = `${settings.concentration}%`;
  $('positionOut').value = `${settings.position}%`;
  $('fontSizeOut').value = settings.fontSize;
  $('lineHeightOut').value = settings.lineHeight.toFixed(2);
  $('textWidthOut').value = settings.textWidth;
  $('textXOut').value = settings.textX;
  $('textYOut').value = settings.textY;
  const quoteSlide = currentMode === 'quotes' ? (current() || currentQuoteDraft()) : current();
  $('quoteFontOut').value = quoteSlide?.quoteFont ?? QUOTE_DEFAULTS.quoteFont;
  $('quoteLineHeightOut').value = Number(quoteSlide?.quoteLineHeight ?? QUOTE_DEFAULTS.quoteLineHeight).toFixed(2);
  $('quoteYOut').value = quoteSlide?.quoteY ?? QUOTE_DEFAULTS.quoteY;
  $('nameFontOut').value = quoteSlide?.nameFont ?? QUOTE_DEFAULTS.nameFont;
  $('jobFontOut').value = quoteSlide?.jobFont ?? QUOTE_DEFAULTS.jobFont;
  $('nameYOut').value = quoteSlide?.nameY ?? QUOTE_DEFAULTS.nameY;
  $('quoteConcentrationOut').value = `${quoteSlide?.quoteConcentration ?? QUOTE_DEFAULTS.quoteConcentration}%`;
  $('quotePositionOut').value = `${quoteSlide?.quotePosition ?? QUOTE_DEFAULTS.quotePosition}%`;
  $('reporterFontOut').value = quoteSlide?.reporterFont ?? REPORTER_DEFAULTS.reporterFont;
  $('reporterLineHeightOut').value = Number(quoteSlide?.reporterLineHeight ?? REPORTER_DEFAULTS.reporterLineHeight).toFixed(2);
  $('reporterYOut').value = quoteSlide?.reporterY ?? REPORTER_DEFAULTS.reporterY;
}

function syncQuoteInputs(slide = current()) {
  const source = slide || currentQuoteDraft();
  $('quoteText').value = source.quoteText || '';
  $('personName').value = source.personName || '';
  $('jobTitle').value = source.jobTitle || '';
  $('quoteKashida').checked = source.quoteKashida ?? QUOTE_DEFAULTS.quoteKashida;
  ['quoteFont','quoteLineHeight','quoteY','nameFont','jobFont','nameY','quoteConcentration','quotePosition'].forEach((id) => {
    $(id).value = source[id] ?? QUOTE_DEFAULTS[id];
  });
}

function syncReporterInputs(slide = current()) {
  const source = slide || REPORTER_DEFAULTS;
  $('reporterTitle').value = source.reporterTitle || '';
  $('reporterManualLines').checked = source.reporterManualLines ?? REPORTER_DEFAULTS.reporterManualLines;
  $('reporterJustify').checked = source.reporterJustify ?? REPORTER_DEFAULTS.reporterJustify;
  ['reporterFont','reporterLineHeight','reporterY'].forEach((id) => {
    $(id).value = source[id] ?? REPORTER_DEFAULTS[id];
  });
}

function syncControls() {
  const slide = current();
  const hasSlide = Boolean(slide);
  const quoteMode = currentMode === 'quotes';
  const reporterMode = currentMode === 'reporter';
  const flagsMode = currentMode === 'flags';
  ['zoom','panX','panY','shade','blueShade','fill','contain','resetImage','setCover','deleteSlide','exportOne'].forEach((id) => $(id).disabled = !hasSlide);
  $('exportOne').disabled = flagsMode ? false : !hasSlide;
  ['quoteText','personName','jobTitle','quoteFont','quoteLineHeight','quoteY','nameFont','jobFont','nameY','quoteKashida','quoteConcentration','quotePosition','quoteReshuffle','quoteInsertKashida'].forEach((id) => $(id).disabled = !hasSlide && !quoteMode);
  ['reporterTitle','reporterManualLines','reporterJustify','reporterFont','reporterLineHeight','reporterY','reporterInsertKashida'].forEach((id) => $(id).disabled = !hasSlide);
  if (isAlbumMode()) {
    $('shade').value = currentModeShade();
    $('blueShade').value = currentModeBlueShade();
  }
  if (reporterMode) $('blueShade').value = slide?.blueShade ?? currentModeBlueShade();
  if (slide) {
    $('zoom').min = '1';
    $('zoom').value = slide.zoom; $('panX').value = slide.panX;
    $('panY').value = slide.panY;
    if (!isAlbumMode()) $('shade').value = slide.shade;
    $('fill').classList.toggle('active', slide.fit === 'cover');
    $('contain').classList.toggle('active', slide.fit === 'contain');
  }
  const cover = isCover(slide);
  $('imageControls').hidden = flagsMode;
  $('coverControls').hidden = flagsMode || quoteMode || reporterMode || !cover;
  $('quoteControls').hidden = !quoteMode;
  $('reporterControls').hidden = !reporterMode;
  $('flagsControls').hidden = !flagsMode;
  $('shadeControl').hidden = quoteMode || flagsMode;
  $('blueShadeControl').hidden = quoteMode || flagsMode || currentMode === 'facebook' || (!reporterMode && !cover);
  $('shadeLabel').textContent = reporterMode ? 'قوة التعتيم الأسود' : currentMode === 'facebook' ? 'قوة التدرّج الجانبي للغلاف' : 'قوة التدرّج الرمادي لكل الصور';
  $('blueShadeLabel').textContent = reporterMode ? 'قوة التدرّج الأزرق' : 'قوة التدرّج الأزرق للغلاف';
  $('innerInfo').hidden = flagsMode || quoteMode || reporterMode || !hasSlide || cover;
  $('slideType').textContent = flagsMode ? 'علمان' : !hasSlide ? 'لا توجد صورة' : quoteMode ? 'تصريح' : reporterMode ? 'مراسل' : cover ? 'الغلاف' : 'صورة داخلية';
  $('setCover').hidden = flagsMode || quoteMode || reporterMode;
  $('setCover').disabled = !hasSlide || cover;
  $('setCover').textContent = cover ? '★ صورة الغلاف' : '☆ تعيين كغلاف';
  $('counter').textContent = flagsMode ? 'قالب علمين' : hasSlide ? `الصورة ${selected + 1} من ${slides.length}` : '';
  $('count').textContent = slides.length;
  $('exportAll').disabled = flagsMode || !slides.length;
  const englishTitle = isEnglishAlbumText();
  $('toggleTitleLanguage').disabled = !isAlbumMode() || !cover;
  $('titleKashidaHint').hidden = englishTitle;
  $('insertKashida').hidden = englishTitle;
  $('titleKashidaControls').hidden = englishTitle;
  $('titleLineControls').hidden = englishTitle;
  syncTitleLanguageControls();
  if (quoteMode) syncQuoteInputs(slide);
  if (reporterMode) syncReporterInputs(slide);
  updateOutputs();
}

function renderFilmstrip() {
  const strip = $('filmstrip');
  strip.innerHTML = '';
  slides.forEach((slide, index) => {
    const item = document.createElement('div');
    item.className = `thumb${index === selected ? ' selected' : ''}`;
    item.draggable = true;
    item.dataset.index = index;
    item.classList.toggle('facebook', currentMode === 'facebook');
    item.classList.toggle('quotes', currentMode === 'quotes');
    item.classList.toggle('reporter', currentMode === 'reporter');
    item.innerHTML = `<canvas width="${Math.round(WIDTH * .2)}" height="${Math.round(HEIGHT * .2)}"></canvas><div class="caption"><span>${currentMode === 'quotes' ? `تصريح ${index + 1}` : currentMode === 'reporter' ? `خبر ${index + 1}` : slide.id === coverId ? '★ الغلاف' : `صورة ${index + 1}`}</span><span><button class="move-prev" title="نقل للخلف">→</button><button class="move-next" title="نقل للأمام">←</button></span></div><button class="download-slide" title="تنزيل هذه الصورة كملف PNG">↓ تنزيل PNG</button>`;
    item.addEventListener('click', (event) => {
      if (event.target.closest('button')) return;
      selected = index; syncControls(); renderFilmstrip(); scheduleRender();
    });
    item.querySelector('.move-prev').addEventListener('click', () => moveSlide(index, index - 1));
    item.querySelector('.move-next').addEventListener('click', () => moveSlide(index, index + 1));
    item.querySelector('.download-slide').addEventListener('click', (event) => {
      event.stopPropagation();
      const button = event.currentTarget;
      button.disabled = true;
      button.textContent = 'جارٍ التنزيل…';
      try {
        downloadCanvas(slide, index);
        showToast(`تم تنزيل الصورة ${index + 1}`);
      } catch (error) {
        console.error(error);
        showToast('تعذّر تنزيل الصورة');
      } finally {
        button.disabled = false;
        button.textContent = '↓ تنزيل PNG';
      }
    });
    item.addEventListener('dragstart', (event) => event.dataTransfer.setData('text/plain', String(index)));
    item.addEventListener('dragover', (event) => event.preventDefault());
    item.addEventListener('drop', (event) => {
      event.preventDefault();
      moveSlide(Number(event.dataTransfer.getData('text/plain')), index);
    });
    strip.appendChild(item);
  });
  renderThumbCanvases();
}

function renderThumbCanvases() {
  document.querySelectorAll('.thumb').forEach((item) => {
    const thumbCanvas = item.querySelector('canvas');
    const thumbCtx = thumbCanvas.getContext('2d');
    thumbCtx.save();
    thumbCtx.scale(.2, .2);
    renderTo(thumbCtx, slides[Number(item.dataset.index)], false);
    thumbCtx.restore();
  });
}

function moveSlide(from, to) {
  if (to < 0 || to >= slides.length || from === to) return;
  const [slide] = slides.splice(from, 1);
  slides.splice(to, 0, slide);
  selected = to;
  syncControls(); renderFilmstrip(); scheduleRender();
}

function showToast(message) {
  $('toast').textContent = message;
  $('toast').classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $('toast').classList.remove('visible'), 2200);
}

const COUNTRY_CODES = {
  'سوريا':'sy','سورية':'sy','الجمهورية العربية السورية':'sy','الولايات المتحدة':'us','الولايات المتحدة الامريكية':'us','امريكا':'us','أمريكا':'us',
  'فنزويلا':'ve','السعودية':'sa','المملكة العربية السعودية':'sa','الإمارات':'ae','الامارات':'ae','الإمارات العربية المتحدة':'ae','قطر':'qa','البحرين':'bh','الكويت':'kw','عمان':'om','سلطنة عمان':'om','اليمن':'ye',
  'الأردن':'jo','الاردن':'jo','لبنان':'lb','العراق':'iq','فلسطين':'ps','مصر':'eg','ليبيا':'ly','تونس':'tn','الجزائر':'dz','المغرب':'ma','موريتانيا':'mr','السودان':'sd','الصومال':'so','جيبوتي':'dj','جزر القمر':'km',
  'تركيا':'tr','إيران':'ir','ايران':'ir','روسيا':'ru','أوكرانيا':'ua','اوكرانيا':'ua','الصين':'cn','اليابان':'jp','كوريا الجنوبية':'kr','كوريا الشمالية':'kp','الهند':'in','باكستان':'pk','أفغانستان':'af','افغانستان':'af','كازاخستان':'kz','أذربيجان':'az','اذربيجان':'az','أرمينيا':'am','ارمينيا':'am','جورجيا':'ge',
  'فرنسا':'fr','ألمانيا':'de','المانيا':'de','إيطاليا':'it','ايطاليا':'it','إسبانيا':'es','اسبانيا':'es','بريطانيا':'gb','المملكة المتحدة':'gb','البرتغال':'pt','هولندا':'nl','بلجيكا':'be','سويسرا':'ch','النمسا':'at','اليونان':'gr','السويد':'se','النرويج':'no','الدنمارك':'dk','فنلندا':'fi','بولندا':'pl','رومانيا':'ro','بلغاريا':'bg','المجر':'hu','التشيك':'cz','صربيا':'rs','كرواتيا':'hr','البوسنة والهرسك':'ba','ألبانيا':'al','البانيا':'al','إيرلندا':'ie','ايرلندا':'ie','آيسلندا':'is',
  'كندا':'ca','المكسيك':'mx','البرازيل':'br','الأرجنتين':'ar','الارجنتين':'ar','تشيلي':'cl','كولومبيا':'co','بيرو':'pe','بوليفيا':'bo','الإكوادور':'ec','الاكوادور':'ec','أوروغواي':'uy','اورغواي':'uy','باراغواي':'py','كوبا':'cu',
  'أستراليا':'au','استراليا':'au','نيوزيلندا':'nz','جنوب أفريقيا':'za','جنوب افريقيا':'za','إثيوبيا':'et','اثيوبيا':'et','كينيا':'ke','نيجيريا':'ng','غانا':'gh','السنغال':'sn','تنزانيا':'tz',
  'united states':'us','usa':'us','america':'us','venezuela':'ve','syria':'sy','saudi arabia':'sa','united arab emirates':'ae','uae':'ae','qatar':'qa','jordan':'jo','lebanon':'lb','iraq':'iq','palestine':'ps','turkey':'tr','türkiye':'tr','russia':'ru','china':'cn','iran':'ir','egypt':'eg','france':'fr','germany':'de','italy':'it','spain':'es','united kingdom':'gb','uk':'gb','canada':'ca','brazil':'br','argentina':'ar','india':'in','pakistan':'pk','japan':'jp','south korea':'kr','australia':'au'
};
const ALL_COUNTRY_CODES = 'ad ae af ag ai al am ao aq ar as at au aw ax az ba bb bd be bf bg bh bi bj bl bm bn bo bq br bs bt bv bw by bz ca cc cd cf cg ch ci ck cl cm cn co cr cu cv cw cx cy cz de dj dk dm do dz ec ee eg eh er es et fi fj fk fm fo fr ga gb gd ge gf gg gh gi gl gm gn gp gq gr gs gt gu gw gy hk hm hn hr ht hu id ie il im in io iq ir is it je jm jo jp ke kg kh ki km kn kp kr kw ky kz la lb lc li lk lr ls lt lu lv ly ma mc md me mf mg mh mk ml mm mn mo mp mq mr ms mt mu mv mw mx my mz na nc ne nf ng ni nl no np nr nu nz om pa pe pf pg ph pk pl pm pn pr ps pt pw py qa re ro rs ru rw sa sb sc sd se sg sh si sj sk sl sm sn so sr ss st sv sx sy sz tc td tf tg th tj tk tl tm tn to tr tt tv tw tz ua ug um us uy uz va vc ve vg vi vn vu wf ws ye yt za zm zw'.split(' ');

function normalizeCountryName(value) {
  return String(value || '').trim().toLowerCase().replace(/^(علم|دوله|دولة)\s+/u, '').replace(/[إأآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي').replace(/[ًٌٍَُِّْـ]/g, '').replace(/\s+/g, ' ');
}

function countryCodeFor(value) {
  const raw = String(value || '').trim();
  if (/^[a-z]{2}$/i.test(raw)) return raw.toLowerCase();
  const normalized = normalizeCountryName(raw);
  const match = Object.entries(COUNTRY_CODES).find(([name]) => normalizeCountryName(name) === normalized);
  if (match) return match[1];
  try {
    const arabicNames = new Intl.DisplayNames(['ar'], { type: 'region' });
    const englishNames = new Intl.DisplayNames(['en'], { type: 'region' });
    return ALL_COUNTRY_CODES.find((code) => normalizeCountryName(arabicNames.of(code.toUpperCase())) === normalized || normalizeCountryName(englishNames.of(code.toUpperCase())) === normalized) || '';
  } catch (_) { return ''; }
}

function setActiveFlagSide(side) {
  flagState.activeSide = side === 'right' ? 'right' : 'left';
  $('selectLeftFlag').classList.toggle('active', flagState.activeSide === 'left');
  $('selectRightFlag').classList.toggle('active', flagState.activeSide === 'right');
  document.querySelectorAll('.flag-control-card').forEach((card) => card.classList.toggle('active-side', card.dataset.side === flagState.activeSide));
}

async function setFlagImage(side, source, label, objectUrl = '') {
  try {
    const image = typeof source === 'string' ? await loadImage(source) : source;
    if (!image?.naturalWidth) throw new Error('صورة غير صالحة');
    const target = flagState[side];
    if (target.objectUrl && target.objectUrl !== objectUrl) URL.revokeObjectURL(target.objectUrl);
    Object.assign(target, { image, label, objectUrl });
    $(`${side}FlagStatus`).textContent = label || 'تمت الإضافة';
    setActiveFlagSide(side === 'left' ? 'right' : 'left');
    scheduleRender();
    $('status').textContent = `تم تركيب ${side === 'left' ? 'العلم الأيسر' : 'العلم الأيمن'} مع تموّج القماش`;
    showToast(`تمت إضافة ${side === 'left' ? 'العلم الأيسر' : 'العلم الأيمن'}`);
  } catch (error) {
    console.error(error);
    showToast('تعذّر فتح صورة العلم');
  }
}

async function setFlagFile(side, file) {
  if (!file?.type?.startsWith('image/')) return showToast('اختر ملف صورة صالحاً');
  const objectUrl = URL.createObjectURL(file);
  const image = await loadImage(objectUrl);
  await setFlagImage(side, image, file.name, objectUrl);
}

async function loadCountryFlag(side) {
  const input = $(side === 'left' ? 'leftCountry' : 'rightCountry');
  const code = countryCodeFor(input.value);
  if (!code) return showToast('لم أتعرف إلى اسم الدولة — يمكنك كتابة رمزها من حرفين');
  const button = $(side === 'left' ? 'loadLeftCountry' : 'loadRightCountry');
  button.disabled = true;
  button.textContent = 'جارٍ التحميل…';
  try {
    const response = await fetch(`https://flagcdn.com/w1280/${code}.png`, { mode: 'cors' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    const image = await loadImage(objectUrl);
    await setFlagImage(side, image, input.value.trim() || code.toUpperCase(), objectUrl);
  } catch (error) {
    console.error(error);
    showToast('تعذّر تحميل العلم؛ استخدم اختيار صورة أو اللصق');
  } finally {
    button.disabled = false;
    button.textContent = 'تحديث العلم';
  }
}

const countryLoadTimers = { left: 0, right: 0 };

function queueCountryFlagLoad(side) {
  clearTimeout(countryLoadTimers[side]);
  const input = $(side === 'left' ? 'leftCountry' : 'rightCountry');
  if (!countryCodeFor(input.value)) return;
  countryLoadTimers[side] = setTimeout(() => loadCountryFlag(side), 450);
}

function flipFlags() {
  const leftFlag = flagState.left;
  flagState.left = flagState.right;
  flagState.right = leftFlag;
  const leftName = $('leftCountry').value;
  $('leftCountry').value = $('rightCountry').value;
  $('rightCountry').value = leftName;
  $('leftFlagStatus').textContent = flagState.left.label || 'بانتظار علم';
  $('rightFlagStatus').textContent = flagState.right.label || 'بانتظار علم';
  setActiveFlagSide(flagState.activeSide === 'left' ? 'right' : 'left');
  scheduleRender();
  $('status').textContent = 'تم قلب موضعي العلمين';
  showToast('تم قلب العلمين يميناً ويساراً');
}

async function ensureDefaultFlags() {
  if (flagState.defaultsLoaded) return;
  flagState.defaultsLoaded = true;
  $('leftCountry').value = 'السعودية';
  $('rightCountry').value = 'سوريا';
  await Promise.allSettled([loadCountryFlag('left'), loadCountryFlag('right')]);
  setActiveFlagSide('left');
}

function createExportCanvas(slide) {
  const exportCanvas = document.createElement('canvas');
  if (currentMode === 'flags') {
    exportCanvas.width = MODE_CONFIGS.flags.exportWidth;
    exportCanvas.height = MODE_CONFIGS.flags.exportHeight;
    const exportContext = exportCanvas.getContext('2d');
    exportContext.save();
    exportContext.scale(exportCanvas.width / WIDTH, exportCanvas.height / HEIGHT);
    renderTo(exportContext, slide, false);
    exportContext.restore();
  } else {
    exportCanvas.width = WIDTH; exportCanvas.height = HEIGHT;
    renderTo(exportCanvas.getContext('2d'), slide, false);
  }
  return exportCanvas;
}

function exportFileName(slide, index) {
  if (currentMode === 'flags') return 'sana-two-flags.png';
  const number = String(index + 1).padStart(2, '0');
  return `sana-${currentMode}-album-${number}${isCover(slide) ? '-cover' : ''}.png`;
}

function canvasToBlob(exportCanvas) {
  return new Promise((resolve, reject) => exportCanvas.toBlob((blob) => {
    if (blob) resolve(blob);
    else reject(new Error('تعذّر تجهيز ملف PNG'));
  }, 'image/png'));
}

function downloadCanvas(slide, index) {
  // Keep the download inside the original click event. Some hosted previews
  // require a live user gesture and reject a download after the asynchronous
  // canvas.toBlob() callback has run.
  const dataUrl = createExportCanvas(slide).toDataURL('image/png');
  if (!dataUrl.startsWith('data:image/png')) throw new Error('تعذّر تجهيز ملف PNG');

  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = exportFileName(slide, index);
  a.hidden = true;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

let crcTable;
function crc32(bytes) {
  if (!crcTable) {
    crcTable = Array.from({ length: 256 }, (_, index) => {
      let value = index;
      for (let bit = 0; bit < 8; bit++) value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
      return value >>> 0;
    });
  }
  let value = 0xffffffff;
  for (const byte of bytes) value = crcTable[(value ^ byte) & 0xff] ^ (value >>> 8);
  return (value ^ 0xffffffff) >>> 0;
}

function zipDateTime(date = new Date()) {
  const year = Math.max(1980, date.getFullYear());
  return {
    time: (date.getHours() << 11) | (date.getMinutes() << 5) | (date.getSeconds() >> 1),
    date: ((year - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate()
  };
}

function makeZipHeaders(nameBytes, bytes, offset) {
  const checksum = crc32(bytes);
  const stamp = zipDateTime();
  const local = new Uint8Array(30 + nameBytes.length);
  const localView = new DataView(local.buffer);
  localView.setUint32(0, 0x04034b50, true);
  localView.setUint16(4, 20, true);
  localView.setUint16(10, stamp.time, true);
  localView.setUint16(12, stamp.date, true);
  localView.setUint32(14, checksum, true);
  localView.setUint32(18, bytes.length, true);
  localView.setUint32(22, bytes.length, true);
  localView.setUint16(26, nameBytes.length, true);
  local.set(nameBytes, 30);

  const central = new Uint8Array(46 + nameBytes.length);
  const centralView = new DataView(central.buffer);
  centralView.setUint32(0, 0x02014b50, true);
  centralView.setUint16(4, 20, true);
  centralView.setUint16(6, 20, true);
  centralView.setUint16(12, stamp.time, true);
  centralView.setUint16(14, stamp.date, true);
  centralView.setUint32(16, checksum, true);
  centralView.setUint32(20, bytes.length, true);
  centralView.setUint32(24, bytes.length, true);
  centralView.setUint16(28, nameBytes.length, true);
  centralView.setUint32(42, offset, true);
  central.set(nameBytes, 46);
  return { local, central };
}

async function downloadAlbumZip() {
  const encoder = new TextEncoder();
  const localParts = [];
  const centralParts = [];
  let localSize = 0;

  for (let index = 0; index < slides.length; index++) {
    $('status').textContent = `جارٍ تجهيز الصورة ${index + 1} من ${slides.length}…`;
    const blob = await canvasToBlob(createExportCanvas(slides[index]));
    const bytes = new Uint8Array(await blob.arrayBuffer());
    const nameBytes = encoder.encode(exportFileName(slides[index], index));
    const { local, central } = makeZipHeaders(nameBytes, bytes, localSize);
    localParts.push(local, bytes);
    centralParts.push(central);
    localSize += local.length + bytes.length;
  }

  const centralSize = centralParts.reduce((total, part) => total + part.length, 0);
  const end = new Uint8Array(22);
  const endView = new DataView(end.buffer);
  endView.setUint32(0, 0x06054b50, true);
  endView.setUint16(8, slides.length, true);
  endView.setUint16(10, slides.length, true);
  endView.setUint32(12, centralSize, true);
  endView.setUint32(16, localSize, true);

  const zip = new Blob([...localParts, ...centralParts, end], { type: 'application/zip' });
  const url = URL.createObjectURL(zip);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `sana-${currentMode}-album.zip`;
  anchor.hidden = true;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}

function syncSettingsInputs() {
  $('title').value = settings.title;
  $('manualLines').checked = settings.manualLines;
  $('lineCount').value = String(settings.lineCount);
  $('justify').checked = settings.justify;
  ['concentration','position','fontSize','lineHeight','textWidth','textX','textY'].forEach((id) => {
    $(id).value = settings[id];
  });
  syncTitleLanguageControls();
}

function syncTitleLanguageControls() {
  const english = isEnglishAlbumText();
  const titleInput = $('title');
  $('toggleTitleLanguage').classList.toggle('active', english);
  $('toggleTitleLanguage').setAttribute('aria-pressed', String(english));
  $('toggleTitleLanguage').textContent = english ? '⇄ العربية / RTL' : '⇄ English / LTR';
  $('fontSizeLabel').childNodes[0].nodeValue = english ? 'حجم نص Noto ' : 'حجم خط غروب ';
  titleInput.dir = english ? 'ltr' : 'rtl';
  titleInput.classList.toggle('english-title', english);
}

function bindQuoteRange(id) {
  $(id).addEventListener('input', (event) => {
    if (currentMode !== 'quotes') return;
    (current() || currentQuoteDraft())[id] = Number(event.target.value);
    scheduleRender();
  });
}

function bindReporterRange(id) {
  $(id).addEventListener('input', (event) => {
    if (!current() || currentMode !== 'reporter') return;
    current()[id] = Number(event.target.value);
    scheduleRender();
  });
}

function saveCurrentModeState() {
  modeStates[currentMode] = {
    slides,
    selected,
    coverId,
    shade: currentModeShade(),
    blueShade: currentModeBlueShade(),
    quoteDraft: modeStates[currentMode].quoteDraft,
    settings: { ...settings }
  };
}

function switchMode(nextMode) {
  if (nextMode === currentMode || !MODE_CONFIGS[nextMode]) return;
  saveCurrentModeState();
  currentMode = nextMode;
  const config = MODE_CONFIGS[currentMode];
  const state = modeStates[currentMode];
  WIDTH = config.width;
  HEIGHT = config.height;
  slides = state.slides;
  selected = state.selected;
  coverId = state.coverId;
  Object.assign(settings, state.settings);

  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  $('dropZone').classList.toggle('facebook', currentMode === 'facebook');
  $('dropZone').classList.toggle('quotes', currentMode === 'quotes');
  $('dropZone').classList.toggle('reporter', currentMode === 'reporter');
  $('dropZone').classList.toggle('flags', currentMode === 'flags');
  document.body.classList.toggle('flags-mode', currentMode === 'flags');
  $('reference').src = config.reference;
  $('reference').hidden = true;
  canvas.hidden = false;
  $('referenceButton').textContent = 'عرض المرجع';
  $('editorTitle').textContent = config.editorTitle;
  const outputWidth = config.exportWidth || WIDTH;
  const outputHeight = config.exportHeight || HEIGHT;
  $('headerSize').textContent = `${outputWidth} × ${outputHeight}`;
  $('footerSize').textContent = `${outputWidth} × ${outputHeight}`;
  $('modeInstagram').classList.toggle('active', currentMode === 'instagram');
  $('modeFacebook').classList.toggle('active', currentMode === 'facebook');
  $('modeQuotes').classList.toggle('active', currentMode === 'quotes');
  $('modeReporter').classList.toggle('active', currentMode === 'reporter');
  if ($('modeFlags')) $('modeFlags').classList.toggle('active', currentMode === 'flags');
  document.title = `سانا | ${config.label}`;
  $('innerInfo').querySelector('.hint').textContent = currentMode === 'facebook'
    ? 'صورة كاملة مع شعار سانا والرابط والنقاط واسم الوكالة في مواضع قالب فيس.'
    : 'صورة مع شعار سانا والموقع والتدرّج السفلي وفق قالب إنستا.';
  syncSettingsInputs();
  syncControls();
  renderFilmstrip();
  render();
  if (currentMode === 'flags') ensureDefaultFlags();
  $('status').textContent = `جاهز — ${config.label} بمقاس ${outputWidth} × ${outputHeight}`;
  showToast(`تم فتح ${config.label}`);
}

function bindRange(id, key, slideSetting = false) {
  $(id).addEventListener('input', (event) => {
    const value = Number(event.target.value);
    if (slideSetting && current()) current()[key] = value;
    else settings[key] = value;
    scheduleRender();
  });
}

function bindShadeRange() {
  $('shade').addEventListener('input', (event) => {
    const value = Number(event.target.value);
    if (isAlbumMode()) setAlbumShade(value);
    else if (current()) current().shade = value;
    scheduleRender();
  });
}

function bindBlueShadeRange() {
  $('blueShade').addEventListener('input', (event) => {
    const value = Number(event.target.value);
    if (isAlbumMode()) setAlbumBlueShade(value);
    else if (currentMode === 'reporter' && current()) current().blueShade = value;
    else return;
    scheduleRender();
  });
}

function registerModelTools() {
  const modelContext = document.modelContext;
  if (!modelContext?.registerTool) return;
  try {
    modelContext.registerTool({
      name: 'set_cover_text',
      title: 'تعديل عنوان الغلاف',
      description: 'يغيّر عنوان غلاف ألبوم سانا الظاهر في المعاينة.',
      inputSchema: {
        type: 'object',
        properties: { title: { type: 'string', minLength: 1 } },
        required: ['title'],
        additionalProperties: false
      },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(input) {
        if (!input || typeof input.title !== 'string' || !input.title.trim()) throw new Error('العنوان مطلوب');
        settings.title = input.title.trim();
        $('title').value = settings.title;
        scheduleRender();
        return { title: settings.title, updated: true };
      }
    });
  } catch (_) {}
}

$('upload').addEventListener('change', (event) => { addFiles(event.target.files); event.target.value = ''; });
$('addImages').addEventListener('click', () => $('upload').click());
$('modeInstagram').addEventListener('click', () => switchMode('instagram'));
$('modeFacebook').addEventListener('click', () => switchMode('facebook'));
$('modeQuotes').addEventListener('click', () => switchMode('quotes'));
$('modeReporter').addEventListener('click', () => switchMode('reporter'));
if ($('modeFlags')) $('modeFlags').addEventListener('click', () => switchMode('flags'));
$('dropZone').addEventListener('click', () => {
  if (currentMode === 'flags') return;
  if (!slides.length) $('upload').click();
});
['dragenter','dragover'].forEach((type) => $('dropZone').addEventListener(type, (event) => { event.preventDefault(); $('dropZone').classList.add('dragging'); }));
['dragleave','drop'].forEach((type) => $('dropZone').addEventListener(type, (event) => { event.preventDefault(); $('dropZone').classList.remove('dragging'); }));
$('dropZone').addEventListener('drop', (event) => {
  if (currentMode === 'flags') {
    const file = [...event.dataTransfer.files].find((item) => item.type.startsWith('image/'));
    if (file) setFlagFile(flagState.activeSide, file);
  } else addFiles(event.dataTransfer.files);
});
document.addEventListener('paste', (event) => {
  const files = [...event.clipboardData.items].filter((item) => item.kind === 'file').map((item) => item.getAsFile()).filter(Boolean);
  if (!files.length) return;
  event.preventDefault();
  if (currentMode === 'flags') setFlagFile(flagState.activeSide, files[0]);
  else addFiles(files);
});

$('selectLeftFlag').addEventListener('click', () => setActiveFlagSide('left'));
$('selectRightFlag').addEventListener('click', () => setActiveFlagSide('right'));
$('flagLeftUpload').addEventListener('change', (event) => { if (event.target.files[0]) setFlagFile('left', event.target.files[0]); event.target.value = ''; });
$('flagRightUpload').addEventListener('change', (event) => { if (event.target.files[0]) setFlagFile('right', event.target.files[0]); event.target.value = ''; });
$('loadLeftCountry').addEventListener('click', () => loadCountryFlag('left'));
$('loadRightCountry').addEventListener('click', () => loadCountryFlag('right'));
$('leftCountry').addEventListener('keydown', (event) => { if (event.key === 'Enter') loadCountryFlag('left'); });
$('rightCountry').addEventListener('keydown', (event) => { if (event.key === 'Enter') loadCountryFlag('right'); });
$('leftCountry').addEventListener('input', () => queueCountryFlagLoad('left'));
$('rightCountry').addEventListener('input', () => queueCountryFlagLoad('right'));
$('flipFlags').addEventListener('click', flipFlags);
$('resetFlags').addEventListener('click', () => {
  ['left','right'].forEach((side) => {
    if (flagState[side].objectUrl) URL.revokeObjectURL(flagState[side].objectUrl);
    Object.assign(flagState[side], { image: null, label: '', objectUrl: '' });
    $(`${side}FlagStatus`).textContent = 'بانتظار علم';
  });
  $('leftCountry').value = '';
  $('rightCountry').value = '';
  flagState.defaultsLoaded = true;
  setActiveFlagSide('left');
  scheduleRender();
  showToast('تم تفريغ العلمين');
});

bindRange('zoom', 'zoom', true); bindRange('panX', 'panX', true); bindRange('panY', 'panY', true); bindShadeRange(); bindBlueShadeRange();
bindRange('concentration', 'concentration'); bindRange('position', 'position'); bindRange('fontSize', 'fontSize'); bindRange('lineHeight', 'lineHeight'); bindRange('textWidth', 'textWidth'); bindRange('textX', 'textX'); bindRange('textY', 'textY');
['quoteFont','quoteLineHeight','quoteY','nameFont','jobFont','nameY','quoteConcentration','quotePosition'].forEach(bindQuoteRange);
['reporterFont','reporterLineHeight','reporterY'].forEach(bindReporterRange);
$('title').addEventListener('input', (event) => {
  const text = isEnglishAlbumText() ? event.target.value : removeLamAlefKashidas(event.target.value);
  if (text !== event.target.value) event.target.value = text;
  settings.title = text;
  scheduleRender();
});
$('quoteText').addEventListener('input', (event) => {
  if (currentMode !== 'quotes') return;
  const text = removeLamAlefKashidas(event.target.value);
  if (text !== event.target.value) event.target.value = text;
  (current() || currentQuoteDraft()).quoteText = text;
  scheduleRender();
});
$('personName').addEventListener('input', (event) => {
  if (currentMode !== 'quotes') return;
  (current() || currentQuoteDraft()).personName = event.target.value;
  scheduleRender();
});
$('jobTitle').addEventListener('input', (event) => {
  if (currentMode !== 'quotes') return;
  (current() || currentQuoteDraft()).jobTitle = event.target.value;
  scheduleRender();
});
$('quoteKashida').addEventListener('change', (event) => {
  if (currentMode !== 'quotes') return;
  (current() || currentQuoteDraft()).quoteKashida = event.target.checked;
  scheduleRender();
});
$('quoteInsertKashida').addEventListener('click', () => {
  if (currentMode !== 'quotes') return;
  const input = $('quoteText');
  if (!insertKashidaAtCursor(input)) return;
  (current() || currentQuoteDraft()).quoteText = input.value;
  input.focus();
  scheduleRender();
});
$('quoteReshuffle').addEventListener('click', () => {
  if (currentMode !== 'quotes') return;
  const source = current() || currentQuoteDraft();
  source.quoteKashidaSeed = (Number(source.quoteKashidaSeed) || 0) + 1;
  source.quoteKashida = true;
  $('quoteKashida').checked = true;
  scheduleRender();
  showToast('تمت إعادة توزيع كشائد التصريح');
});
$('reporterTitle').addEventListener('input', (event) => {
  if (currentMode !== 'reporter' || !current()) return;
  const text = removeLamAlefKashidas(event.target.value);
  if (text !== event.target.value) event.target.value = text;
  current().reporterTitle = text;
  scheduleRender();
});
$('reporterManualLines').addEventListener('change', (event) => {
  if (currentMode !== 'reporter' || !current()) return;
  current().reporterManualLines = event.target.checked;
  scheduleRender();
});
$('reporterJustify').addEventListener('change', (event) => {
  if (currentMode !== 'reporter' || !current()) return;
  current().reporterJustify = event.target.checked;
  scheduleRender();
});
$('reporterInsertKashida').addEventListener('click', () => {
  if (currentMode !== 'reporter' || !current()) return;
  const input = $('reporterTitle');
  if (!insertKashidaAtCursor(input)) return;
  current().reporterTitle = input.value;
  input.focus();
  scheduleRender();
});
$('manualLines').addEventListener('change', (event) => { settings.manualLines = event.target.checked; scheduleRender(); });
$('lineCount').addEventListener('change', (event) => { settings.lineCount = Number(event.target.value); scheduleRender(); });
$('justify').addEventListener('change', (event) => { settings.justify = event.target.checked; scheduleRender(); });
$('fill').addEventListener('click', () => { current().fit = 'cover'; current().zoom = Math.max(1, current().zoom); syncControls(); scheduleRender(); });
$('contain').addEventListener('click', () => { current().fit = 'contain'; current().zoom = Math.max(1, current().zoom); syncControls(); scheduleRender(); });
$('resetImage').addEventListener('click', () => {
  const imageReset = { zoom:1, panX:0, panY:0, fit:'cover' };
  if (!isAlbumMode()) imageReset.shade = isCover() ? MODE_CONFIGS[currentMode].coverShade : MODE_CONFIGS[currentMode].innerShade;
  Object.assign(current(), imageReset);
  syncControls(); scheduleRender();
});
$('insertKashida').addEventListener('click', () => {
  if (isEnglishAlbumText()) return;
  const input = $('title');
  if (!insertKashidaAtCursor(input)) return;
  settings.title = input.value; input.focus(); scheduleRender();
});
$('reshuffle').addEventListener('click', () => {
  if (isEnglishAlbumText()) return;
  settings.concentration = (settings.concentration + 17) % 101;
  $('concentration').value = settings.concentration;
  scheduleRender();
  showToast('تم تحديث توزيع الكشائد');
});
$('toggleTitleLanguage').addEventListener('click', () => {
  if (!isAlbumMode()) return;
  settings.language = isEnglishAlbumText() ? 'ar' : 'en';
  syncControls();
  scheduleRender();
  showToast(settings.language === 'en' ? 'تم تفعيل تنسيق English / LTR' : 'تمت العودة إلى تنسيق العربية / RTL');
});
$('setCover').addEventListener('click', () => {
  const oldCover = slides.find((slide) => slide.id === coverId);
  if (oldCover && !isAlbumMode()) oldCover.shade = MODE_CONFIGS[currentMode].innerShade;
  if (oldCover && isAlbumMode()) oldCover.blueShade = 0;
  coverId = current().id;
  current().shade = isAlbumMode() ? currentModeShade() : MODE_CONFIGS[currentMode].coverShade;
  if (isAlbumMode()) current().blueShade = currentModeBlueShade();
  syncControls(); renderFilmstrip(); scheduleRender(); showToast('تم تعيين صورة الغلاف');
});
$('deleteSlide').addEventListener('click', () => {
  if (!current()) return;
  const removed = slides.splice(selected, 1)[0];
  if (removed.image?.src.startsWith('blob:')) URL.revokeObjectURL(removed.image.src);
  if (removed.id === coverId) {
    coverId = slides[0]?.id || null;
    if (slides[0]) {
      slides[0].shade = isAlbumMode() ? currentModeShade() : MODE_CONFIGS[currentMode].coverShade;
      if (isAlbumMode()) slides[0].blueShade = currentModeBlueShade();
    }
  }
  selected = Math.max(0, Math.min(selected, slides.length - 1));
  syncControls(); renderFilmstrip(); scheduleRender(); showToast('تم حذف الصورة');
});
$('exportOne').addEventListener('click', () => {
  try {
    downloadCanvas(current(), selected);
    showToast('تم تصدير الصورة');
  } catch (error) {
    console.error(error);
    showToast('تعذّر تنزيل الصورة');
  }
});
$('exportAll').addEventListener('click', async () => {
  const button = $('exportAll');
  button.disabled = true;
  button.textContent = 'جارٍ تجهيز الألبوم…';
  try {
    await downloadAlbumZip();
    $('status').textContent = `تم تنزيل الألبوم كاملاً — ${slides.length} ${slides.length === 1 ? 'صورة' : 'صور'}`;
    showToast('تم تنزيل الألبوم كاملاً');
  } catch (error) {
    console.error(error);
    $('status').textContent = `تعذّر تنزيل الألبوم: ${error?.message || 'خطأ غير معروف'}`;
    showToast('تعذّر تنزيل الألبوم');
  } finally {
    button.disabled = !slides.length;
    button.textContent = '↓ تنزيل الألبوم كاملاً';
  }
});
$('referenceButton').addEventListener('click', () => {
  const willShowReference = $('reference').hidden;
  $('reference').hidden = !willShowReference;
  canvas.hidden = willShowReference;
  $('referenceButton').textContent = willShowReference ? 'عودة للمعاينة' : 'عرض المرجع';
});

function settleWithin(promise, milliseconds) {
  return Promise.race([
    promise,
    new Promise((resolve) => window.setTimeout(resolve, milliseconds))
  ]);
}

async function init() {
  // Some browsers keep `document.fonts.load()` pending indefinitely when a
  // local font is slow or unavailable.  Never let that prevent the album or
  // its permanent Essentials from rendering.
  try {
    await settleWithin(Promise.all([
      document.fonts.load('78px GhroobBoldRound'),
      document.fonts.load('31px GhroobRegular'),
      document.fonts.load('800 78px NotoSansCondensedExtraBold')
    ]), 1600);
  } catch (_) {}
  await Promise.all([sanaBadge, brandLayout, sanaLogo, albumEssentials, albumGradientTop, albumGradientLeft, albumGradientRight, facebookBrandLayout, facebookCoverOverlay, quoteLogo, quoteDot, quotesEssential, quotesLeftShade, quotesPanelClean, quotesGlowWide, quotesGlowLine, reporterEssential, reporterBadge, flagsMockupBlank, flagLeftMask, flagRightMask, flagLeftCutMask, flagRightCutMask].map((image) => settleWithin(new Promise((resolve) => {
    if (image.complete) resolve(); else { image.onload = resolve; image.onerror = resolve; }
  }), 4000)));
  prepareBrandLayout();
  prepareAlbumEssentials();
  syncSettingsInputs();
  syncControls(); renderFilmstrip(); render();
  registerModelTools();
  $('status').textContent = 'جاهز — أضف صورك من الزر أو بالسحب أو اللصق';
}
init();
