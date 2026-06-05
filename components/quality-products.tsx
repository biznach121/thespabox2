"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { formatMoney, type Product as CatalogueProduct } from "@cimplify/sdk";
import { useCart, useCartDrawer } from "@cimplify/sdk/react";
import { brand } from "@/lib/brand";

export function QualityProducts({
  catalogueProducts = [],
}: {
  catalogueProducts?: CatalogueProduct[];
}) {
  const products = brand.qualityProducts.items;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "previous">("next");
  const visible = useMemo(
    () => [products[index], products[(index + 1) % products.length]],
    [index, products],
  );

  const goPrevious = () => {
    setDirection("previous");
    setIndex((current) => (current - 1 + products.length) % products.length);
  };

  const goNext = () => {
    setDirection("next");
    setIndex((current) => (current + 1) % products.length);
  };

  return (
    <section className="relative isolate overflow-hidden bg-[#e8e5dd] px-4 pb-20 pt-12 text-[#402720] sm:px-8 lg:pb-28">
      <Contour />
      <div className="relative z-10 mx-auto max-w-[1180px]">
        <div className="flex items-start justify-center">
          <h2 className="m-0 max-w-[820px] text-center font-serif text-[54px] font-light leading-[0.82] tracking-normal sm:text-[96px] lg:text-[112px]">
            {brand.qualityProducts.title}
          </h2>
        </div>

        <div
          key={`${index}-${direction}`}
          className={`product-carousel-track product-carousel-track-${direction} mx-auto mt-10 grid max-w-[980px] gap-8 sm:mt-14 lg:grid-cols-2 lg:items-end lg:gap-10`}
        >
          {visible.map((product, position) => (
            <ProductCard
              key={`${product.name}-${index}`}
              product={product}
              catalogueProduct={findCatalogueProduct(product, catalogueProducts)}
              position={position}
            />
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-4">
          <CarouselButton label="Previous product" onClick={goPrevious} direction="previous" />
          <span className="text-[13px] font-semibold text-[#402720]/70">
            {index + 1} / {products.length}
          </span>
          <CarouselButton label="Next product" onClick={goNext} direction="next" />
        </div>
      </div>
    </section>
  );
}

type Product = (typeof brand.qualityProducts.items)[number];

function ProductCard({
  product,
  catalogueProduct,
  position,
}: {
  product: Product;
  catalogueProduct?: CatalogueProduct;
  position: number;
}) {
  const isOlive = product.tone === "olive";
  const { addItem } = useCart();
  const { open } = useCartDrawer();
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState(false);
  const displayPrice = catalogueProduct
    ? formatMoney(catalogueProduct.default_price)
    : product.price;

  const handleBuy = async () => {
    if (!catalogueProduct || isAdding) return;
    setIsAdding(true);
    setError(false);
    try {
      await addItem(catalogueProduct, 1);
      setAdded(true);
      open();
      window.setTimeout(() => setAdded(false), 2200);
    } catch {
      setError(true);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <article
      className={[
        "relative min-h-[560px] overflow-hidden rounded-[180px] border border-white/25 px-7 pb-8 pt-[82px] shadow-[0_24px_70px_rgba(64,39,32,0.08)] sm:h-[660px] sm:rounded-[240px] sm:px-12 sm:pt-[104px] lg:h-[720px] lg:px-14 lg:pt-[112px]",
        position === 0 ? "lg:translate-y-[-16px]" : "hidden lg:block lg:translate-y-[24px]",
        isOlive ? "bg-[#82785f] text-white" : "bg-[#d8d3c5] text-[#402720]",
      ].join(" ")}
    >
      <div
        className={[
          "pointer-events-none absolute inset-3 rounded-[inherit] border",
          isOlive ? "border-white/16" : "border-[#402720]/10",
        ].join(" ")}
      />
      <div className="relative z-10 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
        <div className="min-w-0 max-w-[260px]">
          <h3 className="m-0 whitespace-pre-line break-words font-serif text-[28px] font-light leading-[0.92] tracking-normal sm:text-[34px] lg:text-[38px]">
            {product.name}
          </h3>
          <p className="mt-2 text-[14px] font-semibold leading-tight opacity-[0.82] sm:text-[15px]">
            {product.subtitle}
          </p>
        </div>
        <button
          type="button"
          onClick={handleBuy}
          disabled={!catalogueProduct || isAdding}
          aria-label={
            catalogueProduct
              ? `Add ${catalogueProduct.name} to cart`
              : `${product.name.replace(/\s+/g, " ")} is not available in the live catalogue yet`
          }
          className={[
            "mt-1 inline-flex h-11 w-14 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold uppercase transition-transform hover:scale-105 sm:mt-3",
            !catalogueProduct || isAdding ? "cursor-not-allowed opacity-60" : "",
            isOlive ? "bg-[#f0eee8] text-[#6f674f]" : "bg-[#402720] text-white",
          ].join(" ")}
        >
          {isAdding ? "..." : added ? "In" : product.ctaLabel}
        </button>
      </div>

      <div className="relative z-10 mt-6 max-w-[265px] space-y-3 sm:mt-7">
        <PriceLine price={displayPrice} compareAt={product.compareAt} note={product.note} />
        {product.secondaryPrice ? (
          <PriceLine
            price={product.secondaryPrice}
            compareAt={product.secondaryCompareAt}
            note={product.secondaryNote ?? product.note}
          />
        ) : null}
        {error ? (
          <p className="m-0 text-[12px] font-semibold text-red-950/80">
            Could not add. Try again.
          </p>
        ) : null}
      </div>

      <div
        className={[
          "absolute inset-x-0 bottom-7 mx-auto h-[235px] w-[84%] overflow-hidden rounded-[999px] shadow-[0_18px_44px_rgba(64,39,32,0.18)] sm:bottom-9 sm:h-[300px] sm:w-[80%] lg:h-[330px]",
          isOlive ? "bg-[#6f674f]" : "bg-[#c5bea9]",
        ].join(" ")}
      >
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(min-width: 1024px) 44vw, 90vw"
          className="object-cover"
          unoptimized
        />
      </div>
    </article>
  );
}

function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function findCatalogueProduct(
  featuredProduct: Product,
  catalogueProducts: CatalogueProduct[],
): CatalogueProduct | undefined {
  const matchTerms = featuredProduct.catalogueMatches.map(normalize);
  return catalogueProducts.find((product) => {
    const haystack = normalize(
      [
        product.name,
        product.slug,
        product.description,
        product.sku,
        product.tags?.join(" "),
        product.metadata ? JSON.stringify(product.metadata) : "",
      ]
        .filter(Boolean)
        .join(" "),
    );
    return matchTerms.some((term) => haystack.includes(term));
  });
}

function PriceLine({
  price,
  compareAt,
  note,
}: {
  price: string;
  compareAt?: string;
  note: string;
}) {
  return (
    <div>
      <p className="m-0 flex flex-wrap items-baseline gap-3 font-serif text-[22px] font-light leading-none tracking-normal sm:text-[24px]">
        <span>{price}</span>
        {compareAt ? (
          <span className="font-sans text-[13px] font-semibold line-through opacity-70">
            {compareAt}
          </span>
        ) : null}
      </p>
      <p className="m-0 mt-1 text-[12px] font-semibold opacity-80 sm:text-[13px]">{note}</p>
    </div>
  );
}

function CarouselButton({
  label,
  onClick,
  direction,
}: {
  label: string;
  onClick: () => void;
  direction: "previous" | "next";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid h-12 w-12 place-items-center rounded-full border border-[#402720]/35 text-[#402720] transition-colors hover:bg-[#402720] hover:text-[#e8e5dd]"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={direction === "previous" ? "h-5 w-5 rotate-180" : "h-5 w-5"}
      >
        <path d="M4 12h15" />
        <path d="m13 6 6 6-6 6" />
      </svg>
    </button>
  );
}

function Contour() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 z-0 h-full w-full text-[#8b8174]/28"
      viewBox="0 0 1440 980"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path
        d="M-140 804C42 730 172 746 288 838C432 952 604 943 761 810C940 658 1188 633 1541 733"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M697 210C844 41 1138 62 1229 221C1313 367 1167 517 988 466C838 423 792 277 892 180C993 83 1187 89 1375 211"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}
