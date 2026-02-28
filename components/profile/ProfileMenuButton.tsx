import { cn } from "@/lib/utils";

type MenuItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

interface ProfileMenuButtonProps {
  active: boolean;
  item: MenuItem;
  onClick: () => void;
}

export function ProfileMenuButton({ active, item, onClick }: ProfileMenuButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full rounded-xl border px-4 py-3 text-right transition",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
        active
          ? "border-primary/10 bg-amber-50 text-foreground shadow-sm"
          : "border-border bg-background text-foreground hover:border-primary/20 hover:bg-primary/5",
      )}
      aria-pressed={active}
    >
      <span className="flex items-center gap-2 text-sm font-medium">
        <span className="text-foreground">{item.icon}</span>
        {item.label}
      </span>
    </button>
  );
}
