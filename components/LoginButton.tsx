"use client";

import { Button } from "./ui/button";

export const LoginButton: React.FC = () => {
  const handleLogin = () => {
    window.location.href = "/api/auth/login";
  };

  return (
    <Button variant={"yahoo"} onClick={handleLogin}>
      Log in with Yahoo
    </Button>
  );
};
