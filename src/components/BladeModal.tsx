import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import {
  X,
  Star,
  ShieldCheck,
  Flame,
  Truck,
  Check,
  Sparkles,
  Layers,
  Compass,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function BladeModal() {
  const { inspectedProduct, setInspectedProduct, addToCart, formatPrice } = useStore();
  const [monogram, setMonogram] = useState("");
  const [selectedFinish, setSelectedFinish] = useState<"natural" | "oiled" | "mirrored">("natural");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!inspectedProduct) return null;

  const p = inspectedProduct;
  const shortTitle = p.title.split(" - ")[0]!.split(" – ")[0]!;

  const handleAddToCart = () => {
    addToCart(p, quantity, monogram ? monogram.toUpperCase() : undefined);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setInspectedProduct(null);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        onClick={() => setInspectedProduct(null)}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-4xl overflow-hidden rounded-2xl border border-border bg-card text-foreground shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={() => setInspectedProduct(null)}
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur hover:bg-muted"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Showcase */}
          <div className="relative bg-muted/30 p-6 flex items-center justify-center border-b md:border-b-0 md:border-r border-border">
            <img
              src={p.image}
              alt={p.title}
              className="max-h-[380px] w-full object-contain rounded-lg drop-shadow-2xl"
            />
            <span className="eyebrow absolute left-6 top-6 rounded-full bg-background/80 px-3 py-1 text-[0.6rem] text-primary backdrop-blur">
              100% Hand-Forged
            </span>

            {/* Custom Stamp Preview if typed */}
            {monogram && (
              <div className="absolute bottom-6 left-6 right-6 rounded-lg border border-primary/30 bg-background/90 p-3 backdrop-blur text-center">
                <span className="text-[0.6rem] uppercase tracking-widest text-muted-foreground block">
                  Complimentary Bolster Engraving Preview
                </span>
                <span className="font-display text-2xl font-bold tracking-widest text-primary mt-1 block">
                  {monogram.toUpperCase()}
                </span>
              </div>
            )}
          </div>

          {/* Details & Specs */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              <div className="flex items-center gap-2 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary" />
                ))}
                <span className="text-xs text-muted-foreground">4.9 · 1,700+ Verified Reviews</span>
              </div>

              <h2 className="font-display mt-3 text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
                {shortTitle}
              </h2>
              <p className="mt-2 font-display text-2xl text-primary font-semibold">
                {formatPrice(p.price)}
              </p>

              {/* Technical Specifications Matrix */}
              <div className="mt-6 rounded-xl border border-border bg-muted/30 p-4 space-y-2.5 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-border/60">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Layers className="h-3.5 w-3.5 text-primary" /> Steel Metallurgy
                  </span>
                  <span className="font-medium text-foreground">1095 & 15N20 High-Carbon (300+ Folds)</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-border/60">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Flame className="h-3.5 w-3.5 text-primary" /> Hardness Rating
                  </span>
                  <span className="font-medium text-foreground">58–60 HRC Vacuum Heat-Treated</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-border/60">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Compass className="h-3.5 w-3.5 text-primary" /> Handle Craft
                  </span>
                  <span className="font-medium text-foreground">Hand-Carved Stag / Stabilized Hardwood</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Included Sheath
                  </span>
                  <span className="font-medium text-foreground">Heavy Full-Grain Leather with Belt Loop</span>
                </div>
              </div>

              {/* Monogram Customizer */}
              <div className="mt-6">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
                  Complimentary Atelier Monogram (Up to 3 Letters)
                </label>
                <input
                  type="text"
                  maxLength={3}
                  value={monogram}
                  onChange={(e) => setMonogram(e.target.value.replace(/[^a-zA-Z]/g, ""))}
                  placeholder="e.g. W.H."
                  className="mt-1.5 w-full rounded-md border border-border bg-background px-3.5 py-2 text-sm font-semibold tracking-widest uppercase text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-8 border-t border-border pt-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center rounded border border-border bg-background">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-xs font-bold text-muted-foreground hover:text-foreground"
                  >
                    -
                  </button>
                  <span className="px-3 text-sm font-semibold text-foreground">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-xs font-bold text-muted-foreground hover:text-foreground"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={added}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 rounded-sm py-3.5 text-xs font-semibold uppercase tracking-[0.2em] transition-all shadow-md",
                    added
                      ? "bg-emerald-600 text-white"
                      : "bg-primary text-primary-foreground hover:brightness-110 active:scale-[0.99]",
                  )}
                >
                  {added ? (
                    <>
                      <Check className="h-4 w-4" /> Added to Atelier Ledger
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" /> Add to Order · {formatPrice(p.price * quantity)}
                    </>
                  )}
                </button>
              </div>

              <div className="mt-4 flex items-center justify-between text-[0.7rem] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Truck className="h-3.5 w-3.5 text-primary" /> Ships fast from California
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-primary" /> 30-Day Hassle-Free Returns
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
