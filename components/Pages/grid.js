"use client";
import React, { useState } from "react";
import AllChats from "./AllChats";
import ChatBox from "./ChatBox";

export function GridBackground() {
  const [fetchAgain, setFetchAgain] = useState();
  return (
    <div className="h-[90vh] w-full dark:bg-black  dark:bg-grid-white/[0.2] bg-grid-black/[0.2]">
      <div className="h-[90vh] w-full grid grid-cols-10 gap-2 items-center justify-center">
        <div className="bg-[#09090b] col-span-3 h-[88vh] mx-2 rounded-md shadow-lg">
          <div className="py-4 px-4">
            <h2 className="text-center text-lg">Chats</h2>
            <AllChats fetchAgain={fetchAgain} />
          </div>
        </div>
        <div className="bg-[#09090b] col-span-7 h-[88vh] mx-2 rounded-md shadow-lg">
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        </div>
      </div>
    </div>
  );
}
