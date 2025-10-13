import { useEffect } from "react";
import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

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

  // jwt authentication to get the currently user data. 
  const [user, setUser] = useState(null); 
  
  const userAuthentication = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/AbrarMojahidRafi_PortfolioWebsite/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      // console.log("Response from user auth endpoint: ", response);
      

      if (response.ok) {
        const data = await response.json();
        // console.log("User data fetched from backend: ", data);

        // our main goal is to get the user data from the backend
        setUser(data.userData); // user get all the data, except password
      } else {
        console.error("Error fetching user data");
      }
    } catch (error) {
      console.error("Error during user authentication:", error);
    }
  };

  const [services, setServices] = useState([]);

  const getServices = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/data/AbrarMojahidRafi_PortfolioWebsite/service", {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        // console.log("Services data fetched from backend: ", data);
        setServices(data.msg); // msg contains all the services array 
      }
    } catch (error) {
      console.log(`Error from the frontend getServices function: ${error}`);
      
    }
  }; 

  useEffect(() => {
    getServices();
    userAuthentication();
  }, []);

  

  return (
    <AuthContext.Provider value={{ storeTokenInLS , LogoutUser, isLoggedIn, user , services }}>
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