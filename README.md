# Todo CRUD App

This project is a full-stack Todo CRUD (Create, Read, Update, Delete) application built using React.js for the frontend, Node.js with Express for the backend, and MongoDB as the database. Additionally, it includes Dockerization using Docker and Docker Compose.

## Table of Contents

- Getting Started
  - [Prerequisites](https://chat.openai.com/c/1b4e7736-933f-4e4d-a05f-2b18f07c842e#prerequisites)
  - [Installation](https://chat.openai.com/c/1b4e7736-933f-4e4d-a05f-2b18f07c842e#installation)
- [Project Structure](https://chat.openai.com/c/1b4e7736-933f-4e4d-a05f-2b18f07c842e#project-structure)
- Usage
  - [Run Locally](https://chat.openai.com/c/1b4e7736-933f-4e4d-a05f-2b18f07c842e#run-locally)
  - [Dockerization (Optional)](https://chat.openai.com/c/1b4e7736-933f-4e4d-a05f-2b18f07c842e#dockerization-optional)
- [Endpoints](https://chat.openai.com/c/1b4e7736-933f-4e4d-a05f-2b18f07c842e#endpoints)
- [Authentication](https://chat.openai.com/c/1b4e7736-933f-4e4d-a05f-2b18f07c842e#authentication)
- [Filtering and Additional Routes](https://chat.openai.com/c/1b4e7736-933f-4e4d-a05f-2b18f07c842e#filtering-and-additional-routes)
- [Mobile Responsiveness](https://chat.openai.com/c/1b4e7736-933f-4e4d-a05f-2b18f07c842e#mobile-responsiveness)
- [Contributing](https://chat.openai.com/c/1b4e7736-933f-4e4d-a05f-2b18f07c842e#contributing)
- [License](https://chat.openai.com/c/1b4e7736-933f-4e4d-a05f-2b18f07c842e#license)

## Deployed Sample

[AWS Deployed Sample](http://ec2-100-26-177-222.compute-1.amazonaws.com/)

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm (Node Package Manager)
- MongoDB

### Installation

1. Clone the repository:

   ```bash
   https://github.com/cw-barry/todo_app_2023.git
   cd todo_app_2023
   ```

2. Install dependencies for both the frontend and backend:

   ```bash
   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. Configure the MongoDB connection in the backend:

   Currently `backend/config/db.js` adjusted as to be used in Docker.

   In order to use it locally:

   - open `backend/config/.env`
   - update the MongoDB connection string
   - change ENV value as `ENV = LOCAL`

4. Frontend ENV configuration:

   Currently `frontend/.env` adjusted as to be used in Docker.

   In order to use it locally:

   - open `fronend/.env`
   - change ENV value as `REACT_APP_ENV = LOCAL`

## Project Structure

The project is organized as follows:

- `frontend`: Contains the React.js frontend code.
- `backend`: Contains the Node.js with Express backend code.
- `/`: Contains Dockerfiles and configurations for Dockerization.

## Usage

### Run Locally

1. Start the MongoDB server.

2. Run the backend server:

   ```bash
   cd backend
   npm start
   ```

   The backend server will run on [http://localhost:5000](http://localhost:5000/).

3. Run the frontend:

   ```bash
   cd frontend
   npm start
   ```

   The frontend development server will run on [http://localhost:3000](http://localhost:3000/).

4. Open your browser and go to [http://localhost:3000](http://localhost:3000/) to access the Todo CRUD app.

### Dockerization (Optional)

To run the application using Docker and Docker Compose:

1. Build the Docker images:

   ```bash
   docker-compose build
   ```

2. Run the Docker containers:

   ```bash
   docker-compose up
   ```

   The application will be accessible at [http://localhost](http://localhost/).

## Endpoints

- **GET /api/todos**: Get all todos.
- **GET /api/todos/:id**: Get a specific todo by ID.
- **POST /api/todos**: Create a new todo.
- **PUT /api/todos/:id**: Update a todo by ID.
- **DELETE /api/todos/:id**: Delete a todo by ID.
- **POST /auth/login**: Login user and return token.
- **POST /auth/register**: Register user and return token.

## Authentication

The application uses basic authentication. Include your token with `Bearer` tag in the authorization headers for authorized access.

## Filtering and Additional Routes

- **GET /api/todos?search[category]=movie**: Get todos by category.
- **GET /api/todos?search[completed]=true**: Get completed todos.
- Additional routes for custom queries and sorting.

## Mobile Responsiveness

The application is designed to be responsive and usable on various screen sizes.

## Contributing

Feel free to contribute to the project by opening issues or submitting pull requests.

## License

This project is licensed under the [MIT License](https://mit-license.org/).
