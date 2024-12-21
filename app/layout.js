import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Free Resume Builder By Abhay Patel",
  description: "Free Resume Builder is a tool to create a professional resume.",
  tags: ["resume", "builder", "free"],
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqGKKIXmZLek71bDQez8E0pyqATbm3_U6Whg&s",
  url: "https://resume-builder123.vercel.app/",
  type: "website",
  siteName: "Free Resume Builder",
  twitter: "@Abhay_Raj_Patel",
  creator: "Abhay Patel",


};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
