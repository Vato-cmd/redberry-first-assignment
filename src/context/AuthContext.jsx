import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  function login(userData, userToken) {
    setUser(userData);
    setToken(userToken);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userToken);
  }

  function updateUser(updatedUserData) {
    setUser(updatedUserData);
    localStorage.setItem("user", JSON.stringify(updatedUserData));
  }

  const isAuthorized = !!user;
  const isProfileIsComplete = !!user?.profileComplete;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthorized,
        login,
        token,
        updateUser,
        isProfileIsComplete,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
