🧩 Dynamic Form Builder — Full-Stack Application

A full-stack dynamic form builder system that generates forms from a backend-driven schema, handles user submissions, and displays previous submissions in a sortable and paginated interface.

📚 Table of Contents

Overview

Features

Tech Stack

Architecture

API Endpoints

Project Structure

Setup & Installation

Screenshots

Future Enhancements

Contributing

License

🔍 Overview

This project is designed to demonstrate a full-stack dynamic form builder.
The backend serves a dynamic form schema and handles form submissions, while the frontend consumes these APIs to:

✔ Render forms dynamically
✔ Validate and submit data
✔ Display previous submissions
✔ Support pagination & sorting
✔ Provide a clean and responsive UI

The main goal is to allow the form to be changed without editing frontend code — all logic is driven by the backend schema.

🚀 Features
Backend

Dynamic form schema endpoint

Form submission endpoint

Database storage for submissions

Pagination & sorting support

Schema-based validation

Modular and scalable structure

Frontend

Dynamic form generation from API schema

Supports text, number, select, checkbox, radio, textarea, date

Inline form validation

Paginated and sortable submission table

Modern and responsive UI

Clean project structure

🏗 Tech Stack
Frontend

React / Next.js / Vue (choose your stack)

Axios / Fetch API

TailwindCSS / Bootstrap / Custom CSS

Backend

Node.js + Express

MongoDB / PostgreSQL / MySQL

REST API

🧱 Architecture

       ┌────────────────────┐
       │      FRONTEND      │
       │  (React / Vue)     │
       └───────┬────────────┘
               │ API Calls
               ▼
       ┌────────────────────┐
       │      BACKEND       │
       │ (Node.js/Express)  │
       └───────┬────────────┘
               │ DB Queries
               ▼
       ┌────────────────────┐
       │     DATABASE       │
       └────────────────────┘
📡 API Endpoints
GET /api/form/schema

Returns the dynamic form structure.

Example Response:

    {
  "title": "User Registration",
  "fields": [
    { "name": "fullName", "label": "Full Name", "type": "text", "required": true },
    { "name": "email", "label": "Email", "type": "email", "required": true },
    { "name": "age", "label": "Age", "type": "number", "required": false }
  ]
}


POST /api/form/submit

Accepts form submission data.

Example Request:
       {
  "fullName": "John Doe",
  "email": "john@example.com",
  "age": 29
}

GET /api/form/submissions?page=1&limit=10&sortBy=createdAt&order=desc

Returns paginated & sortable submissions.

Example Response:

{
  "page": 1,
  "totalPages": 3,
  "submissions": [
    {
      "fullName": "John Doe",
      "email": "john@example.com",
      "age": 29,
      "createdAt": "2025-01-01T10:00:00Z"
    }
  ]
}


📁 Project Structure

/backend
  ├── controllers/
  ├── routes/
  ├── models/
  ├── utils/
  ├── server.js

/frontend
  ├── src/
  │   ├── components/
  │   ├── pages/
  │   ├── utils/
  ├── package.json

README.md


⚙ Setup & Installation
1️⃣ Clone Repository

git clone https://github.com/your-username/dynamic-form-builder.git
cd dynamic-form-builder

2️⃣ Backend Installation

cd backend
npm install
npm run dev

Create a .env file:

PORT=5000
DB_URL=your_database_connection_string

3️⃣ Frontend Installation

cd frontend
npm install
npm run dev

🤝 Contributing

Contributions are welcome!
Feel free to open an issue or submit a pull request.

📄 License

This project is licensed under the MIT License.

