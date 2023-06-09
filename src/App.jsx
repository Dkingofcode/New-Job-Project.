// App.js

import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import GPSummaryPage from './components/GPSummaryPage';
import GPSDetailPage from './components/GPSDetailPage';
import { authenticateUser, fetchGPSData } from './api'; // Functions to handle API calls
//import { redirect } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  Navigate,
  useParams,
  useNavigate } from 'react-router-dom';
import Signup from './components/signup';
import ErrorPage from './components/ErrorPage';



const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginToken, setLoginToken] = useState('');
  const [gpsData, setGPSData] = useState([]);
  
  useEffect(() => {
    // Check if the user is already logged in
    const token = localStorage.getItem('loginToken');
    if (token) {
      setLoggedIn(true);
      setLoginToken(token);
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const loginResponse = await authenticateUser(username, password);
      setLoggedIn(true);
      <Navigate to="/" replace/>
      setLoginToken(loginResponse.loginToken);
      localStorage.setItem('loginToken', loginResponse.loginToken);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setLoginToken('');
    localStorage.removeItem('loginToken');
    <Navigate to="/login" replace/>
  };

  useEffect(() => {
    const fetchGPSDataAndStore = async () => {
      try {
        const gpsData = await fetchGPSData(loginToken);
        setGPSData(gpsData);
      } catch (error) {
        console.error('Failed to fetch GPS data', error);
      }
    };

    if (loggedIn && loginToken) {
      fetchGPSDataAndStore();
    }
  }, [loggedIn, loginToken]);

      
  function ProtectedRoute({ user, children }) {

    if(!user) {
      return (
        <Navigate to="/login" replace/>
      );
    }
  
    return children;
  }

  // const Router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <LoginPage />
  //   },
  // ]);

  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <LoginPage onLogin={handleLogin} />
  //   },
      
  //       {
  //         path: "/gps-summary",
  //         {loggedIn ? (
  //            element:  <GPSummaryPage gpsData={gpsData} onLogout={handleLogout} />
  //             ) : (
  //            <redirect to="/" />
  //            )}
  //        // element: <GPSummaryPage gpsData={gpsData} onLogout={handleLogout} />,
  //       },
  //       {
  //         path: "/gps-detail/:deviceId",
  //         element: <GPSDetailPage gpsData={gpsData} />,
  //       }
  // ]);


  // <Route
  // path="dashboard"
  // loader={async () => {
  //   const user = await fake.getUser();
  //   if (!user) {
  //     // if you know you can't render the route, you can
  //     // throw a redirect to stop executing code here,
  //     // sending the user to a new route
  //     throw redirect("/login");
  //   }


  return (
    <Router>
      <Routes>
      <Route path="/login" element={<LoginPage onLogin={handleLogin} />}  />
      <Route path="/signup" element={<Signup />} />  
      <Route path="*" element={<ErrorPage />} />
      <Route path="/gps-summary" element={<GPSummaryPage gpsData={gpsData} onLogout={handleLogout} />} />
      <Route path='/gps-detail/:deviceId' element={<GPSDetailPage gpsData={gpsData} />} />
            {/* All routes are nested inside it */}
    </Routes>
    </Router>

    // <Router>
    //   <div className="app">
    //     <Routes>
    //     <Route exact path="/">
    //         <LoginPage onLogin={handleLogin} />
    //     </Route>
    //     {/* <Route path="/gps-summary">
    //       
    //     </Route>
    //     <Route path="/gps-detail/:deviceId">
    //       {loggedIn ? (
    //         <GPSDetailPage gpsData={gpsData} />
    //       ) : (
    //         <Redirect to="/" />
    //       )}
    //     </Route> */}
    //     </Routes>
    //   </div>
    // </Router>
  );
};

export default App;
