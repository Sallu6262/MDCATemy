import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './LandingPage.css'
import App from './App.jsx'

// Initialize theme before React paints
const savedTheme = localStorage.getItem('mdcatemy-theme');
const initialTheme = savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'dark';

//document.documentElement means <html>
//dataset means data- and we have data-theme
document.documentElement.dataset.theme = initialTheme;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
