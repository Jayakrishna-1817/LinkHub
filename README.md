# Smart Bookmark Extension & LinkHub

## Overview
A smart, AI-powered bookmark organizer that automatically categorizes and organizes your bookmarks into meaningful folders!

## Features
- **Chrome Extension**: Automatically categorizes and organizes bookmarks as you save them!
- **Web App**: Manage your links, folders, and tags from a beautiful dashboard!
- **Backend API**: Powered by Node.js, Express, and MongoDB!
- **AI Classification**: Uses keyword-based and pattern-matching classification!

## Technologies Used

### Chrome Extension
- JavaScript
- Chrome Bookmarks API
- Chrome Storage API
- Chrome Notifications API
- HTML/CSS

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Socket.io for real-time updates
- Axios for HTTP requests
- Cheerio for web scraping
- Natural (for ML classification)

### Web App
- React
- Tailwind CSS
- Axios for API calls
- Socket.io for real-time updates
- Vite for build tool

## How It Works (Internal Process)
### Bookmark Classification Process
1. **Input**: When you save a bookmark, we get its URL, title, and optionally page content!
2. **Pattern Matching**: First we check the URL for well-known sources (like YouTube, GitHub, WhatsApp, etc.)!
3. **Keyword Matching**: We match keywords in the title and description against our predefined categories!
4. **Scoring**: We calculate scores for each category using weighted keyword matches!
5. **Hierarchical Folder Creation**: We create a main folder (source-based) and a sub-folder (category-based)!
6. **Organization**: We move the bookmark to the appropriate folder!

### ML Classifier Algorithm
We use a **keyword-based classification with weighted scoring** algorithm! Here's how it works:
1. **Category Keywords**: We have predefined categories with associated keywords (e.g., React has "react", "react.js", "react hooks")!
2. **Scoring Function**: For each category, we calculate a score by matching keywords in the title and description!
3. **Title Weighting**: Title matches get 10x more weight than description matches!
4. **Boosting**: If a keyword is found in the first 5 words of the title, we add a big boost (200 points)!
5. **Framework Prioritization**: We prioritize specific frameworks (like React) over generic categories (like JavaScript)!
6. **Prediction**: The category with the highest score is our prediction!

## Setup & Installation

### Chrome Extension
1. Open Chrome and go to `chrome://extensions`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select the `chrome-extension` directory

### Backend
1. Navigate to `backend/`
2. Create a `.env` file with `MONGODB_URI`
3. Install dependencies: `npm install`
4. Run: `npm start`

### Web App
1. Navigate to `web/`
2. Install dependencies: `npm install`
3. Run: `npm run dev`

## Project Structure
```
LinkFind - Copy/
├── backend/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── package.json
│   └── server.js
├── chrome-extension/
│   ├── background.js
│   ├── classifier.js
│   ├── popup.js
│   ├── options.js
│   ├── popup.html
│   ├── options.html
│   └── manifest.json
├── web/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── store/
│   ├── package.json
│   └── vite.config.js
└── README.md
```
