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
      {pending ? "در حال ثبت نام..." : "ثبت نام"}
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
          toast.success("با موفقیت ثبت نام شدید");
        }}
        className={"flex flex-col gap-6 max-w-md w-full pt-6"}
      >
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="username" className="w-fit">
              نام کاربری
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
              ایمیل
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="example@email.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">رمز عبور</Label>
            </div>
            <Input id="password" name="password" type="password" required />
          </div>
          <SubmitButton />
        </div>
        <div className="text-center text-sm">
          حساب کاربری دارید؟ {""}
          <Link href="/login" className="underline underline-offset-4">
            ورود
          </Link>
        </div>
      </form>
    </>
  );
}

export default RegisterForm;
