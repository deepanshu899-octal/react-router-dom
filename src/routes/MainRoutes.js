import { useRoutes } from 'react-router-dom';
import CommonRoutes from './CommonRoutes';
import AuthRoutes from './AuthRoutes';
import NotFound from "../pages/NotFound"

const MainRoutes = () => {
  // Combine both common and auth routes
  const routes = useRoutes([
    CommonRoutes,  // Public routes
    AuthRoutes,    // Protected routes
    { path: '*', element: <NotFound /> },  // Fallback for unmatched routes
  ]);

  return routes;
};

export default MainRoutes;
