import React from "react";
import { useStore } from "@/context/StoreContext";
import { X, Trash2, ArrowRight, ShieldCheck, Truck, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    formatPrice,
    cartCount,
    cartSubtotal,
  } = useStore();

  if (!isCartOpen) return null;

  const freeShippingThreshold = 150;
  const progress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <aside aria-label="Shopping Cart" className="w-screen max-w-md border-l border-border bg-card text-foreground shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-6 py-5">
            <div>
              <h2 className="font-display text-xl tracking-wider text-foreground">
                Atelier Ledger
              </h2>
              <p className="eyebrow mt-0.5 text-[0.6rem] text-primary">
                {cartCount} {cartCount === 1 ? "Piece Selected" : "Pieces Selected"}
              </p>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Close cart"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="border-b border-border bg-muted/40 px-6 py-3.5">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 font-medium text-foreground">
                <Truck className="h-3.5 w-3.5 text-primary" />
                {progress >= 100 ? (
                  <span className="text-primary font-semibold">Complimentary California Shipping Unlocked</span>
                ) : (
                  <span>
                    Add <strong className="text-primary">{formatPrice(remainingForFreeShipping)}</strong> for free shipping
                  </span>
                )}
              </span>
              <span className="text-[0.7rem] text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-border">
              <div
                className="h-full bg-primary transition-all duration-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-6 divide-y divide-border">
            {cart.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center py-16">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Sparkles className="h-7 w-7" />
                </div>
                <h3 className="font-display mt-4 text-xl text-foreground">Your Ledger is Empty</h3>
                <p className="mt-2 max-w-xs text-xs text-muted-foreground leading-relaxed">
                  Explore our hand-forged Damascus folding knives, hunting blades, and chef collections.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 rounded-sm bg-primary px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-transform hover:scale-105"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.product.handle} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="h-20 w-20 shrink-0 rounded-lg border border-border object-cover"
                  />
                  <div className="flex flex-1 flex-col justify-between min-w-0">
                    <div>
                      <h4 className="line-clamp-1 text-sm font-medium text-foreground">
                        {item.product.title.split(" - ")[0]!.split(" – ")[0]!}
                      </h4>
                      {item.selectedEngraving && (
                        <p className="text-[0.68rem] text-primary italic">
                          Custom Stamp: &ldquo;{item.selectedEngraving}&rdquo;
                        </p>
                      )}
                      <p className="mt-1 font-display text-sm text-primary">
                        {formatPrice(item.product.price)}
                      </p>
                    </div>

                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center rounded border border-border bg-background">
                        <button
                          onClick={() => updateQuantity(item.product.handle, item.quantity - 1)}
                          className="px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-semibold text-foreground">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.handle, item.quantity + 1)}
                          className="px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.handle)}
                        className="text-muted-foreground transition-colors hover:text-destructive"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary */}
          {cart.length > 0 && (
            <div className="border-t border-border bg-card/95 p-6 backdrop-blur">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground text-xs">
                  <span>Subtotal</span>
                  <span className="font-medium text-foreground">{formatPrice(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground text-xs">
                  <span>Dispatched From</span>
                  <span className="text-foreground">California, USA</span>
                </div>
                <div className="flex justify-between text-muted-foreground text-xs">
                  <span>Estimated Shipping</span>
                  <span className="text-primary font-medium">
                    {progress >= 100 ? "Complimentary" : formatPrice(12.0)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-border pt-2 text-base font-semibold">
                  <span className="font-display">Total</span>
                  <span className="font-display text-primary text-lg">
                    {formatPrice(cartSubtotal + (progress >= 100 ? 0 : 12.0))}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  alert("Atelier Checkout: Order simulation initiated with California fulfillment dispatch.");
                }}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-sm bg-primary py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground shadow-md transition-all hover:brightness-110 active:scale-[0.99]"
              >
                Proceed to Secure Checkout
                <ArrowRight className="h-4 w-4" />
              </button>

              <div className="mt-4 flex items-center justify-center gap-4 text-[0.68rem] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                  30-Day Guarantee
                </span>
                <span className="flex items-center gap-1">
                  <Truck className="h-3.5 w-3.5 text-primary" />
                  Insured Transit
                </span>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
