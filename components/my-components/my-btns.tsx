"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { ButtonHTMLAttributes } from "react";

type BtnAttribute = ButtonHTMLAttributes<HTMLButtonElement>;

function MyButtonLink({
  name = "view all",
  ...props
}: { name: string } & BtnAttribute) {
  return (
    <button
      className="text-seconbg-secondary max-lg:dark:text-white font-medium group"
      type="button"
      {...props}
    >
      <div className=" flex-center gap-0.5 text-secondary">
        {name}
        <span className="delay-300 transition-all duration-300 group-hover:translate-x-1">
          <ChevronRight width={20} height={20} />
        </span>
      </div>
      <span className="block w-0 h-0.5 bg-secondary max-lg:dark:bg-white group-hover:w-11/12 max-lg:w-10/12 transition-all duration-200 delay-100"></span>
    </button>
  );
}

export function CopyBtn({
  copyValue = "",
  ...props
}: { copyValue: string } & BtnAttribute) {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Button
      {...props}
      variant="outline"
      size="icon"
      className="disabled:opacity-100 size-full"
      onClick={handleCopy}
      aria-label={copied ? "Copied" : "Copy to clipboard"}
      disabled={copied}
    >
      <div
        className={cn(
          "transition-all",
          copied ? "scale-100 opacity-100" : "scale-0 opacity-0"
        )}
      >
        <Check
          className="stroke-emerald-700"
          size={16}
          strokeWidth={2}
          aria-hidden="true"
        />
      </div>
      <div
        className={cn(
          "absolute transition-all",
          copied ? "scale-0 opacity-0" : "scale-100 opacity-100"
        )}
      >
        <Copy size={16} strokeWidth={2} aria-hidden="true" />
      </div>
    </Button>
  );
}

export default MyButtonLink;
