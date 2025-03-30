# HERo Blog - Frontend (React)

## Project Overview

HERo is a safe space created by women, for women. It is a community where women can find support, share their thoughts, and access valuable resources. The mission of HERo is to empower women through knowledge, connection, and solidarity.

At HERo, professionals contribute insightful articles on various topics that matter to women. Whether it's personal growth, career development, health, or relationships, HERo is a hub for reliable and empowering content. While anyone can read these articles, only registered users can engage in discussions through comments, ensuring a safe and constructive environment.

## Key Features

- **User Roles & Permissions**:
  - Guests: Can only view content.
  - Regular Users: Can view and comment on articles.
  - Editors: Can create, edit, and delete their own articles.
  - Administrators: Can manage all content and comments.
- **Authentication & Authorization**:
  - JWT-based authentication
  - User registration and profile editing
- **Article Management**:
  - CRUD operations for blog articles
  - Filtering by title, content, date, author, tags, and category
- **Commenting System**:
  - Users can comment on articles
  - Users can delete/edit their own comments
  - Admins can delete any comment
- **Database Seeding**:
  - Initial data happens on backend, and includes 3 users, 3 articles, and 2 comments per article

## Tech Stack

- **Frontend**: React
- **Styling**: Bootstrap, Sass
- **Routing**: React Router DOM
- **API Requests**: JavaScript-Fetch
- **Form Handling**: Formik
- **Validation**: Yup

## Installation & Setup

### Prerequisites

- Node.js (version 18+ recommended)
- A running backend API (refer to the Backend README for setup instructions)

### Steps to Set Up

1. Clone the repository:
   ```sh
   git clone https://github.com/reutrose/HERo_blog_frontend.git
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   - Make sure to include an `.env` file in the project root with the relevant content.
   - If you do not have access to the `.env` file, create an `.env` file that contains: (VITE_API_URL).
4. Start the development server:
   ```sh
   npm run dev
   ```
5. Open the application in your browser at:
   ```
     http://localhost:5173
   ```

## API Endpoints

The frontend interacts with the following API endpoints from the backend:

### Authentication

- `POST /api/register/` - Register a new user
- `POST /api/token/` - Obtain access and refresh tokens
- `POST /api/token/refresh/` - Refresh authentication token

### Articles

- `GET /api/articles/` - Retrieve all articles
- `GET /api/articles/?search=<query>` - Search articles
- `GET /api/articles/<id>/` - Retrieve a specific article
- `POST /api/articles/` - Create a new article
- `PUT /api/articles/<id>/` - Edit an article
- `DELETE /api/articles/<id>/` - Delete an article

### Comments

- `GET /api/articles/<id>/comments/` - Retrieve comments for an article
- `POST /api/comments/` - Create a new comment
- `DELETE /api/comments/<id>/` - Delete a comment

## Dependencies

### Frontend Dependencies

     ```
     bootstrap: ^5.3.3
     date-fns: ^4.1.0
     formik: ^2.4.6
     jwt-decode: ^4.0.0
     prop-types: ^15.8.1
     react: ^19.0.0
     react-dom: ^19.0.0
     react-router-dom: ^6.30.0
     react-toastify: ^11.0.5
     sass: ^1.86.0
     yup: ^1.6.1
     ```

### Development Dependencies

     ```
     @eslint/js: ^9.21.0
     @vitejs/plugin-react: ^4.3.4
     eslint: ^9.21.0
     vite: ^6.2.0
     ```

## Notes

- The `.env` file is excluded from the repository for security reasons.
- If the `.env` file is missing, ensure you have the correct backend server URL in the `.env` file.
- The frontend and backend repositories are separate, and the frontend communicates with the backend via the API.
- The project is for educational purposes and is not intended for commercial use.

---

### License

This project is for educational purposes and is not intended for commercial use.

---

### Author

Developed as part of the Full-Stack Web Development course assignment.

- Email: rosenfeldreut@gmail.com
