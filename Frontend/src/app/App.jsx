import React, { useEffect } from 'react'
import router from './routes.jsx'
import { RouterProvider } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { getCurrentUser } from '../features/auth/store/authSlice.js';

const App = () => {
  const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentUser());
    }, [dispatch]);

  return <RouterProvider router={router} />
}

export default App