import React, {
    createContext,
    useEffect,
    useReducer
  } from 'react';
  import axios from 'axios';
  import { base_url, key_session_user } from '../utils/constants';
import { isValidToken } from '../utils/utils';
  
  const initialAuthState = {
    isAuthenticated: false,
    isInitialised: false,
    user: null
  };

  
  const setSession = (accessToken) => {
    if (accessToken) {
      localStorage.setItem(key_session_user, JSON.stringify(accessToken));
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken.token}`;
    } else {
      localStorage.removeItem(key_session_user);
      delete axios.defaults.headers.common.Authorization;
    }
  };
  
  const reducer = (state, action) => {
    switch (action.type) {
      case 'INITIALISED': {
        const { isAuthenticated, user } = action.payload;
  
        return {
          ...state,
          isAuthenticated,
          isInitialised: true,
          user
        };
      }
      case 'LOGIN': {
        const { user } = action.payload;
  
        return {
          ...state,
          isAuthenticated: true,
          user
        };
      }
      case 'LOGOUT': {
        return {
          ...state,
          isAuthenticated: false,
          user: null
        };
      }
      default: {
        return { ...state };
      }
    }
  };
  
  const AuthContext = createContext({
    ...initialAuthState,
    method: 'JWT',
    login: () => Promise.resolve(),
    logout: () => { },
  });
  
  export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialAuthState);
  
    const login = async (email, password) => {
      const response = await axios.post(base_url + '/api/connect', { email: email, password: password });
      const token = response.data;
      let user = token.user;
      setSession(token );
      dispatch({
        type: 'LOGIN',
        payload: {
          user
        }
      });
    };
  
    useEffect(() => {
      const initialised = async () => {
        try {
          const accessToken = JSON.parse(window.localStorage.getItem(key_session_user));
  
          if (accessToken && isValidToken(accessToken?.token)) {
            setSession(accessToken);
            let user  = accessToken.user;
            dispatch({
              type: 'INITIALISED',
              payload: {
                isAuthenticated: true,
                user
              }
            });
          } else {
            setSession(null);
            dispatch({
              type: 'INITIALISED',
              payload: {
                isAuthenticated: false,
                user: null
              }
            });
          }
        } catch (err) {
          setSession(null);
          console.error(err);
          dispatch({
            type: 'INITIALISED',
            payload: {
              isAuthenticated: false,
              user: null
            }
          });
        }
      };
  
      initialised();
    }, []);
  
    return (
      <AuthContext.Provider
        value={{
          ...state,
          method: 'JWT',
          login
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };
  
  export default AuthContext;