# Pokemon Battle

This project is a full-stack application built with Node.js, Express, and React. It uses Vite for the frontend build tool.

## Backend

The backend is located in the `Backend/` directory. It's a Node.js application using Express for the server and EJS for templating. The main entry point is `app.js`.

The backend uses the following dependencies:

- `axios` for making HTTP requests
- `cors` for handling CORS
- `express` for the server
- `nodemon` for development

The backend also includes routes, controllers, and models for handling Pokemon data.

## Frontend

The frontend is located in the `Frontend/` directory. It's a React application built with Vite. The main entry point is `src/main.jsx`.

The frontend uses the following dependencies:

- `react` for building the UI
- `vite` for the build tool

The frontend includes several pages, components, and context providers. It also uses Tailwind CSS & DaisyUI for styling.

## Running the Project

To run the backend, navigate to the `Backend/` directory and run:

```sh
npm i
npm run dev
```

To run the frontend, navigate to the Frontend/ directory and run:

```sh
npm i
npm run dev
```
