import { createRoot } from 'react-dom/client'
import './index.css'
import "flag-icons/css/flag-icons.min.css";
import { AppLayout } from './Layout'
import 'Translations'
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import store from 'Store';

// Рендер приложения в DOM.
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <AppLayout />
    </Provider>
  </BrowserRouter>
)
