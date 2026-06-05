import type { Metadata } from "next";
import { Suspense } from "react";
import { getServerClient, tags, type Product } from "@cimplify/sdk/server";
import { BookClient } from "./book-client";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Book a treatment — ${brand.name}`,
  description: "Pick a treatment, pick a slot, you're booked.",
};

export const revalidate = 3600;

async function getTreatments(): Promise<Product[]> {
  const client = getServerClient();
  const r = await client.catalogue.getProducts(
    { limit: 50 },
    { cacheOptions: { revalidate: 3600, tags: [tags.products()] } },
  );
  if (!r.ok) return [];
  // Booking flow only handles service-typed products.
  return r.value.items.filter((p) => p.type === "service");
}

export default async function BookPage() {
  const treatments = await getTreatments();
  return (
    <article className="spabox-page">
      <div className="spabox-shell max-w-[1120px]">
        <header className="spabox-hero mb-8">
          <p className="spabox-eyebrow">Book a service</p>
          <h1 className="spabox-title">
            Pick a treatment.
            <br />
            Pick a slot.
          </h1>
          <p className="spabox-lede">
            Choose a service, select an available time, and continue to checkout to confirm your appointment.
          </p>
        </header>

        <Suspense fallback={<BookSkeleton />}>
          <BookClient treatments={treatments} />
        </Suspense>
      </div>
    </article>
  );
}

function BookSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-8">
      <div className="space-y-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-16 bg-muted rounded-2xl animate-pulse" />
        ))}
      </div>
      <div className="rounded-2xl border border-border bg-card p-8">
        <div className="h-5 w-40 bg-muted rounded mb-4 animate-pulse" />
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="h-10 bg-muted rounded animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
