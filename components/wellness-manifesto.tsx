"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { brand } from "@/lib/brand";

export function WellnessManifesto() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (!("IntersectionObserver" in window)) {
      section.classList.add("is-visible");
      section.querySelectorAll(".wellness-reveal").forEach((element) => {
        element.classList.add("is-visible");
      });
      return;
    }

    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          section.classList.add("is-visible");
          sectionObserver.disconnect();
        }
      },
      { rootMargin: "0px 0px -18% 0px", threshold: 0.12 },
    );

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -14% 0px", threshold: 0.16 },
    );

    sectionObserver.observe(section);
    section.querySelectorAll(".wellness-reveal").forEach((element) => {
      revealObserver.observe(element);
    });

    return () => {
      sectionObserver.disconnect();
      revealObserver.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="wellness-manifesto relative isolate overflow-hidden bg-[#e8e5dd] px-5 pb-20 pt-20 text-[#402720] sm:px-8 md:min-h-[1580px] md:pb-24 md:pt-28 lg:min-h-[1540px] lg:px-12"
    >
      <ContourLines />

      <div className="relative mx-auto max-w-[1220px] md:min-h-[1450px]">
        <div className="absolute left-1/2 top-0 h-[1040px] w-[1040px] -translate-x-1/2 rounded-full bg-[#d8d3c5] max-lg:h-[88vw] max-lg:w-[88vw] max-md:hidden" />

        <h2 className="wellness-reveal wellness-heading relative z-10 mx-auto mt-8 max-w-[820px] whitespace-pre-line text-center font-serif text-[36px] font-light leading-[1] tracking-normal text-[#432820] sm:text-[56px]">
          {brand.editorial.headline}
        </h2>

        <div className="relative z-10 mt-8 hidden h-[920px] md:block">
          {brand.editorial.images.map((image, index) => (
            <div
              key={`${image.src}-${index}`}
              className={`wellness-float-frame absolute overflow-hidden bg-[#cfc8b8] shadow-[0_18px_55px_rgba(69,47,33,0.16)] ${image.className}`}
            >
              <div className="wellness-float-image relative h-full w-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes={image.sizes}
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>
          ))}

          {brand.editorial.notes.map((note) => (
            <p
              key={note.body}
              className={`wellness-note absolute m-0 text-[17px] font-semibold leading-[1.16] text-[#4d362f]/86 ${note.className}`}
            >
              {note.body}
            </p>
          ))}
        </div>

        <div className="relative z-10 mt-10 grid gap-5 md:hidden">
          <div className="wellness-float-frame relative mx-auto h-[480px] w-full max-w-[320px] overflow-hidden rounded-[999px] bg-[#cfc8b8]">
            <div className="wellness-float-image relative h-full w-full">
              <Image
                src={brand.editorial.images[0]?.src ?? ""}
                alt={brand.editorial.images[0]?.alt ?? ""}
                fill
                sizes="360px"
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {brand.editorial.images.slice(1, 4).map((image, index) => (
              <div
                key={`${image.src}-${index}`}
                className="wellness-float-frame relative aspect-[0.72] overflow-hidden rounded-[999px] bg-[#cfc8b8]"
              >
                <div className="wellness-float-image relative h-full w-full">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="30vw"
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="grid gap-4 text-[17px] font-semibold leading-[1.25] text-[#4d362f]/86">
            {brand.editorial.notes.map((note) => (
              <p key={note.body} className="wellness-note m-0">
                {note.body}
              </p>
            ))}
          </div>
        </div>

        <div className="relative z-10 mt-20 min-h-[560px] md:mt-0">
          <h3 className="wellness-reveal wellness-basis-title whitespace-pre-line font-serif text-[68px] font-light leading-[0.76] tracking-normal text-[#402720] sm:text-[86px] md:absolute md:left-[20%] md:top-[3%] [&_span:nth-child(2)]:ml-[0.95em]">
            {brand.editorial.basisTitle.split("\n").map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h3>

          <div className="mt-10 grid gap-10 md:mt-0">
            {brand.editorial.pillars.map((pillar) => (
              <article
                key={pillar.title}
                className={`wellness-reveal wellness-pillar md:absolute ${pillar.className}`}
              >
                <h4 className="wellness-pillar-title m-0 whitespace-pre-line font-serif text-[46px] font-light leading-[0.82] tracking-normal text-[#402720] sm:text-[58px] [&_span:nth-child(2)]:ml-[0.7em]">
                  {pillar.title.split("\n").map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h4>
                <p className="wellness-pillar-body mt-5 text-[17px] font-medium leading-[1.26] text-[#4d362f]/86">
                  {pillar.body}
                </p>
                {pillar.bullets ? (
                  <ul className="mt-5 space-y-4 text-[17px] font-medium leading-[1.22] text-[#4d362f]/86">
                    {pillar.bullets.map((bullet, index) => (
                      <li
                        key={bullet}
                        className="wellness-pillar-bullet grid grid-cols-[26px_1fr] gap-4"
                        style={{ "--bullet-delay": `${0.34 + index * 0.14}s` } as React.CSSProperties}
                      >
                        <svg
                          viewBox="0 0 28 10"
                          fill="currentColor"
                          aria-hidden="true"
                          className="mt-[0.46em] h-2.5 w-7 text-[#402720]"
                        >
                          <path
                            d="M0.5 5.12C7.85 4.7 15.22 3.28 27.5 0.85C20.5 4.44 13.48 6.94 0.5 9.15C3.55 7.78 4.02 6.47 0.5 5.12Z"
                          />
                        </svg>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContourLines() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 z-0 h-full w-full text-[#8b8174]/28"
      viewBox="0 0 1440 1720"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path
        d="M-92 616C135 742 304 754 472 667C644 578 743 529 941 602C1098 660 1279 686 1455 521"
        stroke="currentColor"
        strokeWidth="1"
        pathLength="1"
      />
      <path
        d="M-84 1017C172 839 407 847 590 973C727 1067 853 1078 995 980C1131 886 1286 906 1469 1048"
        stroke="currentColor"
        strokeWidth="1"
        pathLength="1"
      />
      <path
        d="M932 1269C1071 1183 1263 1203 1328 1331C1379 1432 1328 1550 1195 1563C1071 1575 979 1500 1012 1405C1045 1311 1194 1323 1266 1407"
        stroke="currentColor"
        strokeWidth="1"
        pathLength="1"
      />
      <path
        d="M493 420C545 332 677 340 705 436C731 524 630 593 553 542C493 502 494 421 554 383"
        stroke="currentColor"
        strokeWidth="1"
        pathLength="1"
      />
    </svg>
  );
}
