const documentation = `
# Education Management System

## Overview
The Education Management System is a web application designed to facilitate the management of courses, grades, assignments, and student interactions. It features role-based access for Admin, Teacher, and Student roles and offers functionalities such as course enrollment, assignment submission, and grade management.

## Live API Documentation
The API is live and can be accessed at the following link:

[Education Management API Docs](https://education-system-app.onrender.com/api-docs/)

## Features
- **User Authentication**: Secure login using JWT-based authentication.
- **Role-Based Access Control**: Different roles for Admin, Teacher, and Student.
- **Course Management**: Create, update, and manage courses.
- **Assignment Management**: Create, update, and manage assignments.
- **Grade Management**: Assign and view grades for students.
- **Analytics**: Get insights into course performance and analytics.

## API Endpoints

### Authentication
- `POST /api/auth/login`: Log in a user and obtain a JWT token.
- `POST /api/auth/register`: Register a new user.

### Teacher Routes
- `PUT /api/teachers/courses/:courseId/content`: Update course content.
- `POST /api/teachers/courses/:courseId/grade`: Assign a grade to a student.
- `GET /api/teachers/courses/:courseId/analytics`: Get analytics for a course.
- `POST /api/teachers/courses/:courseId/assignments`: Create a new assignment.
- `PUT /api/teachers/assignments/:assignmentId`: Update an existing assignment.
- `DELETE /api/teachers/assignments/:assignmentId`: Delete an assignment.
- `POST /api/teachers/assignments/:assignmentId/grade`: Grade a submitted assignment.

### Student Routes
- `GET /api/students/courses`: Get all courses for the student.
- `POST /api/students/courses/:courseId/enroll`: Enroll in a specific course.
- `GET /api/students/grades`: View grades for the student.
- `GET /api/students/courses/:courseId/assignments`: View assignments for a specific course.
- `POST /api/students/assignments/:assignmentId/submit`: Submit an assignment.

## Postman Collection
A Postman JSON file is provided in the root folder of this repository for easy import into Postman. You can use this collection to test all API endpoints locally.

### Importing Postman Collection
1. Open Postman.
2. Click on the "Import" button.
3. Select the JSON file from the root folder.
4. The collection will be imported, and you can start testing the API endpoints.

## Getting Started Locally
To run the project locally, follow these steps:

1. Clone the repository:
   \`\`\`bash
   git clone <repository-url>
   cd <repository-directory>
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Create a \`.env\` file in the root directory and add your environment variables (e.g., database URI, JWT secret).

4. Start the server:
   \`\`\`bash
   npm start
   \`\`\`

The API will be available at [http://localhost:4005](http://localhost:4005).

## Contributing
Contributions are welcome! If you have suggestions or improvements, please submit a pull request or open an issue.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
`;

console.log(documentation);
