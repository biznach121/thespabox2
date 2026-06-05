import type { Metadata } from "next";
import { brand } from "@/lib/brand";

const mapsUrl =
  "https://www.google.com/maps/place/the+SpaBox/@6.6740733,-1.6064683,17z/data=!3m1!4b1!4m6!3m5!1s0xfdb97ed58d74013:0x6e4c1fa97e2ebaa1!8m2!3d6.6740733!4d-1.6064683!16s%2Fg%2F11xrpbr8mq?entry=ttu&g_ep=EgoyMDI2MDYwMS4wIKXMDSoASAFQAw%3D%3D";

export const metadata: Metadata = {
  title: `Location — ${brand.name}`,
  description: `Find ${brand.name} in ${brand.contact.city}.`,
};

export default function LocationPage() {
  return (
    <main className="bg-[#e8e5dd] text-[#402720]">
      <section className="mx-auto grid min-h-[calc(100svh-120px)] max-w-6xl gap-10 px-4 py-12 sm:px-8 sm:py-16 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:py-20">
        <div>
          <p className="m-0 mb-4 text-[12px] font-semibold uppercase text-[#82785f]">
            Visit us
          </p>
          <h1 className="m-0 font-serif text-[48px] font-light leading-[0.88] tracking-normal sm:text-[76px] lg:text-[92px]">
            The SpaBox,
            <br />
            Kumasi
          </h1>
          <p className="mt-6 max-w-[420px] text-[16px] font-medium leading-[1.4] text-[#4d362f]/80 sm:mt-7 sm:text-[18px]">
            Your sanctuary of beauty and peace. Tap below to open the exact shop location in Google Maps.
          </p>

          <div className="mt-9 grid gap-3 text-[17px] font-semibold text-[#402720]/82">
            <a href={`tel:${brand.contact.phoneTel}`} className="transition-colors hover:text-[#82785f]">
              Call 0550593869
            </a>
            <a href="sms:+233599067017" className="transition-colors hover:text-[#82785f]">
              Text 0599067017
            </a>
            <p className="m-0">Kumasi, Ghana</p>
          </div>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-9 inline-flex h-14 items-center justify-center bg-[#402720] px-7 text-[13px] font-semibold uppercase text-[#f3f0e8] transition-transform hover:scale-105"
          >
            Open in Google Maps
          </a>
        </div>

        <div className="overflow-hidden rounded-[24px] border border-[#402720]/12 bg-[#d8d3c5] shadow-[0_26px_80px_rgba(64,39,32,0.12)] sm:rounded-[28px]">
          <iframe
            title={`${brand.name} location map`}
            src="https://www.google.com/maps?q=6.6740733,-1.6064683&z=17&output=embed"
            className="h-[360px] w-full border-0 sm:h-[560px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </main>
  );
}
