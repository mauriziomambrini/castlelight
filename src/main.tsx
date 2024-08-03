import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { RouterProvider } from 'react-router-dom';
import i18n from './i18n';
import router from './routes.tsx';
import './styles/main.scss';
import QuizProvider from '@/contexts/QuizContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <QuizProvider>
        <RouterProvider router={router} />
      </QuizProvider>
    </I18nextProvider>
  </React.StrictMode>,
);
