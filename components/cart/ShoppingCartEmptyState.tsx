import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type ShoppingCartEmptyStateProps = {
  onResetCart: () => void;
};

export function ShoppingCartEmptyState({
  onResetCart,
}: ShoppingCartEmptyStateProps) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Card className="rounded-3xl border-border shadow-sm">
        <CardContent className="p-8 text-center">
          <h1 className="text-xl font-bold text-foreground">سبد خرید شما خالی است</h1>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            برای مشاهده دوباره نمونه طراحی، می توانید سبد را بازنشانی کنید.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button
              type="button"
              onClick={onResetCart}
              className="rounded-xl px-5 py-3 text-sm font-semibold"
            >
              بازنشانی سبد نمونه
            </Button>
            <Button
              asChild
              type="button"
              variant="outline"
              className="rounded-xl px-5 py-3 text-sm font-semibold text-foreground hover:bg-muted"
            >
              <Link href="/">بازگشت به خانه</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
