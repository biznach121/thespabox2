"use client";

import { useCartDrawer } from "@cimplify/sdk/react";
import { useCartCount } from "@/lib/cart";

/**
 * Cart pill — dynamic island. Reads the live cart count via the SDK and
 * opens the side cart drawer on click (instead of navigating to /cart).
 * Wrap in `<Suspense fallback={<CartPillSkeleton/>}>` so the cached
 * header chrome streams without blocking on the cart fetch.
 */
export function CartPill() {
  const { count } = useCartCount();
  const { open } = useCartDrawer();
  return (
    <button
      type="button"
      onClick={open}
      aria-label={`Open cart, ${count} ${count === 1 ? "item" : "items"}`}
      className="inline-flex items-center gap-1.5 px-4 py-2.5 sm:py-2 rounded-full bg-foreground text-background text-xs font-semibold tracking-wide transition-transform hover:scale-105 cursor-pointer"
    >
      Cart · {count}
    </button>
  );
}

export function CartPillSkeleton() {
  return (
    <span
      aria-hidden
      className="inline-flex items-center gap-1.5 px-4 py-2.5 sm:py-2 rounded-full bg-foreground/80 text-background text-xs font-semibold tracking-wide"
    >
      Cart · …
    </span>
  );
}
