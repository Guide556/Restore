import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/layout/App';
import './index.css';

import reportWebVitals from './reportWebVitals';

import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import { StoreProvider } from './app/context/StoreContext';

import { store } from './app/store/configureStore';
import { Provider } from "react-redux";
import { fetchProductsAsync } from './features/catalog/catalogSlice';

export const history = createBrowserHistory({ window });

console.log(store.getState())
store.dispatch(fetchProductsAsync())


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <HistoryRouter history={history}>
      <Provider store={store}>
        <App />
      </Provider>  
  </HistoryRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
