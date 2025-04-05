import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { redirect } from "next/navigation";
import { actionFetcher } from "@/app/actions/actionFetcher";
import TitleAuth from "../TitleAuth";
import { toast } from "sonner";
import MyToasterSonner from "@/components/my-components/my-toaster";

export default async function RegisterPage({ searchParams }) {
  const { error } = await searchParams;
  const registerAction = async (formData) => {
    "use server";
    const sendData = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    // Using actionFetcher instead of fetch
    const { error, response, data } = await actionFetcher({
      url: "/api/auth/register", // API relative path
      method: "POST",
      body: sendData, // Data to be sent
      sendToken: false, // No token needed for registration
    });

    console.log("🚀 ~ registerAction ~ result:", error, response, data);

    const errorMsg = data?.details?.map(
      (err) => `${err?.field}: ${err?.message}`
    )?.[0];
    if (!response?.ok) {
      console.log("🚀 ~ registerAction ~ errorMsg:", errorMsg);
      console.log(data);
      // return;
      redirect(`/register?error=${errorMsg}`);
    }

    redirect(`/login`);
  };

  return (
    <>
      <TitleAuth
        title="Create to your account"
        description="Enter your email below to create to your account"
      />
      <form
        action={registerAction}
        className={cn("flex flex-col gap-6 max-w-md w-full pt-6")}
      >
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="username" className="w-fit">
              Username
            </Label>
            <Input
              id="username"
              name="username"
              type="text"
              required
              maxLength={25}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email" className="w-fit">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input id="password" name="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            Register
          </Button>
        </div>
        <div className="text-center text-sm">
          Do you have an account? {""}
          <Link href="/login" className="underline underline-offset-4">
            Login
          </Link>
        </div>
      </form>
    </>
  );
}
