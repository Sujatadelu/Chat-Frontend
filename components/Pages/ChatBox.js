"use client";
import { useUser } from "@/context/userContext";
import React, { useEffect, useState, useRef } from "react";
import { Button } from "../ui/button";
import { LoaderCircle } from "lucide-react";
import { Input } from "../ui/input";
import { Form } from "../ui/form";
import axios from "axios";
import { useToast } from "../ui/use-toast";
import { io } from "socket.io-client";

export const isSameSender = (messages, i, userId) => {
  return (
    messages[i - 1]?.sender?._id !== messages[i]?.sender?._id ||
    messages[i - 1]?.sender?._id === userId
  );
};

const Endpoint = "http://localhost:8000";
let socket, selectedChatCompare;

function ChatBox({ fetchAgain, setFetchAgain }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);

  const { user, token, selectedChat } = useUser();
  const { toast } = useToast();

  useEffect(() => {
    socket = io(Endpoint);
    socket.on("connect", () => {
      setSocketConnected(true);
      console.log("User initializing...");
      socket.emit("init", user?._id);
    });

    // Handle disconnect event
    socket.on("disconnect", () => {
      setSocketConnected(false);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("message_received");
      socket.off("new_message");
      socket.off("join_chat");
    };
  }, [user?._id]);

  useEffect(() => {
    if (socketConnected && selectedChat) {
      fetchMessages();
    }
    selectedChatCompare = selectedChat;
  }, [socketConnected, selectedChat]);

  useEffect(() => {
    const handleMessageReceived = (message) => {
      const msg = message.msg;
      const chat = msg?.chat;

      if (selectedChatCompare && selectedChatCompare._id === chat._id) {
        console.log(msg);
        setMessages((prevMessages) => [...prevMessages, msg]);
      }
    };

    socket.on("message_received", handleMessageReceived);

    return () => {
      socket.off("message_received", handleMessageReceived);
    };
  }, [selectedChatCompare, socket]);

  const fetchMessages = async () => {
    setLoading(true);
    if (!selectedChat) {
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: token,
        },
      };
      const response = await axios.get(
        `http://localhost:8000/api/v1/message/${selectedChat._id}`,
        config
      );
      setMessages(response.data.messages);
      socket.emit("join_chat", selectedChat);
    } catch (error) {
      toast({
        title: "Failed to fetch messages!",
        description: `Error: ${error.message}`,
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMessage) {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: token,
          },
        };
        const response = await axios.post(
          `http://localhost:8000/api/v1/message`,
          { chatId: selectedChat._id, content: newMessage },
          config
        );
        setNewMessage("");
        const data = response?.data;
        socket.emit("new_message", data);
      } catch (error) {
        toast({
          title: "Failed to send message!",
          description: `Error: ${error.message}`,
          status: "error",
        });
      }
    }
  };

  return (
    <div>
      {selectedChat ? (
        <>
          <div className="p-2 m-2 bg-accent rounded-md">
            <div className="flex items-center justify-between">
              <p>
                {selectedChat.users[0].name !== user?.name
                  ? selectedChat.users[0].name
                  : selectedChat.users[1].name}
              </p>
              <Button variant={"outline"}>i</Button>
            </div>
          </div>
          <div className="p-2 m-2 bg-accent rounded-md chat-box h-[75vh] flex flex-col justify-end">
            {loading ? (
              <div className="flex justify-center items-center h-[75vh]">
                <LoaderCircle className="h-8 w-8 animate-spin" />
              </div>
            ) : (
              <div>
                <div className="message h-[67vh] overflow-auto flex flex-col justify-end py-2">
                  {messages &&
                    messages.map((m, i) => (
                      <div
                        key={m._id}
                        className={`${
                          m.sender?._id === user?._id
                            ? "justify-end text-right"
                            : "justify-start text-left"
                        }`}
                      >
                        <p className="p-1 my-1 bg-black rounded-lg inline-block">
                          {m.content}
                        </p>
                      </div>
                    ))}
                </div>

                <Form onSubmit={(e) => e.preventDefault()}>
                  <Input
                    placeholder="Enter a message"
                    className="bg-gray-600 text-white outline-none"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        sendMessage(e);
                      }
                    }}
                  />
                </Form>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex h-[75vh] items-center justify-center">
          <p>No Chat Selected</p>
        </div>
      )}
    </div>
  );
}

export default ChatBox;
