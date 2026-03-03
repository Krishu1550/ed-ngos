'use client' // Required because we are using Providers

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Context & State Imports
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "@/store/store"; // Adjust path to your store file
import ReduxSync from "../components/ReduxSync";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionProvider>
          <Provider store={store}>
            {/* Syncs NextAuth session to Redux state on load */}
            <ReduxSync /> 
            
            <div className="flex flex-col min-h-screen">
              <div className="mb-5">
                <Navbar />
              </div>

              <main className="flex-grow">
                {children}
              </main>

              <Footer />
            </div>
          </Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
