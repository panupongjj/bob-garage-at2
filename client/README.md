# Bob's Garage - Frontend Client

React frontend application for Bob's Garage management system.

## Tech Stack

- React 18
- Vite
- React Router DOM
- Sass/SCSS
- Fetch API

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will run on `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/     # Reusable components
├── pages/          # Page components
├── context/        # React Context providers
├── services/       # API service layer
├── utils/          # Utility functions
└── styles/         # Global styles and SCSS files
```

## Features

- User authentication (Login/Register)
- Service management (Admin dashboard)
- Saved items/Favorites
- Theme switching (Light/Dark mode)
- Responsive design

## API Configuration

The frontend connects to the backend API at `http://localhost:3001/api`

Make sure the backend server is running before starting the frontend.

