import { StrictMode } from 'react'; // Swapped from importing whole React object
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App/App.jsx'; 
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode> {/* Fixed: Removed the "React." prefix */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
