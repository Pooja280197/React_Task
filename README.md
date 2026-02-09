# React_Task
This is a simple React-based CRUD web-application to manage users data.
The application is designed with extensibility in mind.New form fields can be added with minimal code changes by updating the 'FormConfig.ts' file.


## Features :
- Create,Read,Update and delete users
- Form Validation for required fields
- Phone number validation
- Simple UI using normal CSS
- Mock API using JSON Server
- Minimal Typescript usage for type safety

## Tech:
- React
- TypeScript(minimal)
- JSON server(mock API)
- Plain CSS
- Git and GitHub

## Extensibility
To add a new form field:
1. Open 'FormConfig.ts
2. Add a new field configuration object 

## Setup & Run Instructions
- git clone https://github.com/Pooja280197/React_Task.git
- cd <project-folder>
- Install dependencies using npm install
- Install JSON Server(Mock API) using npx json-server --watch db.json --port 3001
- Start application using npm run dev

## Mock API Details
Available API endpoints:
- GET /users
- POST /users
- PUT /users/:id
- DELETE /users/:id

## UI and UX Decisions
- The user list is displayed on demand using a button
- Simple layout for clarity and usability

## Deployment
The application is deployed on vercel
Live Demo - https://react-task-snowy-ten.vercel.app/






