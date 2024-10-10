import { useRoutes } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import BasicLayot from "../layout/BasicLayout"
import Light_box from '../pages/Light_box';
import PaymentForm from '../pages/PaymentForm';


const CommonRoutes = {
      path: '/',
      element: <BasicLayot />,
      children: [
        { path: '/', element: <Home /> },
        { path: 'about', element: <About /> },
        { path: 'contact', element: <Contact /> },
        { path: 'lightbox', element: <Light_box /> },
        { path: 'payment', element: <PaymentForm /> },
      ],
    };
  

export default CommonRoutes;