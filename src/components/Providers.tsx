"use client";

import { FC, ReactNode } from "react";
import { Toaster } from "react-hot-toast";

interface pageProps {
  children: ReactNode;
}

const Providers: FC<pageProps> = ({ children }) => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      {children}
    </>
  );
};

export default Providers;
