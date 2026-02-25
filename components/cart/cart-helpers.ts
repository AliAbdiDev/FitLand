export const priceFormatter = new Intl.NumberFormat("fa-IR");

export function formatPrice(value: number) {
  return `${priceFormatter.format(value)} تومان`;
}

export type CartTotals = {
  itemsPrice: number;
  totalPrice: number;
  totalQuantity: number;
};
