# Academix - Student Management System 🎓

Academix is a modern, responsive, and full-stack MERN (MongoDB, Express, React, Node.js) application designed to streamline student enrollment and directory management. It features a premium, responsive glassmorphic dashboard styled with **Tailwind CSS v4** and integrates full CRUD capabilities.

---

## 🚀 Key Features

* **Live Enrollment Statistics**: Dynamically calculated KPIs showing *Total Enrollment*, *Active Course Offerings*, and *Average Student Age*.
* **Real-time Client-side Search**: Instant search filtering of records matching names, emails, phone numbers, ages, or courses.
* **Unified Form Modal**: Dynamic modal used for both creating new student records and editing existing ones.
* **Input Valdiations**: Robust frontend validation checking for valid email formats, positive numeric ages, and non-empty contact info.
* **Custom Interactive Dialogs**: Custom confirmation overlays replace standard native browser alert alerts for destructive actions (e.g., student deletion).
* **Toast Notifications**: Built-in stateful alerts indicating successful additions, modifications, and deletions.

---

## 🛠️ Technology Stack

### Frontend
* **React 19** & **Vite** — Optimized, super-fast hot module reloading (HMR).
* **Tailwind CSS v4** — High-end styling using modern custom variables, keyframe animations, and transitions.
* **React Icons** — Modern icon family set.
* **Axios** — Client HTTP request client.

### Backend
* **Node.js** & **Express** — High-performance backend API servers.
* **MongoDB** & **Mongoose** — Flexible Document Database storage.
* **Dotenv** & **Cookie Parser** — Environment variable config and cookie management.

---

## 📂 Project Architecture

```text
├── client/                     # Frontend Vite + React application
│   ├── src/
│   │   ├── components/         # Reusable presentation components (Navbar, Table, Form)
│   │   ├── pages/              # Main viewpages (Home.jsx Dashboard)
│   │   ├── services/           # Axios client configurations (api.js)
│   │   ├── index.css           # Global CSS and custom animations
│   │   └── main.jsx
│   └── package.json
└── server/                     # Backend API server application
    ├── config/                 # Database connector settings
    ├── controllers/            # API Controllers (studentController.js CRUD actions)
    ├── models/                 # Mongoose schemas (studentModel.js)
    ├── routes/                 # Express routers (studentRoutes.js)
    └── server.js               # Entry point
```

---

## 🔌 API Documentation

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/students` | Retrieve all student records. |
| **POST** | `/api/students/add` | Enroll a new student record. |
| **PUT** | `/api/students/:id` | Update an existing student profile. |
| **DELETE** | `/api/students/:id` | Remove a student record from the repository. |

---

## ⚙️ Installation & Setup

### Prerequisites
* **Node.js** (v16+ recommended)
* **MongoDB** running locally (`mongodb://127.0.0.1:27017`) or a MongoDB Atlas URI.

### 1. Setup Backend
1. Navigate to the `server/` directory:
   ```bash
   cd server
   ```
2. Install packages:
   ```bash
   npm install
   ```
3. Configure your Environment Variables inside `server/.env`:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/studentDB
   JWT_SECRET=your_jwt_secret_key
   ```
4. Start the backend:
   ```bash
   npm run dev
   ```

### 2. Setup Frontend
1. Navigate to the `client/` directory:
   ```bash
   cd ../client
   ```
2. Install packages:
   ```bash
   npm install
   ```
3. Start the Vite dev server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to [http://localhost:5173/](http://localhost:5173/).

---

## 📝 License
This project is licensed under the ISC License.
