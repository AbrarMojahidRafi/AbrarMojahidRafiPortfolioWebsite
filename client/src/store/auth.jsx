import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {

  //function to stored the token in local storage
  const storeTokenInLS = (serverToken) => {
    return localStorage.setItem("token", serverToken);
  };

  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const isLoggedIn = !!token; // if token is present then true otherwise false 

  // tackeling the logout functionality
  const LogoutUser = () => {
    console.log("User Logged Out Successfully");
    setToken(null);
    return localStorage.removeItem("token");
  }; 

  return (
    <AuthContext.Provider value={{ storeTokenInLS , LogoutUser, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};