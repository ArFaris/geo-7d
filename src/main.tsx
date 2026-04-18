import React from 'react';
import ReactDOM from 'react-dom/client';
import { LanguageProvider } from 'contexts/LanguageContext';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { routesConfig } from 'config/routes';

const router = createBrowserRouter(routesConfig);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  </React.StrictMode>
);