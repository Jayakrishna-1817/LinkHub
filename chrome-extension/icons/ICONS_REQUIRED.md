# ⚠️ IMPORTANT: Icon Files Required

Before loading this extension in Chrome, you MUST create icon files.

## Quick Method (Recommended)

1. Open `icon-generator.html` in your browser
2. Click "Download All Icons"
3. Move the 4 downloaded PNG files to the `icons/` folder
4. Done!

## Alternative Methods

### Option 1: Use Favicon.io
1. Go to: https://favicon.io/favicon-generator/
2. Configure:
   - Text: 🔖
   - Background: Rounded
   - Font: Bold
   - Colors: #667eea (purple)
3. Download ZIP
4. Extract and rename to: icon16.png, icon32.png, icon48.png, icon128.png
5. Place in `icons/` folder

### Option 2: Use Any Bookmark Icon
1. Find a bookmark icon online (PNG format)
2. Resize to 4 sizes: 16x16, 32x32, 48x48, 128x128
3. Name them: icon16.png, icon32.png, icon48.png, icon128.png
4. Place in `icons/` folder

### Option 3: Simple Colored Squares (Quick Test)
Create 4 simple PNG files in any image editor:
- 16x16 purple square → icon16.png
- 32x32 purple square → icon32.png
- 48x48 purple square → icon48.png
- 128x128 purple square → icon128.png

## Verify Icons Are Ready

The `icons/` folder should contain:
```
icons/
  ├── icon16.png
  ├── icon32.png
  ├── icon48.png
  └── icon128.png
```

## Then Load the Extension

1. Open Chrome: chrome://extensions/
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select this chrome-extension folder
5. Extension loads successfully! ✓

---

**Without icons, Chrome will show an error when loading the extension.**
