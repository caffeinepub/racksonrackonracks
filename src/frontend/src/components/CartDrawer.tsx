import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Loader2, ShoppingBag, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { CartLocalItem } from "../App";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  items: CartLocalItem[];
  onRemove: (productId: string) => void;
}

const formatPrice = (priceCents: bigint): string => {
  const dollars = Number(priceCents) / 100;
  return `$${dollars.toFixed(2)}`;
};

// Stripe publishable key — replace with your actual Stripe publishable key
const STRIPE_PUBLISHABLE_KEY =
  "pk_test_51ABC123DEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

// Declare Stripe on window for TypeScript
declare global {
  interface Window {
    Stripe?: (key: string) => {
      redirectToCheckout: (
        opts: unknown,
      ) => Promise<{ error?: { message: string } }>;
    };
  }
}

export default function CartDrawer({
  open,
  onClose,
  items,
  onRemove,
}: CartDrawerProps) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const total = items.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0,
  );

  // Load Stripe.js script dynamically
  const loadStripe = (): Promise<typeof window.Stripe> => {
    return new Promise((resolve) => {
      if (window.Stripe) {
        resolve(window.Stripe);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://js.stripe.com/v3/";
      script.onload = () => resolve(window.Stripe);
      script.onerror = () => resolve(undefined);
      document.head.appendChild(script);
    });
  };

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setIsCheckingOut(true);

    try {
      const StripeConstructor = await loadStripe();

      if (!StripeConstructor) {
        throw new Error("Stripe.js failed to load");
      }

      const stripe = StripeConstructor(STRIPE_PUBLISHABLE_KEY);

      // Build line items — unit_amount is in cents
      const lineItems = items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: Number(item.price),
        },
        quantity: item.quantity,
      }));

      const { error } = await stripe.redirectToCheckout({
        lineItems,
        mode: "payment",
        successUrl: `${window.location.origin}?checkout=success`,
        cancelUrl: `${window.location.origin}?checkout=cancelled`,
        billingAddressCollection: "required",
        shippingAddressCollection: {
          allowedCountries: ["US"],
        },
      });

      if (error) {
        throw new Error(error.message);
      }
    } catch (err) {
      console.error("Checkout error:", err);
      toast.error(
        "Stripe checkout requires your publishable key. Update STRIPE_PUBLISHABLE_KEY in CartDrawer.tsx.",
        { duration: 6000 },
      );
      setIsCheckingOut(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            data-ocid="cart.panel"
            className="fixed right-0 top-0 h-full w-full max-w-sm bg-card border-l border-border z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <h2 className="font-display font-black text-xl text-card-foreground">
                  Your Cart
                </h2>
                {items.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                    {items.reduce((s, i) => s + i.quantity, 0)}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                data-ocid="cart.close_button"
                className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-muted transition-colors"
              >
                <X className="w-4 h-4 text-foreground" />
              </button>
            </div>

            {/* Items */}
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <div className="text-4xl mb-4 animate-bounce-gentle">🛒</div>
                <p className="font-display font-black text-xl text-card-foreground mb-2">
                  Your cart is empty
                </p>
                <p className="font-body text-muted-foreground text-sm mb-4">
                  Add some items to get started
                </p>
                <Button
                  onClick={onClose}
                  data-ocid="cart.primary_button"
                  className="bg-primary text-primary-foreground font-display font-bold rounded-xl btn-glow"
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <>
                <ScrollArea className="flex-1">
                  <div className="p-4 space-y-3">
                    <AnimatePresence>
                      {items.map((item) => (
                        <motion.div
                          key={item.productId}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20, height: 0 }}
                          className="flex items-center gap-3 bg-secondary/50 rounded-2xl p-3 border border-border"
                        >
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-14 h-14 rounded-xl object-cover shrink-0 border border-border"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-heading font-bold text-sm text-card-foreground truncate">
                              {item.name}
                            </p>
                            <p className="font-display font-black text-primary text-base">
                              {formatPrice(item.price)}
                            </p>
                            <p className="font-body text-xs text-muted-foreground">
                              Qty: {item.quantity}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              onRemove(item.productId);
                              toast.success(`${item.name} removed from cart`);
                            }}
                            data-ocid="cart.delete_button"
                            className="w-8 h-8 rounded-full bg-destructive/20 hover:bg-destructive flex items-center justify-center transition-colors shrink-0 group"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-destructive group-hover:text-white transition-colors" />
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </ScrollArea>

                {/* Footer */}
                <div className="p-6 border-t border-border space-y-4">
                  <Separator className="bg-border" />
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-bold text-foreground">
                      Total
                    </span>
                    <span className="font-display font-black text-2xl text-primary">
                      ${(total / 100).toFixed(2)}
                    </span>
                  </div>
                  <Button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    data-ocid="cart.submit_button"
                    className="w-full bg-accent text-accent-foreground font-display font-black text-base py-4 rounded-2xl pink-glow hover:scale-105 transition-all disabled:opacity-70 disabled:scale-100"
                  >
                    {isCheckingOut ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Redirecting to Stripe...
                      </>
                    ) : (
                      "Checkout with Stripe"
                    )}
                  </Button>
                  <p className="text-center font-body text-xs text-muted-foreground">
                    Secure checkout powered by Stripe
                  </p>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
