// Project Title: Trading Card Box Set Sales Management System
// Group 4: Alexander Nunez and Emmanuel Vazquez
// Originality: Copied from Dr.Curry exploration "Web Application Technology"
// Source: https://canvas.oregonstate.edu/courses/2051721/pages/exploration-web-application-technology-2?module_item_id=26923351 
// AI Scope: AI tools were not used
// Contains the code to add the functionality for route handling in React.
// Date: July 27 2026

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </StrictMode>,
);
