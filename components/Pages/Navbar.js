import React from "react";
import { Button } from "../ui/button";
import { useUser } from "@/context/userContext";
import Search from "./Search";
import { useRouter } from "next/navigation";

function Navbar() {
  const { logout } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    logout();
  };

  const handleLogoClick = () => {
    router.push("/");
  };

  return (
    <div className="flex items-center justify-between px-4 py-2">
      <div>
        <p className="font-semibold cursor-pointer" onClick={handleLogoClick}>
          ChatUnity
        </p>
      </div>
      <div className="flex justify-center gap-4 items-center">
        <div>
          <Search />
        </div>
        <Button variant={"destructive"} onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
}

export default Navbar;
