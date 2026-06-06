import type { Metadata } from "next";
import { Suspense } from "react";
import { getServerClient, tags, type Product } from "@cimplify/sdk/server";
import { BookClient } from "@/app/book/book-client";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Services — ${brand.name}`,
  description: `Book live services from ${brand.name}.`,
};

export const revalidate = 3600;

async function getServices(): Promise<Product[]> {
  const client = getServerClient();
  const result = await client.catalogue.getProducts(
    { limit: 100 },
    { cacheOptions: { revalidate: 3600, tags: [tags.products()] } },
  );
  if (!result.ok) return [];
  return result.value.items.filter((product) => product.type === "service");
}

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <article className="spabox-page">
      <div className="spabox-shell max-w-[1120px]">
        <header className="spabox-hero mb-8">
          <p className="spabox-eyebrow">Services</p>
          <h1 className="spabox-title">
            Choose a service.
            <br />
            Book a slot.
          </h1>
          <p className="spabox-lede">
            See only bookable services here. Products stay separate on the products page.
          </p>
        </header>

        <Suspense fallback={<ServicesSkeleton />}>
          <BookClient treatments={services} />
        </Suspense>
      </div>
    </article>
  );
}

function ServicesSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.4fr]">
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="h-16 animate-pulse rounded-2xl bg-muted" />
        ))}
      </div>
      <div className="rounded-2xl border border-border bg-card p-8">
        <div className="mb-4 h-5 w-40 animate-pulse rounded bg-muted" />
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className="h-10 animate-pulse rounded bg-muted" />
          ))}
        </div>
      </div>
    </div>
  );
}
