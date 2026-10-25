import { createFileRoute } from "@tanstack/react-router";
import { featuredProducts, type Product } from "@/data/products";
import { useState, useEffect, useRef, type ReactNode } from "react";
import {
  Search,
  User,
  ShoppingBag,
  Menu,
  X,
  Star,
  ShieldCheck,
  Truck,
  Flame,
  ArrowRight,
  Plus,
  Eye,
  Check,
  Compass,
  Layers,
  Sparkles,
  RotateCcw,
  Globe,
} from "lucide-react";
import heroImage from "@/assets/hero-obsidian.jpg";
import forgeImage from "@/assets/atelier-forge.jpg";

import { useTheme } from "@/context/ThemeContext";
import { useStore, CURRENCIES, type Currency } from "@/context/StoreContext";
import { HeaderThemeSwitcher, FloatingThemeBar } from "@/components/ThemeSwitcher";
import { CartDrawer } from "@/components/CartDrawer";
import { BladeModal } from "@/components/BladeModal";
import { DamascusVisualizer } from "@/components/DamascusVisualizer";
import { SearchDialog } from "@/components/SearchDialog";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "White Hills Knives — Hand-Forged Damascus Steel | Obsidian Atelier",
      },
      {
        name: "description",
        content:
          "Hand-forged Damascus steel pocket knives, hunting knives, chef knives and Viking axes. 1,700+ verified reviews, ships fast from California, 30-day returns.",
      },
      { property: "og:title", content: "White Hills Knives — Hand-Forged Damascus Steel" },
      {
        property: "og:description",
        content:
          "Hand-forged Damascus steel pocket knives, hunting knives, chef knives and Viking axes. 1,700+ verified reviews, ships fast from California.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/* ---------------- data ---------------- */

const categories = [
  {
    id: "pocket",
    name: "Damascus Pocket Knives",
    tagline: "Folding EDC, back-lock & clip carriers",
    image: featuredProducts[0]!.image,
    count: "36 blades",
  },
  {
    id: "hunting",
    name: "Hunting & Field Knives",
    tagline: "Fixed-blade, gut hook & skinner",
    image: featuredProducts[1]!.image,
    count: "42 blades",
  },
  {
    id: "chef",
    name: "Japanese Chef Knives",
    tagline: "VG-10 Japanese steel & kitchen sets",
    image: featuredProducts[2]!.image,
    count: "24 blades",
  },
  {
    id: "axes",
    name: "Hand-Forged Axes",
    tagline: "Viking, hatchet & tomahawk",
    image: featuredProducts[7]!.image,
    count: "19 axes",
  },
];

const handleSwatches: Record<string, { label: string; color: string }> = {
  Stag: { label: "Genuine Stag Antler", color: "#d5c3aa" },
  Bone: { label: "Camel Bone", color: "#f2ebd9" },
  Burl: { label: "Stabilized Burl", color: "#6b3e26" },
  Ram: { label: "Ram Horn", color: "#2d241e" },
  Olive: { label: "Olive Wood", color: "#a88854" },
};

const trustPoints = [
  { icon: Star, label: "1,700+ verified reviews" },
  { icon: Truck, label: "Ships fast from California" },
  { icon: ShieldCheck, label: "30-day hassle-free returns" },
  { icon: Flame, label: "100% hand-forged Damascus" },
];

const craftSteps = [
  {
    step: "I",
    title: "The Layered Billet",
    copy: "Hundreds of alternating layers of 1095 high-carbon and 15N20 nickel alloy steel, forge-welded by hand until the metallurgical water pattern lives throughout the core.",
  },
  {
    step: "II",
    title: "The Cryo Edge",
    copy: "Each blade is hammer-forged, precision ground, cryogenic quenched to 58–60 HRC, and honed by master cutlers to a hair-splitting working bevel.",
  },
  {
    step: "III",
    title: "Natural Handle Marriage",
    copy: "Stag antler, natural camel bone, stabilized exotic burls, and hand-tooled full-grain cowhide sheaths — fitted individually to every blade.",
  },
];

const careTips = [
  {
    title: "Keep Dry & Oiled",
    desc: "Wipe clean after use and apply a drop of food-safe mineral oil or camellia oil to the blade to preserve the etched carbon contrast.",
  },
  {
    title: "Honing Bevel",
    desc: "Maintain the 15° to 18° factory angle with a fine whetstone (1000/6000 grit) or ceramic honing rod for effortless razor slicing.",
  },
  {
    title: "Leather Sheath Care",
    desc: "Condition the full-grain cowhide sheath twice yearly with natural beeswax leather balm to keep moisture out and fibers supple.",
  },
];

const testimonials = [
  {
    quote:
      "The blade came sharper than anything in my collection, and the stag handle fits the hand like it was carved for me. The raindrop Damascus pattern under natural light is breathtaking.",
    name: "Marcus T.",
    role: "Verified Collector — Montana",
    product: "Handmade Damascus Pocket Knife WH 3542",
  },
  {
    quote:
      "I own three VG-10 knives from high-end Japanese cutlery houses. The Sato out-cuts all of them, holds its edge through 40-pound prep shifts, and costs half the price.",
    name: "Elena R.",
    role: "Executive Chef — Portland, OR",
    product: "Sato VG10 Copper Damascus Chef Knife",
  },
  {
    quote:
      "Ordered the Viking axe for my brother's wedding. Arrived from California in four days, and the hand-braided leather wrap and axe weight balance are museum quality.",
    name: "David K.",
    role: "Verified Buyer — Texas",
    product: "Handmade Forged Steel Viking Axe",
  },
];

/* ---------------- Reveal animation component ---------------- */

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          el.classList.add("is-revealed");
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className ?? ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ---------------- Top Announcement Bar ---------------- */

function AnnouncementBar() {
  const { currency, setCurrency } = useStore();
  const [currOpen, setCurrOpen] = useState(false);

  return (
    <div className="relative border-b border-border bg-card/95 py-2 px-4">
      <div className="mx-auto flex max-w-7xl items-center justify-center relative">
        {/* Centered Announcement Elements */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 text-center text-xs">
          <span className="eyebrow flex items-center gap-2 text-[0.62rem] text-muted-foreground">
            <span className="text-primary font-bold">◆</span>
            15% Off First Piece: <strong className="text-primary font-semibold">ATELIER15</strong>
          </span>
          <span className="hidden md:flex items-center gap-2 eyebrow text-[0.62rem] text-muted-foreground">
            <span className="text-primary font-bold">◆</span>
            1,700+ Verified 5-Star Reviews
          </span>
          <span className="hidden sm:flex items-center gap-2 eyebrow text-[0.62rem] text-muted-foreground">
            <span className="text-primary font-bold">◆</span>
            Dispatched Fast From California, USA
          </span>
          <span className="hidden lg:flex items-center gap-2 eyebrow text-[0.62rem] text-muted-foreground">
            <span className="text-primary font-bold">◆</span>
            30-Day Hassle-Free Returns
          </span>
        </div>

        {/* Currency Selector (pinned to right so announcement stays centered) */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden sm:block">
          <button
            onClick={() => setCurrOpen(!currOpen)}
            className="flex items-center gap-1.5 rounded px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground"
          >
            <Globe className="h-3 w-3 text-primary" />
            <span>{currency}</span>
          </button>

          {currOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setCurrOpen(false)} />
              <div className="absolute right-0 top-full z-50 mt-1 w-28 rounded-md border border-border bg-popover p-1 shadow-lg">
                {(Object.keys(CURRENCIES) as Currency[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setCurrency(c);
                      setCurrOpen(false);
                    }}
                    className={cn(
                      "flex w-full items-center justify-between rounded px-2 py-1 text-xs text-left",
                      currency === c
                        ? "bg-primary/20 text-primary font-semibold"
                        : "text-foreground hover:bg-muted",
                    )}
                  >
                    <span>{c}</span>
                    <span className="text-muted-foreground text-[0.65rem]">{CURRENCIES[c].symbol}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Site Header ---------------- */

function SiteHeader({
  onOpenSearch,
  onSelectCategory,
}: {
  onOpenSearch: () => void;
  onSelectCategory: (cat: string) => void;
}) {
  const { cartCount, setIsCartOpen } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Pocket Knives", id: "pocket" },
    { label: "Hunting Knives", id: "hunting" },
    { label: "Chef Knives", id: "chef" },
    { label: "Hand-Forged Axes", id: "axes" },
    { label: "Metallurgy Guide", id: "metallurgy" },
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    if (id === "metallurgy") {
      const el = document.getElementById("metallurgy-section");
      el?.scrollIntoView({ behavior: "smooth" });
    } else {
      onSelectCategory(id);
      const el = document.getElementById("catalog-section");
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-6">
        {/* Left: Mobile Toggle & Clean Non-overflowing Logo */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="text-muted-foreground transition-colors hover:text-primary lg:hidden"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <a href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-primary/40 bg-primary/10 text-primary transition-transform group-hover:scale-105 shadow-sm">
              <Flame className="h-4 w-4" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-display text-base sm:text-lg font-bold tracking-[0.14em] leading-tight text-foreground group-hover:text-primary transition-colors whitespace-nowrap">
                WHITE HILLS
              </span>
              <span className="eyebrow text-[0.52rem] text-primary tracking-[0.18em] leading-tight whitespace-nowrap">
                Damascus Atelier
              </span>
            </div>
          </a>
        </div>

        {/* Center: Desktop Navigation centered across available space */}
        <nav className="hidden items-center justify-center gap-6 xl:gap-8 lg:flex flex-1 px-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="eyebrow text-xs text-muted-foreground transition-colors hover:text-primary relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-primary after:transition-all hover:after:w-full whitespace-nowrap"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right: Actions (Theme switcher, Search, Cart) */}
        <div className="flex items-center gap-3 shrink-0">
          <HeaderThemeSwitcher />

          <button
            onClick={onOpenSearch}
            aria-label="Search Damascus blades"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-primary/60 hover:text-primary hover:bg-card"
          >
            <Search className="h-4 w-4" />
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="Open Cart Ledger"
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-primary/60 hover:text-primary hover:bg-card"
          >
            <ShoppingBag className="h-4 w-4" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[0.62rem] font-bold text-primary-foreground shadow-sm animate-in zoom-in-50">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-border bg-card px-6 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <p className="eyebrow text-[0.6rem] text-primary">Atelier Collections</p>
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-left font-display text-lg text-foreground hover:text-primary transition-colors py-1"
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
            <span>Fast Dispatch From California</span>
            <span className="text-primary font-medium">100% Hand-Forged</span>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------------- Hero Section ---------------- */

function Hero({ onExplore }: { onExplore: () => void }) {
  const { themeMeta } = useTheme();

  return (
    <section className="relative min-h-[85vh] overflow-hidden flex items-center justify-center">
      {/* Background Blade Photograph */}
      <img
        src={heroImage}
        alt="Hand-forged Damascus steel knife resting on obsidian"
        className="absolute inset-0 h-full w-full object-cover object-center"
        width={1920}
        height={912}
      />

      {/* Theme-Adaptive Gradient Overlays & Vignette */}
      <div
        className="absolute inset-0 transition-all duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, var(--hero-overlay-from) 0%, var(--hero-overlay-via) 65%, var(--hero-overlay-from) 100%)`,
          opacity: 0.88,
        }}
      />
      <div
        className="absolute inset-0 transition-all duration-700 pointer-events-none"
        style={{
          background: `linear-gradient(180deg, var(--hero-overlay-from) 0%, transparent 40%, var(--hero-overlay-from) 100%)`,
        }}
      />

      <div className="relative mx-auto flex min-h-[85vh] max-w-4xl flex-col items-center justify-center px-6 py-20 text-center">
        <Reveal>
          <p className="eyebrow animate-ember mx-auto flex items-center justify-center gap-3 text-primary">
            <span className="hairline w-8 sm:w-16" />
            Hand-Forged in California · {themeMeta.name} Mode
            <span className="hairline w-8 sm:w-16" />
          </p>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="font-display mt-6 text-4xl leading-[1.08] text-foreground sm:text-6xl lg:text-7xl font-medium">
            Steel That
            <span className="damascus-text block font-semibold">Remembers Water</span>
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-6 max-w-2xl text-base sm:text-lg font-light leading-relaxed text-muted-foreground mx-auto">
            Every blade leaves our California forge with hundreds of folded layers of
            high-carbon Damascus steel, an individually contoured natural handle, and an edge proven
            at the anvil.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onExplore}
              className="group ember-glow inline-flex items-center gap-3 rounded-sm bg-primary px-8 py-4 text-xs font-semibold tracking-[0.2em] uppercase text-primary-foreground shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.99]"
            >
              Shop the Forge
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => {
                const el = document.getElementById("metallurgy-section");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-3 rounded-sm border border-border bg-card/70 px-8 py-4 text-xs font-semibold tracking-[0.2em] uppercase text-foreground backdrop-blur transition-colors hover:border-primary hover:text-primary"
            >
              The Damascus Metallurgy
            </button>
          </div>
        </Reveal>

        {/* Live Trust Metrics */}
        <Reveal delay={400}>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 sm:gap-x-12 gap-y-4 border-t border-border pt-8 w-full max-w-3xl mx-auto">
            {trustPoints.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="flex items-center gap-2.5 text-xs text-muted-foreground font-medium"
              >
                <Icon className="h-4 w-4 text-primary" />
                {label}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Section Heading Helper ---------------- */

function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="eyebrow text-primary">{eyebrow}</p>
      <h2 className="font-display mt-4 text-3xl sm:text-4xl lg:text-5xl text-foreground font-medium">
        {title}
      </h2>
      {copy && (
        <p className="mt-4 text-base font-light leading-relaxed text-muted-foreground">
          {copy}
        </p>
      )}
      <span className="hairline mx-auto mt-6 block w-24" />
    </div>
  );
}

/* ---------------- Category Showcase ---------------- */

function Collections({ onSelectCategory }: { onSelectCategory: (id: string) => void }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <SectionHeading
        eyebrow="The Collections"
        title="Four Halls of the Atelier"
        copy="From EDC pocket carriers to heavy full-tang hunting knives — every piece is forged, acid-etched and honed by hand."
      />
      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((cat, i) => (
          <Reveal key={cat.id} delay={i * 80}>
            <button
              onClick={() => onSelectCategory(cat.id)}
              className="group relative overflow-hidden rounded-xl border border-border bg-card text-left transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-2xl w-full"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  width={700}
                  height={700}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              </div>
              <div className="p-6">
                <p className="eyebrow text-[0.6rem] text-primary">{cat.count}</p>
                <h3 className="font-display mt-2 text-xl font-medium text-foreground group-hover:text-primary transition-colors">
                  {cat.name}
                </h3>
                <p className="mt-1 text-xs font-light text-muted-foreground">
                  {cat.tagline}
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-xs text-primary font-semibold tracking-wider uppercase opacity-85 group-hover:opacity-100">
                  <span>View pieces</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </button>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Enhanced Product Card ---------------- */

function ProductCardComponent({ product }: { product: Product }) {
  const { addToCart, setInspectedProduct, formatPrice } = useStore();
  const [justAdded, setJustAdded] = useState(false);

  const short = product.title.split(" - ")[0]!.split(" – ")[0]!;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <div
      onClick={() => setInspectedProduct(product)}
      className="group card-obsidian flex flex-col overflow-hidden rounded-xl cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl"
    >
      <div className="relative overflow-hidden bg-muted/20">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          width={700}
          height={700}
          className="aspect-square w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Pattern & Craft Badges */}
        <span className="eyebrow absolute left-3 top-3 rounded bg-card/85 px-2.5 py-1 text-[0.55rem] text-primary backdrop-blur border border-border">
          Hand-Forged
        </span>

        {/* Quick Inspection Action Overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setInspectedProduct(product);
            }}
            className="flex items-center gap-1.5 rounded-full bg-card/90 px-3.5 py-2 text-xs font-medium text-foreground backdrop-blur transition-transform hover:scale-105 hover:bg-card"
          >
            <Eye className="h-3.5 w-3.5 text-primary" />
            <span>Inspect</span>
          </button>

          <button
            onClick={handleQuickAdd}
            className="flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground transition-transform hover:scale-105"
          >
            {justAdded ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
            <span>{justAdded ? "Added" : "Quick Add"}</span>
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 text-primary">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-primary" />
            ))}
          </div>
          <span className="text-[0.68rem] text-muted-foreground">58-60 HRC</span>
        </div>

        <h3 className="mt-2.5 line-clamp-2 min-h-10 text-sm font-medium leading-snug text-foreground group-hover:text-primary transition-colors">
          {short}
        </h3>

        <div className="mt-auto pt-4 flex items-baseline justify-between border-t border-border/50">
          <div>
            <p className="text-[0.65rem] uppercase tracking-wider text-muted-foreground">California Dispatch</p>
            <p className="font-display text-lg font-semibold text-primary">
              {formatPrice(product.price)}
            </p>
          </div>
          <span className="eyebrow text-[0.6rem] text-primary opacity-0 transition-opacity group-hover:opacity-100">
            Details →
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Best Sellers Section with Filter Tabs ---------------- */

function CatalogSection({
  selectedCategory,
  setSelectedCategory,
}: {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}) {
  const tabs = [
    { id: "all", label: "All Masterpieces" },
    { id: "pocket", label: "Pocket Knives" },
    { id: "hunting", label: "Hunting & Field" },
    { id: "chef", label: "Chef Knives" },
    { id: "axes", label: "Viking Axes" },
  ];

  const filteredBlades = featuredProducts.filter((p) => {
    if (selectedCategory === "all") return true;
    const lower = p.title.toLowerCase();
    if (selectedCategory === "pocket") return lower.includes("pocket") || lower.includes("folding");
    if (selectedCategory === "hunting") return lower.includes("hunting") || lower.includes("skinner") || lower.includes("kukri") || lower.includes("dagger");
    if (selectedCategory === "chef") return lower.includes("chef") || lower.includes("kiritsuke") || lower.includes("vg10");
    if (selectedCategory === "axes") return lower.includes("axe") || lower.includes("hatchet");
    return true;
  });

  return (
    <section id="catalog-section" className="border-y border-border bg-card/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="The Atelier Catalog"
          title="Most Coveted Hand-Forged Blades"
          copy="The pieces our collectors reach for first — each billet folded, ground and heat-treated by hand."
        />

        {/* Filter Pills */}
        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={cn(
                "rounded-full px-5 py-2 text-xs font-semibold tracking-wider uppercase transition-all",
                selectedCategory === tab.id
                  ? "bg-primary text-primary-foreground shadow-md ring-2 ring-primary/40 ring-offset-2 ring-offset-background"
                  : "border border-border bg-card/80 text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid of Blades */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredBlades.map((p) => (
            <ProductCardComponent key={p.handle} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Atelier Story Section ---------------- */

function AtelierStory() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-2xl border border-border shadow-2xl">
          <img
            src={forgeImage}
            alt="The forge inside the atelier"
            loading="lazy"
            width={1024}
            height={768}
            className="w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <p className="eyebrow absolute bottom-6 left-6 text-primary">
            California Workshop · Hand-Forged Daily
          </p>
        </div>

        <div>
          <p className="eyebrow flex items-center gap-3 text-primary">
            <span className="hairline w-10" />
            The Craftsmanship
          </p>
          <h2 className="font-display mt-4 text-3xl sm:text-4xl lg:text-5xl text-foreground font-medium">
            Forged Slow, Carried Forever
          </h2>
          <p className="mt-6 text-base font-light leading-relaxed text-muted-foreground">
            A White Hills blade is not stamped from rolled industrial sheet. It is folded,
            hammered, cryogenic quenched, and acid-etched until the steel reveals the ancient water
            pattern Damascus was revered for.
          </p>

          <div className="mt-10 space-y-8">
            {craftSteps.map((s) => (
              <div key={s.step} className="flex gap-5">
                <span className="font-display ember-glow flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-card text-primary font-bold text-base">
                  {s.step}
                </span>
                <div>
                  <h3 className="font-display text-lg tracking-wide text-foreground font-medium">
                    {s.title}
                  </h3>
                  <p className="mt-1 text-sm font-light leading-relaxed text-muted-foreground">
                    {s.copy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Blade Care & Longevity Guide ---------------- */

function BladeCareSection() {
  return (
    <section className="border-y border-border bg-card/30 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Heirloom Longevity"
          title="The Damascus Steel Care Protocol"
          copy="High-carbon folded steel rewards simple mindful care with generations of razor sharpness."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {careTips.map((tip) => (
            <div key={tip.title} className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <span className="font-display text-2xl text-primary font-bold block mb-2">❖</span>
              <h3 className="font-display text-lg font-medium text-foreground">{tip.title}</h3>
              <p className="mt-2 text-xs font-light text-muted-foreground leading-relaxed">
                {tip.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Testimonials ---------------- */

function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <SectionHeading
        eyebrow="From the Collectors"
        title="1,700+ Verified 5-Star Reviews"
        copy="Collectors, culinary chefs, and outdoor field guides share their bench experiences."
      />
      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <figure
            key={t.name}
            className="card-obsidian flex flex-col justify-between rounded-xl p-8 text-center"
          >
            <div>
              <div className="flex justify-center gap-1 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary" />
                ))}
              </div>
              <blockquote className="mt-6 text-sm font-light leading-relaxed text-muted-foreground italic">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
            </div>
            <figcaption className="mt-8 border-t border-border/50 pt-4">
              <p className="font-display text-sm tracking-wide text-foreground font-semibold">
                {t.name}
              </p>
              <p className="eyebrow mt-1 text-[0.58rem] text-primary">
                {t.role}
              </p>
              <p className="mt-1 text-[0.65rem] text-muted-foreground truncate">
                {t.product}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Newsletter Section ---------------- */

function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <section className="border-t border-border bg-card/50 py-24 text-center px-6">
      <div className="mx-auto max-w-2xl">
        <p className="eyebrow text-primary">Join the Collector Ledger</p>
        <h2 className="font-display mt-4 text-3xl sm:text-4xl text-foreground font-medium">
          First Light on New Forged Drops
        </h2>
        <p className="mt-4 text-sm font-light text-muted-foreground leading-relaxed">
          Restocks, one-of-a-kind Damascus billets, and VIP collection drops — delivered directly
          from our California atelier once a month.
        </p>

        {subscribed ? (
          <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-2 rounded-lg border border-primary/40 bg-primary/10 p-4 text-sm font-medium text-primary">
            <Check className="h-5 w-5" />
            <span>You have been added to the private atelier ledger. Code: ATELIER15</span>
          </div>
        ) : (
          <form
            className="mx-auto mt-8 flex max-w-md items-center rounded-lg border border-border bg-card p-1.5 focus-within:border-primary shadow-lg"
            onSubmit={(e) => {
              e.preventDefault();
              if (email) setSubscribed(true);
            }}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full bg-transparent px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
            <button
              type="submit"
              className="shrink-0 rounded bg-primary px-5 py-2.5 text-xs font-semibold tracking-[0.2em] uppercase text-primary-foreground transition-transform hover:scale-105"
            >
              Join Ledger
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

/* ---------------- Site Footer ---------------- */

function SiteFooter({ onSelectCategory }: { onSelectCategory: (id: string) => void }) {
  const columns = [
    {
      title: "Halls of Forge",
      links: [
        { label: "Pocket Knives", id: "pocket" },
        { label: "Hunting Knives", id: "hunting" },
        { label: "Chef Knives", id: "chef" },
        { label: "Viking Axes", id: "axes" },
      ],
    },
    {
      title: "The Metallurgy",
      links: [
        { label: "Raindrop Pattern", id: "metallurgy" },
        { label: "Twist Damascus", id: "metallurgy" },
        { label: "Ladder Billet", id: "metallurgy" },
        { label: "VG-10 Japanese Steel", id: "metallurgy" },
      ],
    },
    {
      title: "Collector Support",
      links: [
        { label: "Fast California Dispatch", id: "faq" },
        { label: "30-Day Returns", id: "faq" },
        { label: "Lifetime Craft Warranty", id: "faq" },
        { label: "Blade Conditioning", id: "faq" },
      ],
    },
  ];

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-primary/40 bg-primary/10 text-primary">
              <Flame className="h-5 w-5" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-display text-lg sm:text-xl font-bold tracking-[0.16em] leading-tight text-foreground whitespace-nowrap">
                WHITE HILLS
              </span>
              <span className="eyebrow text-[0.55rem] text-primary tracking-[0.22em] leading-tight whitespace-nowrap">
                Damascus Atelier
              </span>
            </div>
          </div>
          <p className="mt-4 max-w-xs text-xs font-light leading-relaxed text-muted-foreground">
            Hand-forged Damascus steel pocket knives, hunting knives and axes. Hand-crafted with
            genuine stag and exotic hardwoods.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="eyebrow text-foreground text-xs font-semibold">{col.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => {
                      if (link.id === "metallurgy") {
                        document.getElementById("metallurgy-section")?.scrollIntoView({ behavior: "smooth" });
                      } else {
                        onSelectCategory(link.id);
                        document.getElementById("catalog-section")?.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="text-xs font-light text-muted-foreground transition-colors hover:text-primary text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-6 text-xs font-light text-muted-foreground">
          <p>© 2026 White Hills Knives. Handcrafted in California. All rights reserved.</p>
          <div className="flex gap-5">
            {["Facebook", "Instagram", "YouTube", "Pinterest"].map((s) => (
              <span key={s} className="eyebrow text-[0.6rem] text-muted-foreground hover:text-primary cursor-pointer transition-colors">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Main Index Page ---------------- */

function Index() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
    const el = document.getElementById("catalog-section");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <AnnouncementBar />

      <SiteHeader
        onOpenSearch={() => setSearchOpen(true)}
        onSelectCategory={handleSelectCategory}
      />

      <main>
        <Hero
          onExplore={() => {
            const el = document.getElementById("catalog-section");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
        />

        <Collections onSelectCategory={handleSelectCategory} />

        <div id="metallurgy-section">
          <DamascusVisualizer />
        </div>

        <CatalogSection
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <AtelierStory />

        <BladeCareSection />

        <Testimonials />

        <Newsletter />
      </main>

      <SiteFooter onSelectCategory={handleSelectCategory} />

      {/* Floating Theme Bar & Modals */}
      <FloatingThemeBar />
      <CartDrawer />
      <BladeModal />
      <SearchDialog isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
