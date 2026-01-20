# 🎀 Nanny.Services

Nanny.Services is a web application designed to help families find nannies, browse profiles, save favorites, and request meetings.
Built with React + TypeScript, Firebase Auth, and React Query for efficient data handling.

## ✨ Features

🔍 Browse nannies from a live database

🏷 Filter & sort by city, rating, price, etc.

⭐ Add to Favorites

🔐 User registration & login (Firebase Auth)

💬 Meeting request via Modal

📱 Fully responsive (Desktop + Mobile)

💾 Favorites persistence via LocalStorage

📊 Real backend using Firebase Realtime Database

🎯 Custom UX for Mobile Menu & Modal system

## 🧩 Tech Stack

Technology Purpose
React + TypeScript UI + type safety
React Router Client-side routing
React Query Data fetching + caching
Firebase Auth Authentication
Firebase Realtime DB Live data storage
Context API Modal + global state
LocalStorage Favorites persistence
CSS Modules Scoped styling
Axios HTTP requests

## 📂 Project Structure

src/
├── components/
│ ├── Header/
│ ├── Hero/
│ ├── Modal/
│ ├── Login/
│ ├── MobileMenu/
│ ├── Registration/
│ ├── Appointment/
│ ├── NanniesList/
│ ├── NannyCard/
│ ├── ErrorMessage/
│ ├── ModalContext/
│ ├── CustomSelect/
│ └── ...
├── pages/
│ ├── Home/
│ ├── Nannies/
│ └── Favorites/
├── services/
│ ├── nannies.ts
│ └── users.ts
├── types/
├── assets/
├── constants/
└── main.tsx

## 🚀 Running Locally

git clone https://github.com/Mariana331/nanny-services.git
cd nanny-services
npm install
npm run dev

## App runs at:

➡ http://localhost:5173

## 👤 Authentication

Available actions:

📝 Registration

🔑 Login

🚪 Logout

🧾 Persistent user state

🧍 Username visible in Header

## ⭐ Favorites

Favorites are stored in LocalStorage, so preferences stay saved after refresh.

## 🖥 Deployment

Can be deployed on:

▲ Vercel

🌐 Netlify

🔥 Firebase Hosting
