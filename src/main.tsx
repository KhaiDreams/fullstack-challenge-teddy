import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./index.css";
import { ConfirmDialog } from 'primereact/confirmdialog';
import './styles/TopBar.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <ConfirmDialog />
  </StrictMode>,
);

document.addEventListener('click', (event) => {
  const sidebar = document.querySelector('.sidebar-menu');
  if (sidebar && !sidebar.contains(event.target as Node) && sidebar.classList.contains('visible')) {
    sidebar.classList.remove('visible');
  }
});