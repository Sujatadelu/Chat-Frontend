"use client";
import Auth, { ToggleTab } from "@/components/Pages/Auth";
import { BackgroundBeams } from "@/components/ui/background-beams";
import React from "react";

function page() {
  return (
    <div className="h-screen w-full  bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="z-10 mt-10">
        <div className="flex justify-center items-center space-x-4 z-10">
          <ToggleTab />
        </div>
      </div>
      <BackgroundBeams />
    </div>
  );
}
export default page;
