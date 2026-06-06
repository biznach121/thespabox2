import Link from "next/link";
import { SpaBoxLogo } from "./spa-box-logo";
import { brand } from "@/lib/brand";

export async function Footer() {
  const instagram = brand.socials.find((social) => social.icon === "instagram");
  const serviceLinks = [
    { label: "Products", href: "/products" },
    { label: "Services", href: "/services" },
    { label: "Book", href: "/book" },
    { label: "Location", href: "/location" },
    { label: "Instagram", href: instagram?.href ?? "https://www.instagram.com/_the_spabox/" },
  ];

  return (
    <footer className="bg-[#e8e5dd] px-0 pb-0 pt-2 text-[#f3f0e8]">
      <div className="relative isolate min-h-[520px] overflow-hidden rounded-t-[64px] bg-[#82785f] px-8 py-16 sm:px-14 lg:px-[9%]">
        <FooterLines />

        <div className="relative z-10 grid min-h-[390px] content-between gap-14">
          <div className="grid gap-12 lg:grid-cols-[360px_1fr] lg:gap-20">
            <div>
              <Link href="/" className="block w-fit uppercase leading-none">
                <SpaBoxLogo className="text-[#f3f0e8]/84" />
              </Link>

              <div className="mt-10 max-w-[310px] space-y-3 text-[17px] font-medium leading-[1.3] text-[#f3f0e8]/78">
                <p className="m-0">{brand.footer.blurb}</p>
                <p className="m-0">Call or text to book your appointment.</p>
              </div>
            </div>

            <div className="grid gap-10 md:grid-cols-[1.1fr_0.8fr_0.8fr]">
              <address className="not-italic">
                <p className="m-0 font-serif text-[48px] font-light leading-[0.86] tracking-normal text-[#f3f0e8]/90 sm:text-[64px] lg:text-[76px]">
                  The SpaBox,
                  <br />
                  Kumasi
                </p>
                <Link
                  href="/book"
                  className="mt-8 inline-flex h-14 items-center justify-center bg-[#f3f0e8] px-7 text-[13px] font-semibold uppercase tracking-normal text-[#5f563f] transition-transform hover:scale-105"
                >
                  Book now
                </Link>
              </address>

              <div className="grid content-start gap-4">
                <h2 className="m-0 font-sans text-[12px] font-semibold uppercase text-[#f3f0e8]/56">
                  Contact
                </h2>
                <a
                  href={`tel:${brand.contact.phoneTel}`}
                  className="footer-contact-line text-[20px] font-semibold leading-tight text-[#f3f0e8]/88 transition-colors hover:text-white"
                >
                  Call 0550593869
                </a>
                <a
                  href="sms:+233599067017"
                  className="footer-contact-line text-[20px] font-semibold leading-tight text-[#f3f0e8]/88 transition-colors hover:text-white"
                >
                  Text 0599067017
                </a>
                <p className="footer-contact-line m-0 text-[20px] font-semibold leading-tight text-[#f3f0e8]/88">
                  Kumasi, Ghana
                </p>
                {instagram ? (
                  <a
                    href={instagram.href}
                    target="_blank"
                    rel="noreferrer"
                    className="footer-contact-line text-[20px] font-semibold leading-tight text-[#f3f0e8]/88 transition-colors hover:text-white"
                  >
                    Instagram @_the_spabox
                  </a>
                ) : null}
              </div>

              <nav className="grid content-start gap-4" aria-label="Footer">
                <h2 className="m-0 font-sans text-[12px] font-semibold uppercase text-[#f3f0e8]/56">
                  Explore
                </h2>
                <div className="grid gap-3 text-[16px] font-medium text-[#f3f0e8]/76">
                  {serviceLinks.map((link) =>
                    link.href.startsWith("http") ? (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="transition-colors hover:text-white"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    ),
                  )}
                </div>
              </nav>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-[#f3f0e8]/18 pt-6 text-[13px] font-medium text-[#f3f0e8]/58 sm:flex-row sm:items-center sm:justify-between">
            <p className="m-0">
              &copy; {new Date().getFullYear()} The SpaBox. Your sanctuary of beauty and peace.
            </p>
            <div className="flex gap-5">
              <Link href="/privacy" className="transition-colors hover:text-white">
                Privacy
              </Link>
              <Link href="/terms" className="transition-colors hover:text-white">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLines() {
  return (
    <svg
      className="footer-lines pointer-events-none absolute inset-0 z-0 h-full w-full text-[#f3f0e8]/22"
      viewBox="0 0 1440 520"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path
        d="M-104 244C177 327 447 316 635 248C809 185 693 72 523 158C356 243 500 386 761 437C1034 491 1319 433 1513 292"
        stroke="currentColor"
        strokeWidth="1.4"
        pathLength="1"
      />
      <path
        d="M932 431C1110 335 1269 308 1519 327"
        stroke="currentColor"
        strokeWidth="1.4"
        pathLength="1"
      />
    </svg>
  );
}
