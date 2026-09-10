# 📝 Blogify — Full-Stack Blogging Platform

> A full-stack blogging platform where users can create, manage, discover, and interact with blog posts through a secure and user-friendly web application.

<p align="center">
  <a href="https://blogify-9cpu.onrender.com">
    <strong>🌐 Live Demo</strong>
  </a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="https://github.com/Subham-063/Blogify">
    <strong>📂 GitHub Repository</strong>
  </a>
</p>

---

## 📌 Overview

**Blogify** is a full-stack blogging web application built with **Node.js, Express.js, MongoDB Atlas, EJS, and Tailwind CSS**.

The application provides a complete blogging workflow with user authentication, blog creation and management, image uploads, search functionality, and commenting.

The project follows an **MVC-style architecture** to keep routes, models, middleware, services, and views organized and maintainable.

### 🌐 Live Application

**[Visit Blogify →](https://blogify-9cpu.onrender.com)**

---

## ✨ Features

### 🔐 Authentication & Authorization

- User registration and login
- JWT-based authentication
- Authentication using HTTP cookies
- Protected routes using authentication middleware
- User-specific blog management

### 📝 Blog Management

- Create new blog posts
- View published blogs
- Edit existing blogs
- Delete blogs
- Display author information
- Display publication date
- Search blogs by title

### 🖼️ Image Uploads

- Upload profile images
- Upload blog cover images
- Handle uploaded images using Multer
- Serve uploaded images through Express static middleware

### 💬 Comments

- Add comments to blog posts
- Display comments associated with each blog
- Associate comments with authenticated users

### 🎨 User Interface

- Server-rendered pages using EJS
- Tailwind CSS based styling
- Reusable EJS partials
- Navigation, head, and script partials for maintainability

### ☁️ Deployment

- MongoDB Atlas for cloud database hosting
- Render for application deployment
- GitHub for source-code management

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| **Runtime** | Node.js |
| **Backend** | Express.js |
| **Database** | MongoDB, MongoDB Atlas |
| **ODM** | Mongoose |
| **Frontend** | HTML5, EJS, Tailwind CSS |
| **Authentication** | JWT, HTTP Cookies |
| **File Uploads** | Multer |
| **Version Control** | Git, GitHub |
| **Deployment** | Render |

---

## 🏗️ Project Structure

```text
Blogify/
│
├── middlewares/
│   └── authentication.js
│
├── models/
│   ├── blog.js
│   ├── comment.js
│   └── user.js
│
├── public/
│   ├── images/
│   └── uploads/
│
├── routes/
│   ├── blog.js
│   └── user.js
│
├── services/
│   └── auth.js
│
├── views/
│   ├── partials/
│   │   ├── head.ejs
│   │   ├── nav.ejs
│   │   └── script.ejs
│   │
│   ├── addBlog.ejs
│   ├── blog.ejs
│   ├── editBlog.ejs
│   ├── home.ejs
│   ├── signin.ejs
│   └── signup.ejs
│
├── .env
├── .gitignore
├── .nvmrc
├── app.js
├── package.json
└── package-lock.json
