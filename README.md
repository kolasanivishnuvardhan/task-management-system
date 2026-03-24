# Task Management System (Full Stack Mini Project)

A clean and responsive **Task Tracker Web App** built with:
- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Database:** MongoDB
- **Auth:** JWT-based authentication

---

## 1) Features Implemented

### Authentication
- User signup and login
- JWT auth with protected routes
- Basic validation for email and password

### Task Management
- Create, view, update, delete tasks
- Mark task as completed
- Task fields:
  - Title
  - Description
  - Status (`Todo`, `In Progress`, `Done`)
  - Priority (`Low`, `Medium`, `High`)
  - Due Date

### Filtering & Search
- Filter by status
- Filter by priority
- Search by title (runs on **Enter key** or **Enter button**)

### Analytics
- Total number of tasks
- Completed tasks
- Pending tasks
- Completion percentage
- Status chart (simple pie chart)

### Product Enhancements (Included)
- Pagination
- Sorting (due date, priority, title, status, created date)
- Responsive UI (desktop/tablet/mobile)
- Dark mode toggle

### Technical Depth
- Centralized error handling middleware
- Request validation with `express-validator`
- MongoDB indexes for optimized task queries

---

## 2) Project Structure

```text
backend/
  src/
    config/
    controllers/
    middleware/
    models/
    routes/
    utils/
    app.js
    server.js
frontend/
  src/
    api/
    components/
    context/
    pages/
    App.jsx
    main.jsx
```

---

## 3) Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (local or cloud URI)

### Backend Setup
1. Go to backend:
   ```bash
   cd backend
   ```
2. Create env file:
   - Copy `.env.example` to `.env`
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start server:
   ```bash
   npm run dev
   ```

Backend runs on: `http://localhost:5000`

### Frontend Setup
1. Open new terminal and go to frontend:
   ```bash
   cd frontend
   ```
2. Create env file:
   - Copy `.env.example` to `.env`
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start frontend:
   ```bash
   npm run dev
   ```

Frontend runs on: `http://localhost:5173`

---

## 4) Environment Variables

### backend/.env
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/task-management-system
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development
```

### frontend/.env
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 5) API Endpoints

### Health
- `GET /api/health`

### Auth
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me` (Protected)

### Tasks (Protected)
- `POST /api/tasks`
- `GET /api/tasks`
- `GET /api/tasks/:id`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`
- `PATCH /api/tasks/:id/complete`

### Task Query Params
- `status` = `Todo | In Progress | Done`
- `priority` = `Low | Medium | High`
- `search` = text
- `page` = number
- `limit` = number
- `sortBy` = `createdAt | dueDate | priority | title | status`
- `sortOrder` = `asc | desc`

### Analytics (Protected)
- `GET /api/analytics/tasks`

---

## 6) Design Decisions
- Clean card-based dashboard UI to keep flow simple and assignment-friendly
- Two-column desktop layout that collapses to one column on smaller screens
- Reusable React components for form, filters, list, analytics, and pagination
- Context providers for auth and theme state management
- Backend separated by concerns (routes/controllers/middleware/models)

---

## 7) Scripts

### Backend
- `npm run dev` - start with nodemon
- `npm start` - start server

### Frontend
- `npm run dev` - start Vite dev server
- `npm run build` - production build
- `npm run lint` - lint check

---



