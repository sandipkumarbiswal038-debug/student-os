# Student OS

Student OS is a college management platform built using Django and React. It provides authentication, student and faculty management, subjects, class schedules, notifications, and other academic services.

---

## Project Overview

Student OS is designed to provide:

* Google Single Sign-On (SSO)
* Student and Faculty Management
* Subject Management
* Class Scheduling
* Notification System
* Responsive Web Interface

---

## Technology Stack

* Python
* Django
* Django REST Framework
* React
* Vite
* Tailwind CSS
* SQLite (Development)
* PostgreSQL (Production)
* Git and GitHub

---

## Installation Steps

### Clone Repository

```bash
git clone https://github.com/Narottamrout/student-os.git
cd student-os
```

### Create Virtual Environment

```bash
python -m venv venv
```

### Activate Virtual Environment

Windows:

```bash
venv\Scripts\activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Apply Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### Run Backend

```bash
python manage.py runserver
```

Backend URL:

```text
http://127.0.0.1:8000/
```

---

## Running Frontend

Go to frontend folder:

```bash
cd frontend
npm install
npm run dev
```

Frontend URL:

```text
http://localhost:5173/
```

---

## Project Structure

```text
student_os/
├── frontend/
├── student_os/
├── accounts/
├── academics/
├── notifications/
├── api_app/
├── manage.py
├── requirements.txt
└── README.md
```

---

## API Information

### Hello Endpoint

```text
GET /api/hello/
```

Response:

```json
{
  "message": "Student OS Backend Running Successfully 🚀"
}
```

### Planned APIs

```text
GET    /api/me/
GET    /api/subjects/
GET    /api/classes/today/
GET    /api/notifications/
POST   /api/notifications/create/
PATCH  /api/notifications/<id>/read/
```

---

## Week 1 Deliverables

* Repository Setup
* README Documentation
* Coding Standards
* Hello World Django Endpoint
* Tailwind Shell Rendering on Localhost

---

## Author
spine group
Student OS Project
  # 🎓 Student OS

A centralized Student Management Platform developed as part of the internship program at **NIIS Institute of Business Administration**.

The Student OS project is divided into multiple squads working together to build a complete campus management system. The **Spine Team** provides the shared backend infrastructure, authentication, database, and REST APIs that power all other modules.

---

# 📌 Week 3 Progress

By Week 3, the core backend services have been established, allowing feature teams to integrate with the Spine APIs.

### ✅ Completed

- Django Backend Setup
- Google SSO Authentication Configuration
- PostgreSQL Database Integration
- Shared REST APIs
- User Management APIs
- Subject Management APIs
- Notification APIs
- Project Documentation
- GitHub Repository Management
- API Integration Support

---

# 🚀 Project Modules

## 🏗️ Spine Team (Core Backend)

Responsible for:

- Google Authentication
- User Management
- Subject Management
- Notification Service
- Class Schedule APIs
- Shared Database
- REST APIs
- Backend Integration

---

## 📊 Dashboard Team

Features:

- Student Dashboard
- Profile Information
- Today's Classes
- Notifications
- Academic Overview

Uses APIs from the Spine Team.

---

## ✅ Attendance Team

Features:

- Attendance Records
- Attendance Reports
- Faculty Attendance
- Student Attendance History

Uses shared authentication and student data from the Spine Team.

---

## 📅 Events Team

Features:

- College Events
- Announcements
- Event Registration
- Notifications

Uses authentication and notification APIs from the Spine Team.

---

## 👤 User Roles

- Student
- Faculty
- Administrator

Each role has secure access through Google Sign-In.

---

# 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| Python | Programming Language |
| Django | Backend Framework |
| Django REST Framework | API Development |
| PostgreSQL | Database |
| Google OAuth | Authentication |
| React | Frontend |
| Tailwind CSS | UI |
| Git | Version Control |
| GitHub | Repository Hosting |
| VS Code | Development |

---

# 📂 Project Structure

```
student-os/
│
├── backend/
│
├── frontend/
│
├── docs/
│
├── api/
│
├── requirements.txt
│
├── README.md
│
└── .gitignore
```

---

# 🔌 Core REST APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/me/ | Logged-in User |
| GET | /api/subjects/ | Subject List |
| GET | /api/classes/today/ | Today's Classes |
| GET | /api/notifications/ | Notifications |
| POST | /api/notifications/create/ | Create Notification |
| PATCH | /api/notifications/{id}/read/ | Mark Notification as Read |

---

# 🔄 Integration

The Spine Team provides APIs used by all feature teams.

Dashboard Team
- Student Profile
- Notifications
- Today's Classes

Attendance Team
- Student Details
- Subjects
- Faculty Information

Events Team
- User Authentication
- Notifications
- User Details

---

# 🏛️ System Architecture

```
React + Tailwind
        │
        ▼
Django REST Framework
        │
        ▼
Google Authentication
        │
        ▼
PostgreSQL Database
        │
 ┌──────────┬─────────────┬────────────┐
 │Dashboard │Attendance   │Events      │
 └──────────┴─────────────┴────────────┘
```

---

# 📈 Week 3 Achievements

- Backend Infrastructure Completed
- Shared Database Ready
- REST APIs Developed
- Authentication Configured
- API Documentation Prepared
- GitHub Repository Updated
- Ready for Integration Testing

---

# 📅 Upcoming Work

- Complete API Testing
- Frontend Integration
- Performance Optimization
- Security Improvements
- Final Deployment
- User Acceptance Testing

---

# 👥 Team

**Project:** Student OS

**Core Team:** Spine Squad

**Developer:** Narottam Rout

**Institute:** NIIS Institute of Business Administration

**Faculty Guide:** Pravakar Mishra

**Company Guide:** Mr. Sai Sambit Nayak

---

# 📄 License

This project is developed for educational and internship purposes.
