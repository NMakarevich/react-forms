import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@app/App.tsx';
import ControlledFormPage from '@pages/controlled-form-page/controlled-form-page.tsx';
import NotFoundPage from '@pages/not-found-page.tsx';
import UncontrolledFormPage from '@pages/uncontrolled-form-page/uncontrolled-form-page.tsx';
import { Layout, routes } from '@shared/index';
import { BrowserRouter, Route, Routes } from 'react-router';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path={routes.main.getLink()} element={<App />} />
          <Route
            path={routes.uncontrolled.getLink()}
            element={<UncontrolledFormPage />}
          />
          <Route
            path={routes.controlled.getLink()}
            element={<ControlledFormPage />}
          />
          <Route path={routes.notFound.getLink()} element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </StrictMode>
);
