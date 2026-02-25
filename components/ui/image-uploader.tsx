"use client";

import * as React from "react";
import { ImageIcon, UploadIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ImageCrop,
  ImageCropApply,
  ImageCropContent,
} from "@/components/ui/image-crop";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export type ImageUploaderVariant = "avatar" | "field";

export interface ImageUploaderValue {
  file: File;
  originalFile: File;
  previewUrl: string;
}

export interface ImageUploaderError {
  code: "invalid_type" | "file_too_large" | "crop_failed";
  message: string;
}

export interface ImageUploaderProps {
  id?: string;
  className?: string;
  disabled?: boolean;
  variant?: ImageUploaderVariant;
  label?: string;
  aspect?: number;
  value?: ImageUploaderValue | null;
  defaultValue?: ImageUploaderValue | null;
  onValueChange?: (value: ImageUploaderValue | null) => void;
  onErrorChange?: (error: ImageUploaderError | null) => void;
  acceptedImageTypes?: readonly string[];
  maxUploadSizeBytes?: number;
  maxCroppedImageSizeBytes?: number;
  avatarSizeClassName?: string;
  avatarFallbackText?: string;
  fallbackPreviewUrl?: string;
  showAvatarChangeButton?: boolean;
}

const DEFAULT_ACCEPTED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
] as const;

const DEFAULT_MAX_UPLOAD_SIZE_BYTES = 5 * 1024 * 1024;
const DEFAULT_MAX_CROPPED_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;

const bytesToKbText = (bytes: number) => {
  const kb = Math.max(1, Math.round(bytes / 1024));
  return `${new Intl.NumberFormat("fa-IR").format(kb)} KB`;
};

const bytesToMbText = (bytes: number) => {
  const mb = bytes / (1024 * 1024);
  return `${new Intl.NumberFormat("fa-IR", {
    maximumFractionDigits: mb >= 10 ? 0 : 1,
  }).format(mb)} MB`;
};

const mimeTypeMatches = (fileType: string, acceptedType: string) => {
  if (acceptedType === "*/*") {
    return true;
  }

  if (acceptedType.endsWith("/*")) {
    const prefix = acceptedType.slice(0, acceptedType.length - 1);
    return fileType.startsWith(prefix);
  }

  return fileType === acceptedType;
};

const isAcceptedFileType = (file: File, acceptedImageTypes: readonly string[]) =>
  acceptedImageTypes.some((acceptedType) => mimeTypeMatches(file.type, acceptedType));

const dataUrlToFile = (dataUrl: string, fileName: string) => {
  const [metaPart, dataPart] = dataUrl.split(",");

  if (!metaPart || !dataPart) {
    throw new Error("Invalid data URL");
  }

  const mimeMatch = metaPart.match(/^data:(.*?);base64$/);
  const mimeType = mimeMatch?.[1] ?? "image/png";
  const binaryString = atob(dataPart);
  const bytes = new Uint8Array(binaryString.length);

  for (let index = 0; index < binaryString.length; index += 1) {
    bytes[index] = binaryString.charCodeAt(index);
  }

  return new File([bytes], fileName, { type: mimeType });
};

const buildCroppedFileName = (originalFileName: string) => {
  const baseName = originalFileName.replace(/\.[^.]+$/, "");
  return `${baseName || "image"}-cropped.png`;
};

const getVariantLabel = (variant: ImageUploaderVariant) =>
  variant === "avatar" ? "تصویر پروفایل" : "بارگذاری تصویر";

export function ImageUploader({
  id,
  className,
  disabled = false,
  variant = "field",
  label,
  aspect,
  value,
  defaultValue = null,
  onValueChange,
  onErrorChange,
  acceptedImageTypes = DEFAULT_ACCEPTED_IMAGE_TYPES,
  maxUploadSizeBytes = DEFAULT_MAX_UPLOAD_SIZE_BYTES,
  maxCroppedImageSizeBytes = DEFAULT_MAX_CROPPED_IMAGE_SIZE_BYTES,
  avatarSizeClassName,
  avatarFallbackText,
  fallbackPreviewUrl,
  showAvatarChangeButton = true,
}: ImageUploaderProps) {
  const generatedId = React.useId();
  const inputId = id ?? `${generatedId}-image-upload`;
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const [internalValue, setInternalValue] = React.useState<ImageUploaderValue | null>(
    defaultValue,
  );
  const [pendingFile, setPendingFile] = React.useState<File | null>(null);
  const [isCropModalOpen, setIsCropModalOpen] = React.useState(false);
  const [isPreparingCrop, setIsPreparingCrop] = React.useState(false);
  const [error, setError] = React.useState<ImageUploaderError | null>(null);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value ?? null : internalValue;
  const resolvedAspect = aspect ?? (variant === "avatar" ? 1 : undefined);
  const acceptAttribute = acceptedImageTypes.join(",");

  const commitValue = React.useCallback(
    (nextValue: ImageUploaderValue | null) => {
      if (!isControlled) {
        setInternalValue(nextValue);
      }

      onValueChange?.(nextValue);
    },
    [isControlled, onValueChange],
  );

  const setUploaderError = React.useCallback(
    (nextError: ImageUploaderError | null) => {
      setError(nextError);
      onErrorChange?.(nextError);
    },
    [onErrorChange],
  );

  const openFilePicker = () => {
    if (disabled) {
      return;
    }

    fileInputRef.current?.click();
  };

  const resetNativeInputValue = (input: HTMLInputElement) => {
    input.value = "";
  };

  const openCropModalWithFile = (file: File) => {
    setUploaderError(null);
    setPendingFile(file);
    setIsCropModalOpen(true);
  };

  const buildFallbackFileName = () => {
    if (fallbackPreviewUrl) {
      try {
        const url = new URL(fallbackPreviewUrl, window.location.origin);
        const pathnameName = url.pathname.split("/").filter(Boolean).at(-1);
        if (pathnameName) {
          return pathnameName;
        }
      } catch {
        return "profile-image.png";
      }
    }

    return "profile-image.png";
  };

  const openCropEditor = async () => {
    if (disabled) {
      return;
    }

    if (currentValue?.originalFile) {
      openCropModalWithFile(currentValue.originalFile);
      return;
    }

    if (currentValue?.file) {
      openCropModalWithFile(currentValue.file);
      return;
    }

    if (fallbackPreviewUrl) {
      try {
        setIsPreparingCrop(true);
        const response = await fetch(fallbackPreviewUrl);

        if (!response.ok) {
          throw new Error("Failed to fetch image");
        }

        const blob = await response.blob();
        const fallbackFile = new File([blob], buildFallbackFileName(), {
          type: blob.type || "image/png",
        });

        if (!isAcceptedFileType(fallbackFile, acceptedImageTypes)) {
          setUploaderError({
            code: "invalid_type",
            message: "نوع فایل تصویر مجاز نیست.",
          });
          return;
        }

        if (fallbackFile.size > maxUploadSizeBytes) {
          setUploaderError({
            code: "file_too_large",
            message: `حجم فایل باید کمتر از ${bytesToMbText(maxUploadSizeBytes)} باشد.`,
          });
          return;
        }

        openCropModalWithFile(fallbackFile);
        return;
      } catch {
        setUploaderError({
          code: "crop_failed",
          message: "امکان باز کردن برش برای این تصویر وجود ندارد. لطفاً تصویر جدید انتخاب کنید.",
        });
        return;
      } finally {
        setIsPreparingCrop(false);
      }
    }

    openFilePicker();
  };

  const handleDialogChange = (open: boolean) => {
    setIsCropModalOpen(open);

    if (!open) {
      setPendingFile(null);
    }
  };

  const handleCancelCrop = () => {
    setPendingFile(null);
    setIsCropModalOpen(false);
  };

  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    resetNativeInputValue(event.target);

    if (!selectedFile) {
      return;
    }

    if (!isAcceptedFileType(selectedFile, acceptedImageTypes)) {
      setUploaderError({
        code: "invalid_type",
        message: "نوع فایل تصویر مجاز نیست.",
      });
      return;
    }

    if (selectedFile.size > maxUploadSizeBytes) {
      setUploaderError({
        code: "file_too_large",
        message: `حجم فایل باید کمتر از ${bytesToMbText(maxUploadSizeBytes)} باشد.`,
      });
      return;
    }

    setUploaderError(null);
    setPendingFile(selectedFile);
    setIsCropModalOpen(true);
  };

  const handleCroppedImage = (croppedImageDataUrl: string) => {
    if (!pendingFile) {
      return;
    }

    try {
      const croppedFile = dataUrlToFile(
        croppedImageDataUrl,
        buildCroppedFileName(pendingFile.name),
      );

      const nextValue: ImageUploaderValue = {
        file: croppedFile,
        originalFile: pendingFile,
        previewUrl: croppedImageDataUrl,
      };

      commitValue(nextValue);
      setUploaderError(null);
      setPendingFile(null);
      setIsCropModalOpen(false);
    } catch {
      setUploaderError({
        code: "crop_failed",
        message: "پردازش تصویر انجام نشد. دوباره تلاش کنید.",
      });
    }
  };

  const helperText = `حداکثر حجم: ${bytesToMbText(maxUploadSizeBytes)} | فرمت‌های مجاز: ${acceptedImageTypes
    .map((item) => item.replace("image/", "").toUpperCase())
    .join("، ")}`;

  return (
    <div className={cn("space-y-3", className)}>
      <Label htmlFor={inputId}>{label ?? getVariantLabel(variant)}</Label>

      <input
        ref={fileInputRef}
        id={inputId}
        type="file"
        accept={acceptAttribute}
        onChange={handleFileSelection}
        disabled={disabled}
        className="sr-only"
      />

      {variant === "avatar" ? (
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => {
              void openCropEditor();
            }}
            disabled={disabled || isPreparingCrop}
            className={cn(
              "group rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-60",
            )}
            aria-label="باز کردن پنجره برش تصویر"
            title="برای برش تصویر روی آواتار کلیک کنید"
          >
            <Avatar
              className={cn(
                "size-20 border border-border ring-2 ring-primary/10 transition group-hover:ring-primary/30",
                avatarSizeClassName,
              )}
            >
              <AvatarImage
                src={currentValue?.previewUrl || fallbackPreviewUrl || undefined}
                alt={label ?? "پیش‌نمایش تصویر"}
              />
              <AvatarFallback className="bg-muted text-muted-foreground">
                {avatarFallbackText ?? <ImageIcon className="size-5" />}
              </AvatarFallback>
            </Avatar>
          </button>

          <div className="space-y-2">
            {showAvatarChangeButton ? (
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={openFilePicker}
                  disabled={disabled}
                  className="gap-2"
                >
                  <UploadIcon className="size-4" />
                  {currentValue ? "تغییر تصویر" : "انتخاب تصویر"}
                </Button>
              </div>
            ) : null}
            <p className="text-xs text-muted-foreground">{helperText}</p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <Button
            type="button"
            variant="outline"
            onClick={openFilePicker}
            disabled={disabled}
            className="h-auto w-full justify-start gap-3 border-dashed px-4 py-4 text-right"
          >
            <span className="rounded-lg bg-primary/10 p-2 text-primary">
              <UploadIcon className="size-4" />
            </span>
            <span className="flex flex-col items-start">
              <span className="font-medium">
                {currentValue ? "تغییر فایل تصویر" : "انتخاب فایل تصویر"}
              </span>
              <span className="text-xs text-muted-foreground">{helperText}</span>
            </span>
          </Button>

          {currentValue && (
            <Card className="shadow-none">
              <CardContent className="flex items-center gap-3 p-3">
                <div className="rounded-lg bg-muted p-2 text-muted-foreground">
                  <ImageIcon className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{currentValue.file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    حجم فایل: {bytesToKbText(currentValue.file.size)}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {error && <p className="text-xs text-destructive">{error.message}</p>}

      <Dialog open={isCropModalOpen} onOpenChange={handleDialogChange}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>برش تصویر</DialogTitle>
            <DialogDescription>
              ناحیه موردنظر را انتخاب کنید و سپس دکمه تایید را بزنید.
            </DialogDescription>
          </DialogHeader>

          {pendingFile && (
            <ImageCrop
              file={pendingFile}
              aspect={resolvedAspect}
              maxImageSize={maxCroppedImageSizeBytes}
              onCrop={handleCroppedImage}
            >
              <div className="rounded-xl border bg-muted/30 p-3">
                <ImageCropContent className="mx-auto max-h-[60vh] max-w-full" />
              </div>

              <DialogFooter className="mt-4 gap-2 sm:space-x-0">
                <Button type="button" variant="outline" onClick={handleCancelCrop}>
                  لغو
                </Button>

                <ImageCropApply asChild>
                  <Button type="button">تایید</Button>
                </ImageCropApply>
              </DialogFooter>
            </ImageCrop>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function AvatarImageUploader(
  props: Omit<ImageUploaderProps, "variant" | "aspect"> & { aspect?: number },
) {
  const { aspect, ...restProps } = props;
  return <ImageUploader {...restProps} variant="avatar" aspect={aspect ?? 1} />;
}

export function FieldImageUploader(props: Omit<ImageUploaderProps, "variant">) {
  return <ImageUploader variant="field" {...props} />;
}
