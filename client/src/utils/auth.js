import jwt from 'jsonwebtoken';
import { getCookie } from './cookies';

const checkAuth = () => {
  const token = getCookie('JWT');
  let session;
  try {
    if (token) {
      if (jwt.verify(token, 'todolist-epitech')) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        session = JSON.parse(window.atob(base64));
      }
    } else session = false;
  } catch (error) {
    console.log(error);
  }
  return session;
};

export default checkAuth;
