import React, { ReactNode } from "react";
import StreamVideoProvider from "../../../providers/StreamClientProvider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Video Conferencing App",
  description: "Video Conferencing App",
  icons: {
    icon: './icons/logo.svg'
  }
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </main>
  );
};

export default RootLayout;
