import { createBrowserRouter } from 'react-router-dom';

import { PrivateRoute } from './PrivateRoute';

import { ErrorPage } from '../components/ErrorPage';
import { Layout } from '../components/Layout';
import { LayoutPatients } from '../components/LayoutPatients';

import { Doctors } from '../pages/Doctors';
import { EditPatient } from '../pages/EditPatient';
import { Index } from '../pages/Index';
import { LoginPage } from '../pages/LoginPage';
import { NewPatient } from '../pages/NewPatient';
import { Patients } from '../pages/Patients';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/*',
    element: <PrivateRoute />,
    children: [
      {
        path: '',
        element: <Layout />,
        children: [
          {
            index: true,
            element: <Index />,
            errorElement: <ErrorPage />,
          },
          {
            path: 'patients',
            element: <LayoutPatients />,
            children: [
              {
                index: true,
                element: <Patients />,
              },
              {
                path: 'create',
                element: <NewPatient />,
              },
              {
                path: 'edit/:id',
                element: <EditPatient />,
              },
            ],
          },
          {
            path: 'doctors',
            element: <Doctors />,
          },
        ],
      },
    ],
  },
]);
