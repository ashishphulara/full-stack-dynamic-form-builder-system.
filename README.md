📘 Dynamic Form Builder System — Full-Stack Assignment

A full-stack dynamic form builder system built as part of the MatBook Software Engineer assignment.
The system provides a backend-driven dynamic form schema, dynamic form rendering on the frontend, submission handling, and a fully paginated/sortable submissions table.

✅ Milestone Completion Status
Milestone 1 — Frontend (✔ Completed)

Dynamic form page implemented

TanStack Form for form management

TanStack Query for data fetching

All 8 field types fully implemented:
✔ Text
✔ Number
✔ Select
✔ Multi-select
✔ Date
✔ Textarea
✔ Switch

Inline validation + error messages

Loading/error states

Submit actions + success/error messages

Server-side paginated submissions table using TanStack Table

Items per page, Next/Previous pagination

Sorting on createdAt

View submission modal

Clean component structure

Milestone 2 — Backend (✔ Completed)

REST API with Express

GET /api/form-schema returns Employee Onboarding schema

POST /api/submissions with full validation

GET /api/submissions with pagination, sorting, count

In-memory storage for simplicity

Full validation rules implemented:
✔ required
✔ minLength / maxLength
✔ regex
✔ min / max for number
✔ minDate
✔ minSelected / maxSelected

🛠 Tech Stack Used
Frontend

React 19

TypeScript

TanStack Query

TanStack Form

TanStack Table

Tailwind CSS

ShadCN-style components (custom fields)

Backend

Node.js (ES Modules)

Express.js

TypeScript

tsx (for ESM TypeScript runtime)

In-memory storage (or file/db plug-in ready)


matbook-assignment/
│
├── backend/
│   ├── src/
│   │   ├── schema/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── server.ts
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── main.tsx / App.tsx
│   └── package.json
│
└── README.md


🚀 Setup & Run Instructions
📦 1. Clone Repository
       git clone <repos-url>
       cd matbook-assignment

🧩 2. Install Dependencies
Backend:
       cd backend
       npm install
Frontend:
        cd ../frontend
        npm install

🔧 3. Start Backend

Backend uses tsx + ESM TypeScript.
        cd backend
        npm run dev
