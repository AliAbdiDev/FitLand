"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

import { Form, useForm } from "react-hook-form";
// import {  useSession } from "next-auth/react";
import useLogin from "./useLogin";
export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Form>) {
  const {
    register,
    control,
    formState: { isSubmitting },
  } = useForm();
  // const { data: session, status } = useSession();
  const { credentialsLogin, googleLogin } = useLogin();

  const onSubmit = async ({ data }) => credentialsLogin(data);

  
  return (
    <Form
      onSubmit={onSubmit}
      control={control}
      className={cn("flex flex-col gap-6  max-w-md w-full pt-6", className)}
      {...props}
    >
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email" className="w-fit">
            Email
          </Label>
          <Input
            {...register("email")}
            id="email"
            type="email"
            placeholder="email@example.com"
            tabIndex={1}
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <Link
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
          <Input
            {...register("password")}
            id="password"
            type="password"
            tabIndex={2}
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          Login
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or
          </span>
        </div>
        <Button variant="outline" className="w-full" onClick={googleLogin} type="button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
              fill="currentColor"
            />
          </svg>
          Login with Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="underline underline-offset-4">
          register
        </Link>
      </div>
    </Form>
  );
}
