import jwt from 'jsonwebtoken';
import { User } from './types';
import { useGetToken, useSetToken } from '../store/tokenStore';
import { useEffect, useMemo } from 'react';

export const parseToken = (token: string) => {
  const decodedToken = jwt.decode(token, { json: true });
  if (!decodedToken) {
    return null;
  }

  if (!decodedToken.exp) {
    return null;
  }

  const parsedUser = User.safeParse(decodedToken);
  if (!parsedUser.success) {
    return null;
  }

  return {
    ...decodedToken,
    ...parsedUser.data,
    exp: decodedToken.exp,
  };
};

export const isExpired = (token: string) => {
  const decodedToken = parseToken(token);
  if (!decodedToken) {
    return true;
  }

  return decodedToken.exp < Date.now() / 1000;
};

export const useCheckTokenExpiration = () => {
  const token = useGetToken();
  const setToken = useSetToken();
  const parsedToken = useMemo(
    () => (token ? parseToken(token) : null),
    [token]
  );

  useEffect(() => {
    if (!parsedToken) {
      setToken(null);
      return;
    }

    setTimeout(() => {
      console.log('Token expired');
      setToken(null);
    }, parsedToken.exp * 1000 - Date.now() - 1000);
  }, [parsedToken, setToken]);
};
