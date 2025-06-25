## Project -Course Enrollment API:
    - This project is a backend RESTful API for managing a course enrollment system. It includes role-based features for Admins, Teachers, and Students. Built using Node.js, Express.js, Prisma ORM, and PostgreSQL.

## Features:
    # Authentication
        - Register (student, teacher)
        - Login (JWT-based)
        - Logout (with token blacklisting)

    # Admin APIs
        - Add, update, delete, get all qualifications
        - Get all users (with filtering, search, pagination)
        - Activate/deactivate users
        - Unenroll students from courses

    # Teacher APIs
        - Onboard teacher
        - Create, update, delete courses
        - Get own created courses
        - Get all available courses
        - Unenroll student from own course

    # Student APIs
        - Onboard student
        - Update student profile
        - Enroll in a course
        - Unenroll from a course
        - Get enrolled courses
        - View own profile


## Middleware Used:
    - authMiddleware – Verifies JWT and attaches user info to the request
    - authorizedRoles – Restricts access based on user roles (Admin, Teacher, Student)
    - blacklistedToken – Prevents access using blacklisted (logged out) tokens
    - checkActiveStatus – Denies access if a user's isActive flag is set to false

## Technologies Used
    - Node.js
    - Express.js
    - Prisma ORM
    - PostgreSQL
    - Joi (for validation)
    - JSON Web Tokens (JWT)
    - Bcrypt (for password hashing)


## Project Setup
    1.  Clone the repository: 

    2. Install dependencies : 
        - npm install
    
    3. Run Prisma migration
        - npx prisma migrate dev

    4. Start the server
        - npm start

## Deployment:
    

## Postman Collection:
