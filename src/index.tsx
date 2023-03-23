import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import './index.scss';
import { store } from './store/store';
import WorkersList from './app/Layout/workersList/workerList';
import WorkerDetails from './app/Layout/workerDetails/workerDetails';
import WorkerEditView from './app/Layout/workerEditView/workerEditView';

const container = document.getElementById('root')!;
const root = createRoot(container);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '',
        element: <Navigate to="/workers" replace />
      },
      {
        path: "workers",
        element: <WorkersList />,
      },
      {
        path: "workers/:id",
        element: <WorkerDetails />,
      },
      {
        path: "workers/edit",
        element: <WorkerEditView />,
      },
      {
        path: "workers/:id/edit",
        element: <WorkerEditView />,
      },
      {
        path: '*',
        element: <Navigate to="/workers" replace />
      }
    ],
  },
]);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider >
);

reportWebVitals();
