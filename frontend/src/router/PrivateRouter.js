import React, { useContext } from 'react';

import { Outlet, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Context } from '../context/Context';

const PrivateRouter = () => {
  let currentUser =
    useContext(Context).currentUser || localStorage.getItem('user') || null;

  if (!currentUser) {
    toast.warning('You need to login first!');
    return <Navigate to="/auth/login" replace />;
  } else {
    return <Outlet />;
  }
};

export default PrivateRouter;
