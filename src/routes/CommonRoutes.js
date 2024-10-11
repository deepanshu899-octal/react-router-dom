import { useRoutes } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import BasicLayot from "../layout/BasicLayout"
import Light_box from '../pages/Light_box';
import PaymentForm from '../pages/PaymentForm';
import Success from '../pages/Success';
import BankTransferPage from '../pages/BankTransferPage';
import PayPalPage from '../pages/PaylPalPage';


const CommonRoutes = {
      path: '/',
      element: <BasicLayot />,
      children: [
        { path: '/', element: <Home /> },
        { path: 'about', element: <About /> },
        { path: 'contact', element: <Contact /> },
        { path: 'lightbox', element: <Light_box /> },
        { path: 'payment', element: <PaymentForm /> },
        { path: 'Success', element: <Success /> },
        { path: 'bankTransfer', element: <BankTransferPage /> },
        { path: 'paypal', element: <PayPalPage /> },
      ],
    };
  

export default CommonRoutes;