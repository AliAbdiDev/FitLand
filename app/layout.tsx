import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import { ReduxProvider } from "@/components/providers";
import localFont from 'next/font/local';

// تعریف فونت‌های فارسی
const yekanBakh = localFont({
  src: [
    {
      path: './fonts/YekanBakh-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/YekanBakh-Bold.woff',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/YekanBakh-ExtraBlack.woff',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-yekan-bakh',
  display: 'swap',
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
    <html lang="fa" dir="rtl" className={yekanBakh.variable}>
      <body className={yekanBakh.className}>
        <ReduxProvider>{children}</ReduxProvider>
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
