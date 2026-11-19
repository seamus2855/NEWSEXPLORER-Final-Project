# NewsExplorer — Final Project

An interactive, responsive single-page news aggregation and search application built with React and Vite. Users can search worldwide news topics via the NewsAPI proxy service, read full articles, and authenticate profiles to save and manage bookmarked articles.

## 🔗 Project Links

- **Live Deployment (GitHub Pages):** [NewsExplorer Live App](https://seamus2855.github.io/NEWSEXPLORER-Final-Project)
- **Project Repository:** [https://github.com/seamus2855/NEWSEXPLORER-Final-Project](https://github.com/seamus2855/NEWSEXPLORER-Final-Project)
- **Project Video Demonstration (Loom):** [https://www.loom.com/share/1b23e2911c21477c829fc65326e934c4](https://www.loom.com/share/1b23e2911c21477c829fc65326e934c4)

---

## 🛠️ Infrastructure & Tech Stack

- **Frontend Library:** React 19 (Functional components with custom hooks and Context API)
- **Build Tool & Dev Server:** Vite 8 (Configured with GitHub Pages base path and optimized asset bundling)
- **Routing:** React Router v7 (`BrowserRouter` with protected route guards)
- **Data Integration:** NewsAPI Proxy Service (`https://nomoreparties.co`)
- **Code Quality:** ESLint 10 with React Hooks rules

---

## 📥 Local Installation and Execution Instructions

Follow these steps to run the project locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com
   cd NEWSEXPLORER-Final-Project
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the linter:**

   ```bash
   npm run lint
   ```

4. **Start the local Vite development server:**

   ```bash
   npm run dev
   ```

   _Open the local address printed in your terminal (typically `http://localhost:5173`) in your browser._

5. **Build and deploy to GitHub Pages:**

   ```bash
   npm run build
   npm run deploy
   ```

---

## 🔒 API & Environment Configuration

All news search and session validation requests are handled inside `src/utils/NewsApi.js` using the TripleTen NewsAPI proxy endpoint so production and preview builds avoid browser CORS restrictions:

```javascript
const BASE_URL = "https://nomoreparties.co";
```
