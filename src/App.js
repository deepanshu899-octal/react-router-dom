import { BrowserRouter as Router } from 'react-router-dom';
import MainRoutes from './routes/MainRoutes';

function App() {
  return (
    <Router>
      <MainRoutes />
    </Router>
  );
}

export default App;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Link, Outlet,useParams } from 'react-router-dom';

// const App = () => {
//   return (
//     <Router>
//       <nav>
//         <Link to="/">Home</Link>
//         <Link to="/dashboard">Dashboard</Link>
//         <Link to="/dashboard/settings/1">Settings</Link> {/* Example Link */}
//       </nav>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/dashboard/*" element={<Dashboard />}>
//           {/* Nested routes */}
//           <Route path="profile" element={<Profile />} />
//           <Route path="settings/:id" element={<Settings />} /> {/* Fixed path for settings */}
//         </Route>
//       </Routes>
//     </Router>
//   );
// };

// const Home = () => <h1>Home Page</h1>;

// const Dashboard = () => {
//   return (
//     <div>
//       <h1>Dashboard</h1>
//       {/* The Outlet component will render the child route content here */}
//       <Outlet />
//     </div>
//   );
// };

// const Profile = () => <h2>Profile Page</h2>;

// const Settings = () => {
//   // Access the id parameter using the useParams hook
//   const { id } = useParams();
//   return <h2>Settings Page for ID: {id}</h2>;
// };

// export default App;
