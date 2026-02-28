"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ComponentProps } from "react";

interface FormFieldProps extends ComponentProps<typeof Input> {
  label: string;
  error?: string;
  required?: boolean;
}

export function FormField({ label, error, required, id, ...props }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="inline-block">
        {label} {required && "*"}
      </Label>
      <Input id={id} {...props} />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
