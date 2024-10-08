import { Outlet, Link } from 'react-router-dom';

const BasicLayout = () => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
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
