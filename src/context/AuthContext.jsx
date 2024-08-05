import React, { useContext, useState, createContext, useEffect } from "react";
import authService from "../services/authService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(authService.getCurrentUser());


  useEffect(() => {
    setUser(authService.getCurrentUser());
  }, []);
  const signUp = async (name, email, username, password, dob) => {
    try {
      const user = await authService.signUp(
        name,
        email,
        username,
        password,
        dob
      );
      setUser(user);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const login = async (email, password) => {
    const user = await authService.login(email, password);
    setUser(user);
  };
  const logout = () => {
    authService.logOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ login, logout, user, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};
