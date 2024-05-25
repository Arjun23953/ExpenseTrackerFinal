import React, { useState } from "react";
import { useGlobalContext } from "../../context/globalContext";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [isSignIn, setIsSignIn] = useState(true); // State to toggle between sign-in and sign-up
  const { setIsAuthenticated } = useGlobalContext();
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match during sign-up
    if (!isSignIn && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // debugger

    try {
      const endpoint = isSignIn ? "sign-in" : "sign-up"; // Choose API endpoint based on isSignIn state
      const response = await fetch(`http://localhost:8080/api/v1/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        const errorData = await response.json(); // Parse error response
        setError(errorData.message); // Set error message state
        return;
      }
      
      // Assuming the response contains a message in the success scenario
      const responseData = await response.json(); // Parse the response data
      setIsAuthenticated(true);
      console.log("Authentication successful", responseData.message); 
      const displayName = responseData?.user.email
      const user = responseData.user?.id
      localStorage.setItem("displayName",displayName)
     localStorage.setItem("User",user);
      
      // You can also log the entire response data if needed
      console.log("Full response data:", responseData);
      window.location.reload()
      
    } catch (error) {
      console.error("Error:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  const handleToggleForm = () => {
    setIsSignIn(!isSignIn); // Toggle between sign-in and sign-up
  };


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="flex h-screen">
        {/* Left Pane */}
        <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black">
          <div className="max-w-md text-center"></div>
        </div>
        {/* Right Pane */}
        <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
          <div className="max-w-md w-full p-6">
            <h1 className="text-3xl font-semibold mb-6 text-black text-center">
              {isSignIn ? "Sign In" : "Sign Up"}
            </h1>
            <form
              action="#"
              method="POST"
              className="space-y-4"
              onSubmit={handleSubmit}
            >
              {/* Conditional rendering based on isSignIn state */}

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <svg
                        className="h-5 w-5 text-gray-500"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-.001.34-.031.678-.089 1.014a10.045 10.045 0 01-3.964-4.257 4 4 0 00-7.918 1.026A10.032 10.032 0 012.547 12H2.458z"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5 text-gray-500"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13.875 18.825A10.06 10.06 0 0112 19c-4.478 0-8.268-2.943-9.542-7 .255-1.046.602-2.055 1.045-3.017M9 13a4 4 0 004 4m0-8a4 4 0 00-4 4M3 3l18 18"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                </div>
              {!isSignIn && (
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <svg
                        className="h-5 w-5 text-gray-500"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-.001.34-.031.678-.089 1.014a10.045 10.045 0 01-3.964-4.257 4 4 0 00-7.918 1.026A10.032 10.032 0 012.547 12H2.458z"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5 text-gray-500"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13.875 18.825A10.06 10.06 0 0112 19c-4.478 0-8.268-2.943-9.542-7 .255-1.046.602-2.055 1.045-3.017M9 13a4 4 0 004 4m0-8a4 4 0 00-4 4M3 3l18 18"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                
                </div>
              )}
              {error && (
                <div className="text-red-500 text-sm">Error: {error}</div>
              )}
              <div>
                <button
                  type="submit"
                  className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
                >
                  {isSignIn ? "Sign In" : "Sign Up"}
                </button>
              </div>
            </form>
            <div className="mt-4 text-sm text-gray-600 text-center">
              <p>
                {isSignIn
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <button
                  className="text-black hover:underline"
                  onClick={handleToggleForm}
                >
                  {isSignIn ? "Sign Up here" : "Sign In here"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;


