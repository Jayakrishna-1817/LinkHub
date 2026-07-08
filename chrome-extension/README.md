# 🔖 Smart Bookmark Organizer - Chrome Extension

An intelligent Chrome extension that automatically organizes your bookmarks into hierarchical folders using AI-powered categorization. Based on the LinkHub ML classifier.

## ✨ Features

### 🤖 Automatic Organization
- **Real-time Classification**: When you bookmark a site, it's instantly analyzed and categorized
- **Hierarchical Structure**: Creates Main Folder → Sub-folder hierarchy
  - Example: Instagram → `Social Media` → `Instagram`
  - Example: YouTube React Tutorial → `Entertainment` → `YouTube` or `Technology` → `React`
- **50+ Categories**: Including Technology, Social Media, Shopping, Entertainment, Education, and more
- **Smart Sub-categorization**: Automatically creates sub-folders based on specific platforms or topics

### 📂 Supported Categories

#### Social Media
- Facebook, Instagram, Twitter/X, LinkedIn, Reddit, TikTok, Pinterest, Discord

#### Technology
- GitHub, Stack Overflow, React, JavaScript, Python, Java, DevOps, Web Development

#### Entertainment
- YouTube, Netflix, Twitch, Spotify, Movies, Music, Gaming

#### Shopping
- Amazon, eBay, Etsy, Fashion stores

#### Education
- Online courses (Coursera, Udemy, edX), Documentation, Tutorials

#### Productivity
- Google Workspace, Project Management, Communication tools

#### Finance
- Banking, Cryptocurrency, Investment platforms

#### Health & Fitness
- Fitness, Nutrition, Medical resources

#### Travel
- Booking sites, Flight info, Reviews

And many more!

### ⚙️ Customization
- Toggle auto-organization on/off
- Enable/disable notifications
- Choose organization modes (hierarchical, flat, source-based)
- Select bookmark location (Bookmarks Bar or Other Bookmarks)
- Enable/disable specific categories
- Use page content analysis for better accuracy

### 📊 Statistics & Insights
- Track total bookmarks organized
- See most-used categories
- Monitor folder creation
- Export/import settings
- Reset statistics

## 🚀 Installation

### From Chrome Web Store (Recommended)
*Coming soon*

### Manual Installation (Developer Mode)

1. **Download the Extension**
   ```bash
   # The extension files are in: chrome-extension/
   ```

2. **Create Icons** (Required before loading)
   - Create PNG icons in sizes: 16x16, 32x32, 48x48, 128x128
   - Place them in `chrome-extension/icons/` folder
   - Name them: `icon16.png`, `icon32.png`, `icon48.png`, `icon128.png`
   - Use a bookmark/folder emoji or design as the icon

3. **Load Extension in Chrome**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top-right corner)
   - Click "Load unpacked"
   - Select the `chrome-extension` folder
   - Extension should now appear in your toolbar!

## 📖 How to Use

### Automatic Mode (Default)
1. Simply bookmark any website (Ctrl+D or click the star icon)
2. The extension automatically:
   - Analyzes the URL and page title
   - Determines the best category
   - Creates folders if they don't exist
   - Moves the bookmark to the organized location
   - Shows a notification (if enabled)

### Manual Organization
1. Click the extension icon in your toolbar
2. Click "Organize All Existing Bookmarks"
3. All your current bookmarks will be automatically organized

### Examples

| Website | Organized As |
|---------|-------------|
| instagram.com | Social Media → Instagram |
| youtube.com/watch?v=react-tutorial | Entertainment → YouTube OR Technology → React |
| github.com/facebook/react | Technology → GitHub |
| stackoverflow.com/questions/... | Technology → Stack Overflow |
| amazon.com/product/... | Shopping → Amazon |
| netflix.com | Entertainment → Netflix |
| coursera.org/course | Education → Online Courses |

## ⚙️ Settings

Access settings by:
1. Click extension icon → Click "Settings" button
2. Or right-click extension icon → "Options"

### Available Settings

**General**
- Auto-organize new bookmarks (ON/OFF)
- Show notifications (ON/OFF)
- Use page content for classification (ON/OFF - slower but more accurate)

**Folder Settings**
- Organization Mode:
  - Hierarchical: Main → Sub folders
  - Flat: Single category folder
  - Source-based: Organized by website source
- Default Location: Bookmarks Bar or Other Bookmarks

**Categories**
- Enable/disable specific categories
- Customize which categories you want to use

## 🛠️ Technical Details

### Files Structure
```
chrome-extension/
├── manifest.json          # Extension configuration
├── background.js          # Service worker (main logic)
├── classifier.js          # ML-based categorization engine
├── popup.html/js/css      # Extension popup UI
├── options.html/js/css    # Settings page
└── icons/                 # Extension icons
    ├── icon16.png
    ├── icon32.png
    ├── icon48.png
    └── icon128.png
```

### Permissions Required
- `bookmarks`: To read and organize bookmarks
- `tabs`: To get active tab information
- `storage`: To save settings and statistics
- `activeTab`: To analyze page content (optional)

### Classification Algorithm
Uses keyword matching with weighted scoring:
- URL analysis (domain, path, parameters)
- Page title analysis
- Optional: Page content analysis
- Confidence scoring (0-1)
- Hierarchical category matching

## 🎨 Creating Icons

You can create icons using:
1. **Online Tools**: Use [Favicon Generator](https://favicon.io/) or similar
2. **Design Tools**: Create in Figma, Canva, or Photoshop
3. **Emoji to PNG**: Convert 🔖 emoji to PNG at various sizes

Suggested designs:
- Bookmark icon (🔖)
- Folder with sparkles (📁✨)
- Organization theme
- Purple gradient (matching LinkHub branding)

## 🐛 Troubleshooting

### Bookmarks Not Being Organized
1. Check that "Auto-organize" is enabled in settings
2. Make sure you're bookmarking to a supported location
3. Try disabling and re-enabling the extension

### Wrong Categories
1. Enable "Use page content for classification" in settings
2. Manually move the bookmark to correct folder
3. The extension learns from URL patterns

### Extension Not Loading
1. Ensure all required icon files are present
2. Check console for errors: chrome://extensions/ → Details → Inspect views
3. Reload the extension

## 🔄 Updates

### Version 1.0.0 (Current)
- ✅ Automatic bookmark organization
- ✅ 50+ categories with sub-categorization
- ✅ Hierarchical folder creation
- ✅ Statistics tracking
- ✅ Settings customization
- ✅ Organize existing bookmarks
- ✅ Export/Import settings

### Planned Features
- 🔜 Custom category rules
- 🔜 Machine learning improvements
- 🔜 Browser sync support
- 🔜 Advanced filtering
- 🔜 Duplicate detection

## 💡 Tips & Best Practices

1. **Initial Setup**: After installation, click "Organize All Existing Bookmarks" once
2. **Notifications**: Keep notifications enabled for the first week to see how it works
3. **Custom Categories**: Disable categories you don't use for cleaner organization
4. **Page Content Analysis**: Enable for better accuracy, but it may be slower
5. **Regular Cleanup**: Check organized folders monthly and adjust if needed

## 🤝 Contributing

Based on the LinkHub project. To contribute:
1. Fork the repository
2. Make your changes
3. Test thoroughly in Chrome
4. Submit a pull request

## 📄 License

MIT License - See LICENSE file

## 🙏 Credits

- Built on top of LinkHub's ML classification engine
- Inspired by the need for intelligent bookmark management
- Created for seamless web browsing organization

## 📞 Support

For issues or feature requests:
- Open an issue on GitHub
- Email: support@linkhub.com

---

**Enjoy organized bookmarks! 🎉**
