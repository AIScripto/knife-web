import React, { useState } from "react";
import { featuredProducts, type Product } from "@/data/products";
import { useStore } from "@/context/StoreContext";
import { Search, X, Star, ArrowRight } from "lucide-react";

export function SearchDialog({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const { setInspectedProduct, formatPrice } = useStore();

  if (!isOpen) return null;

  const filtered = query.trim()
    ? featuredProducts.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.handle.toLowerCase().includes(query.toLowerCase()),
      )
    : featuredProducts.slice(0, 4);

  const handleSelect = (product: Product) => {
    setInspectedProduct(product);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-xl border border-border bg-card shadow-2xl text-foreground animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center border-b border-border px-4 py-3.5">
          <Search className="h-5 w-5 text-muted-foreground shrink-0 mr-3" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Damascus folding pocket knives, hunting knives, VG-10 chef knives..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-muted-foreground hover:text-foreground mr-2">
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="rounded px-2 py-1 text-xs text-muted-foreground hover:bg-muted"
          >
            ESC
          </button>
        </div>

        {/* Search Results */}
        <div className="max-h-96 overflow-y-auto p-4 divide-y divide-border">
          <p className="eyebrow pb-2 text-[0.6rem] text-muted-foreground">
            {query.trim() ? `Found ${filtered.length} Blades` : "Trending Atelier Blades"}
          </p>

          {filtered.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground">
              No Damascus blades match &ldquo;{query}&rdquo;.
            </div>
          ) : (
            filtered.map((p) => {
              const short = p.title.split(" - ")[0]!.split(" – ")[0]!;
              return (
                <button
                  key={p.handle}
                  onClick={() => handleSelect(p)}
                  className="flex w-full items-center gap-4 py-3 text-left transition-colors hover:bg-muted/50 rounded-lg px-2 group"
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-14 w-14 shrink-0 rounded-md border border-border object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="truncate text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {short}
                    </h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="font-display text-xs text-primary font-semibold">
                        {formatPrice(p.price)}
                      </span>
                      <span className="text-[0.65rem] text-muted-foreground">· 100% Hand-Forged</span>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
