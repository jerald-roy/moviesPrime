# MoviePrime — MERN Stack Movie Application

## 1. Project Name and Description
**MoviePrime** is a full-stack web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) that allows movie enthusiasts to explore trending films, view detailed descriptions, and manage a personalized watchlist stored securely in a database.

---

## 2. Features
- **Explore & Search:** Browse through an interactive movie grid with dynamic posters, types, and release years.
- **Persistent Watchlist:** Save your favorite movies to a dedicated watchlist backed by MongoDB and Mongoose.
- **RESTful API Backend:** Clean Express routes handling CRUD operations for user watchlists.
- **Responsive Design:** Styled with Tailwind CSS for a sleek, dark-themed cinematic interface optimized for both mobile and desktop.

---

## 3. Technologies Used
- **Frontend:** 
  - React.js (with Hooks and React Router)
  - Tailwind CSS
- **Backend:** 
  - Node.js
  - Express.js
- **Database & ODM:** 
  - MongoDB
  - Mongoose
- **Tooling:** 
  - Git & GitHub
  - Postman / VS Code

## Setup and Installation Instructions

### 1\. Clone the Repository

Clone the project repository from GitHub and navigate into the root directory:

```
git clone <repository-url>
cd <project-directory>
```

### 2\. Install Dependencies

You need to install dependencies for both the root (backend) directory and the client (frontend) directory.

Run the following commands in your terminal:

```
# Install backend dependencies from the root directory
npm install

# Navigate to the client folder and install frontend dependencies
cd client
npm install

# Return to the root directory
cd ..
```

### 3\. Configure Environment Variables

Create a `.env` file in the root directory of the project and add your configuration details. Use the template below:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_jwt_secret_key_here
```

## How to Run the Application

To run the application locally, you will need two separate terminal windows (one for the backend server and one for the frontend client).

### Step 1: Start the Backend Server

From the root directory of the project, start the backend server in development mode:

```
npm run dev
```

*You should see confirmation messages indicating that the server is running on port 5000 and successfully connected to MongoDB.*

### Step 2: Start the Frontend Client

Open a second terminal window, navigate into the `client` directory, and start the React development server:

```
cd client
npm run dev
```

### Step 3: Access the Application

Open your web browser and navigate to:

```
http://localhost:3000
```

*(Note: Depending on your Vite/React setup, check your client terminal if the port is `5173` instead).*

## AI Development Experience

### AI Tool Selection & Reflection
* **Tool Explored:** **Kiro**
* **Usage & Reflection:** 
  For this project, the primary codebase and application structure were developed manually that including with chat agents like gemeni and chatgpt for syntax and ui style creation. After completing the initial project build, **Kiro** was explored to analyze its spec-driven agentic workflow, evaluate its feature set, and see how it could streamline future iterations.

### What is Kiro?
Kiro is an AI-powered agentic development platform designed for spec-driven software engineering. Rather than simply generating isolated snippets of code, Kiro converts high-level prompts and requirements into structured user stories, executable tasks, and automated implementation plans across both backend and frontend layers.

### Key Features of Kiro
- **Spec-Driven Workflows:** Automatically breaks down complex software requirements into formal specifications and step-by-step developer tasks.
- **Agentic Code Execution:** Autonomously creates, updates, and refactors multi-file features across backend and frontend codebases.
- **Context-Aware Debugging:** Analyzes full workspace files, runtime logs, and database models to trace root causes and suggest inline fixes.
- **Automated Test Generation:** Generates unit and integration tests aligned with system specifications to verify features before deployment.

---

### Specific Tasks Explored with Kiro
1. **API Creation & Endpoint Verification**  
   Evaluated Kiro by providing backend requirements to generate RESTful endpoints, validating request payloads, controller logic, and route middleware structure.

2. **Database Integration & Schema Design**  
   Tested Kiro’s ability to refine Mongoose schema definitions, insert indexes, and ensure proper data modeling for MongoDB.

3. **Debugging & Error Handling**  
   Leveraged Kiro to scan backend controllers for edge-case errors, improving async error handling and standardized response formats.

4. **Code Refactoring & Optimization**  
   Used Kiro to review existing React frontend components and backend middleware, identifying opportunities to reduce duplicate code and enhance overall readability.

5. **Unit & Integration Testing**  
   Generated test cases using Kiro to verify key API routes and ensure backend controller responses match expected JSON structures.
