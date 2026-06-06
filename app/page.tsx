import type { Metadata } from "next";
import { getServerClient, tags, type Product } from "@cimplify/sdk/server";
import { Hero } from "@/components/hero";
import { WellnessManifesto } from "@/components/wellness-manifesto";
// import { ServicesIntro } from "@/components/services-intro";
// import { ServiceBands } from "@/components/service-bands";
import { ServiceHighlights } from "@/components/service-highlights";
import { QualityProducts } from "@/components/quality-products";
import { MediaGallery } from "@/components/media-gallery";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: `${brand.name} — ${brand.hero.title.replace(/\s+/g, " ")}`,
  description: brand.description,
};

export const revalidate = 3600;

async function getFeaturedProducts(): Promise<Product[]> {
  const result = await getServerClient().catalogue.getProducts(
    { limit: 100 },
    { cacheOptions: { revalidate: 0, tags: [tags.products()] } },
  );
  if (!result.ok) return [];
  return result.value.items.filter((product) => product.type === "product");
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      <Hero
        badge={brand.hero.badge}
        title={brand.hero.title}
        subtitle={brand.hero.subtitle}
        primaryCtaLabel={brand.hero.primaryCtaLabel}
        primaryCtaHref={brand.hero.primaryCtaHref ?? "/book"}
        videoUrl={brand.hero.videoUrl}
        videoUrls={brand.hero.videoUrls}
        nav={brand.header.nav}
        phone={brand.contact.phone}
        phoneTel={brand.contact.phoneTel}
      />
      <WellnessManifesto />
      {/* Previous services section, kept for easy rollback:
      <ServicesIntro />
      <ServiceBands />
      */}
      <ServiceHighlights />
      <QualityProducts catalogueProducts={featuredProducts} />
      <MediaGallery />
    </>
  );
}
