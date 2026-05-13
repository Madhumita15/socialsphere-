import type { Metadata } from "next";
import {   Roboto } from "next/font/google";
import "./globals.css";
import {Toaster} from 'sonner'
import QueryProvider from "@/services/helper/provider/QueryProvider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"], 
  variable: "--font-roboto",
});



export const metadata: Metadata = {
  title: {
    default: "SocialSphere+ | Connect, Share & Explore",
    template: "%s | SocialSphere+",
  },

  description:
    "SocialSphere+ is a modern social media platform where users can share posts, reels, photos, and connect with friends around the world in real time.",

  keywords: [
    "SocialSphere+",
    "social media app",
    "instagram clone",
    "reels app",
    "social networking",
    "photo sharing app",
    "video sharing platform",
    "modern social platform",
    "next.js social media app",
    "react social media project",
    "full stack social media app",
    "social community platform",
    "chat and reels app",
    "social app with stories",
  ],

  authors: [
    {
      name: "Madhumita Das",
    },
  ],

  creator: "Madhumita Das",
  publisher: "SocialSphere+",

  metadataBase: new URL("https://socialsphere-alpha.vercel.app/"),

  openGraph: {
    title: "SocialSphere+ | Connect, Share & Explore",
    description:
      "Share moments, upload reels, connect with friends, and explore trending content on SocialSphere+.",
    url: "https://socialsphere-alpha.vercel.app/",
    siteName: "SocialSphere+",
    images: [
      {
        url: "/images/logo.png", // place inside public folder
        width: 1200,
        height: 630,
        alt: "SocialSphere+ Preview Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "SocialSphere+ | Connect, Share & Explore",
    description:
      "A modern social media platform for sharing photos, reels, and connecting with people worldwide.",
    images: ["/images/logo.png"],
    creator: "Madhumita Das",
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  category: "social media",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">
        <Toaster richColors position="top-right" closeButton/>
        <QueryProvider>
        {children}
        </QueryProvider>
        </body>
    </html>
  );
}
