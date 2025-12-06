import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/styles/styles.css';
import App from './App.tsx'
import { CartProvider } from './context/CartContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </StrictMode>,
)
