import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "./Login";
import SignUp from "./SignUp";

export const ToggleTab = () => {
  return (
    <Tabs defaultValue="Login" className="w-[400px] z-10">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="Login">Login</TabsTrigger>
        <TabsTrigger value="SignUp">Sign Up</TabsTrigger>
      </TabsList>

      <TabsContent value="Login">
        <Login />
      </TabsContent>

      <TabsContent value="SignUp">
        <SignUp />
      </TabsContent>
    </Tabs>
  );
};
