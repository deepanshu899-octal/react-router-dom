import { useRoutes } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import BasicLayot from "../layout/BasicLayout"

const CommonRoutes = {
      path: '/',
      element: <BasicLayot />,
      children: [
        { path: '/', element: <Home /> },
        { path: 'about', element: <About /> },
        { path: 'contact', element: <Contact /> },
      ],
    };
  

export default CommonRoutes;