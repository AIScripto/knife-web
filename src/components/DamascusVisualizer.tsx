import React, { useState } from "react";
import { Sparkles, Layers, ShieldCheck, Flame, Compass } from "lucide-react";
import { cn } from "@/lib/utils";

interface PatternSpec {
  id: string;
  name: string;
  layers: string;
  steel: string;
  etching: string;
  description: string;
  characteristics: string[];
}

const patterns: PatternSpec[] = [
  {
    id: "raindrop",
    name: "Raindrop Pattern",
    layers: "320+ Folded Layers",
    steel: "1095 High-Carbon & 15N20 Nickel Alloy",
    etching: "Deep Ferric Chloride Acid Bath",
    description:
      "Created by pressing spherical dimples into the glowing billet before the final surface grind. As the peaks are flattened, concentric water-ripple circles are revealed across the blade.",
    characteristics: [
      "Concentric circular droplet eddies",
      "Superior edge retention from 15N20 contrast",
      "Ideal for folding pocket and EDC blades",
    ],
  },
  {
    id: "twist",
    name: "Twist (Torsion) Billet",
    layers: "288 Folded Layers",
    steel: "Forge-Welded Carbon & Spring Steel",
    etching: "Controlled Etch & Neutralizing Oil",
    description:
      "The hot billet is twisted under high torque along its longitudinal axis, spinning the layers into a swirling storm of metallic ribbons before being forged flat.",
    characteristics: [
      "Dynamic flowing ribbon bands",
      "Even structural density along spine and belly",
      "Heirloom appearance on hunting knives",
    ],
  },
  {
    id: "ladder",
    name: "Ladder Damascus",
    layers: "384 Folded Layers",
    steel: "High-Density Alternating Alloy Strata",
    etching: "Nitric & Citric Dual Etch",
    description:
      "Precision perpendicular grooves are forged or ground across the billet, disrupting the parallel layers into rhythmic wave rungs that mimic natural geological strata.",
    characteristics: [
      "Uniform rhythmic wave bands",
      "Stunning light reflection when blade tilts",
      "Signature choice for presentation pieces",
    ],
  },
  {
    id: "vg10",
    name: "73-Layer Japanese VG-10",
    layers: "73 Clad Layers over VG-10 Core",
    steel: "Cobalt-Enriched VG-10 Core + Stainless Damascus",
    etching: "Suminagashi Floating Cloud Polish",
    description:
      "A high-hardness Japanese VG-10 stainless core hardened to 60-62 HRC, encased in 36 alternating layers on each flank for unmatched culinary sharpness and stain resistance.",
    characteristics: [
      "Ultra-fine surgical cutting geometry",
      "High corrosion & acid resistance in kitchen use",
      "Ergonomic balance for delicate push-cutting",
    ],
  },
];

export function DamascusVisualizer() {
  const [activePattern, setActivePattern] = useState(patterns[0]!);

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow text-primary">The Metallurgy</p>
        <h2 className="font-display mt-4 text-3xl sm:text-4xl lg:text-5xl text-foreground">
          Patterns Forged in Fire & Acid
        </h2>
        <p className="mt-4 text-base font-light text-muted-foreground leading-relaxed">
          The mesmerizing water wave patterns on our blades are not laser-printed or coated.
          They are the physical topography of two dissimilar steels folded, beaten, and etched by hand.
        </p>
      </div>

      {/* Pattern Selector Tabs */}
      <div className="mt-12 flex flex-wrap justify-center gap-2 sm:gap-4">
        {patterns.map((p) => (
          <button
            key={p.id}
            onClick={() => setActivePattern(p)}
            className={cn(
              "rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all",
              activePattern.id === p.id
                ? "bg-primary text-primary-foreground shadow-md ring-2 ring-primary/40 ring-offset-2 ring-offset-background"
                : "border border-border bg-card/60 text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Interactive Detail Card */}
      <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-card shadow-2xl p-6 sm:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <span className="eyebrow rounded-full bg-primary/10 px-3.5 py-1 text-primary">
                {activePattern.layers}
              </span>
              <span className="eyebrow text-muted-foreground">Certified Forge Heat-Treated</span>
            </div>

            <h3 className="font-display text-2xl sm:text-4xl text-foreground">
              {activePattern.name}
            </h3>

            <p className="text-base font-light text-muted-foreground leading-relaxed">
              {activePattern.description}
            </p>

            <div className="space-y-3 pt-2">
              <p className="eyebrow text-xs text-foreground font-semibold">Distinguishing Attributes</p>
              <ul className="space-y-2">
                {activePattern.characteristics.map((char) => (
                  <li key={char} className="flex items-start gap-2.5 text-xs text-muted-foreground">
                    <Sparkles className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                    <span>{char}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-xl border border-border bg-muted/30 p-6 space-y-4">
            <h4 className="font-display text-lg tracking-wide text-foreground border-b border-border pb-3">
              Forge Recipe & Specs
            </h4>

            <div>
              <span className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground block">
                Primary Steels
              </span>
              <span className="font-medium text-xs text-foreground mt-0.5 block">
                {activePattern.steel}
              </span>
            </div>

            <div>
              <span className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground block">
                Etching Process
              </span>
              <span className="font-medium text-xs text-foreground mt-0.5 block">
                {activePattern.etching}
              </span>
            </div>

            <div>
              <span className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground block">
                Rockwell Hardness Range
              </span>
              <span className="font-medium text-xs text-primary mt-0.5 block">
                58 – 62 HRC (Deep Cryogenic Quenched)
              </span>
            </div>

            <div className="pt-3 border-t border-border">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
                <span>Certified White Hills California Atelier Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
