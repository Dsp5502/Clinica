import { Navigate, Outlet } from 'react-router-dom';
import { decodeToken } from '../helpers/decodeToken';

export const PrivateRoute = () => {
  const { token, expirationDate } = decodeToken();

  return !token || expirationDate <= new Date() ? (
    <Navigate to='/login' />
  ) : (
    <Outlet />
  );
};
