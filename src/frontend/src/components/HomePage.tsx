import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag, Sparkles, Zap } from "lucide-react";
import { motion } from "motion/react";
import type { Tab } from "../App";
import VendorBanner from "./VendorBanner";

interface HomePageProps {
  setActiveTab: (tab: Tab) => void;
}

const featuredProducts = [
  {
    name: "Pink Huggy Wuggy Plushie",
    price: "$22.99",
    image: "/assets/generated/plushie-huggy-wuggy.dim_400x400.jpg",
    tag: "Fan Fave",
    tagColor: "bg-accent text-accent-foreground",
  },
  {
    name: "Floral Summer Dress",
    price: "$49.99",
    image: "/assets/generated/clothing-dress-floral.dim_400x400.jpg",
    tag: "Trending",
    tagColor: "bg-primary text-primary-foreground",
  },
  {
    name: "Foxy Plushie",
    price: "$24.99",
    image: "/assets/generated/plushie-foxy.dim_400x400.jpg",
    tag: "FNAF",
    tagColor: "bg-boutique-yellow text-boutique-green",
  },
  {
    name: "Lavender Hoodie",
    price: "$39.99",
    image: "/assets/generated/clothing-hoodie.dim_400x400.jpg",
    tag: "Cozy",
    tagColor: "bg-boutique-teal text-white",
  },
];

const boutiquePillars = [
  {
    icon: "👗",
    text: "Curated women's fashion — dresses, tops, hoodies & more",
  },
  { icon: "🧸", text: "Iconic plushies — FNAF, Sesame Street, Poppy Playtime" },
  { icon: "🌿", text: "Boutique atmosphere with plants everywhere" },
  { icon: "💚", text: "Founded with love by Kissel Guzman" },
];

export default function HomePage({ setActiveTab }: HomePageProps) {
  return (
    <div className="overflow-x-hidden">
      {/* Vendor Banner */}
      <VendorBanner />

      {/* ===== HERO ===== */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden scanlines">
        {/* Hero background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/generated/hero-store.dim_1200x600.jpg"
            alt="RacksonRackOnRacks store"
            className="w-full h-full object-cover scale-105"
            style={{ filter: "saturate(1.3) brightness(0.6)" }}
          />
          <div className="hero-backdrop absolute inset-0" />
          {/* Deep vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
          {/* Side vignettes */}
          <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/40" />
        </div>

        {/* Floating ambient orbs */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div
            className="absolute w-96 h-96 rounded-full"
            style={{
              top: "10%",
              left: "-8%",
              background:
                "radial-gradient(circle, oklch(0.55 0.22 142 / 0.18) 0%, transparent 70%)",
              filter: "blur(40px)",
              animation: "float 8s ease-in-out infinite",
            }}
          />
          <div
            className="absolute w-80 h-80 rounded-full"
            style={{
              bottom: "5%",
              right: "-5%",
              background:
                "radial-gradient(circle, oklch(0.58 0.24 240 / 0.18) 0%, transparent 70%)",
              filter: "blur(50px)",
              animation: "float 10s ease-in-out infinite 3s",
            }}
          />
          <div
            className="absolute w-60 h-60 rounded-full"
            style={{
              top: "40%",
              right: "20%",
              background:
                "radial-gradient(circle, oklch(0.68 0.22 55 / 0.12) 0%, transparent 70%)",
              filter: "blur(35px)",
              animation: "float 12s ease-in-out infinite 6s",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Main text */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Pre-title */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="flex items-center gap-2 mb-5"
                >
                  <Zap
                    className="w-4 h-4 text-glow-orange"
                    style={{ color: "oklch(0.84 0.24 55)" }}
                  />
                  <span className="font-heading font-semibold text-xs uppercase tracking-[0.25em] text-glow-orange">
                    Boutique · Fashion · Fun
                  </span>
                </motion.div>

                {/* Main headline */}
                <h1 className="font-display font-black leading-[0.92] mb-6">
                  <span
                    className="block text-6xl md:text-7xl lg:text-8xl text-shimmer"
                    style={{ letterSpacing: "-0.03em" }}
                  >
                    Rackson
                  </span>
                  <span
                    className="block text-7xl md:text-8xl lg:text-9xl text-glow-amber-rack"
                    style={{ letterSpacing: "-0.04em" }}
                  >
                    Rack
                  </span>
                  <span
                    className="block text-6xl md:text-7xl lg:text-8xl text-shimmer"
                    style={{ letterSpacing: "-0.03em" }}
                  >
                    OnRacks
                  </span>
                </h1>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="font-heading text-lg md:text-xl mb-8 max-w-md leading-relaxed"
                  style={{ color: "oklch(0.72 0.14 240 / 0.85)" }}
                >
                  Your one-stop boutique for fashion & fun. Curated for women
                  who want style with soul.
                </motion.p>

                {/* Tags */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-center gap-2 mb-10 flex-wrap"
                >
                  {[
                    "Women's Fashion",
                    "Collectible Plushies",
                    "Boutique Vibes",
                  ].map((tag, i) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: 0.75 + i * 0.12,
                        type: "spring",
                        stiffness: 200,
                      }}
                      className="px-4 py-1.5 rounded-full font-heading text-xs font-bold uppercase tracking-widest"
                      style={{
                        background: "oklch(0.24 0.13 148 / 0.85)",
                        border: "1px solid oklch(0.44 0.16 148 / 0.70)",
                        color: "oklch(0.82 0.20 240)",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="flex items-center gap-4 flex-wrap"
                >
                  <Button
                    size="lg"
                    onClick={() => setActiveTab("shopping")}
                    data-ocid="home.shop_now.button"
                    className="btn-premium font-display font-black text-base px-8 py-6 rounded-2xl text-white transition-all duration-200 border-0"
                  >
                    <ShoppingBag className="mr-2 w-5 h-5" />
                    Shop Now
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => setActiveTab("information")}
                    data-ocid="home.learn_more.button"
                    className="font-display font-bold text-base px-8 py-6 rounded-2xl transition-all duration-200"
                    style={{
                      border: "1px solid oklch(0.42 0.14 148 / 0.7)",
                      background: "oklch(0.18 0.08 148 / 0.5)",
                      color: "oklch(0.78 0.18 240)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <Sparkles className="mr-2 w-4 h-4" />
                    Our Story
                  </Button>
                </motion.div>
              </motion.div>
            </div>

            {/* Right: Floating product preview cards */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.4,
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="hidden lg:block relative h-[500px]"
            >
              {featuredProducts.slice(0, 3).map((product, i) => {
                const positions = [
                  {
                    top: "0%",
                    left: "30%",
                    rotate: "3deg",
                    scale: 1.05,
                    zIndex: 3,
                  },
                  {
                    top: "18%",
                    left: "0%",
                    rotate: "-5deg",
                    scale: 0.92,
                    zIndex: 2,
                  },
                  {
                    top: "25%",
                    left: "55%",
                    rotate: "7deg",
                    scale: 0.88,
                    zIndex: 1,
                  },
                ];
                const pos = positions[i];
                return (
                  <motion.div
                    key={product.name}
                    initial={{ opacity: 0, y: 30, rotate: 0 }}
                    animate={{ opacity: 1, y: 0, rotate: pos.rotate }}
                    transition={{
                      delay: 0.6 + i * 0.15,
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{ scale: 1.08, zIndex: 10, rotate: "0deg" }}
                    className="absolute w-44 rounded-2xl overflow-hidden cursor-pointer"
                    style={{
                      top: pos.top,
                      left: pos.left,
                      zIndex: pos.zIndex,
                      boxShadow:
                        "0 20px 60px oklch(0 0 0 / 0.55), 0 0 0 1px oklch(0.36 0.12 148 / 0.5)",
                    }}
                    onClick={() => setActiveTab("shopping")}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full aspect-[3/4] object-cover"
                    />
                    <div
                      className="p-2.5"
                      style={{ background: "oklch(0.22 0.12 148)" }}
                    >
                      <p className="font-heading font-bold text-xs text-card-foreground truncate">
                        {product.name}
                      </p>
                      <p className="font-display font-black text-sm text-primary">
                        {product.price}
                      </p>
                    </div>
                  </motion.div>
                );
              })}

              {/* Floating glow orb behind cards */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, oklch(0.52 0.20 142 / 0.15) 0%, transparent 65%)",
                  filter: "blur(20px)",
                }}
              />
            </motion.div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
      </section>

      {/* ===== BOUTIQUE SECTION ===== */}
      <section className="py-20 px-4 relative overflow-hidden">
        {/* Subtle section divider glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.55 0.22 142 / 0.5), transparent)",
          }}
        />

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-8 h-px"
                  style={{ background: "oklch(0.62 0.26 240 / 0.7)" }}
                />
                <span className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-glow-blue">
                  Our Boutique
                </span>
              </div>
              <h2 className="font-display font-black text-4xl md:text-5xl leading-tight mb-5">
                Fashion &amp; <span className="text-glow-blue">Fun</span> Under
                One Roof
              </h2>
              <p
                className="font-body leading-relaxed mb-8"
                style={{ color: "oklch(0.72 0.14 240 / 0.80)" }}
              >
                Step into our world of fashion and fun! We carry the cutest
                women's clothing alongside everyone's favorite collectible
                plushies. Surrounded by lush green plants and good vibes only.
              </p>

              <div className="flex flex-col gap-4">
                {boutiquePillars.map(({ icon, text }, i) => (
                  <motion.div
                    key={text}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4 group"
                  >
                    <div
                      className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-base transition-all duration-200 group-hover:scale-110"
                      style={{
                        background: "oklch(0.26 0.14 148 / 0.85)",
                        border: "1px solid oklch(0.44 0.16 148 / 0.70)",
                      }}
                    >
                      {icon}
                    </div>
                    <p
                      className="font-body pt-1.5"
                      style={{ color: "oklch(0.74 0.15 240 / 0.80)" }}
                    >
                      {text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-3xl overflow-hidden card-glow"
                style={{
                  border: "1px solid oklch(0.40 0.16 148 / 0.70)",
                  boxShadow:
                    "0 24px 80px oklch(0 0 0 / 0.50), 0 0 0 1px oklch(0.35 0.14 148 / 0.4)",
                }}
              >
                <img
                  src="/assets/generated/clothing-rack.dim_600x400.jpg"
                  alt="Clothing racks in our boutique"
                  className="w-full h-64 md:h-80 object-cover"
                  style={{ filter: "saturate(1.2) brightness(0.9)" }}
                />
                {/* Image overlay label */}
                <div
                  className="px-5 py-4"
                  style={{ background: "oklch(0.22 0.12 148)" }}
                >
                  <p className="font-display font-black text-sm text-card-foreground">
                    The Boutique — Where Style Lives
                  </p>
                </div>
              </motion.div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
                whileInView={{ opacity: 1, scale: 1, rotate: -8 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="absolute -bottom-4 -left-4 px-4 py-2 rounded-2xl font-display font-black text-sm text-accent-foreground"
                style={{
                  background: "oklch(var(--accent))",
                  boxShadow: "0 8px 24px oklch(0.74 0.22 55 / 0.45)",
                }}
              >
                🌿 Curated with Love
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="py-20 px-4 relative">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.58 0.24 240 / 0.5), transparent)",
          }}
        />

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div
                className="w-16 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, oklch(0.58 0.24 240 / 0.6))",
                }}
              />
              <span className="font-heading text-xs font-bold uppercase tracking-[0.25em] text-glow-blue">
                This Season
              </span>
              <div
                className="w-16 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, oklch(0.58 0.24 240 / 0.6), transparent)",
                }}
              />
            </div>
            <h2 className="font-display font-black text-5xl md:text-6xl leading-tight mb-3">
              Featured <span className="text-glow-blue">Picks</span>
            </h2>
            <p
              className="font-body text-lg"
              style={{ color: "oklch(0.68 0.13 240 / 0.75)" }}
            >
              Our most-loved items right now
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {featuredProducts.map((product, i) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.12,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -6 }}
                className="group cursor-pointer"
                onClick={() => setActiveTab("shopping")}
              >
                <div
                  className="rounded-2xl overflow-hidden card-glow transition-all duration-300 flex flex-col"
                  style={{
                    background: "oklch(0.22 0.12 148)",
                    border: "1px solid oklch(0.40 0.16 148 / 0.65)",
                    boxShadow: "0 8px 32px oklch(0 0 0 / 0.40)",
                  }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full aspect-square object-cover group-hover:scale-108 transition-transform duration-500"
                      style={{ filter: "saturate(1.1)" }}
                    />
                    {/* Tag */}
                    <div
                      className={`absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full text-xs font-display font-black ${product.tagColor}`}
                      style={{ backdropFilter: "blur(8px)" }}
                    >
                      {product.tag}
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-3.5">
                    <p className="font-heading font-bold text-sm text-card-foreground truncate mb-0.5">
                      {product.name}
                    </p>
                    <p className="font-display font-black text-base text-primary">
                      {product.price}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button
              size="lg"
              onClick={() => setActiveTab("shopping")}
              data-ocid="home.see_all.button"
              className="btn-premium font-display font-bold px-10 py-5 rounded-2xl text-white border-0 transition-all duration-200"
            >
              <Heart className="mr-2 w-4 h-4" />
              See All Products
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
