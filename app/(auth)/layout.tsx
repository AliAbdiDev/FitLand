import Image from "next/image";

export default function AuthLaout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 ">
        <div className="flex flex-1 items-center justify-center h-screen w-full">
          <div className="flex flex-col items-center gap-2  w-full">
            {children}
          </div>
        </div>
      </div>

      <div className="relative hidden bg-muted lg:block">
        <Image
          fill
          src={`/image/cool-black-man-doing-sports-playing-basketball-sunrise-jumping-silhouette-min.jpg`}
          alt="Image"
          quality={100}
          priority={true}
          className="absolute inset-0 size-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </section>
  );
}
