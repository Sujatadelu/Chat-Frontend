"use client";
import React, { useState } from "react";
import { LoaderCircle } from "lucide-react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/sign-up",
        {
          name,
          email,
          password,
        }
      );
      toast({
        title: "Sign Up Success !",
        description: "Login to get started",
      });
    } catch (error) {
      toast({
        title: "Signup Error!",
        description: "Internal Server Error",
        status: "error",
      });
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Card className="z-10 bg-opacity-100 border-slate-700 min-w-[400px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Sign Up </CardTitle>
          <CardDescription>{`Enter your Credentials below`}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Saksham Srivastava"
              value={name}
              onChange={(e) => setName((p) => e.target.value)}
            />
          </div>
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
            Sign Up
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default SignUp;
