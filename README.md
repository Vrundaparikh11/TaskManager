# Task Management Application

A simple full-stack task management application with a Node.js/Express backend and a vanilla HTML/CSS/JS frontend.

## Features

- Core Functionalities: Create, read, update, and delete tasks.
- Backend: RESTful API using Node.js and Express.
- Data Storage: In-memory data storage (for demo purposes).
- Frontend: Vanilla JavaScript on the frontend fetching from the API.

## Project Structure

- `server.js` - The backend Express server and API endpoints.
- `public/` - The frontend assets (HTML, CSS, JavaScript).

## Prerequisites

- Node.js installed on your machine.

## Getting Started

1. **Install Dependencies**
   Run the following command to install the required dependencies (Express):
   ```bash
   npm install
   ```

2. **Start the Application**
   Start the Node.js server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:3000`.

3. **Access the Application**
   Open your browser and navigate to `http://localhost:3000` to view and use the Task Manager.

## Assumptions
- **Single User Context**: The application assumes a single-user environment. There is no authentication, authorization, or multi-user state separation.
- **Local Network Usage**: The system is designed to run locally, and network latency or complex CORS setups are not accounted for.
- **Basic Task Structure**: Tasks are simple, containing only an ID, title, and a boolean status for completion.

## Tradeoffs
- **In-Memory Storage**: Data is stored in memory (`const tasks = []`). This means all data is lost when the Node server restarts. This tradeoff was made for the sake of simplicity and ease of setup without needing an external database.
- **Vanilla Frontend**: The frontend is built using vanilla HTML, CSS, and JavaScript. While this avoids the overhead of a build system (like Webpack or Vite) and dependency on frameworks (like React), it could make scaling the application's UI complexity more challenging.
- **Monolithic Server File**: All server logic (routes, data access, static serving) is contained within a single `server.js` file. This is acceptable for a small demo but would be separated into controllers, models, and routes in a production environment.
