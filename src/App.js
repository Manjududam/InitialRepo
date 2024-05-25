import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Header/NavBar';
import Footer from './components/Header/Footer';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import JobPosting from './components/Data/JobPosting';
import JobDetails from './components/Data/JobDetails';
import { SearchProvider } from './components/States/SearchContext'; // Import the custom hook
import Profile from './components/Data/Profile';
// import ForgotPasswordModal from './components/Auth/ForgotPasswordModal';

const App = () => {

  return (
    <Router>
      <SearchProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/postJob" element={<JobPosting />} />
          <Route path="/jobDetails" element={<JobDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/" />} />
          {/* <Route path="*" element={<Navigate to="/" />} /> */}
        </Routes>
        <Footer />
      </SearchProvider>
    </Router>
  );
};

export default App;
