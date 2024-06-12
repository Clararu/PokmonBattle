# Pokemon Battle

This project is a full-stack application built with Node.js, Express, React, MongoDB, and Mongoose. It uses Vite for the frontend build tool.

## Backend

The backend is located in the `Backend/` directory. It's a Node.js application using Express for the server, MongoDB as the database, Mongoose as the ODM, and EJS for templating. The main entry point is `app.js`.

The backend uses the following dependencies:

- `axios` for making HTTP requests
- `cors` for handling CORS
- `express` for the server
- `mongoose` for MongoDB object modeling
- `nodemon` for development

The backend also includes routes, controllers, and models for handling Pokemon data. It will soon include a MongoDB database for persistent data storage.

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
# Or, using pnpm
pnpm i
pnpm run dev
# Or, using bun
bun install
bun run dev
```

To run the frontend, navigate to the Frontend/ directory and run:

```sh
npm i
npm run dev
# Or, using pnpm
pnpm i
pnpm run dev
# Or, using bun
bun install
bun run dev
```
