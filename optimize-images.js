// Optimizes images in-place: same filename, same extension, same folder.
// Only recompresses + downsizes to the max on-page display size (x2 for retina).
// Does NOT change format or filename.
// NOTE: this overwrites the source files directly, so back up images/ before
// re-running this on new/updated photos, and only run it once per new batch of images.
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const IMAGES_DIR = path.join(__dirname, 'images');

// Max display width (CSS px) found across all pages for each image, from the width="" attrs
// scraped out of the HTML. We double it for retina, then never upscale past the original.
const displayWidths = {
  'images/Galeri/FE725178-381C-4D25-AFC9-DF46DC336506.jpg': 600,
  'images/Galeri/GGJNext/ggjnext-1.jpeg': 600,
  'images/Galeri/GGJNext/ggjnext-2.jpeg': 600,
  'images/Galeri/SnowyJam/snowyjam-1.jpeg': 600,
  'images/Galeri/SnowyJam/snowyjam-2.jpeg': 600,
  'images/Galeri/SnowyJam/snowyjam-3.jpeg': 600,
  'images/Galeri/SnowyJam/snowyjam-4.jpeg': 600,
  'images/Galeri/SnowyJam/snowyjam-5.jpeg': 600,
  'images/Galeri/SnowyJam/snowyjam-6.jpeg': 600,
  'images/PUBG_Mobile_Black_Logo.png': 160,
  'images/Sponsorlar/games_for_change_turkiye.jpg': 160,
  'images/Sponsorlar/gaming_istanbul_logo.jpg': 160,
  'images/Sponsorlar/igdaizmir_logo.jpg': 160,
  'images/Sponsorlar/neotroygameslogo.jpeg': 160,
  'images/balgamedev.jpg': 80,
  'images/bufalo-gamedev.jpeg': 80,
  'images/cicekli-gamedev.jpeg': 80,
  'images/ckal-gamedev.jpeg': 80,
  'images/ggj-logo.jpg': 160,
  'images/godot-logo.jpg': 360,
  'images/ial-gamedev.jpeg': 80,
  'images/ifl-gamedev.jpeg': 80,
  'images/logd-grup-fotografi.jpeg': 800,
  'images/logd.jpeg': 800,
  'images/mahzar-gamedev.jpeg': 80,
  'images/numtal-gamedev.jpeg': 80,
  'images/pubgcs.jpeg': 160,
  'images/solyukarilogo.jpeg': 40,
  'images/yeal-pog.jpeg': 80,
};

const RETINA_FACTOR = 2;
// Fallback for images not referenced with explicit width/height (community logos, sponsor
// logos, other galleries etc.) — cap to a sensible max since none of these need to be huge.
const FALLBACK_MAX_WIDTH = 900;

const JPEG_QUALITY = 80;
const WEBP_QUALITY = 80;
const PNG_COMPRESSION_LEVEL = 9;

function collectImages(dir, base = '') {
  const out = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    const rel = path.join(base, entry.name).replace(/\\/g, '/');
    if (entry.isDirectory()) {
      out.push(...collectImages(full, rel));
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
        out.push(rel);
      }
    }
  }
  return out;
}

async function optimizeOne(relPath) {
  const fullPath = path.join(__dirname, relPath);
  const key = relPath; // relative to project root, matches displayWidths keys ('images/...')
  const before = fs.statSync(fullPath).size;

  const probe = sharp(fullPath, { failOn: 'none' });
  const meta = await probe.metadata();
  const ext = path.extname(relPath).toLowerCase();

  // Some files are saved with a misleading extension (e.g. a transparent PNG-style image
  // saved as .jpeg). JPEG has no alpha channel, so encoding an alpha image as JPEG turns
  // transparency into solid black. Detect real transparency and always keep it as PNG
  // output regardless of the file's extension.
  const hasAlpha = !!meta.hasAlpha;

  const targetDisplayWidth = displayWidths[key];
  let targetWidth = targetDisplayWidth
    ? targetDisplayWidth * RETINA_FACTOR
    : FALLBACK_MAX_WIDTH;

  // Never upscale
  if (meta.width && targetWidth > meta.width) {
    targetWidth = meta.width;
  }

  let pipeline = sharp(fullPath, { failOn: 'none' }).rotate(); // auto-orient using EXIF, then strip it

  if (meta.width && targetWidth < meta.width) {
    pipeline = pipeline.resize({ width: targetWidth, withoutEnlargement: true });
  }

  if (hasAlpha) {
    // Preserve transparency no matter what the extension says.
    pipeline = pipeline.png({ compressionLevel: PNG_COMPRESSION_LEVEL, palette: true });
  } else if (ext === '.jpg' || ext === '.jpeg') {
    pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true, progressive: true });
  } else if (ext === '.png') {
    pipeline = pipeline.png({ compressionLevel: PNG_COMPRESSION_LEVEL, palette: true });
  } else if (ext === '.webp') {
    pipeline = pipeline.webp({ quality: WEBP_QUALITY });
  }

  const buffer = await pipeline.toBuffer();

  // Only overwrite if we actually saved space (avoid making things worse on tiny/simple files)
  if (buffer.length < before) {
    fs.writeFileSync(fullPath, buffer);
    return { relPath, before, after: buffer.length, changed: true, hadAlphaFix: hasAlpha && ext !== '.png' };
  }
  return { relPath, before, after: before, changed: false, hadAlphaFix: false };
}

async function main() {
  const images = collectImages(IMAGES_DIR, 'images');
  let totalBefore = 0;
  let totalAfter = 0;
  const results = [];

  for (const rel of images) {
    try {
      const r = await optimizeOne(rel);
      totalBefore += r.before;
      totalAfter += r.after;
      results.push(r);
      const savedPct = r.before ? (100 * (1 - r.after / r.before)).toFixed(0) : 0;
      console.log(
        `${r.changed ? 'OK  ' : 'SKIP'} ${rel}  ${(r.before / 1024).toFixed(0)}KB -> ${(r.after / 1024).toFixed(0)}KB (${savedPct}%)${r.hadAlphaFix ? '  [kept as PNG-encoded, transparency preserved]' : ''}`
      );
    } catch (e) {
      console.warn(`FAIL ${rel}: ${e.message}`);
    }
  }

  console.log('\n--- Summary ---');
  console.log(`Total before: ${(totalBefore / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total after:  ${(totalAfter / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Saved:        ${((1 - totalAfter / totalBefore) * 100).toFixed(1)}%`);
}

main();
