import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from '@/app/redux/providers'
import Navbar from "@/components/log-out";
import { Toaster } from "react-hot-toast";
import LogOut from "@/components/log-out";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <LogOut />
            {children}
            <Toaster />
          </Providers>
        </body>
    </html>
  );
}
