import { lazy } from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';

const MemojiPage = lazy(() => import('./pages/Memoji/index'));

export const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route element={<MemojiPage />} path="/" />
      </Routes>
    </HashRouter>
  );
};
