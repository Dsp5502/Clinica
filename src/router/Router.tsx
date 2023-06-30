import { createBrowserRouter } from 'react-router-dom';

import { Layout } from '../components/Layout';
import { Index } from '../pages/Index';
import { Patients } from '../pages/Patients';
import { Doctors } from '../pages/Doctors';
import { NewPatient } from '../pages/NewPatient';
import { LayoutPatients } from '../components/LayoutPatients';
import { LoginPage } from '../pages/LoginPage';
import { PrivateRoute } from './PrivateRoute';

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
// export const router = createBrowserRouter([
// {
//   path: '/',
//   element: <Layout />,
//   children: [
//     {
//       index: true,
//       element: <Index />,
//     },
//     {
//       path: '/patients',
//       element: <LayoutPatients />,
//       children: [
//         {
//           index: true,
//           element: <Patients />,
//         },
//         {
//           path: 'create',
//           element: <NewPatient />,
//         },
//       ],
//     },
//     {
//       path: '/doctors',
//       element: <Doctors />,
//     },
//   ],
// },
// ]);
