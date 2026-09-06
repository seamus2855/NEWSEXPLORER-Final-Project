// src/utils/newsApi.js

// Fixed: Swapped process.env for Vite's native import.meta.env checker
const IS_PRODUCTION = import.meta.env.MODE === 'production';

// Fixed: Appended the correct endpoint paths explicitly to both domain branches
const BASE_URL = IS_PRODUCTION 
  ? 'https://nomoreparties.co/news/v2/everything' 
  : 'https://newsapi.org/v2/everything';

const API_KEY = 'YOUR_NEWS_API_KEY_HERE'; // Replace with your actual key

export const searchNews = (keyword) => {
  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);

  // Format dates to YYYY-MM-DD required by NewsAPI
  const toDate = today.toISOString().split('T')[0];
  const fromDate = sevenDaysAgo.toISOString().split('T')[0];

  // Constructed URL with all 5 required parameters
  const url = `${BASE_URL}?q=${encodeURIComponent(keyword)}&apiKey=${API_KEY}&from=${fromDate}&to=${toDate}&pageSize=100`;

  return fetch(url).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  });
};
