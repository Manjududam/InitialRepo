import React, { useState } from "react";
import NavBar from "./Header/NavBar";
// import Footer from "./Header/Footer";

import SignUp from "./Auth/SignUp";
import Login from "./Auth/Login";
import Jobs from "./Data/Jobs";
// import Footer from "./Header/Footer";

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="bg-white w-full h-screen flex flex-col relative overflow-auto">
      <div className="navbar">
        <NavBar setShowLogin={setShowLogin} setShowSignup={setShowSignup} />
      </div>
      <div className="flex-grow container mx-auto px-4">
        <div className="mt-8 flex items-center justify-center">
          {/* <h1 className="text-4xl font-bold text-center">Home</h1> */}
          <Jobs/>
        </div>
        <div className="mt-8 flex-grow">
          <div className="max-w-md mx-auto">
          {showLogin && <Login isSignup={false} />}
            {showSignup && <SignUp isSignup={true} />}
          </div>
        </div>
      </div>
      {/* <div className="mt-8">
        <Footer />
      </div> */}
    </div>
  );
};

export default Home;
