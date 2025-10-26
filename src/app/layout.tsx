import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "AP MSME AI DPR Studio",
  description:
    "AI-powered Detailed Project Report platform for Andhra Pradesh MSME ONE portal with bilingual onboarding, financial intelligence, and policy-grade compliance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-slate-100/70 antialiased dark:bg-slate-950`}
      >
        {children}
      </body>
    </html>
  );
}
