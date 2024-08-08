import { createContext, useContext, useEffect, useState } from "react";

const authContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("chat-user-data")) || null
  );

  function setCredential(data) {
    setUser(data);
  }
  function removeCredential() {
    setUser(null);
    localStorage.removeItem("chat-user-data");
  }

  useEffect(() => {
    if (user) {
      localStorage.setItem("chat-user-data", JSON.stringify(user));
    } else {
      localStorage.removeItem("chat-user-data");
    }
  }, [user]);

  return (
    <authContext.Provider value={{ user, setCredential, removeCredential }}>
      {children}
    </authContext.Provider>
  );
}

function useAuth() {
  const context = useContext(authContext);
  if (context === undefined) {
    console.log("You use the context outside the AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
