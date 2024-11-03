import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import debounce from 'debounce';
import { store } from './redux/store/index.ts';
import { saveState } from './redux/store/helpers';
import { App } from './App.tsx';
import Loading from './pages/Loading/index.tsx';

import './main.css';
import './shared/assets/fonts/Roboto/index.css';

// Сохранение в localStorage состояния Redux Store
store.subscribe(
  debounce(() => {
    saveState(store.getState());
  }, 800)
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <React.Suspense fallback={<Loading />}>
      <App />
    </React.Suspense>
  </Provider>
);
