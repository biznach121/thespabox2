"use client";

import { CataloguePage } from "@cimplify/sdk/react";
import type { Category, Product } from "@cimplify/sdk";
import { StoreProductCard } from "@/components/store-product-card";

/**
 * Client island for the shop page. Server-side fetches all products and
 * categories (ISR-cached in `app/shop/page.tsx`), then hands
 * them to `<CataloguePage>` which owns the interactive filter / sort state.
 */
export function ShopClient({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  return (
    <CataloguePage
      title="The SpaBox menu"
      products={products}
      categories={categories}
      renderCard={(p) => <StoreProductCard product={p} />}
    />
  );
}
