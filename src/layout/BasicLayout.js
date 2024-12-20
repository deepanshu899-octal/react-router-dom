import { useEffect, useState } from 'react';
import { Outlet, Link,useNavigate  } from 'react-router-dom';

const BasicLayout = () => {
  const [isLogin,setIsLogin] = useState(JSON.parse(localStorage.getItem("isLogin")));
  const navigate = useNavigate();
  useEffect(()=>{

  },[isLogin])
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/auth/dashboard">Dashboard</Link></li>
            <li><Link to="/auth/profile">Profile</Link></li>
            <li><Link to="/lightbox">LightBox</Link></li>
            <li><Link to="/payment">payment</Link></li> 
            <li><Link to="/paypal">paypal</Link></li> 
            <li><Link to="/bankTransfer">bank transfer</Link></li>
            <li><Link to="/lazyComponent">lazy Component</Link></li>
            <li><Link to="/location">location</Link></li>
            <li><Link to="/ImageGalleryModal2">ImageGalleryModal2</Link></li>
            <li><Link to="/reactgridgallery">React-Grid-gallery</Link></li>
          </ul>
        </nav>
       {
        !isLogin ? (
          <button onClick={()=>{
            localStorage.setItem("isLogin",true);
            setIsLogin(true) 
          }}>Login</button>
        ) : (
          <button onClick={()=>{
            localStorage.setItem("isLogin",false)
            setIsLogin(false) 
          }}>Logout</button>
        )
       }
      </header>
      
      <main>
        {/* Child routes will be rendered here */}
        <Outlet />
      </main>
      
      <footer>Footer</footer>
    </div>
  );
};

export default BasicLayout;
