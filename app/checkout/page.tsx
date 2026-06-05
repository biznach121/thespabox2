"use client";

import { useRouter } from "next/navigation";
import { CheckoutPage as SdkCheckoutPage } from "@cimplify/sdk/react";

export default function CheckoutPage() {
  const router = useRouter();
  return (
    <main className="spabox-page">
      <div className="spabox-shell max-w-[1120px]">
        <header className="spabox-hero mb-8">
          <p className="spabox-eyebrow">Checkout</p>
          <h1 className="spabox-title">Confirm your booking.</h1>
          <p className="spabox-lede">Complete payment and we will prepare your order or appointment details.</p>
        </header>
        <SdkCheckoutPage
          onComplete={(result) => {
            if (result.success && result.order) {
              router.push(`/orders/${result.order.id}`);
            }
          }}
        />
      </div>
    </main>
  );
}
