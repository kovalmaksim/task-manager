import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { FC, PropsWithChildren } from "react";
import Providers from "@/components/Providers";
import { TaskProvider } from "@/components/TaskProvider";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Task Manager",
  description: "Next.js + React Query Todo App",
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  <html lang="en" suppressHydrationWarning>
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <Providers>
        <TaskProvider>{children}</TaskProvider>
      </Providers>
      <Toaster position="top-right" richColors />
    </body>
  </html>
);

export default RootLayout;
