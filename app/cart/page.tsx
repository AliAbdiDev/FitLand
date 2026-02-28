import ShoppingCartPage from "@/components/cart/ShoppingCartPage";
import Layout from "@/components/layout/Layout";

export default function CartPage() {
  return (
    <Layout>
      <main className="min-h-screen py-4 sm:py-6">
        <ShoppingCartPage />
      </main>
    </Layout>
  );
}
