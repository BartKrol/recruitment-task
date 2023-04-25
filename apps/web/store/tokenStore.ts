import { atom, useSetAtom, useAtomValue } from 'jotai';
import jwt from 'jsonwebtoken';

const tokenAtom = atom<string | undefined | null>(undefined);

const TOKEN_KEY = 'token';

tokenAtom.onMount = (setValue) => {
  setValue(localStorage.getItem(TOKEN_KEY));
};

export const tokenAtomWithPersistance = atom(
  (get) => {
    const token = get(tokenAtom);

    if (!token) {
      return null;
    }

    const decodedToken = jwt.decode(token, { json: true });
    if (!decodedToken) {
      localStorage.removeItem(TOKEN_KEY);
      return null;
    }

    if (!decodedToken.exp) {
      localStorage.removeItem(TOKEN_KEY);
      return null;
    }

    if (decodedToken.exp < Date.now() / 1000) {
      localStorage.removeItem(TOKEN_KEY);
      return null;
    }

    return token;
  },
  (_get, set, newToken: string) => {
    set(tokenAtom, newToken);
    localStorage.setItem('token', newToken);
  }
);

type User = {
  id: string;
};

export const userAtom = atom<User | null | undefined>((get) => {
  const token = get(tokenAtomWithPersistance);

  if (token === undefined) {
    return undefined;
  }

  if (!token) {
    return null;
  }

  const decodedToken = jwt.decode(token, { json: true });

  if (!decodedToken) {
    return null;
  }

  return decodedToken as { id: string };
});

export const useSetToken = () => useSetAtom(tokenAtomWithPersistance);
export const useGetToken = () => useAtomValue(tokenAtomWithPersistance);

export const useGetUser = () => useAtomValue(userAtom);
