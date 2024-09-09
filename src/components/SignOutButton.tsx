"use client";

import { ButtonHTMLAttributes, FC, useState } from "react";
import Button from "./ui/Button";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { Loader2, LogOut } from "lucide-react";

interface SignOutButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const SignOutButton: FC<SignOutButtonProps> = ({ ...props }) => {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const Onclick = async () => {
    setIsSigningOut(true);
    try {
      // signout
      await signOut();
    } catch (e) {
      toast.error("Failed to sign out");
    } finally {
      setIsSigningOut(false);
    }
  };
  return (
    <Button
      {...props}
      variant="ghost"
      onClick={Onclick}
      className="bg-red-500 mr-2 "
    >
      {isSigningOut ? (
        <Loader2 className="animate-spin h-4 w-4" />
      ) : (
        <LogOut className="h-4 w-4" />
      )}
    </Button>
  );
};

export default SignOutButton;
