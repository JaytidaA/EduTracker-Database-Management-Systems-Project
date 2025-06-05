# EduTracker - Attendance Management System

## Overview
EduTracker is a comprehensive attendance tracking system designed for educational institutions. The system operates on private networks to ensure data security while providing an efficient way for faculty to track student attendance and for students to view their attendance records.

## Key Features
- **Secure Authentication**: JWT-based authentication system with role-based access control
- **Real-time Attendance Tracking**: Faculty can create and manage lecture sessions
- **Attendance Reporting**: Comprehensive attendance reporting for both students and faculty
- **Course Management**: Administrative tools to manage courses and enrollments
- **Private Network Security**: System designed to work only on institutional private networks

## Technology Stack
- **Backend**: Express.js server with RESTful API architecture
- **Database**: SQLite with comprehensive relational schema design
- **Authentication**: JWT-based authentication with bcrypt password hashing
- **Frontend**: React Native application (in separate branch)

## Database Design
EduTracker utilizes a carefully designed relational database with the following key tables:
- **Department**: Stores department information
- **Student**: Manages student data with departmental relationships
- **Faculty**: Stores faculty information with administrative privileges
- **Course**: Maintains course details with relationships to departments and faculty
- **Enrolls**: Junction table managing the many-to-many relationship between students and courses
- **Lectures**: Tracks individual lecture sessions for each course
- **Attendance**: Records attendance status for each student per lecture

### Entity-Relationship Diagram
[Placeholder for ER Diagram]

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Backend Setup
1. Clone the repository:
```sh
git clone https://github.com/yourusername/EduTracker-Database-Management-Systems-Project.git
cd EduTracker-Database-Management-Systems-Project/backend
```

2. Install dependencies:
```sh
npm install
```

3. Setup the database:
```sh
cd db
chmod +x update.sh
./update.sh
```

4. Start the development server:
```sh
npm run test
```

### API Routes
- `/signup` - For creating new user accounts (admin only)
- `/login` - Authentication endpoint
- `/home` - Main dashboard data
- `/attendance/:cID` - Attendance data for specific course
- `/mark` - Endpoint for marking attendance
- `/course` - Course management (admin only)

## Security Features
- JWT-based authentication with token expiration
- Bcrypt password hashing with configurable salt rounds
- IP filtering to ensure the application is only accessed from private networks
- Role-based access control for different system features

## Screenshots
[Placeholder for Login Screen]
[Placeholder for Dashboard]
[Placeholder for Attendance Marking Interface]
[Placeholder for Reports Screen]

## Future Enhancements
- Real-time notifications for absence warnings
- Integration with institutional LMS systems
- Advanced analytics for attendance patterns
- Mobile application for attendance marking using location verification

## Contributors
- [Your Name]
- [Other Contributors]
