import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import ForgotPasswordModal from "./ForgotPasswordModal";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [activeButton, setActiveButton] = useState("student"); // Default state set to "student"
  const [forgotPasswordModalOpen, setForgotPasswordModalOpen] = useState(false); // State to manage modal visibility

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const type = new URLSearchParams(location.search).get("type");
    if (type) {
      setActiveButton(type);
    }
  }, [location.search]);

  const handleButtonClick = (type) => {
    setActiveButton(type); // Set the active button type
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let url;
    if (activeButton === "professional") {
      url = "http://localhost:8088/auth/professional/login";
    } else if (activeButton === "student") {
      url = "http://localhost:8088/auth/student/login";
    } else {
      // Handle invalid state
      return;
    }

    try {
      const response = await axios.post(url, {
        email,
        password,
      });
      console.log("Login Response:", response.data);
      toast.success("Logged in successfully!", {
        position: "bottom-left",
        autoClose: 1000,
      });
      setTimeout(() => {
        navigate("/");
        localStorage.setItem("userType", activeButton);
      }, 1000);
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      const errorMessage = error.response
        ? error.response.data.message
        : "An error occurred";
      toast.error(errorMessage, {
        position: "bottom-left",
        autoClose: 3000,
      });
    }
  };


  const handleForgotPasswordClick = () => {
    setForgotPasswordModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setForgotPasswordModalOpen(false); // Close the modal
  };

  const handleSendVerificationCode = (email, code) => {
    // Logic to send verification code via email
    console.log(`Sending verification code to ${email}: ${code}`);
    // Placeholder logic - replace with actual email sending code
    toast.success(`Verification code sent to ${email}`, {
      position: "bottom-left",
      autoClose: 3000,
    });
  };

  return (
    <section className="bg-white min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg relative bottom-20 animate-fade-in-down transition duration-500">
        <ToastContainer />
        <h2 className="text-3xl mb-8 text-center">Login</h2>
        <div className="flex justify-center mb-6">
          <button
            className={`mr-4 px-4 py-2 border rounded text-indigo-500 ${
              activeButton === "student"
                ? "bg-indigo-500 text-white"
                : "bg-white"
            }`}
            onClick={() => handleButtonClick("student")}
          >
            Student Login
          </button>
          <button
            className={`px-4 py-2 border rounded text-indigo-500 ${
              activeButton === "professional"
                ? "bg-indigo-500 text-white"
                : "bg-white"
            }`}
            onClick={() => handleButtonClick("professional")}
          >
            Professional Login
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              id="email"
              type="email"
              className="mt-1 px-4 py-2 block w-full rounded bg-gray-200 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password:
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="mt-1 px-4 py-2 block w-full rounded bg-gray-200 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute text-gray-500 right-4 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <BsEyeSlash size={25} /> : <BsEye size={25} />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="bg-indigo-500 text-white py-3 px-6 rounded hover:bg-indigo-600 w-full"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center text-gray-600">
        <Link
            to="#"
            className="text-indigo-500 hover:underline"
            onClick={handleForgotPasswordClick} // Open the modal when clicked
          >
            Forgot Password?
          </Link>
        </div>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-indigo-500 hover:underline">
            Sign Up
          </Link>
        </p>
         {/* ForgotPasswordModal component */}
         <ForgotPasswordModal
          isOpen={forgotPasswordModalOpen}
          onClose={handleCloseModal}
          onSend={handleSendVerificationCode} // Pass the function to send verification code
        />
      </div>
    </section>
  );
};

export default Login;
