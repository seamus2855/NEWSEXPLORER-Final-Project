// src/utils/NewsApi.js
const IS_PRODUCTION = import.meta.env.MODE === 'production';

// News Search Endpoint
const BASE_URL = IS_PRODUCTION 
  ? 'https://nomoreparties.co/news/v2/everything' 
  : 'https://newsapi.org/v2/everything';

// 🍏 Authentication backend server domain endpoint
const AUTH_URL = 'https://register.nomoreparties.co'; 

const API_KEY = 'YOUR_NEWS_API_KEY_HERE'; // Replace with your actual key

// --- 1. News Search Request Logic ---
export const searchNews = (keyword) => {
  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);

  const toDate = today.toISOString().split('T')[0];
  const fromDate = sevenDaysAgo.toISOString().split('T')[0];

  const url = `${BASE_URL}?q=${encodeURIComponent(keyword)}&apiKey=${API_KEY}&from=${fromDate}&to=${toDate}&pageSize=100`;

  return fetch(url).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  });
};

// --- 2. Authentication: Token Session Validation ---
export const checkToken = (token) => {
  return fetch(`${AUTH_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  }).then((res) => {
    if (res.ok) {
      return res.json(); // Returns the { name, email } profile payload data
    }
    return Promise.reject(`Token Error: ${res.status}`);
  });
};

// --- 3. Authentication: Login / Authorize ---
export const authorize = (email, password) => {
  return fetch(`${AUTH_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password })
  }).then((res) => {
    if (res.ok) {
      return res.json(); // Returns the session JWT token payload
    }
    return Promise.reject(`Login Error: ${res.status}`);
  });
};
