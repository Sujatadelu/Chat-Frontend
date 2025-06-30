"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { LoaderCircle, SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useUser } from "@/context/userContext";
import { useToast } from "../ui/use-toast";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import axios from "axios";

function Search() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState("");
  const [loadingChat, setLoadingChat] = useState("");
  const { user, token, setSelectedChat, selectedChat, setChats, chats } =
    useUser();
  const { toast } = useToast();

  const handleUserClick = async (user) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: token,
        },
      };
      const response = await axios.post(
        `http://localhost:8000/api/v1/chat`,
        { userId: user?._id },
        config
      );
      console.log(response);
      const data = response.data;
      console.log(chats);
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      console.log(chats);
      setSelectedChat(response.data);
      console.log(selectedChat);
      toast({
        title: "Success !",
        description: `You have hopped into ${user.name}'s Chat`,
        status: "success",
      });
    } catch (error) {
      console.log(error);
      // toast({
      //   title: "Failed to Create Chat !",
      //   description: `${error.message}`,
      //   status: "warning",
      // });
    } finally {
      setLoadingChat(false);
    }
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Warning !",
        description: "Enter something to start search",
        status: "warning",
      });
    }

    try {
      console.log(token);
      setLoading(true);
      const config = {
        headers: {
          Authorization: token,
        },
      };
      const response = await axios.get(
        `http://localhost:8000/api/v1/users?search=${search}`,
        config
      );

      console.log(response.data.users);
      setLoading(false);
      setSearchResult(response.data.users);
    } catch (error) {
      toast({
        title: "Failed to Load !",
        description: "Internal Server Error",
        status: "warning",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <div id="search-dialog-trigger">
            <div className="flex items-center border px-2 py-2 rounded-md  ">
              <SearchIcon className="w-8 p-1" /> Search
            </div>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="my-8 space-x-2 flex">
              <Input
                placeholder="Search Users"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div
                className="flex items-center -my-2 justify-center p-2 rounded-md hover:bg-accent "
                variant={"ghost"}
                onClick={handleSearch}
              >
                <SearchIcon className="w-4" />
              </div>
            </DialogTitle>
            <DialogDescription className="h-40 overflow-y-auto space-y-4 gap-2 custom-scrollbar">
              {loading ? (
                <div className="flex justify-center items-center h-40">
                  {loading && <LoaderCircle className="h-4 w-4 animate-spin" />}
                </div>
              ) : (
                <div>
                  {searchResult.map((user) => (
                    <div key={user?._id}>
                      <DialogPrimitive.Close className="h-full w-full text-start">
                        <div
                          className="h-14 space-y-1 bg-accent m-1 rounded-md p-1 cursor-pointer"
                          onClick={() => handleUserClick(user)}
                        >
                          <p>{user?.name}</p>
                          <p>{user?.email}</p>
                        </div>
                      </DialogPrimitive.Close>
                    </div>
                  ))}
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Search;
