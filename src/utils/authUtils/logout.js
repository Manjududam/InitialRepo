// authUtils.js

export const logout = () => {
    // Remove user authentication data from local storage
    localStorage.removeItem("userType");
    // Optionally, perform any other necessary cleanup or tasks related to logout
  };
  