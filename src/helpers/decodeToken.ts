import jwt_decode from 'jwt-decode';

interface DecodedToken {
  exp: number;
  [key: string]: string | number;
}

export const decodeToken = (): {
  token: string | null;
  expirationDate: Date;
} => {
  const token = localStorage.getItem('authToken');
  let expirationDate = new Date();

  if (token) {
    const decoded: DecodedToken = jwt_decode(token);
    expirationDate = new Date(decoded.exp * 1000);
  }
  return { token, expirationDate };
};
