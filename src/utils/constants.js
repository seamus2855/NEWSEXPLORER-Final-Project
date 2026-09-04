// src/utils/constants.js

// 1. Define the base URL conditionally based on the environment
export const NEWS_API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://nomoreparties.co' 
  : 'https://newsapi.org';

// 2. You can also define other shared constants below it, like your API key or headers
export const API_KEY = 'your_actual_api_key_here'; 
