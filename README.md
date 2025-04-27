# API Service Webapp

A minimal web application for demonstrating an API service concept. This project provides a simple interface for users to access API documentation, authenticate, and view their API usage.

## Features

- Public API documentation
- User authentication with Supabase
- Protected dashboard showing API token and usage
- Responsive design with TailwindCSS

## Setup

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Supabase:
   - Create a Supabase project
   - Add your Supabase URL and anon key to `auth/auth.js`
4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
/public
  ├── index.html        (Main page)
  ├── login.html        (Login page)
  ├── dashboard.html    (Protected user dashboard)
  ├── docs.html         (API documentation)
/assets
  ├── style.css         (TailwindCSS styles)
  ├── main.js           (General JavaScript functions)
/auth
  └── auth.js           (Authentication functions)
/api
  └── api.js            (API interaction functions)
```

## Technologies Used

- HTML + TailwindCSS
- Vanilla JavaScript
- Supabase Auth
- FastAPI (backend)