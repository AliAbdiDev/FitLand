"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { registerAction } from "@/app/actions";
import { toast } from "sonner";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus(); 

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Registering..." : "Register"}
    </Button>
  );
}
function RegisterForm() {
  return (
    <>
      <form
        action={async (formData: FormData) => {
          const result = await registerAction(formData);
          if (result?.error) {
            toast.error(result?.error);
            return;
          }
          toast.success("Successfully registered");
        }}
        className={"flex flex-col gap-6 max-w-md w-full pt-6"}
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
          <SubmitButton />
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

export default RegisterForm;
