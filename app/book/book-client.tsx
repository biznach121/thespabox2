"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@cimplify/sdk";
import type { AvailableSlot } from "@cimplify/sdk";
import { useCart, DateSlotPicker } from "@cimplify/sdk/react";
import { brand } from "@/lib/brand";

/**
 * Booking flow:
 *   1. Pick a treatment (left rail) — drives the SDK availability fetch.
 *   2. SDK <DateSlotPicker> handles date + slot selection, fetching real
 *      availability via `useServiceAvailability` against the configured
 *      backend (mock in dev, Cimplify scheduling API in prod).
 *   3. Add to cart with the chosen slot as a cart-item note;
 *      Cimplify Checkout finalises the booking.
 */
export function BookClient({ treatments }: { treatments: Product[] }) {
  const router = useRouter();
  const { addItem } = useCart();
  const [selectedTreatment, setSelectedTreatment] = useState<Product | undefined>(
    treatments[0],
  );
  const [selectedSlot, setSelectedSlot] = useState<AvailableSlot | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function confirm() {
    if (!selectedTreatment || !selectedSlot) return;
    setSubmitting(true);
    try {
      const slotLabel = new Date(selectedSlot.start_time).toLocaleString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      await addItem(selectedTreatment, 1, {
        specialInstructions: `Booked for ${slotLabel}`,
      });
      router.push("/checkout");
    } catch {
      setSubmitting(false);
    }
  }

  if (treatments.length === 0) {
    return (
      <p className="text-muted-foreground">
        No bookable treatments yet. Add a Service-type product to your catalogue first.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.4fr]">
      {/* Treatments */}
      <div className="spabox-card p-5 sm:p-6">
        <p className="spabox-eyebrow">
          Treatment
        </p>
        <div className="space-y-2">
          {treatments.map((t) => {
            const active = selectedTreatment?.id === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setSelectedTreatment(t);
                  setSelectedSlot(null);
                }}
                className={[
                  "w-full rounded-[18px] border p-4 text-left transition-colors",
                  active
                    ? "border-[#402720] bg-[#402720] text-[#f3f0e8]"
                    : "border-[#402720]/12 bg-[#f3f0e8]/68 text-[#402720] hover:border-[#402720]/35",
                ].join(" ")}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="m-0 truncate text-sm font-semibold">{t.name}</p>
                    <p className={`m-0 text-xs ${active ? "text-[#f3f0e8]/72" : "text-[#4d362f]/68"}`}>
                      {t.duration_minutes ? `${t.duration_minutes} min · ` : ""}
                      {brand.currency} {t.default_price}
                    </p>
                  </div>
                  {active && (
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-[#f3f0e8] text-xs text-[#402720]">
                      ✓
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Date + slots — SDK <DateSlotPicker> fetches real availability */}
      <div className="spabox-card p-4 sm:p-6">
        {selectedTreatment ? (
          <DateSlotPicker
            serviceId={selectedTreatment.id}
            selectedSlot={selectedSlot}
            onSlotSelect={(slot) => setSelectedSlot(slot)}
            daysToShow={selectedTreatment.scheduling_mode === "multi_day" ? 14 : 7}
            schedulingMode={selectedTreatment.scheduling_mode}
            durationUnit={selectedTreatment.duration_unit}
            durationValue={selectedTreatment.duration_value}
          />
        ) : (
          <p className="text-sm text-muted-foreground">Pick a treatment to see availability.</p>
        )}

        <button
          type="button"
          onClick={confirm}
          disabled={!selectedTreatment || !selectedSlot || submitting}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-[#402720] px-5 py-3 text-sm font-semibold text-[#f3f0e8] transition-colors hover:bg-[#2f1d18] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting
            ? "Confirming…"
            : selectedSlot
              ? `Book ${selectedTreatment?.name} at ${new Date(selectedSlot.start_time).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}`
              : "Pick a slot to book"}
        </button>
      </div>
    </div>
  );
}
