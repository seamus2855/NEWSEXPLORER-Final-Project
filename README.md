# NewsExplorer — Final Project

An interactive, responsive single-page news aggregation search engine application built with React and Vite. Users can query worldwide news topics using the NewsAPI system, read articles, and securely authenticate simulated profiles to manage saved bookmark structures.

## 🔗 Project Links

*   **Live Deployment (GitHub Pages):** [https://github.io](https://github.io)
*   **Project Repository:** [https://github.com/seamus2855/NEWSEXPLORER-Final-Project](https://github.com/seamus2855/NEWSEXPLORER-Final-Project)
*   **Project Video Demonstration (Loom):** [https://www.loom.com/share/1b23e2911c21477c829fc65326e934c4](https://www.loom.com/share/1b23e2911c21477c829fc65326e934c4)

---

## 🛠️ Infrastructure & Tech Stack

*   **Frontend Library:** React 19 (Functional architecture with custom Hooks and Context Providers)
*   **Build Utility & Local Server:** Vite 8 (Configured with optimized single-page asset pipelines)
*   **Routing Architecture:** React Router v7 (`HashRouter`/`BrowserRouter` layout switching)
*   **Data Integration:** NewsAPI Proxy Services (`https://nomoreparties.co`)
*   **Code Verification:** ESLint 10 (Strict validation configuration matching code quality policies)

---

## 📥 Local Installation and Execution Instructions

Follow these instructions to run the application workspace inside your local development environment:

1. **Clone the project repository branch:**
   ```bash
   git clone https://github.com
   cd NEWSEXPLORER-Final-Project
   ```

2. **Install the node module packages:**
   ```bash
   npm install
   ```

3. **Verify code quality benchmarks (Run the Linter):**
   ```bash
   npm run lint
   ```

4. **Initialize the local Vite development server:**
   ```bash
   npm run dev
   ```
   *Open the printed local network loopback address (typically `http://localhost:5173`) inside your browser window.*

5. **Compile a production build manually:**
   ```bash
   npm run build
   ```

---

## 🔒 Environment Variable Configuration

The application uses an conditional module checking routine inside `src/utils/constants.js` to automatically redirect endpoints based on the deployment target environment:

```javascript
const IS_PRODUCTION = import.meta.env.MODE === 'production';

export const NEWS_API_BASE_URL = IS_PRODUCTION 
  ? 'https://nomoreparties.co' 
  : 'https://newsapi.org';
```
