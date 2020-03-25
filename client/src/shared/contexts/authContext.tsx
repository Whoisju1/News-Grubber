import React, { createContext, useContext, useReducer, useState, useEffect } from 'react'
import { NotificationCtx } from './notificationCtx';
import { signIn } from '../../utils/requests';
import getFetchedData from '../../utils/throwIfError';

export interface UserCredentials { username: string; password: string };
export interface User {
  _id: string,
  token: string,
  username: string,
}

export interface IAuthCtx {
  signin: (cred: UserCredentials) => void;
  user: User | null,
  signup: (cred: UserCredentials) => void;
  logout: () => void;
  isLoggedIn: boolean | null;
  unregister: () => void;
}

export const AuthContext = createContext<IAuthCtx>({
  signin: () => void(0),
  signup: () => void(0),
  logout: () => void(0),
  isLoggedIn: false,
  user: null,
  unregister: () => void(0),
});

interface Props {
  children: React.ReactNode;
}

type State = User | null;

interface Action {
  type: 'LOGOUT' | 'LOGIN' | 'UNREGISTER' | 'SIGNUP';
  data: User | null;
}


export const AuthProvider: React.FC<Props> = ({ children }) => {
  const { notify } = useContext(NotificationCtx);
  const getToken = () => localStorage.getItem('token')!;

  const setToken = ((token: string) => localStorage.setItem('token', token))!;

  const clearToken = () => localStorage.removeItem('token')!;

  const tokenManager = {
    getToken,
    setToken,
    clearToken,
  };

  useEffect(() => {
    if (isLoggedIn) {
      (async () => {
        try {
          const data = await fetch('/api/auth/user', {
            headers: {
              authorization: `Bear ${tokenManager.getToken()}`,
            }
           });

           const user = await getFetchedData(data);
           dispatch({
             type: 'LOGIN',
             data: { ...user, token: tokenManager.getToken() },
           });
        } catch (err) {
          notify({ body: err.message });
        }
      })()
    }
  }, []);

  const initialState: User | null =  null;
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(!!tokenManager.getToken());
  const [user, dispatch] = useReducer((state: State, action: Action) => {
    switch (action.type) {
      case 'LOGIN':
        return action.data;
      case 'LOGOUT':
        return action.data;
      case 'SIGNUP':
        return action.data;
      case 'UNREGISTER':
        return action.data;
      default:
        return state;
    }
  }, initialState, () => initialState);

  const ctxValue: IAuthCtx = {
    isLoggedIn,
    user,
    logout: () => {
      tokenManager.clearToken();
      setIsLoggedIn(false);
      dispatch({
        type: 'LOGOUT',
        data: null,
      });
      notify({
        body: 'Logged Out'
      });
    },
    signin: async (body) => {
      try {
        const data = await signIn(body);
        tokenManager.setToken(data.token);
        dispatch({
          type: 'LOGIN',
          data,
        })
        setIsLoggedIn(true);
        notify({
          body: `${data.username} signed in`
        });
      } catch (error) {
        const { message } = error;
        notify({
          body: message,
        });
      }
    },
    signup: async (body) => {
      try {
        const response = await fetch('/api/auth/signup', {
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        });
        const data = await getFetchedData(response);
        tokenManager.setToken(data.token);
        dispatch({
          type: 'SIGNUP',
          data,
        });
        setIsLoggedIn(true);
      } catch ({ message }) {
          return notify({
            body: message,
          });
      }
    },
    unregister: () => void(0),
  }

  return (
    <AuthContext.Provider value={ctxValue}>
      {children}
    </AuthContext.Provider>
  )
};
