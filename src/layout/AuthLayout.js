import { Outlet, Navigate, Link } from 'react-router-dom';

const AuthLayout = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/" />; // Redirect to home if not authenticated
  }

  return (
    <div>
      <header>
        <h1>Protected Area</h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet /> {/* Render child routes if authenticated */}
      </main>
    </div>
  );
};

export default AuthLayout;
