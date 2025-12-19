EQUIPMENT TRACKER APP

Project Description:

    This is an equipment tracking application that allows users to add, edit, delete, and view equipment data. The project is built using React for the frontend and Node.js with Express for the backend. Data is stored in a simple JSON file.

Features:

    -View the list of all equipment

    -Add new equipment

    -Edit equipment details

    -Delete equipment

    -Validation on the input form

    -Basic styling for better user experience


Getting Started:

    Prerequisites:

        -You need to have Node.js and npm installed on your machine.

        -Node.js download


Installation:

    1. Clone the repository:

        git clone https://github.com/your-username/equipment-tracker.git

    2. Install dependencies for both frontend and backend:

        Frontend (React): Navigate to the frontend folder and run:

            cd frontend
            npm install

        Backend (Node.js): Navigate to the backend folder and run:

            cd backend
            npm install


    3. Run the Backend Server

        In the backend folder, run the following command to start the backend server:

            npm start

        The backend will be running at http://localhost:5000.

    4. Run the Frontend React App

        In the frontend folder, run the following command to start the frontend development server:

            npm start

        The frontend will be running at http://localhost:3000.

API Endpoints:

    The application exposes the following API endpoints:

        GET /api/equipment - Get all equipment

        POST /api/equipment - Add new equipment

        PUT /api/equipment/:id - Update existing equipment

        DELETE /api/equipment/:id - Delete equipment

Assumptions Made:

    The equipment data is stored in a JSON file on the backend.

    The backend API will handle all CRUD operations.