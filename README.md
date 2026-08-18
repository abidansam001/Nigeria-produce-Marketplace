# Nigeria Produce Marketplace

A full-stack marketplace MVP for Nigerian farmers and buyers. It includes produce listings, search, ordering, and a ready-to-deploy Express + SQLite backend.

## Features
- Farmer listing management
- Search and filter produce listings
- Buyer order placement
- SQLite-backed persistence
- React frontend with a simple production build
- Local deployment via Express static serving

## Quick start

1. Install dependencies:
   npm install
2. Initialize the SQLite database with sample Nigerian produce:
   npm run seed
3. Start the app in development mode:
   npm run dev
4. Open the frontend at http://localhost:5173

## Production build

1. Build the frontend:
   npm run build
2. Start the server:
   npm start

The app will serve the built frontend and API on the same server.

## Deploying
This app is ready to deploy to a Node.js host such as Render, Railway, or any VPS. Ensure Node 18+ is available and run:

npm install
npm run seed
npm run build
npm start
