import React, { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listenAuthState } from './lib/users/operation';
import { RootStore, User } from './lib/types';

const Auth: React.FC<ReactNode> = ({ children }): any => {
  const dispatch = useDispatch();
  const { isSignedIn } = useSelector<RootStore, User>((state) => state.user);

  useEffect(() => {
    if (!isSignedIn) {
      dispatch(listenAuthState());
    }
  }, []);

  if (!isSignedIn) {
    return <h2 className="loading">Loading...</h2>
  } else {
    return children;
  }
};

export default Auth;
