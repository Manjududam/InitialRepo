import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [lastActiveButton, setLastActiveButton] = useState("student"); // State to track last active button clicked
  const navigate = useNavigate();

  const handleButtonClick = (type) => {
    setLastActiveButton(type); // Set the last active button type
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let signUpEndpoint;
    if (lastActiveButton === "professional") {
      signUpEndpoint = "http://localhost:8088/auth/professional/signup";
    } else if (lastActiveButton === "student") {
      signUpEndpoint = "http://localhost:8088/auth/student/signup";
    } else {
      // Handle invalid state
      return;
    }
    try {
      const response = await axios.post(signUpEndpoint, {
        username,
        email,
        password,
      });
      console.log("Signup Response:", response.data);
      toast.success("Signed up successfully! Redirecting to login page...", {
        position: "bottom-left",
        autoClose: 1000,
      });
      setTimeout(() => {
        navigate(`/login?type=${lastActiveButton}`); // Pass last active button type as query parameter
      }, 1000);
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      toast.error(
        error.response
          ? error.response.data.message
          : "An error occurred while signing up",
        {
          position: "bottom-left",
          autoClose: 3000,
        }
      );
    }
  };

  return (
    <section className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg relative bottom-12">
        <ToastContainer />
        <h2 className="text-3xl mb-8 text-center">Sign up</h2>
        <div className="flex justify-center mb-6">
          <button
            className={`mr-4 px-4 py-2 border rounded text-indigo-500 ${
              lastActiveButton === "student"
                ? "bg-indigo-500 text-white"
                : "bg-white"
            }`}
            onClick={() => handleButtonClick("student")}
          >
            Student Sign Up
          </button>
          <button
            className={`px-4 py-2 border rounded text-indigo-500 ${
              lastActiveButton === "professional"
                ? "bg-indigo-500 text-white"
                : "bg-white"
            }`}
            onClick={() => handleButtonClick("professional")}
          >
            Professional Sign Up
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username:
            </label>
            <input
              id="username"
              type="text"
              className="mt-1 px-4 py-2 block w-full rounded bg-gray-200 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
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
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignUp;
