# LinkHub - Smart Link Organization Platform

<div align="center">

![LinkHub Logo](https://img.shields.io/badge/LinkHub-Smart%20Links-blue?style=for-the-badge&logo=link&logoColor=white)
[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge)](https://link-hub-kappa-nine.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/Jayakrishna-1817/LinkHub)

**Never lose a link again! Intelligent organization powered by AI**

[Features](#-features) • [Demo](#-live-demo) • [Tech Stack](#-tech-stack) • [Setup](#-quick-start) • [API](#-api-documentation)

</div>

---

## Overview

LinkHub is a modern, full-stack link management platform that automatically organizes your bookmarks using machine learning. Simply paste a URL and watch as our AI intelligently categorizes it into hierarchical folders, extracts metadata, and syncs across all your devices in real-time.

### Perfect For
- Students organizing learning resources
- Developers managing documentation and tutorials
- Researchers collecting articles and papers
- Content curators saving videos and posts
- Professionals organizing work resources

## Features

### AI-Powered Intelligence
- **Smart Categorization**: 50+ categories including Technology, Entertainment, Lifestyle, Business, and more
- **Metadata Extraction**: Automatically pulls titles, descriptions, thumbnails from URLs
- **YouTube Integration**: Special oEmbed API integration for reliable video metadata
- **Framework Detection**: Prioritizes specific frameworks (React, Python, etc.) over generic languages
- **Keyword Analysis**: Advanced NLP using Natural.js for content understanding

### Intelligent Organization
- **Hierarchical Structure**: Main folders (source) → Sub-folders (content topic)
- **Auto-Folder Creation**: Automatically creates and organizes folders based on content
- **Collapsible Sidebar**: Clean, expandable folder navigation
- **Visual Indicators**: Icons and colors for each category
- **Link Count**: See how many links in each folder at a glance

### Real-Time Synchronization
- **Socket.IO Integration**: Instant updates across all connected devices
- **Live Collaboration**: Multiple users can work simultaneously
- **Automatic Refresh**: No manual page reload needed
- **Event Broadcasting**: CRUD operations broadcast in real-time

### Modern User Experience
- **Responsive Design**: Mobile-first approach with drawer sidebar
- **Touch-Friendly**: Optimized tap targets for mobile devices
- **Gradient Animations**: Beautiful gradients and smooth transitions
- **Glassmorphism Effects**: Modern glass-style UI elements
- **Dark Sidebar**: Elegant dark theme with gradient accents
- **Loading States**: Smooth loading indicators and skeletons

### Security & Authentication
- **JWT Tokens**: Secure token-based authentication
- **Password Encryption**: bcryptjs hashing with salt rounds
- **7-Day Sessions**: Long-lasting but secure sessions
- **Protected Routes**: API endpoint protection
- **User Isolation**: Each user's data is completely private

### Cross-Platform Support
- **Web Application**: React + Vite with modern UI
- **Mobile App**: React Native (Expo) - ready for iOS & Android
- **PWA Ready**: Can be installed as a progressive web app
- **Responsive Layouts**: Adapts to any screen size

## Live Demo

**Web App**: [link-hub-kappa-nine.vercel.app](https://link-hub-kappa-nine.vercel.app)  
**Backend**: [linkhub-7del.onrender.com](https://linkhub-7del.onrender.com) (API)

### Demo Credentials
```
Email: demo@linkhub.com
Password: demo123
```
*Note: Backend on Render free tier may sleep - first load takes 30-60s*

## How It Works

1. **Sign Up/Login**: Create your account or use demo credentials
2. **Add Link**: Click "Add Link" and paste any URL
3. **AI Magic**: 
   - Extracts title, description, thumbnail
   - Detects source (YouTube, GitHub, Medium, etc.)
   - Identifies content category (React, DSA, Interview, etc.)
   - Creates hierarchical folders automatically
4. **Browse**: Navigate through auto-organized folders
5. **Real-Time**: Changes sync instantly across devices
6. **Favorite**: Star important links for quick access

### Example URL → Categorization

| URL | Main Folder | Sub-Folder |
|-----|-------------|------------|
| `youtube.com/watch?v=react-tutorial` | YouTube | React |
| `github.com/facebook/react` | GitHub | React |
| `medium.com/python-tips` | Medium | Python |
| `youtube.com/watch?v=dsa-course` | YouTube | Data Structures |

## Quick Deploy

**Total Cost: $0** (Using free tiers)

| Service | Purpose | Free Tier |
|---------|---------|-----------|
| **Render** | Backend API | 750 hrs/month |
| **Vercel** | Frontend hosting | Unlimited |
| **MongoDB Atlas** | Database | 512MB storage |
| **Expo** | Mobile testing | Unlimited |

### One-Click Deploy

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Jayakrishna-1817/LinkHub)
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

## Tech Stack

### Backend
```
Runtime:        Node.js v20.x
Framework:      Express.js v4.18.2
Database:       MongoDB (Mongoose ODM)
Real-Time:      Socket.IO v4.6.0
Auth:           JWT + bcryptjs
ML/NLP:         Natural.js v6.10.0
Web Scraping:   Axios + Cheerio
Metadata:       YouTube oEmbed API
```

### Web Frontend
```
Framework:      React 18.2.0
Build Tool:     Vite v5.4.21
Styling:        Tailwind CSS v3.3.6
State:          Zustand v4.4.7
Routing:        React Router v6.20.1
Real-Time:      Socket.IO Client
UI/UX:          Lucide Icons, React Hot Toast
```

### Mobile App
```
Framework:      React Native (Expo ~50.0.0)
Navigation:     React Navigation
Real-Time:      Socket.IO Client
UI:             Native Base / React Native Elements
```

### ML Categories (50+)
```javascript
Technology: OS, Networks, DSA, Database, AI/ML, React, JavaScript, 
            Python, Java, C/C++, Web Dev, DevOps, Mobile, Security,
            Cloud, Software Engineering, Blockchain, Salesforce

Entertainment: Movies, Music, Gaming, Anime

Lifestyle: Fitness, Cooking, Travel, Fashion, Photography

Business: Business, Finance, Real Estate

Education: News, Science, History, Education, Interview Prep, Career

Sports: Sports, Outdoor & Nature

Arts: Art & Design, DIY & Crafts

Misc: Books, Automotive, Pets, Home & Garden
```

## Quick Start

### Prerequisites

- **Node.js** v18 or higher ([Download](https://nodejs.org/))
- **MongoDB** ([Local](https://www.mongodb.com/try/download/community) or [Atlas](https://www.mongodb.com/cloud/atlas))
- **Git** ([Download](https://git-scm.com/))

### Installation

#### 1️⃣ Clone Repository

```bash
git clone https://github.com/Jayakrishna-1817/LinkHub.git
cd LinkHub
```

#### 2️⃣ Backend Setup

```bash
cd backend
npm install

# Create .env file
echo "PORT=5000
MONGODB_URI=mongodb://localhost:27017/linkfind
JWT_SECRET=your_super_secret_key_change_this
NODE_ENV=development" > .env

# Start backend server
npm run dev
```
Backend running on `http://localhost:5000`

#### 3️⃣ Web Frontend Setup

```bash
cd web
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000" > .env

# Start development server
npm run dev
```
Web app running on `http://localhost:5173`

#### 4️⃣ Mobile App Setup (Optional)

```bash
cd mobile
npm install

# Update app.json with your local IP
# Replace YOUR_LOCAL_IP with your machine's IP (e.g., 192.168.1.100)

# Start Expo development server
npx expo start
```
Scan QR code with Expo Go app

### Running All Services

```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Web Frontend
cd web && npm run dev

# Terminal 3 - Mobile App (optional)
cd mobile && npx expo start
```

## Database Setup

### Option 1: MongoDB Atlas (Recommended - Free)

1. **Create Account**: Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. **Create Cluster**: 
   - Click "Build a Database"
   - Choose "FREE" tier (M0 Sandbox)
   - Select cloud provider and region
   - Cluster name: `LinkHub`
3. **Create Database User**:
   - Username: `linkhub_user`
   - Password: Generate secure password
4. **Network Access**:
   - Click "Network Access"
   - Add IP: `0.0.0.0/0` (Allow from anywhere - for development)
5. **Get Connection String**:
   - Click "Connect" → "Connect your application"
   - Copy connection string
   - Replace `<password>` with your database password
   - Update `MONGODB_URI` in backend `.env`

**Example Atlas URI:**
```
mongodb+srv://linkhub_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/linkfind
```

### Option 2: Local MongoDB

```bash
# macOS (Homebrew)
brew install mongodb-community
brew services start mongodb-community

# Ubuntu/Debian
sudo apt-get install mongodb
sudo systemctl start mongodb

# Windows
# Download installer from mongodb.com and install
# Start MongoDB as a service
```

**Local URI:**
```
mongodb://localhost:27017/linkfind
```

## Core Architecture

### Request Flow

```mermaid
graph LR
    A[User] --> B[React Frontend]
    B --> C[Express API]
    C --> D[MongoDB]
    C --> E[Socket.IO]
    E --> B
    C --> F[ML Classifier]
   API Documentation

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secure123"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "secure123"
}

Response:
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Links

#### Create Link (AI-Powered)
```http
POST /api/links
Authorization: Bearer <token>
Content-Type: application/json

{
  "url": "https://www.youtube.com/watch?v=abc123"
}

Response:
{Socket.IO Events

### Client → Server

```javascript
// Connect with authentication
socket.emit('authenticate', { token: 'jwt_token_here' });
```

### Server → Client (Broadcasts)

```javascript
// Link Events
socket.on('link:created', (link) => {
  // New link added by any user
  console.log('New link:', link);
});

socket.on('link:updated', (link) => {
  // Link modified (favorite toggled, etc.)
  console.log('Updated link:', link);
});

socket.on('link:deleted', (linkId) => {
  // Link deleted
  console.log('Deleted link:', linkId);
});

// Folder Events
socket.on('folder:created', (folder) => {
  // New folder created
  console.log('New folder:', folder);
});

socket.on('folder:updated', (folder) => {
  // Folder modified
  console.log('Updated folder:', folder);
});

socket.on('folder:deleted', (folderId) => {
  // Folder deleted
  console.log('Deleted folder:', folderId);
});

// Connection Events
socket.on('connect', () => {
  console.log('Connected:', socket.id);
});

socket.on('disconnect', () => {
  console.log('Disconnected');
});
```

### Real-Time Flow Example

```
User A (Web) adds link
    ↓
Backend processes & saves to DB
    ↓
Socket.IO broadcasts 'link:created'
    ↓
User B (Mobile) receives update
    ↓
UI auto-refreshes without reload
```
    "category": "React",
    "tags": ["react", "tutorial", "javascript"],
    "folder": "folder_id",
    "isFavorite": false
  },
  "folder": {
    "_id": "folder_id",
    "name": "YouTube",
    "icon": "YT"
  },
  "subFolder": {
    "_id": "subfolder_id",
    "name": "React",
    "icon": "React",
    "parentId": "folder_id"
  },
  "message": "Link added to YouTube → React"
}
```

#### Get All Links
```http
GET /api/links?folderId=<folder_id>&favorite=true
Authorization: Bearer <token>

Response:
{
  "links": [...]
}
```

#### Update Link
```http
PUT /api/links/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "isFavorite": true
}
```

#### Delete Link
```http
DELETE /api/links/:id
Authorization: Bearer <token>
```

### Folders

#### Get All Folders
```http
GET /api/folders
Authorization: Bearer <token>

Response:
{
  "folders": [
    {
      "_id": "folder_id",
      "name": "YouTube",
      "icon": "YT",
      "color": "#FF0000",
      "parentId": null,
      "isSubFolder": false
    },
    {
      "_id": "subfolder_id",
      "name": "React",
      "icon": "React",
      "color": "#61DAFB",
      "parentId": "folder_id",
      "isSubFolder": true
    }
  ]
}
```

#### Create Folder
```http
POSEnvironment Configuration

### Backend (`backend/.env`)
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/linkfind
# Or MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.xxxxx.mongodb.net/linkfind

# Authentication
JWT_SECRET=your_super_secret_jwt_key_min_32_chars_recommended
JWT_EXPIRES_IN=7d

# CORS (for production)
CLIENT_URL=https://your-frontend-domain.com
```

### Web Frontend (`web/.env`)
```env
# API Configuration
VITProduction Deployment

### Backend (Render)

1. **Create Account**: [render.com](https://render.com)
2. **New Web Service**: Connect GitHub repo
3. **Configure**:
   - Build Command: `npm install`
   - Start Command: `npm start`
4. **Environment Variables**:
   ```
   MONGODB_URI=mongodb+srv://...
   JWT_SECRET=your_production_secret
   NODE_ENV=production
   CLIENT_URL=https://your-frontend.vercel.app
   ```
5. **Deploy**: Click "Create Web Service"

**Current Backend**: [https://linkhub-7del.onrender.com](https://linkhub-7del.onrender.com)

### Frontend (Vercel)

1. **Create Account**: [vercel.com](https://vercel.com)
2. **Import Project**: Connect GitHub repo
3. **Configure**:
   - Framework: Vite
   - Root Directory: `web`
4. **Environment Variables**:
   ```
   VITE_API_URL=https://your-backend.onrender.com/api
   VITE_SOCKET_URL=https://your-backend.onrender.com
   ```
5. **Deploy**: Click "Deploy"

**Current Frontend**: [https://link-hub-kappa-nine.vercel.app](https://link-hub-kappa-nine.vercel.app)

### Mobile (Expo)

```bash
cd mobile

# Build for Android
eas build --platform android

# Build for iOS (requires Apple Developer account)
eas build --platform ios

# Or publish to Expo Go
expo publish
```

## Project Structure

```
LinkHub/
├── backend/                 # Node.js Express API
│   ├── models/             # MongoDB schemas
│   │   ├── User.js
│   │   ├── Folder.js
│   │   └── Link.js
│   ├── routes/             # API routes
│   │   ├── auth.js
│   │   ├── folders.js
│   │   └── links.js
│   ├── middleware/         # Auth middleware
│   ├── utils/              # ML & extraction utilities
│   │   ├── mlClassifier.js
│   │   └── linkExtractor.js
│   ├── server.js           # Main server file
│   └── package.json
│
├── web/                    # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── Logo.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── LinkCard.jsx
│   │   │   └── modals/
│   │   ├── pages/          # Route pages
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── store/          # Zustand state management
│   │   ├── services/       # API & Socket services
│   │   └── App.jsx
│   ├── public/
│   ├── index.html
│   └── package.json
│
├── mobile/                 # React Native app
│   ├── src/
│   │   ├── screens/
│   │   ├── components/
│   │   ├── navigation/
│   │   └── services/
│   ├── app.json
│   └── package.json
│
└── README.md
```

## Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is in use
lsof -i :5000  # macOS/Linux
netstat -ano | findstr :5000  # Windows

# Kill process and restart
# Or change PORT in .env
```

### MongoDB connection failed
```bash
# Test connection
mongosh "mongodb://localhost:27017/linkfind"

# Check MongoDB is running
sudo systemctl status mongodb  # Linux
brew services list  # macOS
```

### CORS errors in browser
- Add your frontend URL to `CLIENT_URL` in backend `.env`
- Restart backend server

### Mobile app can't connect
- Use your computer's local IP, not `localhost`
- Ensure backend is running
- Check firewall isn't blocking connections
- Both devices must be on same WiFi network

### YouTube links not categorizing correctly
- Backend uses YouTube oEmbed API (no rate limits)
- Clear database and re-add link
- Check Render logs for errors: `YouTube extraction failed`

## Contributing

We welcome contributions! Here's how:

1. **Fork the repository**
2. **Create a branch**: `git checkout -b feature/amazing-feature`
3. **Make changes** and test thoroughly
4. **Commit**: `git commit -m 'Add amazing feature'`
5. **Push**: `git push origin feature/amazing-feature`
6. **Open a Pull Request**

### Development Guidelines
- Follow existing code style
- Add comments for complex logic
- Test all features before submitting
- Update README if adding new features

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## Author

**Jayakrishna**
- GitHub: [@Jayakrishna-1817](https://github.com/Jayakrishna-1817)
- Repository: [LinkHub](https://github.com/Jayakrishna-1817/LinkHub)

## Acknowledgments

- [Natural.js](https://github.com/NaturalNode/natural) - NLP and ML
- [Socket.IO](https://socket.io/) - Real-time communication
- [MongoDB](https://www.mongodb.com/) - Database
- [React](https://react.dev/) - UI framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Expo](https://expo.dev/) - Mobile development

## Support

- **Bug Reports**: [Open an issue](https://github.com/Jayakrishna-1817/LinkHub/issues)
- **Feature Requests**: [Open an issue](https://github.com/Jayakrishna-1817/LinkHub/issues)
- **Email**: Create an issue for support
- ⭐ **Star this repo** if you find it helpful!

## Stats

![GitHub stars](https://img.shields.io/github/stars/Jayakrishna-1817/LinkHub?style=social)
![GitHub forks](https://img.shields.io/github/forks/Jayakrishna-1817/LinkHub?style=social)
![GitHub issues](https://img.shields.io/github/issues/Jayakrishna-1817/LinkHub)
![GitHub license](https://img.shields.io/github/license/Jayakrishna-1817/LinkHub)

---

<div align="center">

**Made with love and AI**

[⬆ Back to Top](#linkhub---smart-link-organization-platform-)

</div>
    "extra": {
      "apiUrl": "http://192.168.1.100:5000/api",
      "socketUrl": "http://192.168.1.100:5000"
    }
  }
}
```
*Replace `192.168.1.100` with your computer's local IP address*

### Find Your Local IP

```bash
# Windows
ipconfig | findstr IPv4

# macOS/Linux
ifconfig | grep "inet " | grep -v 127.0.0.1

# Or use
hostname -I Long keywords: Contains matching with occurrence count
- Title weight: 10x more important than description
- Position boost: First 5 words get +200 score

**Framework Prioritization**:
```javascript
if (React score >= 30% of JavaScript score) {
  React score += 300  // React wins!
}
```

## API Endpoints

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Folders
- `GET /api/folders` - Get all folders
- `POST /api/folders` - Create folder
- `PUT /api/folders/:id` - Update folder
- `DELETE /api/folders/:id` - Delete folder

### Links
- `GET /api/links` - Get all links (with filters)
- `POST /api/links` - Add new link
- `PUT /api/links/:id` - Update link
- `DELETE /api/links/:id` - Delete link

## Socket Events

- `link:created` - New link added
- `link:updated` - Link modified
- `link:deleted` - Link removed
- `folder:created` - New folder created
- `folder:updated` - Folder modified
- `folder:deleted` - Folder removed

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/linkfind
JWT_SECRET=your_secret_key
NODE_ENV=development
```

### Web (.env)
```
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

### Mobile (app.json)
```json
"extra": {
  "apiUrl": "http://YOUR_LOCAL_IP:5000/api",
  "socketUrl": "http://YOUR_LOCAL_IP:5000"
}
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License

## Support

For issues and questions, please open an issue on GitHub.
