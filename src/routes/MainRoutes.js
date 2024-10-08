import { useRoutes } from 'react-router-dom';
import CommonRoutes from './CommonRoutes';
import AuthRoutes from './AuthRoutes';
import NotFound from "../pages/NotFound"
import AuthRoutesFalse from './AuthRoutesFalse';

const MainRoutes = () => {
  // Combine both common and auth routes
  const isAuthenticated = JSON.parse(localStorage.getItem("isLogin"));

  const passedRoutes = isAuthenticated ? [
    CommonRoutes,  // Public routes
    AuthRoutes,    // Protected routes
    { path: '*', element: <NotFound /> },  // Fallback for unmatched routes
  ] : [
    CommonRoutes,  // Public routes
    AuthRoutesFalse,    // Protected routes
    { path: '*', element: <NotFound /> },  // Fallback for unmatched routes
  ]
  const routes = useRoutes(passedRoutes);

  return routes;
};

export default MainRoutes;
