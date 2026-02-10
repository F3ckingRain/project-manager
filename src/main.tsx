import { createRoot } from 'react-dom/client'
import './index.css'
import { AppLayout } from './Layout'

// Рендер приложения в DOM.
createRoot(document.getElementById('root')!).render(
  <AppLayout />
)
