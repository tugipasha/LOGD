const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Create dist directory
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Function to get hash of file content
function getFileHash(filePath) {
  const content = fs.readFileSync(filePath);
  return crypto.createHash('md5').update(content).digest('hex').slice(0, 8);
}

// Process static assets (CSS, JS, images)
const assets = [
  { src: 'css/style.css', destDir: 'css' },
  { src: 'js/script.js', destDir: 'js' }
];

// Process all images
const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.heic'];
function collectImages(dir, base = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.join(base, entry.name).replace(/\\/g, '/');
    if (entry.isDirectory()) {
      collectImages(fullPath, relPath);
    } else if (imageExtensions.includes(path.extname(entry.name).toLowerCase())) {
      assets.push({ src: relPath, destDir: path.dirname(relPath) });
    }
  }
}
collectImages(path.join(__dirname, 'images'), 'images');

// Map of original paths to hashed paths
const assetMap = {};

// Copy and hash assets
for (const asset of assets) {
  const srcPath = path.join(__dirname, asset.src);
  const ext = path.extname(asset.src);
  const baseName = path.basename(asset.src, ext);
  const hash = getFileHash(srcPath);
  const hashedName = `${baseName}.${hash}${ext}`;
  const destRelPath = path.join(asset.destDir, hashedName).replace(/\\/g, '/');
  const destPath = path.join(distDir, destRelPath);
  
  const destDirPath = path.dirname(destPath);
  if (!fs.existsSync(destDirPath)) {
    fs.mkdirSync(destDirPath, { recursive: true });
  }
  
  fs.copyFileSync(srcPath, destPath);
  assetMap[asset.src] = destRelPath;
  console.log(`Copied ${asset.src} → ${destRelPath}`);
}

// Copy HTML files and replace asset references
const htmlFiles = ['index.html', 'hakkimizda.html', 'etkinlikler.html', 'galeri.html', 'haberler.html', 'iletisim.html', 'showcase.html'];
for (const htmlFile of htmlFiles) {
  let content = fs.readFileSync(path.join(__dirname, htmlFile), 'utf8');
  
  // Replace asset references
  for (const [original, hashed] of Object.entries(assetMap)) {
    content = content.replace(new RegExp(original, 'g'), hashed);
  }
  
  fs.writeFileSync(path.join(distDir, htmlFile), content, 'utf8');
  console.log(`Processed ${htmlFile}`);
}

// Copy other static files
const otherStaticFiles = ['robots.txt', 'sitemap.xml', 'CNAME'];
for (const file of otherStaticFiles) {
  const srcPath = path.join(__dirname, file);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, path.join(distDir, file));
    console.log(`Copied ${file}`);
  }
}

// Create hosting configuration files

// 1. Netlify (_headers file)
const netlifyHeaders = `
/*
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  X-Content-Type-Options: nosniff

/css/*
  Cache-Control: public, max-age=31536000, immutable
/js/*
  Cache-Control: public, max-age=31536000, immutable
/images/*
  Cache-Control: public, max-age=31536000, immutable
*.html
  Cache-Control: public, max-age=0, must-revalidate
`;
fs.writeFileSync(path.join(distDir, '_headers'), netlifyHeaders.trim(), 'utf8');
console.log('Created _headers (Netlify)');

// 2. Vercel (vercel.json)
const vercelConfig = {
  headers: [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-XSS-Protection', value: '1; mode=block' },
        { key: 'X-Content-Type-Options', value: 'nosniff' }
      ]
    },
    {
      source: '/css/(.*)',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
      ]
    },
    {
      source: '/js/(.*)',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
      ]
    },
    {
      source: '/images/(.*)',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
      ]
    },
    {
      source: '/(.*)\\.html',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' }
      ]
    }
  ]
};
fs.writeFileSync(path.join(distDir, 'vercel.json'), JSON.stringify(vercelConfig, null, 2), 'utf8');
console.log('Created vercel.json');

// 3. Apache (.htaccess)
const htaccess = `
# Enable mod_rewrite
RewriteEngine On

# Security headers
<IfModule mod_headers.c>
  Header always set X-Frame-Options "DENY"
  Header always set X-XSS-Protection "1; mode=block"
  Header always set X-Content-Type-Options "nosniff"
</IfModule>

# Cache configuration
<IfModule mod_expires.c>
  ExpiresActive On
  
  # HTML: No cache
  ExpiresByType text/html "access plus 0 seconds"
  
  # CSS, JS, images: 1 year
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  
  # Default
  ExpiresDefault "access plus 0 seconds"
</IfModule>

<IfModule mod_headers.c>
  # HTML: Must revalidate
  <FilesMatch "\\.html$">
    Header set Cache-Control "public, max-age=0, must-revalidate"
  </FilesMatch>
  
  # Hashed assets: Immutable
  <FilesMatch "\\.[0-9a-f]{8}\\.(css|js|jpg|jpeg|png|gif|webp|svg|heic)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
</IfModule>
`;
fs.writeFileSync(path.join(distDir, '.htaccess'), htaccess.trim(), 'utf8');
console.log('Created .htaccess (Apache)');

console.log('\nBuild complete! Output in dist/');
