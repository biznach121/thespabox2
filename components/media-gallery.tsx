import Image from "next/image";
import Link from "next/link";
import { brand } from "@/lib/brand";

export function MediaGallery() {
  return (
    <section className="relative isolate overflow-hidden bg-[#e8e5dd] px-3 pb-20 pt-12 text-[#402720] sm:px-5">
      <svg
        className="pointer-events-none absolute -left-16 -top-36 z-0 h-96 w-[520px] text-[#8b8174]/28"
        viewBox="0 0 520 380"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M38 7C143 151 256 184 375 111C474 50 529 133 451 213C331 336 157 260 89 153C33 65 75 -2 186 41C287 80 285 174 184 180C74 187 6 103 38 7Z"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>

      <div className="relative z-10 mx-auto max-w-[1680px]">
        <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-5 pb-12">
          <div />
          <h2 className="m-0 text-center font-serif text-[82px] font-light leading-none tracking-normal sm:text-[110px] lg:text-[132px]">
            {brand.media.title}
          </h2>
          <div className="flex justify-end pt-5">
            <Link
              href={brand.media.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-16 w-20 items-center justify-center bg-[#402720] text-[14px] font-semibold uppercase text-[#e8e5dd] transition-transform hover:scale-105"
            >
              {brand.media.ctaLabel}
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
          {brand.media.images.map((image) => {
            const isVideo = image.src.endsWith(".mp4");

            return (
              <div
                key={image.src}
                className="relative aspect-square overflow-hidden bg-[#d8d3c5]"
              >
                {isVideo ? (
                  <video
                    src={image.src}
                    className="h-full w-full object-cover"
                    style={{ objectPosition: image.position }}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label={image.alt}
                  />
                ) : (
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 768px) 20vw, 50vw"
                    className="object-cover"
                    style={{ objectPosition: image.position }}
                    unoptimized
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
