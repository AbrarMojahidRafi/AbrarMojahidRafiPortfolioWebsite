import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../store/auth.jsx";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  // handle form on submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(credentials);

    try {
      const response = await fetch("http://localhost:3000/api/auth/AbrarMojahidRafi_PortfolioWebsite/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const responseData = await response.json();
        // console.log("after login: ", responseData);
        console.log("Login successful");
        storeTokenInLS(responseData.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <main className="max-w-6xl w-full">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="md:grid md:grid-cols-2">
            {/* Login Image */}
            <div className="hidden md:block">
              <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/account-login-protection-illustration-svg-download-png-7271014.png"
                alt="Login security illustration"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Login Form */}
            <div className="py-12 px-6 sm:px-12">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Login</h1>
                <p className="text-gray-600">Welcome back! Please login to your account</p>
              </div>
              
              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={credentials.email}
                    onChange={handleInput}
                    placeholder="Enter your email"
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleInput}
                    placeholder="Enter your password"
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div>
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-900 bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 transition-colors duration-200"
                  >
                    Login
                  </button>
                </div>

                <div className="text-center mt-4">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Register now
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Login