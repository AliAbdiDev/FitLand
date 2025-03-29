import { LoginForm } from "@/components/login-form";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 ">
        <div className="flex flex-1 items-center justify-center h-screen w-full">
          <LoginForm className=" max-w-md w-full" />
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image
          fill
          src="/image/black-man-doing-sports-playing-basketball-sunrise-jumping-silhouette(1)-min.jpg"
          alt="Image"
          quality={100}
          priority={true}
          className="absolute inset-0 size-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
