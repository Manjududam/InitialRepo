import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiMenu4Fill, RiCloseFill } from "react-icons/ri";
import { BsPersonFill } from "react-icons/bs";
import { logout } from "../../utils/authUtils/logout";
import { FaSearch } from "react-icons/fa";
import { useSearchContext } from "../States/SearchContext";
import axios from "axios";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();
  const userType = localStorage.getItem("userType");
  const [inputValue, setInputValue] = useState('');
  const [tooltipData, setTooltipData] = useState([]);

  const { handleSearch } = useSearchContext();

  useEffect(() => {
    const fetchTooltipData = async () => {
      if (inputValue.trim()) {
        try {
          const response = await axios.get(
            "http://localhost:8088/data/getJobs"
          );
          setTooltipData(response.data);
        } catch (error) {
          console.error("Error fetching tooltip data:", error);
        }
      } else {
        setTooltipData([]);
      }
    };

    fetchTooltipData();
  }, [inputValue]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      handleSearch("");
    } else {
      handleSearch(inputValue);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleProfileClick = () => {
    setShowProfile(!showProfile);
  };

  return (
    <div className="navbar bg-white fixed top-0 w-full h-16 shadow-lg z-10">
      <div className="container mx-auto flex justify-between items-center h-full px-4 gap-10">
        <Link to="/" className="text-xl font-semibold">
          NayanTech.com
        </Link>
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="text-gray-800 focus:outline-none"
          >
            {showMenu ? <RiCloseFill size={24} /> : <RiMenu4Fill size={24} />}
          </button>
        </div>
        <div className="hidden md:flex items-center flex-1 justify-between">
          <form onSubmit={handleSubmit} className="relative w-full max-w-md">
            <div className="flex items-center gap-2 bg-white text-black border border-gray-300 rounded-md focus-within:border-blue-600">
              <input
                type="text"
                placeholder="Search for jobs"
                value={inputValue}
                onChange={handleChange}
                className="py-2 px-4 rounded-md border-none bg-transparent focus:outline-none flex-1"
              />
              <button type="submit">
                <FaSearch size={22} className="text-gray-500 cursor-pointer mr-2" />
              </button>
            </div>
            {tooltipData.length > 0 && (
              <div className="absolute z-10 mt-1 bg-white border border-gray-300 w-full rounded-md shadow-lg">
                <ul className="py-1">
                  {tooltipData.map((item, index) => (
                    <li key={index} className="px-3 py-1">
                      <button
                        onClick={() => {
                          setInputValue(item.title);
                          handleSearch(item.title);
                        }}
                        className="block text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        {item.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </form>
          <div className="flex items-center gap-8">
            <Link to="/profile" className="hidden text-black hover:text-gray-700">Profile</Link>
            <Link to="/" className="hidden md:inline-block text-black hover:text-gray-700">Jobs</Link>
            <Link to="/about" className="hidden md:inline-block text-black hover:text-gray-700">About</Link>
            <Link to="/companies" className="hidden md:inline-block text-black hover:text-gray-700">Companies</Link>
            {userType === "professional" && (
              <Link to="/postJob" className="hidden md:inline-block text-black hover:text-gray-700">Post a Job</Link>
            )}
            {userType ? (
              <div className="relative">
                <div
                  className="bg-gray-300 h-10 w-10 rounded-full cursor-pointer flex justify-center items-center"
                  onClick={handleProfileClick}
                >
                  <BsPersonFill size={20} />
                </div>
                {showProfile && (
                  <div className="absolute bg-white rounded-lg shadow-lg p-2 w-48 top-full right-0 mt-2">
                    <ul className="text-sm">
                      <Link to="/profile">
                        <li className="py-2 hover:bg-gray-200 cursor-pointer">View Profile</li>
                      </Link>
                      <Link to="/profile">
                        <li className="py-2 hover:bg-gray-200 cursor-pointer">Update Profile</li>
                      </Link>
                      {/* <Link to="/">
                        <li className="py-2 hover:bg-gray-200 cursor-pointer">Jobs</li>
                      </Link>
                      <Link to="/about">
                        <li className="py-2 hover:bg-gray-200 cursor-pointer">About</li>
                      </Link>
                      <Link to="/companies">
                        <li className="py-2 hover:bg-gray-200 cursor-pointer">Companies</li>
                      </Link> */}
                      {/* {userType === "professional" && (
                        <Link to="/postJob">
                          <li className="py-2 hover:bg-gray-200 cursor-pointer">Post a Job</li>
                        </Link>
                      )} */}
                      <li className="py-2 hover:bg-gray-200 cursor-pointer">
                        <button
                          onClick={handleLogout}
                          className="text-left w-full"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-300 ease-in-out mr-2"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded-md transition-colors duration-300 ease-in-out"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      {showMenu && (
        <div className="md:hidden bg-gray-100 absolute top-16 right-0 w-full shadow-lg z-20">
          <ul className="flex flex-col items-center py-4">
            <li>
              <Link to="/profile" className="block py-2 text-black hover:text-gray-700">Profile</Link>
            </li>
            <li>
              <Link to="/" className="block py-2 text-black hover:text-gray-700">Jobs</Link>
            </li>
            <li>
              <Link to="/about" className="block py-2 text-black hover:text-gray-700">About</Link>
            </li>
            <li>
              <Link to="/companies" className="block py-2 text-black hover:text-gray-700">Companies</Link>
            </li>
            {userType === "professional" && (
              <li>
                <Link to="/postJob" className="block py-2 text-black hover:text-gray-700">Post a Job</Link>
              </li>
            )}
            <li>
              <button
                onClick={handleLogout}
                className="block py-2 text-white bg-red-600 hover:bg-red-700 rounded-md w-3/4 text-center"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
