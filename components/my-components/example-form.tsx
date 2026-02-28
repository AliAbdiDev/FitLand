"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// تعریف schema با zod
const formSchema = z.object({
  name: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد"),
  email: z.string().email("ایمیل معتبر وارد کنید"),
  phone: z.string().regex(/^09\d{9}$/, "شماره موبایل معتبر وارد کنید"),
});

type FormData = z.infer<typeof formSchema>;

export function ExampleForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      // شبیه‌سازی ارسال به سرور
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // در صورت موفقیت
      toast.success("اطلاعات با موفقیت ذخیره شد", {
        description: `نام: ${data.name}`,
      });
      
      reset();
    } catch (error) {
      // در صورت خطا
      toast.error("خطا در ذخیره‌سازی", {
        description: "لطفا دوباره تلاش کنید",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      <div>
        <Label htmlFor="name">نام</Label>
        <Input
          id="name"
          {...register("name")}
          placeholder="نام خود را وارد کنید"
        />
        {errors.name && (
          <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="email">ایمیل</Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          placeholder="example@email.com"
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="phone">شماره موبایل</Label>
        <Input
          id="phone"
          {...register("phone")}
          placeholder="09123456789"
        />
        {errors.phone && (
          <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "در حال ارسال..." : "ثبت اطلاعات"}
      </Button>
    </form>
  );
}
