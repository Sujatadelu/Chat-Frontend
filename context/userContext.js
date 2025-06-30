"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Rotate3D } from "lucide-react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    // console.log(token);
    if (!user || !token) {
      router.push("/"); // Redirect to login if user or token is not found
    } else {
      setToken(token);
      setUser(JSON.parse(user));
    }
  }, [router]);

  const updateUser = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.clear();
    setToken(null);
    router.push("/"); // Redirect to login after logout
  };

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        logout,
        token,
        setSelectedChat,
        selectedChat,
        setChats,
        chats,
        setToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
