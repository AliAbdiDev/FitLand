"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { provinces, cities } from "@/lib/mock-data";
import { useState } from "react";

const profileSchema = z.object({
  firstName: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد"),
  lastName: z.string().min(2, "نام خانوادگی باید حداقل ۲ کاراکتر باشد"),
  phone: z.string().regex(/^09\d{9}$/, "شماره موبایل معتبر وارد کنید"),
  nationalCode: z.string().regex(/^\d{10}$/, "کد ملی باید ۱۰ رقم باشد"),
  email: z.string().email("ایمیل معتبر وارد کنید").optional().or(z.literal("")),
  provinceId: z.number().optional(),
  cityId: z.number().optional(),
  address: z.string().optional(),
  avatar: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export function ProfileForm() {
  const [selectedProvinceId, setSelectedProvinceId] = useState<number>();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  const provinceId = watch("provinceId");
  const filteredCities = selectedProvinceId
    ? cities.filter((city) => city.provinceId === selectedProvinceId)
    : [];

  const onSubmit = async (data: ProfileFormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast.success("اطلاعات با موفقیت ذخیره شد", {
        description: `${data.firstName} ${data.lastName}`,
      });
    } catch (error) {
      toast.error("خطا در ذخیرهسازی", {
        description: "لطفا دوباره تلاش کنید",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">نام *</Label>
          <Input id="firstName" {...register("firstName")} />
          {errors.firstName && (
            <p className="text-sm text-red-500 mt-1">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="lastName">نام خانوادگی *</Label>
          <Input id="lastName" {...register("lastName")} />
          {errors.lastName && (
            <p className="text-sm text-red-500 mt-1">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone">شماره موبایل *</Label>
          <Input id="phone" {...register("phone")} placeholder="09123456789" />
          {errors.phone && (
            <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="nationalCode">کد ملی *</Label>
          <Input id="nationalCode" {...register("nationalCode")} placeholder="1234567890" />
          {errors.nationalCode && (
            <p className="text-sm text-red-500 mt-1">{errors.nationalCode.message}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="email">ایمیل</Label>
        <Input id="email" type="email" {...register("email")} placeholder="example@email.com" />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">آدرس</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>استان</Label>
            <SearchableSelect
              options={provinces}
              value={selectedProvinceId}
              onChange={(value) => {
                setSelectedProvinceId(value);
                setValue("provinceId", value);
                setValue("cityId", undefined);
              }}
              placeholder="انتخاب استان"
              searchPlaceholder="جستجوی استان..."
            />
          </div>

          <div>
            <Label>شهر</Label>
            <SearchableSelect
              options={filteredCities}
              value={watch("cityId")}
              onChange={(value) => setValue("cityId", value)}
              placeholder="انتخاب شهر"
              searchPlaceholder="جستجوی شهر..."
            />
          </div>
        </div>

        <div>
          <Label htmlFor="address">آدرس کامل (محله، کوچه، پلاک، طبقه)</Label>
          <Input
            id="address"
            {...register("address")}
            placeholder="محله، کوچه، پلاک، طبقه"
          />
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
        {isSubmitting ? "در حال ذخیره..." : "ذخیره اطلاعات"}
      </Button>
    </form>
  );
}
