# 🌤️ Weather App

A modern, full-stack weather application that provides real-time weather forecasts and hourly predictions. Built with React, Vite, Express.js, and the OpenWeatherMap API.

## 📸 Screenshots

### Desktop
![Desktop](./frontend/public/Desktop_Screenshot.png)

### Weather Details



## 🎯 Project Overview

**Ryuk Weather App** is a weather forecasting application that delivers a seamless user experience with:
- 5-day weather forecasts
- Hourly weather predictions
- Real-time temperature, humidity, and wind speed data
- Dynamic greeting messages based on time of day
- City search functionality
- Responsive design supporting mobile and desktop



## 🛠️ Tech Stack

### Frontend
- **React**
- **Vite**
- **Tailwind CSS**
- **React Query**
- **ESLint**

### Backend
- **Express**
- **Node.js**
- **CORS**
- **Dotenv**

### External APIs
- **OpenWeatherMap API** - Weather data provider



## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- OpenWeatherMap API key (free tier available)

### Step 1: Clone or Extract Project
```bash
cd Weather
```

### Step 2: Setup Backend
```bash
cd Backend
npm install
```

### Step 3: Setup Frontend
```bash
cd ../Frontend
npm install
```

---

## 🔐 Environment Variables

### Backend (.env)
```env
api=YOUR_OPENWEATHERMAP_API_KEY
```

**How to get API key:**
1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Generate an API key
4. Add it to `.env`

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:3000
```

**For Production:**
```env
VITE_API_BASE_URL=https://your-backend-url.com
```

---

## 🚀 Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd Backend
npm start
# or for watch mode
npm install -g nodemon  # if not already installed
nodemon index.js
```
Backend runs on: `http://localhost:3000`

**Terminal 2 - Frontend:**
```bash
cd Frontend
npm run dev
```
Frontend runs on: `http://localhost:5173`

### Production Build

**Build Frontend:**
```bash
cd Frontend
npm run build
```
Output in `Frontend/dist/`

**Backend Production:**
```bash
cd Backend
node index.js
```











