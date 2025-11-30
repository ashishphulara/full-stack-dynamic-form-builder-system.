# full-stack-dynamic-form-builder-system.
A full-stack system for dynamically rendering forms from a backend-defined schema, handling submissions, and displaying submission history in a paginated, sortable table.


📌 Overview

The objective of this project is to build a full-stack dynamic form builder system.
The backend provides APIs that supply a dynamic form schema and handle form submissions.
The frontend consumes these APIs to:

Render the form dynamically

Validate and submit data

Fetch & display prior submissions

Support pagination, sorting, and clean UI rendering

This architecture allows the form to be changed without modifying frontend code — only the backend schema needs to be updated.

🚀 Features
✓ Backend

Exposes a dynamic form schema (/api/form/schema)

Accepts form submissions (/api/form/submit)

Stores submissions in a database

Provides paginated & sortable submission history (/api/form/submissions)

Validation based on schema rules

Modular & extensible architecture

✓ Frontend

Dynamically renders forms from API schema

Supports text, number, dropdown, checkbox, radio, date, and textarea fields

Client-side validation mapped from the schema

Submits data to backend

Displays submissions in a table with:

Pagination

Sorting (ascending/descending)

Clean UI

Responsive layout

🏗️ Tech Stack
Backend

Node.js / Express (or your chosen framework)

MongoDB / PostgreSQL / MySQL (configurable)

REST API architecture

Frontend

React / Next.js / Vue (your choice)

Axios or Fetch API

Tailwind / Bootstrap / Custom CSS

🗂️ API Endpoints
GET /api/form/schema

Returns the dynamic form schema.

Example response:
{
  "title": "User Registration",
  "fields": [
    { "name": "fullName", "label": "Full Name", "type": "text", "required": true },
    { "name": "age", "label": "Age", "type": "number", "required": true, "min": 1 },
    { "name": "email", "label": "Email", "type": "email", "required": true }
  ]
}

POST /api/form/submit

Submits form data.

Example request:
{
  "fullName": "John Doe",
  "age": 30,
  "email": "john@example.com"
}

Example response:
{ "success": true, "message": "Submission saved." }

GET /api/form/submissions?page=1&limit=10&sortBy=createdAt&order=desc

Fetches paginated and sortable submissions.

Example response:
{
  "page": 1,
  "totalPages": 5,
  "submissions": [
    {
      "fullName": "John Doe",
      "age": 30,
      "email": "john@example.com",
      "createdAt": "2025-01-01T12:00:00Z"
    }
  ]
}

🧱 Project Structure
/backend
  /src
    controllers/
    routes/
    models/
    utils/
  server.js

/frontend
  /src
    components/
    pages/
    utils/
  package.json

README.md

🛠️ Installation & Setup
1. Clone the repository
git clone https://github.com/your-username/dynamic-form-builder.git
cd dynamic-form-builder

2. Backend Setup
cd backend
npm install
npm start


Create a .env file:

PORT=5000
DB_URL=your_database_connection_string

3. Frontend Setup
cd frontend
npm install
npm start


The frontend will automatically connect to the backend API.

🧪 How It Works

The frontend requests the schema from the backend.

The UI builds the form by looping through each schema field.

The user submits the form → data is validated and saved.

The frontend fetches all submissions and shows them in a sortable, paginated table.

📈 Future Enhancements

Form builder UI (drag & drop fields)

Multi-step forms

User authentication

Field-level conditional logic

Multi-form support (schemas stored per form ID)

🤝 Contributing

Pull requests are welcome!
Feel free to submit improvements, bug fixes, or suggestions.

📄 License

MIT License — free to use and modify.

If you want, I can also generate for you:
✔ API documentation (Swagger-style)
✔ ERD / database schema diagram
✔ Sample schema files
✔ Component breakdown for frontend
✔ Full folder structure with boilerplate code

Just tell me!
