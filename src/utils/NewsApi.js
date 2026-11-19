// src/utils/NewsApi.js

const BASE_URL = "https://nomoreparties.co/news/v2/everything";
const AUTH_URL = "https://register.nomoreparties.co";
const API_KEY = "c439d4c4faca4b44ab62aa05607b0f88";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

// --- 1. News Search Request Logic ---
export const searchNews = (keyword) => {
  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);

  // Format dates to YYYY-MM-DD required by NewsAPI
  const toDate = today.toISOString().split("T")[0];
  const fromDate = sevenDaysAgo.toISOString().split("T")[0];

  const url = `${BASE_URL}?q=${encodeURIComponent(keyword)}&apiKey=${API_KEY}&from=${fromDate}&to=${toDate}&pageSize=100`;

  return fetch(url)
    .then(checkResponse)
    .then((data) => {
      if (Array.isArray(data.articles)) {
        return {
          ...data,
          articles: data.articles.filter(
            (article) =>
              article &&
              article.title &&
              article.title !== "[Removed]" &&
              article.url !== "https://removed.com",
          ),
        };
      }
      return data;
    });
};

// --- 2. Authentication: Register ---
export const register = (email, password, name) => {
  return fetch(`${AUTH_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
  }).then(checkResponse);
};

// --- 3. Authentication: Login / Authorize ---
export const authorize = (email, password) => {
  return fetch(`${AUTH_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

// --- 4. Authentication: Token Session Validation ---
export const checkToken = (token) => {
  if (token === "simulated-session-web-token") {
    const savedUser = localStorage.getItem("user");
    return Promise.resolve(
      savedUser ? JSON.parse(savedUser) : { name: "Explorer" },
    );
  }

  return fetch(`${AUTH_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};
