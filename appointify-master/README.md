# 🏥 Appointify

A modern, full-stack clinic appointment management system designed to help clinics manage their serving numbers and patient queues efficiently. Built with a performant Bun backend and a responsive SvelteKit frontend, with native Android mobile app support.

## ✨ Features

- **User Authentication** - Secure registration and login with token-based authentication
- **Clinic Management** - Create and manage your clinic profile with ease
- **Serving Number System** - Track and manage patient serving numbers in real-time
- **Availability Control** - Toggle clinic availability (open/closed) with a single click
- **Clinic Search** - Fast, real-time search functionality to find clinics by name
- **Responsive Design** - Beautiful UI built with Tailwind CSS that works on all devices
- **Mobile App** - Native Android app built with Capacitor
- **Real-time Updates** - Auto-refresh data when the window regains focus

## 🛠️ Tech Stack

### Backend
- **Runtime**: [Bun](https://bun.sh/) - Ultra-fast JavaScript runtime
- **Framework**: [Hono](https://hono.dev/) - Fast, lightweight web framework
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Token-based with Argon2 password hashing
- **Logging**: Winston logger

### Frontend
- **Framework**: [SvelteKit](https://kit.svelte.dev/) - Modern web framework
- **Styling**: Tailwind CSS with custom components
- **UI Components**: Bits UI, Lucide Icons
- **Mobile**: Capacitor for Android native app support
- **Type Safety**: Full TypeScript support

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Bun** (latest version) - [Install Bun](https://bun.sh/docs/installation)
- **Node.js** (v18 or higher) - [Install Node.js](https://nodejs.org/)
- **MongoDB** - [Install MongoDB](https://www.mongodb.com/try/download/community) or use MongoDB Atlas
- **Git** - [Install Git](https://git-scm.com/)

For Android development:
- **Android Studio** - [Install Android Studio](https://developer.android.com/studio)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/mikeeyyyy04/Appointify.git
cd Appointify
```

### 2. Backend Setup

```bash
cd backend
bun install
```

Create a `.env` file in the `backend` directory:

```env
MONGO_URI=mongodb://localhost:27017
```

Replace with your MongoDB connection string (use MongoDB Atlas connection string for cloud deployment).

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` directory (if needed for API configuration):

```env
PUBLIC_API_URL=http://localhost:7325
```

## 🏃 Running the Application

### Development Mode

**Backend:**
```bash
cd backend
bun run dev
```

The backend will run on `http://localhost:7325`

**Frontend:**
```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173` (or the next available port)

### Building for Production

**Backend:**
```bash
cd backend
bun run src/index.ts
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview  # Preview production build
```

## 📱 Mobile App (Android)

To build and run the Android app:

```bash
cd frontend

# For development with network config sync
npm run dev:cap

# Build and sync with Capacitor
npm run build:cap

# Open in Android Studio
npx cap open android
```

Then build and run from Android Studio.

## 📁 Project Structure

```
appointify-master/
├── backend/
│   ├── src/
│   │   ├── database/          # MongoDB schemas and connection
│   │   │   └── schemas/       # User and Clinic models
│   │   ├── routes/            # API route handlers
│   │   │   ├── clinics/       # Clinic endpoints
│   │   │   └── users/         # User endpoints
│   │   ├── middlewares/       # Authentication middleware
│   │   ├── logger/            # Winston logger configuration
│   │   └── utils/             # Utility functions
│   ├── Dockerfile
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── lib/
    │   │   ├── components/    # Reusable Svelte components
    │   │   ├── requests/      # API request functions
    │   │   ├── stores/        # Svelte stores (state management)
    │   │   └── types/         # TypeScript type definitions
    │   └── routes/            # SvelteKit routes (pages)
    ├── android/               # Android native project
    └── package.json
```

## 🔌 API Endpoints

### Authentication
- `POST /users` - Login (returns token)
- `PUT /users` - Register new user
- `GET /users` - Get current user (requires auth)
- `DELETE /users` - Logout (requires auth)

### Clinics
- `GET /clinics` - List all clinics (optional `?search=query` parameter)
- `GET /clinics/:id` - Get clinic by ID
- `GET /clinics/own` - Get own clinic (requires auth)
- `PUT /clinics` - Create clinic (requires auth)
- `DELETE /clinics` - Delete own clinic (requires auth)
- `PUT /clinics/serving` - Increment serving number (requires auth)
- `DELETE /clinics/serving` - Decrement serving number (requires auth)
- `PUT /clinics/availability` - Set available (requires auth)
- `DELETE /clinics/availability` - Set unavailable (requires auth)

**Authentication Header:**
```
Authorization: <token>
```

## 🐳 Docker Support

The backend includes a Dockerfile for containerized deployment:

```bash
cd backend
docker build -t appointify-backend .
docker run -p 7325:7325 --env-file .env appointify-backend
```

## 🔒 Security Features

- Password hashing with Argon2
- Token-based authentication
- CORS enabled for frontend communication
- Request logging and error handling
- Hidden sensitive fields in API responses

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**mikeeyyyy04**

- GitHub: [@mikeeyyyy04](https://github.com/mikeeyyyy04)

## 🙏 Acknowledgments

- Built with [SvelteKit](https://kit.svelte.dev/)
- Powered by [Bun](https://bun.sh/)
- UI components from [Bits UI](https://www.bits-ui.com/)
- Icons from [Lucide](https://lucide.dev/)

---

⭐ If you found this project helpful, please consider giving it a star!

