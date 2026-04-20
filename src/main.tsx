import React from 'react';
import ReactDOM from 'react-dom/client';
import { LanguageProvider } from 'contexts/LanguageContext';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { routesConfig } from 'config/routes';
import { AuthProvider } from 'contexts/AuthContext';

const router = createBrowserRouter(routesConfig);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LanguageProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </LanguageProvider>
  </React.StrictMode>
);
