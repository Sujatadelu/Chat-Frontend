"use client";
import { useUser } from "@/context/userContext";
import React, { useEffect } from "react";
import { useToast } from "../ui/use-toast";
import axios from "axios";

function AllChats({ fetchAgain }) {
  const { user, token, setSelectedChat, selectedChat, setChats, chats } =
    useUser();
  const { toast } = useToast();

  const handleFetchChats = async () => {
    try {
      console.log(user?.name);
      console.log(token);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: token,
        },
      };
      const response = await axios.get(
        `http://localhost:8000/api/v1/chat`,
        config
      );
      console.log(response.data.data);
      setChats(response?.data?.data);
    } catch (error) {
      console.log(error.message);
    } finally {
    }
  };

  useEffect(() => {
    handleFetchChats();
  }, [fetchAgain]);

  return (
    <div>
      {chats?.map((chat) => (
        <div
          key={chat._id}
          className={`bg-accent min-h-14 rounded-md cursor-pointer p-2 m-1 ${
            chat._id === selectedChat?._id ? "bg-blue-400" : ""
          }`}
          onClick={() => setSelectedChat(chat)}
        >
          <p>
            {chat?.users[0].name !== user?.name
              ? chat?.users[0].name
              : chat?.users[1].name}
          </p>

          <p className="text-sm ">{chat?.latestMessage?.content}</p>
        </div>
      ))}
    </div>
  );
}

export default AllChats;
