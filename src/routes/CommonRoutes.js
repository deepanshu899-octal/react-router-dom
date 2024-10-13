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
import Three from '../pages/Three';
import PointLightPage from '../pages/PointLightPage';
import Video_1 from '../pages/wailYasmin/Video_1';


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
        { path: 'threejs', element: <Three /> },
        { path: 'pointLight', element: <PointLightPage /> },
        { path: 'video1', element: <Video_1 /> },
      ],
    };
  

export default CommonRoutes;