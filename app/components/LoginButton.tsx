"use client";

export const LoginButton: React.FC = () => {
  const handleLogin = () => {
    window.location.href = "/api/auth/login";
  };

  return <button onClick={handleLogin}>Log in with Yahoo</button>;
};
