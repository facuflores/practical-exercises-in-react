import './index.css';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import TodoLayoutComponent from './to-do-list/components/TodoLayout.component';
import RkAndMtPanelComponent from './rick-and-morty-list/components/RkAndMtPanel.component';
import { Provider } from 'react-redux';
import { AppStore } from './shared/redux/App.store';
import RkAndMtCharacterEditComponent from './rick-and-morty-list/components/character/RkAndMtCharacterEdit.component';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Routes
const routesChilden: RouteObject[] = [
  { path: '/to-do-list', element: <TodoLayoutComponent /> },
  { path: '/rick-and-morty-list/:characterId/edit', element: <RkAndMtCharacterEditComponent /> },
  { path: '/rick-and-morty-list', element: <RkAndMtPanelComponent /> }
];

const rootRoutes = createBrowserRouter([
  { path: '/', element: <App />, children: routesChilden },
]);

root.render(
  <React.StrictMode>
    <Provider store={AppStore}>
      <RouterProvider router={rootRoutes} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
