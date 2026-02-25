import type { Metadata } from "next";
import localFont from "next/font/local";
import "keen-slider/keen-slider.min.css";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import {  TooltipProvider } from "@radix-ui/react-tooltip";

const iranianSans = localFont({
  src: "./fonts/Iranian Sans.ttf",
  variable: "--font-iranian-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "فیت‌لند - فروشگاه ورزشی",
  description: "فروشگاه آنلاین تجهیزات ورزشی و کفش",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={iranianSans.variable}>
      <body>
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster
          duration={4000}
          toastOptions={{
            classNames: {
              toast: "p-4 rounded-md text-white",
              success: "bg-green-500 border-green-600",
              error: "bg-red-500 border-red-600",
              warning: "bg-yellow-500 border-yellow-600",
              info: "bg-blue-500 border-blue-600",
            },
          }}
        />
      </body>
    </html>
  );
}
