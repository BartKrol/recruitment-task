import { atom, useSetAtom, useAtomValue } from 'jotai';
import { parseToken } from '../utils/token';
import { User } from '../utils/types';

const tokenAtom = atom<string | undefined | null>(undefined);

const TOKEN_KEY = 'token';

tokenAtom.onMount = (setValue) => {
  setValue(localStorage.getItem(TOKEN_KEY));
};

export const tokenAtomWithPersistance = atom(
  (get) => {
    const token = get(tokenAtom);

    if (token === undefined) {
      return undefined;
    }

    if (!token) {
      return null;
    }

    const decodedToken = parseToken(token);
    if (!decodedToken || decodedToken.exp < Date.now() / 1000) {
      localStorage.removeItem(TOKEN_KEY);
      return null;
    }

    return token;
  },
  (_get, set, newToken: string | null) => {
    set(tokenAtom, newToken);
    newToken
      ? localStorage.setItem(TOKEN_KEY, newToken)
      : localStorage.removeItem(TOKEN_KEY);
  }
);

export const userAtom = atom<User | null | undefined>((get) => {
  const token = get(tokenAtomWithPersistance);

  if (token === undefined) {
    return undefined;
  }

  if (!token) {
    return null;
  }

  const decodedToken = parseToken(token);

  if (!decodedToken) {
    return null;
  }

  return User.parse(decodedToken);
});

export const useSetToken = () => useSetAtom(tokenAtomWithPersistance);
export const useGetToken = () => useAtomValue(tokenAtomWithPersistance);

export const useGetUser = () => useAtomValue(userAtom);
