import { useRoutes } from 'react-router-dom';
import Profile from '../pages/Profile';
import AuthLayout from '../layout/AuthLayout';
import Dashboard from '../pages/DashBoard'

// Simulated authentication status
const isAuthenticated = true;

const AuthRoutes = {
      path: '/auth',
      element: <AuthLayout isAuthenticated={isAuthenticated} />,
      children: [
        { path: 'profile', element: <Profile /> },
        { path: 'dashboard', element: <Dashboard /> },
      ],
    }

export default AuthRoutes;
