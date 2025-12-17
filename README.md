# LinkHub - Smart Link Organization App 🔗

A full-stack link organization application with AI-powered categorization, real-time sync, and cross-platform support.

## 🌟 Features

- 🤖 **AI-Powered Categorization**: Automatically detects and organizes links using ML
- 📁 **Hierarchical Folders**: Main folders (source) → Sub-folders (content topic)
- ⚡ **Real-time Sync**: Instant updates across all devices using Socket.IO
- 🎨 **Modern UI**: Clean, responsive design with Tailwind CSS
- 🔐 **Secure Authentication**: JWT-based auth with bcrypt encryption
- 🌐 **Cross-Platform**: Web app + React Native mobile app
- 🎯 **20+ Categories**: OS, DSA, React, Python, Interview, Career, and more

## 🚀 Quick Deploy

Follow **[QUICK_DEPLOY.md](QUICK_DEPLOY.md)** for step-by-step hosting instructions (5-10 minutes).

### Deployment Platforms

- **Backend**: Render / Railway (FREE tier available)
- **Frontend**: Vercel / Netlify (FREE tier available)
- **Database**: MongoDB Atlas (FREE 512MB)
- **Mobile**: Expo (FREE testing, App Stores optional)

**Total Cost: $0 for web app!** 🎉

## Tech Stack

### Backend
- Node.js + Express
- MongoDB (Database)
- Socket.IO (Real-time sync)
- JWT Authentication
- Cheerio & Axios (Metadata extraction)

### Web Frontend
- React + Vite
- Tailwind CSS
- Zustand (State management)
- Socket.IO Client

### Mobile App
- React Native (Expo)
- React Navigation
- Socket.IO Client

## Getting Started

### Prerequisites

1. **Node.js** (v18 or higher)
2. **MongoDB** (local or cloud)
3. **npm** or **yarn**

### Installation

#### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env and add your MongoDB URI
npm run dev
```

The backend will run on `http://localhost:5000`

#### 2. Web App Setup

```bash
cd web
npm install
cp .env.example .env
npm run dev
```

The web app will run on `http://localhost:3000`

#### 3. Mobile App Setup

```bash
cd mobile
npm install
# Update app.json with your local IP address in the extra.apiUrl
npx expo start
```

Use Expo Go app to scan QR code and run on your device.

## MongoDB Setup

### Option 1: Local MongoDB
1. Install MongoDB from https://www.mongodb.com/try/download/community
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/linkfind`

### Option 2: MongoDB Atlas (Cloud)
1. Create free account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string and add to `.env`

## How It Works

1. **User Authentication**: Register/Login to sync across devices
2. **Add Links**: Paste any link (YouTube, GitHub, articles, etc.)
3. **Auto-Detection**: App automatically:
   - Detects the source (YouTube, GitHub, etc.)
   - Extracts title, description, thumbnail
   - Identifies relevant tags
   - Suggests folder organization
4. **Real-time Sync**: Changes on mobile instantly appear on web and vice versa
5. **Smart Organization**: Links are categorized into folders automatically

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
