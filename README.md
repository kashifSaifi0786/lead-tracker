# Stealth Lead Tracker

A lead management system to track, assign, and manage leads. Supports roles: Superadmin, Manager, Team Lead, and Agent.

---

## Candidate Checklist

- [ ] Public GitHub repo link
- [ ] Live frontend URL
- [ ] Live backend/API URL
- [ ] Free services used
- [ ] Steps to run locally
- [ ] Environment variables
- [ ] Time taken and notes
- [ ] Authentication with demo credentials

---

## Features

- Login/signup with JWT authentication
- Role-based access: Superadmin, Manager, Team Lead, Agent
- Create, delete, and assign leads
- Search leads by name, email, or phone
- Dashboard with total users, active users, and total leads
- Responsive design for desktop and mobile

---

## Tech Used

- Frontend: Next.js, React, TailwindCSS
- Backend: Node.js, Express.js
- Database: MongoDB with Mongoose
- Authentication: JWT
- Icons/UI: Lucide React

---

## Frontend

**Live URL:** https://lead-tracker-indol.vercel.app/

**Run Locally:**

npm install
npm run dev

**Pages:**

- / – Landing page
- /login – Login page
- /signup – Signup page
- /dashboard – Dashboard with stats
- /dashboard/leads – List leads
- /dashboard/leads/add – Add new lead
