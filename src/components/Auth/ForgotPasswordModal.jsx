import React, { useState } from "react";

const ForgotPasswordModal = ({ isOpen, onClose, onSend }) => {
  const [email, setEmail] = useState("");

  const handleSend = () => {
    // Call the onSend function with the email address and generated code
    onSend(email, generateVerificationCode());
    // Clear the email input
    setEmail("");
    // Close the modal
    onClose();
  };

  const generateVerificationCode = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const length = 6; // Length of the verification code
    let code = "";
    for (let i = 0; i < length; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  };


  return (
    <div
    className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-50 ${
      isOpen ? "" : "hidden"
    }`}
  >
    <div className="bg-white w-full max-w-md md:max-w-md lg:max-w-md xl:max-w-xl h-auto md:h-[30%] lg:h-[30%] xl:h-[30%] p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Forgot Password</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email Address:
        </label>
        <input
          type="email"
          className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="flex justify-end">
        <button
          className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 mr-2"
          onClick={handleSend}
        >
          Send
        </button>
        <button
          className="text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
  
  );
};

export default ForgotPasswordModal;
