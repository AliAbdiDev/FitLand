# راهنمای استفاده از قابلیتهای جدید

## 1. ذخیره آخرین صفحه بازدید شده

### نصب پکیج مورد نیاز
```bash
pnpm install @hookform/resolvers
```

### استفاده از store
```typescript
import { useLastVisitedPageStore } from "@/stores/last-visited-page-store";

function MyComponent() {
  const lastPath = useLastVisitedPageStore((state) => state.lastPath);
  
  return <div>آخرین صفحه: {lastPath}</div>;
}
```

ردیابی خودکار صفحات در `layout.tsx` فعال شده است.

---

## 2. فرمها با React Hook Form + Zod

### مثال استفاده
```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

// تعریف schema
const schema = z.object({
  name: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد"),
  email: z.string().email("ایمیل معتبر نیست"),
});

type FormData = z.infer<typeof schema>;

function MyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      // ارسال به API
      await fetch("/api/submit", { method: "POST", body: JSON.stringify(data) });
      
      toast.success("موفقیت", {
        description: "اطلاعات ذخیره شد",
      });
    } catch (error) {
      toast.error("خطا", {
        description: "مشکلی پیش آمد",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} />
      {errors.name && <p>{errors.name.message}</p>}
      
      <input {...register("email")} />
      {errors.email && <p>{errors.email.message}</p>}
      
      <button type="submit">ارسال</button>
    </form>
  );
}
```

---

## 3. نمایش پیام با Sonner

### استفاده
```typescript
import { toast } from "sonner";

// موفقیت
toast.success("عنوان", {
  description: "توضیحات",
});

// خطا
toast.error("خطا", {
  description: "پیام خطا",
});

// هشدار
toast.warning("هشدار");

// اطلاعات
toast.info("اطلاعات");

// سفارشی
toast("پیام سفارشی", {
  duration: 5000,
});
```

---

## فایلهای ایجاد شده

1. `stores/last-visited-page-store.ts` - Store ذخیره آخرین صفحه
2. `hooks/use-track-last-visited-page.ts` - Hook ردیابی صفحات
3. `components/providers/PageTracker.tsx` - Component ردیابی خودکار
4. `components/my-components/example-form.tsx` - مثال فرم کامل

---

## نکات مهم

- همه فرمها باید از `react-hook-form` + `zod` استفاده کنند
- برای نمایش پیام فقط از `sonner` استفاده شود
- ذخیرهسازی در localStorage به صورت خودکار توسط zustand انجام میشود
