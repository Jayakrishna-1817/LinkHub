# 🔧 Troubleshooting Guide

## Common Issues & Solutions

### 🚫 Issue 1: Extension Won't Load

#### Symptoms
- Error message when loading extension
- "Manifest file is missing or unreadable"
- "Could not load icons"

#### Solutions

**A. Check Icon Files**
```
Verify icons/ folder has:
✓ icon16.png
✓ icon32.png
✓ icon48.png
✓ icon128.png

Missing icons? → Open icon-generator.html and download them
```

**B. Check File Structure**
```
chrome-extension/
├── manifest.json       ← Must exist
├── background.js       ← Must exist
├── classifier.js       ← Must exist
├── popup.html          ← Must exist
└── icons/              ← Must have all 4 PNGs
```

**C. Reload Extension**
1. Go to chrome://extensions/
2. Find "Smart Bookmark Organizer"
3. Click reload icon (🔄)
4. Check for error messages

---

### 📌 Issue 2: Bookmarks Not Being Organized

#### Symptoms
- Bookmark stays in original location
- No folders created
- No notification shown

#### Diagnosis Steps

**Step 1: Check Auto-Organize is ON**
```
1. Click extension icon
2. Check toggle: "Auto-organize new bookmarks"
3. Should be enabled (blue/purple)
```

**Step 2: Check Service Worker**
```
1. chrome://extensions/
2. Find extension → Click "Details"
3. Look for "Service worker" status
4. Should say "active"
5. If "inactive", click to activate
```

**Step 3: Check Console Logs**
```
1. chrome://extensions/
2. Details → "Inspect views: service worker"
3. Bookmark a site
4. Look for logs:
   "📌 New bookmark detected"
   "🎯 Classification: ..."
   "✅ Bookmark organized successfully!"

If no logs appear → Service worker not running
```

#### Solutions

**Solution A: Restart Service Worker**
```
1. chrome://extensions/
2. Find extension
3. Click reload icon
4. Try bookmarking again
```

**Solution B: Check Permissions**
```
1. chrome://extensions/
2. Details → "Permissions"
3. Should have:
   ✓ Read and change your bookmarks
   ✓ Read your browsing history
```

**Solution C: Re-install Extension**
```
1. Remove extension
2. Close Chrome completely
3. Reopen Chrome
4. Load extension again
```

---

### ❌ Issue 3: Wrong Category Assignment

#### Symptoms
- YouTube videos go to Technology instead of Entertainment
- GitHub repos go to Entertainment
- Ambiguous categorization

#### Why This Happens
```
Some URLs can match multiple categories:
- youtube.com/react-tutorial
  → Could be Entertainment (YouTube)
  → Could be Technology (React)

Extension uses keyword scoring:
- More specific keywords win
- "react" keyword (13 chars) > "youtube" (7 chars)
- Result: Technology → React
```

#### Solutions

**Solution A: Enable Page Content Analysis**
```
1. Click extension icon → Settings
2. Enable "Use page content for classification"
3. Slower but more accurate
```

**Solution B: Adjust Organization Mode**
```
Settings → Folder Settings → Organization Mode
- Hierarchical: Main → Sub folders (default)
- Flat: Single category folder
- Source-based: Organized by website (YouTube, GitHub, etc.)
```

**Solution C: Manual Override**
```
1. Simply drag bookmark to preferred folder
2. Extension won't move it again
3. Your preference is respected
```

---

### 🔔 Issue 4: No Notifications Appearing

#### Symptoms
- Bookmarks get organized
- But no notification shown

#### Solutions

**Check Extension Settings**
```
1. Click extension icon
2. Toggle: "Show notifications" → ON
```

**Check Chrome Notifications**
```
1. chrome://settings/content/notifications
2. Make sure notifications are allowed
3. Check if Chrome extensions are blocked
```

**Check OS Notifications**
```
Windows:
- Settings → System → Notifications
- Allow Chrome notifications

Mac:
- System Preferences → Notifications
- Allow Chrome notifications
```

---

### 📁 Issue 5: Too Many Folders Created

#### Symptoms
- Dozens of category folders
- Cluttered bookmarks bar
- Hard to navigate

#### Solutions

**Disable Unused Categories**
```
1. Settings → Categories section
2. Uncheck categories you don't use
3. Example: Disable "Pets & Animals" if you never bookmark pet sites
```

**Change Organization Mode**
```
Settings → Organization Mode → "Flat"
- Creates fewer parent folders
- Simpler structure
```

**Manual Cleanup**
```
1. Delete empty folders
2. Merge similar folders
3. Extension won't recreate deleted folders
```

---

### ⚠️ Issue 6: Extension Slows Down Bookmarking

#### Symptoms
- Delay after pressing Ctrl+D
- Browser feels sluggish
- CPU usage high

#### Solutions

**Disable Page Content Analysis**
```
Settings → "Use page content for classification" → OFF
- Much faster
- Still 90% accurate
```

**Reduce Active Tabs**
```
- Extension analyzes active tab
- Fewer tabs = faster processing
```

**Check Other Extensions**
```
- Disable other bookmark extensions
- Check for conflicts
```

---

### 🔍 Issue 7: Can't Find Organized Bookmarks

#### Symptoms
- Bookmarks disappeared
- Can't locate folders
- Confusion about structure

#### Where to Look

**Bookmarks Bar**
```
1. Press Ctrl+Shift+B to show/hide bookmarks bar
2. Look for category folders (📱, 💻, 🎬, etc.)
3. Expand folders to see subfolders
```

**Bookmark Manager**
```
1. Press Ctrl+Shift+O (or Cmd+Shift+O on Mac)
2. Opens full bookmark manager
3. Browse all folders
```

**Search Bookmarks**
```
1. Bookmark manager (Ctrl+Shift+O)
2. Use search box at top
3. Find by name, URL, or folder
```

---

### 🔄 Issue 8: "Organize All Existing" Fails

#### Symptoms
- Click button
- Shows "Organizing..."
- Gets stuck or shows error

#### Solutions

**Too Many Bookmarks**
```
If you have 1000+ bookmarks:
1. Extension may time out
2. Organize in batches:
   - Manually select 100-200 bookmarks
   - Move to a temp folder
   - Use extension to organize them
   - Repeat
```

**Corrupted Bookmarks**
```
Some bookmarks may have invalid data:
1. Check browser console for errors
2. Look for bookmarks with missing URLs
3. Delete problematic bookmarks
4. Try again
```

**Service Worker Timeout**
```
1. Chrome may stop the service worker
2. Reload extension
3. Try smaller batches
```

---

### 💾 Issue 9: Settings Not Saving

#### Symptoms
- Change settings
- Settings reset after restart
- Preferences not persisting

#### Solutions

**Check Storage Permissions**
```
1. chrome://extensions/
2. Details → Permissions
3. Verify "storage" permission is granted
```

**Clear Extension Storage**
```
1. Settings → Reset to Defaults
2. Set preferences again
3. Test with browser restart
```

**Browser Sync Issues**
```
If using Chrome sync:
1. chrome://settings/syncSetup
2. Make sure "Settings" is syncing
3. Sign out and back in
```

---

### 🎯 Issue 10: Duplicate Folders Created

#### Symptoms
- Multiple "Social Media" folders
- Same category appears twice
- Confusing structure

#### Why This Happens
```
Usually due to:
- Manual folder creation before using extension
- Different folder names (case sensitive)
- Special characters in names
```

#### Solutions

**Clean Up Manually**
```
1. Open bookmark manager
2. Identify duplicate folders
3. Move bookmarks from one to other
4. Delete empty duplicate
```

**Let Extension Recreate**
```
1. Delete ALL category folders
2. Click "Organize All Existing Bookmarks"
3. Extension creates clean structure
```

---

## 🆘 Emergency Reset

If nothing works, try this:

### Complete Reset Procedure

```
1. BACKUP your bookmarks first!
   - chrome://bookmarks/
   - Three dots → "Export bookmarks"
   - Save HTML file

2. Remove Extension
   - chrome://extensions/
   - Remove "Smart Bookmark Organizer"

3. Clean Chrome Cache
   - chrome://settings/clearBrowserData
   - Clear "Cached images and files"

4. Restart Chrome Completely
   - Close all Chrome windows
   - Wait 10 seconds
   - Reopen Chrome

5. Reinstall Extension
   - Load unpacked from folder
   - Configure settings
   - Test with one bookmark

6. Import Bookmarks (if needed)
   - chrome://bookmarks/
   - Three dots → "Import bookmarks"
```

---

## 🔍 Advanced Debugging

### Enable Detailed Logging

**Method 1: Console Logs**
```javascript
// In background.js, all logs are visible
1. chrome://extensions/
2. Details → Service worker → Inspect
3. Console tab shows all activity
```

**Method 2: Network Tab**
```
If using page content analysis:
1. Service worker inspector
2. Network tab
3. See page fetch requests
```

**Method 3: Storage Inspector**
```
Check saved data:
1. Service worker inspector
2. Application tab
3. Storage → Extension Storage
4. See stats and settings
```

---

## 📊 Performance Optimization

### If Extension is Slow

**Optimize Settings**
```
✓ Disable page content analysis
✓ Reduce enabled categories
✓ Use "Flat" organization mode
✓ Disable notifications
```

**Browser Optimization**
```
✓ Close unused tabs
✓ Disable other bookmark extensions
✓ Clear browser cache
✓ Update Chrome to latest version
```

---

## 🤝 Get Help

### Before Asking for Help

Gather this information:
```
1. Chrome version: chrome://version/
2. Extension version: 1.0.0
3. Number of bookmarks: ~X
4. Error messages: [screenshot]
5. Console logs: [copy text]
6. Steps to reproduce: [detailed list]
```

### Where to Get Help
1. Check README.md for documentation
2. Review HOW_IT_WORKS.md for understanding
3. Open issue on GitHub
4. Email support with details above

---

## ✅ Prevention Checklist

Avoid issues by:
```
□ Keep Chrome updated
□ Regular extension updates
□ Export bookmarks monthly (backup)
□ Don't modify organized folders manually
□ Let extension handle organization
□ Review settings periodically
□ Check console logs occasionally
□ Monitor performance
```

---

**Most issues are easily fixed! Don't give up! 💪**
