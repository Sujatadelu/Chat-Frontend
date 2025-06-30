"use client";
import { GridBackground } from "@/components/Pages/grid";
import Navbar from "@/components/Pages/Navbar";
import { useUser } from "@/context/userContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function page() {
  const { user, token } = useUser();
  const router = useRouter();

  return (
    <div className="">
      <Navbar />
      <GridBackground />
    </div>
  );
}

export default page;
