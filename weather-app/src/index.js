import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store'
import { BrowserRouter } from'react-router-dom';
import dotenv from 'react-dotenv';
//dotenv.config();

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('/service-worker.js')
//     .then((registration) => {
//       console.log('Service Worker registered with scope:', registration.scope);
//     })
//     .catch((error) => {
//       console.error('Service Worker registration failed:', error);
//     });
// }
const root = ReactDOM.createRoot(document.getElementById('root'));
//const store = createStore(rootReducer, applyMiddleware(thunk));//this could be created in a separate store.js file
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <Provider store={store}>
    <React.StrictMode>
    <BrowserRouter>
    <App/>
    </BrowserRouter>
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
