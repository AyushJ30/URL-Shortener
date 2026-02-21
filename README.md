# 🔗 Full-Stack URL Shortener

A robust, full-stack URL shortening web application built with a React frontend and a Node.js/Express backend. It allows users to create, manage, and track custom shortened URLs while offering secure user authentication, profile image uploads, and automated email notifications.

## 🚀 Features

* **Custom URL Generation & Redirection:** Convert long URLs into compact, easily shareable links.
* **User Authentication:** Secure login and registration system utilizing JSON Web Tokens (JWT) and HTTP-only cookies for session management.
* **Analytics Tracking:** Automatically logs the timestamp and counts the number of clicks/visits for every generated link.
* **Automated Mailing System:** Integrates `Nodemailer` to automatically dispatch personalized welcome emails upon successful user sign-up.
* **File Uploads:** Uses `Multer` middleware to handle `multipart/form-data`, allowing users to upload and locally store profile pictures.
* **MVC Architecture:** Clean, maintainable backend structure separating Models, Views (React frontend), and Controllers.
* **Responsive Single Page Application:** Dynamic, seamless routing handled by React Router without page reloads.

## 🛠️ Tech Stack

**Frontend:**
* React 19 (built with Vite)
* React Router v7
* Axios (for API requests)
* Vanilla CSS

**Backend:**
* Node.js & Express.js
* MySQL (Database)
* Sequelize (ORM for database modeling and associations)
* JSON Web Tokens (JWT) (Authentication)
* Multer (File handling)
* Nodemailer (SMTP email integration)

---

## ⚙️ Local Setup & Installation

### Prerequisites
Make sure you have the following installed on your machine:
* [Node.js](https://nodejs.org/en/)
* [MySQL](https://www.mysql.com/)

### 1. Clone the Repository
```bash
git clone [https://github.com/AyushJ30/URL-Shortener.git](https://github.com/AyushJ30/URL-Shortener.git)
cd URL-Shortener
```

### 2. Backend Setup
```bash
cd server
npm install
```
Start the Backend Server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd client
npm install
```
Start the Frontend Server:
```bash
npm run dev
```

### 4. Database Initialization
Ensure your local MySQL server is running and you have created a database named url_shortener. And use sequelize.sync() function to sync the models (Users, URLs, and Visits) when the server connects.

## 📂 Project Architecture (MVC)
The backend follows the Model-View-Controller design pattern:

**Models (/server/models)**: Sequelize schemas defining User, Url, and Visit tables, including one-to-many relationships with cascading deletes.

**Views (/client)**: The React frontend, segmented into modular components (Dashboard, Login, Signup, Create, Update).

**Controllers (/server/controllers)**: Contains the core business logic for handling user requests, database interactions, and API responses.

**Routes (/server/routes)**: Express routers mapping incoming HTTP requests to their respective controller functions.

**Middlewares (/server/middlewares)**: Handles JWT token verification and role-based route protection.

***

### A Few Quick Tips Before You Commit This:
1. Make sure to double-check the `git clone` link under the Installation section to ensure it matches your repository perfectly.
2. In the `.env` example section, I left placeholders like `your_mysql_password` so that other developers know what to fill in without you exposing your actual credentials!
