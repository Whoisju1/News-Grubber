import React, { createContext, useContext, useReducer, useState, useEffect } from 'react'
import { NotificationCtx } from './notificationCtx';

export interface UserCredentials { username: string; password: string };
export interface User {
  _id: '',
  token: '',
  username: '',
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
  const getToken = () => localStorage.getItem('token');

  const setToken = ((token: string) => localStorage.setItem('token', token));

  const clearToken = () => localStorage.removeItem('token');

  const tokenManager = {
    getToken,
    setToken,
    clearToken,
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetch('/api/auth/user', {
        headers: {
          authorization: `Bear ${tokenManager.getToken()}`,
        }
       })
       .then(data => data.json())
       .then(user => {
         dispatch({
           type: 'LOGIN',
           data: { ...user, token: tokenManager.getToken() },
         });
       });
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
    signin: (body) => {
      fetch('/api/auth/signin', {
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })
      .then(res => res.json())
      .then(data => {
        tokenManager.setToken(data.token);
        dispatch({
          type: 'LOGIN',
          data,
        })
        setIsLoggedIn(true);
        notify({
          body: `${data.username} signed in`
        });
      })
      .catch((e) => {
        console.dir(e);
      });
    },
    signup: (body) => {
      fetch('/api/auth/signup', {
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })
      .then(res => res.json())
      .then(data => {
        tokenManager.setToken(data.token);
        dispatch({
          type: 'SIGNUP',
          data,
        });
        setIsLoggedIn(true);
      });
    },
    unregister: () => void(0),
  }

  return (
    <AuthContext.Provider value={ctxValue}>
      {children}
    </AuthContext.Provider>
  )
};
