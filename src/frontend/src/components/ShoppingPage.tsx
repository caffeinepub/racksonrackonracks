import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, ShoppingBag, ShoppingCart, Star } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { CartLocalItem } from "../App";
import { Category, type Product } from "../backend";
import { useActor } from "../hooks/useActor";

declare global {
  interface Window {
    ShopifyBuy: {
      buildClient: (config: {
        domain: string;
        storefrontAccessToken: string;
        apiVersion: string;
      }) => unknown;
      UI: {
        onReady: (client: unknown) => Promise<{
          createComponent: (
            type: string,
            options: Record<string, unknown>,
          ) => Promise<void>;
        }>;
      };
    };
  }
}

interface ShoppingPageProps {
  addToCart: (item: CartLocalItem) => void;
}

type FilterTab = "all" | "clothing" | "plushie";

const SEED_PRODUCTS: Product[] = [
  {
    id: "plushie-foxy",
    name: "Foxy Plushie",
    price: BigInt(2499),
    category: Category.plushie,
    imageUrl: "/assets/generated/plushie-foxy.dim_400x400.jpg",
    description: "Your favorite FNAF pirate fox in plush form!",
    inStock: true,
  },
  {
    id: "plushie-cookie-monster",
    name: "Cookie Monster Plushie",
    price: BigInt(1999),
    category: Category.plushie,
    imageUrl: "/assets/generated/plushie-cookie-monster.dim_400x400.jpg",
    description: "C is for Cookie and C is for Cute!",
    inStock: true,
  },
  {
    id: "plushie-elmo",
    name: "Elmo Plushie",
    price: BigInt(1899),
    category: Category.plushie,
    imageUrl: "/assets/generated/plushie-elmo.dim_400x400.jpg",
    description: "Elmo loves you and so do we!",
    inStock: true,
  },
  {
    id: "plushie-freddy",
    name: "Freddy Fazbear Plushie",
    price: BigInt(2699),
    category: Category.plushie,
    imageUrl: "/assets/generated/plushie-freddy.dim_400x400.jpg",
    description: "The iconic bear from FNAF in huggable form!",
    inStock: true,
  },
  {
    id: "plushie-huggy-wuggy",
    name: "Pink Huggy Wuggy Plushie",
    price: BigInt(2299),
    category: Category.plushie,
    imageUrl: "/assets/generated/plushie-huggy-wuggy.dim_400x400.jpg",
    description: "Big hugs from your favorite pink monster!",
    inStock: true,
  },
  {
    id: "clothing-dress-floral",
    name: "Floral Summer Dress",
    price: BigInt(4999),
    category: Category.clothing,
    imageUrl: "/assets/generated/clothing-dress-floral.dim_400x400.jpg",
    description: "Bright florals for bright days!",
    inStock: true,
  },
  {
    id: "clothing-hoodie",
    name: "Lavender Oversized Hoodie",
    price: BigInt(3999),
    category: Category.clothing,
    imageUrl: "/assets/generated/clothing-hoodie.dim_400x400.jpg",
    description: "Cozy, cute, and totally you.",
    inStock: true,
  },
  {
    id: "clothing-crop-top",
    name: "Rainbow Crop Top",
    price: BigInt(2999),
    category: Category.clothing,
    imageUrl: "/assets/generated/clothing-crop-top.dim_400x400.jpg",
    description: "Show your colors with this fun crop top!",
    inStock: true,
  },
];

const formatPrice = (priceCents: bigint): string => {
  const dollars = Number(priceCents) / 100;
  return `$${dollars.toFixed(2)}`;
};

const categoryEmoji: Record<string, string> = {
  plushie: "🧸",
  clothing: "👗",
};

export default function ShoppingPage({ addToCart }: ShoppingPageProps) {
  const [filter, setFilter] = useState<FilterTab>("all");
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());
  const [shopifyDomain, setShopifyDomain] = useState("");
  const [shopifyToken, setShopifyToken] = useState("");
  const [shopifyConnected, setShopifyConnected] = useState(false);
  const [shopifyLoading, setShopifyLoading] = useState(false);
  const [shopifyError, setShopifyError] = useState("");
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();

  // Fetch products from backend
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return SEED_PRODUCTS;
      const result = await actor.getAllProducts();
      return result.length > 0 ? result : SEED_PRODUCTS;
    },
    enabled: !isFetching,
    placeholderData: SEED_PRODUCTS,
  });

  // Seed products mutation
  const seedMutation = useMutation({
    mutationFn: async () => {
      if (!actor) return;
      const isAdmin = await actor.isCallerAdmin();
      if (!isAdmin) return;
      const existing = await actor.getAllProducts();
      if (existing.length === 0) {
        await Promise.all(SEED_PRODUCTS.map((p) => actor.addProduct(p)));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  // Try to seed on mount when actor is ready
  const seedMutate = seedMutation.mutate;
  useEffect(() => {
    if (actor && !isFetching) {
      seedMutate();
    }
  }, [actor, isFetching, seedMutate]);

  const displayProducts = products ?? SEED_PRODUCTS;

  const filteredProducts = displayProducts.filter((p) => {
    if (filter === "all") return true;
    return p.category === filter;
  });

  const handleAddToCart = (product: Product) => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1,
    });

    setAddedIds((prev) => new Set([...prev, product.id]));
    setTimeout(() => {
      setAddedIds((prev) => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }, 1500);

    toast.success(`${product.name} added to cart`, {
      description: formatPrice(product.price),
    });
  };

  const loadShopifyScript = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (window.ShopifyBuy) {
        resolve();
        return;
      }
      const existing = document.getElementById("shopify-buy-btn-script");
      if (existing) {
        existing.addEventListener("load", () => resolve());
        existing.addEventListener("error", reject);
        return;
      }
      const script = document.createElement("script");
      script.id = "shopify-buy-btn-script";
      script.src =
        "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load Shopify SDK"));
      document.head.appendChild(script);
    });
  };

  const handleShopifyConnect = async () => {
    if (!shopifyDomain.trim() || !shopifyToken.trim()) {
      toast.error("Please enter your Shopify domain and access token.");
      return;
    }
    setShopifyLoading(true);
    setShopifyError("");
    try {
      await loadShopifyScript();
      const client = window.ShopifyBuy.buildClient({
        domain: shopifyDomain.trim(),
        storefrontAccessToken: shopifyToken.trim(),
        apiVersion: "2023-04",
      });
      const ui = await window.ShopifyBuy.UI.onReady(client);
      const embedTarget = document.getElementById("shopify-embed-target");
      if (embedTarget) {
        embedTarget.innerHTML = "";
        await ui.createComponent("collection", {
          node: embedTarget,
          moneyFormat: "%24%7B%7Bamount%7D%7D",
          options: {
            product: {
              styles: {
                product: {
                  "@media (min-width: 601px)": {
                    "max-width": "calc(25% - 20px)",
                    "margin-left": "20px",
                    "margin-bottom": "50px",
                  },
                },
                button: {
                  "background-color": "oklch(0.60 0.24 240)",
                  color: "#fff",
                  "border-radius": "12px",
                  padding: "10px 20px",
                  "font-weight": "bold",
                },
              },
              text: { button: "Buy Now" },
            },
            cart: {
              styles: {
                button: {
                  "background-color": "oklch(0.60 0.24 240)",
                  "border-radius": "12px",
                },
              },
            },
          },
        });
      }
      setShopifyConnected(true);
      toast.success("Shopify store connected! Browse products below.");
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Could not connect. Check your domain and token.";
      setShopifyError(msg);
      toast.error(`Shopify connection failed: ${msg}`);
    } finally {
      setShopifyLoading(false);
    }
  };

  const filterTabs: { label: string; value: FilterTab; ocid: string }[] = [
    { label: "All", value: "all", ocid: "shop.all.tab" },
    { label: "👗 Clothing", value: "clothing", ocid: "shop.clothing.tab" },
    { label: "🧸 Plushies", value: "plushie", ocid: "shop.plushies.tab" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="font-display font-black text-5xl md:text-6xl text-foreground mb-3">
          Virtual <span className="text-glow-blue">Shopping</span>
        </h1>
        <p className="font-body text-foreground/70 text-lg">
          Browse our collection of fashion &amp; collectibles
        </p>
      </motion.div>

      {/* Shopify Integration Panel */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mb-10"
      >
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "oklch(0.22 0.12 148)",
            border: "1px solid oklch(0.40 0.16 148 / 0.65)",
            boxShadow:
              "0 8px 32px oklch(0 0 0 / 0.40), 0 0 0 1px oklch(0.35 0.14 148 / 0.25)",
          }}
        >
          <div className="px-6 py-5 border-b border-border flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h2 className="font-display font-black text-xl text-foreground">
                Shop via Shopify
              </h2>
              <p className="font-body text-sm text-muted-foreground">
                {shopifyConnected
                  ? "Your Shopify store is connected. Browse products below."
                  : "Connect your Shopify store for seamless checkout."}
              </p>
            </div>
            {shopifyConnected && (
              <span className="ml-auto px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold font-heading">
                Connected
              </span>
            )}
          </div>

          <div
            data-ocid="shop.shopify_embed.panel"
            className="px-6 py-5 space-y-4"
          >
            {!shopifyConnected && (
              <>
                <p className="font-body text-sm text-foreground/80">
                  Enter your Shopify store domain and Storefront Access Token to
                  enable direct product browsing and one-click checkout.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="shopify-domain"
                      className="font-heading font-semibold text-xs text-foreground/70 uppercase tracking-wider"
                    >
                      Shopify Store Domain
                    </label>
                    <Input
                      id="shopify-domain"
                      type="text"
                      placeholder="yourstore.myshopify.com"
                      value={shopifyDomain}
                      onChange={(e) => setShopifyDomain(e.target.value)}
                      data-ocid="shop.shopify_domain.input"
                      disabled={shopifyLoading}
                      className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label
                      htmlFor="shopify-token"
                      className="font-heading font-semibold text-xs text-foreground/70 uppercase tracking-wider"
                    >
                      Storefront Access Token
                    </label>
                    <Input
                      id="shopify-token"
                      type="password"
                      placeholder="your-access-token"
                      value={shopifyToken}
                      onChange={(e) => setShopifyToken(e.target.value)}
                      data-ocid="shop.shopify_token.input"
                      disabled={shopifyLoading}
                      className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                </div>
                {shopifyError && (
                  <p
                    className="font-body text-xs text-red-400"
                    data-ocid="shop.shopify_connect.error_state"
                  >
                    {shopifyError}
                  </p>
                )}
                <div className="flex items-center gap-4 flex-wrap">
                  <Button
                    onClick={handleShopifyConnect}
                    data-ocid="shop.shopify_connect.button"
                    disabled={shopifyLoading}
                    className="bg-accent text-accent-foreground font-display font-bold hover:bg-accent/90 hover:scale-105 transition-all duration-200 shadow-md"
                  >
                    {shopifyLoading ? (
                      <>
                        <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="mr-2 w-4 h-4" />
                        Connect Shopify
                      </>
                    )}
                  </Button>
                  <p className="font-body text-xs text-muted-foreground italic">
                    Products will appear here for direct purchase once
                    connected.
                  </p>
                </div>
              </>
            )}

            {/* Shopify SDK renders products into this div */}
            <div
              id="shopify-embed-target"
              className={shopifyConnected ? "min-h-[200px]" : "hidden"}
              data-ocid="shop.shopify_products.panel"
            />
          </div>
        </div>
      </motion.div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-3 mb-10 flex-wrap">
        {filterTabs.map(({ label, value, ocid }) => (
          <button
            type="button"
            key={value}
            data-ocid={ocid}
            onClick={() => setFilter(value)}
            className={`
              px-6 py-2.5 rounded-2xl font-heading font-bold text-sm transition-all duration-200
              ${
                filter === value
                  ? "scale-105"
                  : "bg-secondary text-foreground hover:bg-muted border border-border"
              }
            `}
            style={
              filter === value
                ? {
                    background:
                      "linear-gradient(135deg, oklch(0.32 0.16 148), oklch(0.26 0.14 148))",
                    boxShadow:
                      "0 0 18px oklch(0.45 0.20 148 / 0.55), 0 4px 12px oklch(0 0 0 / 0.30)",
                    color: "oklch(0.96 0.08 148)",
                    border: "1px solid oklch(0.45 0.18 148 / 0.7)",
                  }
                : undefined
            }
          >
            {label}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }, (_, i) => `skel-${i}`).map((skelKey) => (
            <div
              key={skelKey}
              className="rounded-2xl overflow-hidden bg-card border border-border"
            >
              <Skeleton className="aspect-square w-full" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-9 w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {filteredProducts.map((product, i) => {
              const globalIndex =
                displayProducts.findIndex((p) => p.id === product.id) + 1;
              const isAdded = addedIds.has(product.id);

              return (
                <motion.div
                  layout
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05 }}
                  data-ocid={`shop.item.${globalIndex}`}
                  className="group"
                >
                  <div
                    className="rounded-2xl overflow-hidden shadow-boutique card-glow transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
                    style={{
                      background: "oklch(0.22 0.12 148)",
                      border: "1px solid oklch(0.40 0.16 148 / 0.65)",
                    }}
                  >
                    {/* Product Image */}
                    <div className="relative overflow-hidden aspect-square">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Category badge */}
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-secondary/90 text-foreground border border-border font-heading font-bold text-xs backdrop-blur-sm">
                          {categoryEmoji[product.category]} {product.category}
                        </Badge>
                      </div>
                      {/* In stock */}
                      {product.inStock && (
                        <div className="absolute top-2 right-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-green-400 shadow-sm" />
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="font-heading font-bold text-sm text-card-foreground mb-1 line-clamp-2 leading-tight">
                        {product.name}
                      </h3>
                      <p className="font-body text-xs text-muted-foreground mb-3 line-clamp-2 flex-1">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-display font-black text-xl text-primary">
                          {formatPrice(product.price)}
                        </span>
                        <div className="flex items-center gap-0.5">
                          {["s1", "s2", "s3", "s4", "s5"].map((sk) => (
                            <Star
                              key={sk}
                              className="w-3 h-3 fill-boutique-yellow text-boutique-yellow"
                            />
                          ))}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleAddToCart(product)}
                        data-ocid={`shop.add_to_cart.button.${globalIndex}`}
                        disabled={!product.inStock}
                        className={`
                          w-full font-display font-bold text-xs rounded-xl transition-all duration-200
                          ${
                            isAdded
                              ? "bg-green-500 text-white"
                              : "bg-primary text-primary-foreground btn-glow hover:scale-105"
                          }
                        `}
                      >
                        {isAdded ? (
                          "✓ Added!"
                        ) : (
                          <>
                            <ShoppingCart className="mr-1 w-3 h-3" />
                            Add to Cart
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      )}

      {filteredProducts.length === 0 && !isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
          data-ocid="shop.empty_state"
        >
          <div className="text-6xl mb-4">🌿</div>
          <p className="font-display font-black text-2xl text-foreground mb-2">
            Nothing here yet!
          </p>
          <p className="font-body text-foreground/60">
            Try a different filter to see more items.
          </p>
        </motion.div>
      )}

      {/* Decorative bottom strip */}
      <div className="mt-16 text-center">
        <p className="font-body text-foreground/40 text-sm">
          All items curated by Kissel Guzman
        </p>
      </div>
    </div>
  );
}
