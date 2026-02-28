import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Search } from "lucide-react";
import { useId } from "react";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  buttonLabel?: string;
}

export default function MyInput({
  label,
  placeholder = "جستجو...",
  icon = <Search size={16} strokeWidth={2} />,
  buttonLabel = "جستجو",
  className,
  ...props
}: SearchInputProps) {
  const id = useId();
  return (
    <div className="space-y-2 w-full">
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className="relative">
        <Input
          id={id}
          className={`peer pe-9 ps-9 transition-all ${className || ""}`}
          placeholder={placeholder}
          type="text"
          {...props}
        />
        <div className="peer-focus:hidden flex pointer-events-none absolute inset-y-0 start-0 items-center justify-center ps-3 text-primary/50 peer-disabled:opacity-50">
          {icon}
        </div>
        <button
          className="peer-focus:flex hidden text-primary absolute inset-y-0 start-0 h-full w-9 items-center justify-center rounded-e-lg outline-offset-2 transition-colors focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          aria-label={buttonLabel}
          type="button"
        >
          <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
