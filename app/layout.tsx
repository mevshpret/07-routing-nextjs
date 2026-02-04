import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Roboto } from "next/font/google";

import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

const siteUrl = "https://notehub.vercel.app";

export const metadata: Metadata = {
  title: "NoteHub",
  description: "NoteHub is an app for creating and managing personal notes.",
  openGraph: {
    title: "NoteHub",
    description: "NoteHub is an app for creating and managing personal notes.",
    url: siteUrl,
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <TanStackProvider>
          <Header />
          {children}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
