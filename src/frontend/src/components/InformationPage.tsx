import { Heart, Package, Sparkles, Store } from "lucide-react";
import { motion } from "motion/react";

export default function InformationPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="mb-4">
          <h1 className="font-display font-black text-5xl md:text-6xl text-foreground">
            About <span className="text-accent">Us</span>
          </h1>
        </div>
        <p className="font-body text-foreground/70 text-xl">
          The story behind the most fun boutique you'll ever visit!
        </p>
      </motion.div>

      {/* Founder Story */}
      <motion.section
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <div
          className="rounded-3xl p-8 relative overflow-hidden"
          style={{
            background: "oklch(0.22 0.12 148)",
            border: "1px solid oklch(0.40 0.16 148 / 0.70)",
            boxShadow:
              "0 20px 60px oklch(0 0 0 / 0.45), inset 0 1px 0 oklch(0.45 0.16 148 / 0.2)",
          }}
        >
          {/* Decorative corner plants */}
          <span className="absolute top-4 right-4 text-4xl opacity-20">🪴</span>
          <span className="absolute bottom-4 left-4 text-4xl opacity-20">
            🌿
          </span>
          {/* Glow orb */}
          <div
            className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, oklch(0.55 0.22 142 / 0.15) 0%, transparent 70%)",
              filter: "blur(20px)",
            }}
          />

          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center"
              style={{ border: "1px solid oklch(0.74 0.22 55 / 0.4)" }}
            >
              <Heart className="w-6 h-6 text-accent" />
            </div>
            <h2 className="font-display font-black text-3xl text-foreground">
              Our Story
            </h2>
          </div>
          <div
            className="space-y-4 font-body text-lg leading-relaxed"
            style={{ color: "oklch(0.78 0.16 240 / 0.80)" }}
          >
            <p>
              <span className="font-display font-black text-xl logo-flicker">
                Racks On Rack On Racks
              </span>{" "}
              was founded by{" "}
              <span className="font-display font-bold text-glow-green">
                Kissel Guzman
              </span>
              . Why? Because she was bored — and from that boredom came the most
              fun boutique you'll ever visit! 🎉
            </p>
            <p>
              What started as a simple idea turned into a colorful, vibrant
              store where fashion meets fun. Kissel wanted to create a space
              where you could find amazing women's clothing AND the most
              adorable collectible plushies — all in one place.
            </p>
            <p>
              The name? "Racks on Racks on Racks" — because we've got SO many
              amazing things on our racks, you'll need to come back again and
              again! 🛍️✨
            </p>
          </div>
        </div>
      </motion.section>

      {/* What We Sell */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-6">
          <Store className="w-8 h-8 text-primary" />
          <h2 className="font-display font-black text-3xl text-foreground">
            What We <span className="text-primary">Sell</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Women's Clothing */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="rounded-3xl p-6 shadow-boutique card-glow transition-all"
            style={{
              background: "oklch(0.22 0.12 148)",
              border: "1px solid oklch(0.40 0.16 148 / 0.65)",
            }}
          >
            <div className="text-5xl mb-4">👗</div>
            <h3 className="font-display font-black text-2xl text-foreground mb-3">
              Women's Clothing
            </h3>
            <p
              className="font-body leading-relaxed mb-4"
              style={{ color: "oklch(0.78 0.16 240 / 0.80)" }}
            >
              From floral summer dresses to cozy oversized hoodies and colorful
              crop tops — we carry pieces for every mood, every season, and
              every vibe.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Dresses 🌸", "Hoodies 💜", "Crop Tops 🌈", "& more!"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-sm font-heading font-semibold"
                    style={{
                      background: "oklch(0.28 0.14 148 / 0.80)",
                      border: "1px solid oklch(0.44 0.16 148 / 0.60)",
                      color: "oklch(0.80 0.18 240)",
                    }}
                  >
                    {tag}
                  </span>
                ),
              )}
            </div>
          </motion.div>

          {/* Plushies */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="rounded-3xl p-6 shadow-boutique card-glow transition-all"
            style={{
              background: "oklch(0.22 0.12 148)",
              border: "1px solid oklch(0.40 0.16 148 / 0.65)",
            }}
          >
            <div className="text-5xl mb-4">🧸</div>
            <h3 className="font-display font-black text-2xl text-foreground mb-3">
              Collectible Plushies
            </h3>
            <p
              className="font-body leading-relaxed mb-4"
              style={{ color: "oklch(0.78 0.16 240 / 0.80)" }}
            >
              Fan-favorite characters you know and love, now in irresistibly
              soft plush form. Perfect for collecting, gifting, or just keeping
              for yourself!
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Foxy 🦊",
                "Cookie Monster 💙",
                "Elmo ❤️",
                "Freddy 🐻",
                "Huggy Wuggy 🩷",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-sm font-heading font-semibold"
                  style={{
                    background: "oklch(0.28 0.14 148 / 0.80)",
                    border: "1px solid oklch(0.44 0.16 148 / 0.60)",
                    color: "oklch(0.80 0.18 240)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Store Values */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="w-8 h-8 text-accent" />
          <h2 className="font-display font-black text-3xl text-foreground">
            Our <span className="text-accent">Vibe</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: "🌿",
              title: "Green & Welcoming",
              desc: "Plants everywhere, warm lighting, a cozy space where you feel at home.",
            },
            {
              icon: "🎨",
              title: "Fun & Colorful",
              desc: "We believe shopping should be joyful, playful, and full of color.",
            },
            {
              icon: "💖",
              title: "Made with Love",
              desc: "Every item is handpicked by Kissel herself with care and passion.",
            },
          ].map(({ icon, title, desc }) => (
            <motion.div
              key={title}
              whileHover={{ y: -4 }}
              className="rounded-2xl p-5 text-center shadow-boutique transition-all card-glow"
              style={{
                background: "oklch(0.22 0.12 148)",
                border: "1px solid oklch(0.40 0.16 148 / 0.65)",
              }}
            >
              <div className="text-4xl mb-3">{icon}</div>
              <h4 className="font-display font-black text-lg text-foreground mb-2">
                {title}
              </h4>
              <p className="font-body text-foreground/70 text-sm leading-relaxed">
                {desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Vendor Event */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <div
          className="rounded-3xl p-8 text-center relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.72 0.26 48), oklch(0.64 0.28 40))",
            boxShadow:
              "0 8px 40px oklch(0.68 0.24 48 / 0.55), 0 2px 8px oklch(0 0 0 / 0.35)",
            color: "oklch(0.10 0.05 42)",
          }}
        >
          {/* Decorative glow orb */}
          <div
            className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, oklch(0.88 0.24 55 / 0.25) 0%, transparent 70%)",
              filter: "blur(30px)",
            }}
          />
          <Package
            className="w-12 h-12 mx-auto mb-4"
            style={{ color: "oklch(0.10 0.05 42)" }}
          />
          <h2
            className="font-display font-black text-3xl mb-2"
            style={{ color: "oklch(0.10 0.05 42)" }}
          >
            Meet Us In Person
          </h2>
          <p className="font-heading font-bold text-lg mb-1">
            AT HOME — COME SHOPPING WITH US
          </p>
          <p className="font-display font-black text-2xl">MARCH 7, 2026</p>
          <p className="font-heading font-semibold text-xl mt-1">
            Los Angeles • 5:00AM – 5:30PM
          </p>
          <p
            className="font-body mt-4"
            style={{ color: "oklch(0.15 0.05 42 / 0.80)" }}
          >
            Come find us! We'd love to see you in person 💕
          </p>
        </div>
      </motion.section>
    </div>
  );
}
