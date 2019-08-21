import React, { createContext, useReducer, useState } from 'react'

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
  const initialState: User | null =  null;
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
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
    logout: () => {},
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
        dispatch({
          type: 'LOGIN',
          data,
        });
        setIsLoggedIn(true);
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
