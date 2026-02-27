"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormField } from "@/components/ui/form-field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AvatarImageUploader,
  type ImageUploaderValue,
} from "@/components/ui/image-uploader";
import { provinces, cities } from "@/lib/mock-data";
import { useLastAddressStore } from "@/stores/last-address-store";
import { useProfileImageStore } from "@/stores/profile-image-store";
import type { MockAuthUserCookie } from "@/lib/mock-auth-session";

const profileSchema = z.object({
  firstName: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد"),
  family: z.string().min(2, "نام خانوادگی باید حداقل ۲ کاراکتر باشد"),
  phoneNumber: z.string().regex(/^09\d{9}$/, "شماره موبایل معتبر وارد کنید"),
  email: z.string().email("ایمیل معتبر وارد کنید").optional().or(z.literal("")),
  provinceId: z.number().optional(),
  cityId: z.number().optional(),
  address: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileEditFormProps {
  authUser: MockAuthUserCookie;
  userInitial: string;
  saveProfileAction: (formData: FormData) => Promise<void>;
}

export function ProfileEditForm({ authUser, userInitial, saveProfileAction }: ProfileEditFormProps) {
  const [profileImageUpload, setProfileImageUpload] = React.useState<ImageUploaderValue | null>(null);
  const [selectedProvinceId, setSelectedProvinceId] = React.useState<number>();
  const { lastAddress, setLastAddress } = useLastAddressStore();
  const { imageDataUrl: storedImage, setImageDataUrl } = useProfileImageStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: authUser.name || "",
      family: authUser.family || "",
      phoneNumber: authUser.phoneNumber || "",
      email: authUser.email || "",
    },
  });

  const filteredCities = selectedProvinceId
    ? cities.filter((city) => city.provinceId === selectedProvinceId)
    : [];

  React.useEffect(() => {
    if (lastAddress) {
      if (lastAddress.provinceId) {
        setSelectedProvinceId(lastAddress.provinceId);
        setValue("provinceId", lastAddress.provinceId);
      }
      if (lastAddress.cityId) {
        setValue("cityId", lastAddress.cityId);
      }
      if (lastAddress.address) {
        setValue("address", lastAddress.address);
      }
    }
  }, [lastAddress, setValue]);

  React.useEffect(() => {
    if (authUser.provinceId && !lastAddress?.provinceId) {
      setSelectedProvinceId(authUser.provinceId);
      setValue("provinceId", authUser.provinceId);
    }
    if (authUser.cityId && !lastAddress?.cityId) {
      setValue("cityId", authUser.cityId);
    }
    if (authUser.address && !lastAddress?.address) {
      setValue("address", authUser.address);
    }
  }, [authUser, lastAddress, setValue]);

  React.useEffect(() => {
    const provinceId = watch("provinceId");
    if (provinceId && provinceId !== selectedProvinceId) {
      setSelectedProvinceId(provinceId);
    }
  }, [watch("provinceId"), selectedProvinceId]);

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        try {
          const formData = new FormData();
          formData.append("firstName", data.firstName);
          formData.append("family", data.family);
          formData.append("phoneNumber", data.phoneNumber);
          formData.append("email", data.email || "");
          if (data.provinceId) formData.append("provinceId", String(data.provinceId));
          if (data.cityId) formData.append("cityId", String(data.cityId));
          if (data.address) formData.append("address", data.address);
          if (profileImageUpload) {
            formData.append("imageDataUrl", profileImageUpload.previewUrl);
            formData.append("imageFileName", profileImageUpload.file.name);
          } else {
            formData.append("imageUrl", authUser.imageUrl || "");
          }

          if (data.provinceId || data.cityId || data.address) {
            setLastAddress({
              provinceId: data.provinceId,
              provinceName: provinces.find(p => p.id === data.provinceId)?.name,
              cityId: data.cityId,
              cityName: cities.find(c => c.id === data.cityId)?.name,
              address: data.address,
            });
          }

          if (profileImageUpload) {
            setImageDataUrl(profileImageUpload.previewUrl);
          }

          await saveProfileAction(formData);
          toast.success("اطلاعات با موفقیت ذخیره شد");
        } catch (error) {
          if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
            throw error;
          }
          console.log(error);
          toast.error("خطا در ذخیره سازی");
        }
      })}
      className="space-y-5"
    >
      <div className="space-y-2 md:col-span-2">
        <AvatarImageUploader
          id="profile-image-upload"
          fallbackPreviewUrl={storedImage || authUser.imageUrl || ""}
          avatarFallbackText={userInitial}
          maxUploadSizeBytes={5 * 1024 * 1024}
          maxCroppedImageSizeBytes={512 * 1024}
          acceptedImageTypes={["image/png", "image/jpeg", "image/webp"]}
          onValueChange={setProfileImageUpload}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          label="نام"
          required
          id="firstName"
          {...register("firstName")}
          placeholder="مثال: علی"
          className="rounded-lg"
          error={errors.firstName?.message}
        />

        <FormField
          label="نام خانوادگی"
          required
          id="family"
          {...register("family")}
          placeholder="مثال: رضایی"
          className="rounded-lg"
          error={errors.family?.message}
        />

        <FormField
          label="شماره موبایل"
          required
          id="phoneNumber"
          {...register("phoneNumber")}
          dir="ltr"
          placeholder="09123456789"
          className="rounded-lg text-left"
          error={errors.phoneNumber?.message}
        />

        <FormField
          label="ایمیل"
          id="email"
          type="email"
          {...register("email")}
          dir="ltr"
          placeholder="example@mail.com"
          className="rounded-lg text-left"
          error={errors.email?.message}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold">آدرس</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label className="inline-block">استان</Label>
            <Select
              value={selectedProvinceId?.toString()}
              onValueChange={(value) => {
                const id = Number(value);
                setSelectedProvinceId(id);
                setValue("provinceId", id);
                setValue("cityId", undefined);
              }}
            >
              <SelectTrigger className="rounded-lg">
                <SelectValue placeholder="انتخاب استان" />
              </SelectTrigger>
              <SelectContent>
                {provinces.map((province) => (
                  <SelectItem key={province.id} value={province.id.toString()}>
                    {province.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="inline-block">شهر</Label>
            <Select
              value={watch("cityId")?.toString()}
              onValueChange={(value) => setValue("cityId", Number(value))}
              disabled={!selectedProvinceId}
            >
              <SelectTrigger className="rounded-lg">
                <SelectValue placeholder="انتخاب شهر" />
              </SelectTrigger>
              <SelectContent>
                {filteredCities.map((city) => (
                  <SelectItem key={city.id} value={city.id.toString()}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address" className="inline-block">
            محله، کوچه، پلاک، طبقه
          </Label>
          <Input
            id="address"
            {...register("address")}
            placeholder=" مثال: تهران، خیابان آزادی، کوچه دوم، پلاک ۱۰، طبقه ۳"
            className="rounded-lg"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" className="rounded-lg px-6" disabled={isSubmitting}>
          {isSubmitting ? "در حال ذخیره..." : "ذخیره تغییرات"}
        </Button>
      </div>
    </form>
  );
}
