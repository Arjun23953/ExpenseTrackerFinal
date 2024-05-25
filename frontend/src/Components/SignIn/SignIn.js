import React, { useState } from "react";
import { useGlobalContext } from "../../context/globalContext";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignIn, setIsSignIn] = useState(true); // State to toggle between sign-in and sign-up
  const { setIsAuthenticated } = useGlobalContext();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

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

      setIsAuthenticated(true);
      console.log("Authentication successful");
    } catch (error) {
      console.error("Error:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  const handleToggleForm = () => {
    setIsSignIn(!isSignIn); // Toggle between sign-in and sign-up
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
                  Username
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={email}
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
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                />
              </div>
              {!isSignIn && (
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                  />
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                  />
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
