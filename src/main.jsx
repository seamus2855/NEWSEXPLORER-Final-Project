
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// Fixed: Corrected the relative path structure to look inside the active directory directory
import App from './components/App/App.jsx'; 
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
