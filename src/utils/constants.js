// src/utils/constants.js

// 1. Fixed: Swapped process.env for Vite's import.meta.env mode string and appended paths
export const NEWS_API_BASE_URL = import.meta.env.MODE === 'production' 
  ? 'https://nomoreparties.co' 
  : 'https://newsapi.org';

// 2. Define other shared constants below it, like your API key or headers
export const API_KEY = 'your_actual_api_key_here';
