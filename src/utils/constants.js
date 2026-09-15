// src/utils/constants.js

// 1. Check if the Vite application is running in production mode
const IS_PRODUCTION = import.meta.env.MODE === 'production';

// 2. Define the base URL conditionally with the exact endpoint path appended
export const NEWS_API_BASE_URL = IS_PRODUCTION 
  ? 'https://nomoreparties.co/news/v2/everything' 
  : 'https://newsapi.org/v2/everything';

// 3. Shared API Key (Keep placeholders out of production code)
export const API_KEY = 'c439d4c4faca4b44ab62aa05607b0f88';
