import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // user login
  const login = (username, password) => {
    if (username === "admin" && password === "admin") {
      setIsLoggedIn(true);
      return true;
    } else {
      setIsLoggedIn(false);
    }
  };

  // user logout
  const logout = () => {
    setIsLoggedIn(false);
  };
  
  return <AuthContext.Provider value={{isLoggedIn, login, logout}}>{children}</AuthContext.Provider>;
};

export default AuthContext