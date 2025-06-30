"use client";
import React, { useContext, useState } from "react";
import { LoaderCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/userContext";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { updateUser, setToken, setChats } = useUser();
  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        {
          email,
          password,
        }
      );
      const token = response.data.token;
      let user = response.data.user;
      user = JSON.stringify(user);
      console.log(token);
      setChats([]);
      setToken(token);
      localStorage.setItem("token", token);
      localStorage.setItem("user", user);
      updateUser(response.data.user);
      toast({
        title: "Login Success!",
        description: "Redirecting to Dashboard!",
      });

      router.push("/dashboard");
    } catch (error) {
      console.error("API Error:", error);
      toast({
        title: "Login Error!",
        description: "Invalid email or password.",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Card className="z-10 bg-opacity-100 border-slate-700 min-w-[400px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Login </CardTitle>
          <CardDescription>{`Enter your Email & Password below`}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="saksham@example.com"
              value={email}
              onChange={(e) => setEmail((p) => e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword((p) => e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button disabled={loading} onClick={handleSubmit} className="w-full">
            {loading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Login;
