import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, ChevronUp, Loader2, MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";

interface FaqItem {
  id: string;
  q: string;
  a: string;
}

const faqs: FaqItem[] = [
  {
    id: "faq-order",
    q: "How do I place an order?",
    a: "Browse our Virtual Shopping page, add items to your cart, and check out! It's that easy. You can also visit us in person at our vendor event on March 7, 2026 in Los Angeles.",
  },
  {
    id: "faq-shipping",
    q: "Do you ship internationally?",
    a: "Currently we ship within the US. We're working on expanding internationally soon — stay tuned! 🌍",
  },
  {
    id: "faq-plushies",
    q: "Are the plushies machine washable?",
    a: "Most of our plushies are surface-wash recommended to keep their colors vibrant and their stuffing fluffy. Check the individual product tags for specific care instructions.",
  },
  {
    id: "faq-returns",
    q: "What's your return policy?",
    a: "We accept returns within 14 days of delivery for unworn/unused items in original condition. Plushies must be in sealed packaging. Contact us through this support page for return requests!",
  },
];

export default function SupportPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const { actor } = useActor();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in all fields!");
      return;
    }

    setIsSubmitting(true);
    setError(false);

    try {
      if (actor) {
        await actor.submitSupportMessage(name, email, message);
      }
      setSubmitted(true);
      toast.success("Message sent! We'll get back to you soon 💕");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setError(true);
      toast.error("Oops! Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="text-4xl">💬</span>
          <h1 className="font-display font-black text-5xl text-foreground">
            <span className="text-primary">Support</span>
          </h1>
          <span className="text-4xl">🌿</span>
        </div>
        <p className="font-body text-foreground/70 text-xl">
          Need help? We're here for you! 💕
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div
            className="rounded-3xl p-8 shadow-boutique"
            style={{
              background: "oklch(0.22 0.12 148)",
              border: "1px solid oklch(0.40 0.16 148 / 0.65)",
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <MessageCircle className="w-7 h-7 text-primary" />
              <h2 className="font-display font-black text-2xl text-foreground">
                Send a Message
              </h2>
            </div>

            {submitted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                data-ocid="support.success_state"
                className="mb-6 p-4 rounded-2xl bg-green-500/20 border border-green-500/40 text-center"
              >
                <p className="font-display font-bold text-green-400 text-lg">
                  ✓ Message Sent! 🎉
                </p>
                <p className="font-body text-foreground/70 text-sm mt-1">
                  We'll respond within 1-2 business days.
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSubmitted(false)}
                  className="mt-3 text-foreground/60 hover:text-foreground"
                >
                  Send Another
                </Button>
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                data-ocid="support.error_state"
                className="mb-6 p-4 rounded-2xl bg-destructive/20 border border-destructive/40 text-center"
              >
                <p className="font-display font-bold text-destructive text-base">
                  ⚠️ Something went wrong
                </p>
                <p className="font-body text-foreground/60 text-sm mt-1">
                  Please try again or reach out to us directly.
                </p>
              </motion.div>
            )}

            {!submitted && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label
                    htmlFor="support-name"
                    className="font-heading font-semibold text-foreground/80 mb-1.5 block"
                  >
                    Your Name 🌸
                  </Label>
                  <Input
                    id="support-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    data-ocid="support.name.input"
                    className="rounded-xl border-border bg-secondary/50 text-foreground placeholder:text-muted-foreground focus:ring-primary"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="support-email"
                    className="font-heading font-semibold text-foreground/80 mb-1.5 block"
                  >
                    Email Address 📧
                  </Label>
                  <Input
                    id="support-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    data-ocid="support.email.input"
                    className="rounded-xl border-border bg-secondary/50 text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="support-message"
                    className="font-heading font-semibold text-foreground/80 mb-1.5 block"
                  >
                    Your Message 💌
                  </Label>
                  <Textarea
                    id="support-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help you today?"
                    rows={4}
                    data-ocid="support.message.textarea"
                    className="rounded-xl border-border bg-secondary/50 text-foreground placeholder:text-muted-foreground resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  data-ocid="support.submit.button"
                  className="w-full bg-primary text-primary-foreground font-display font-bold py-3 rounded-xl btn-glow hover:scale-105 transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message 💌"
                  )}
                </Button>
              </form>
            )}
          </div>

          {/* Quick Contact Info */}
          <div
            className="mt-6 rounded-2xl p-5"
            style={{
              background: "oklch(0.22 0.12 148)",
              border: "1px solid oklch(0.40 0.16 148 / 0.65)",
            }}
          >
            <h3 className="font-display font-black text-base text-foreground mb-3">
              Other Ways to Reach Us 🌿
            </h3>
            <div className="space-y-2">
              {[
                { icon: "📍", text: "Los Angeles, California" },
                { icon: "⏰", text: "Response time: 1-2 business days" },
                { icon: "🎪", text: "Vendor Event: March 7, 2026 • LA" },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-2">
                  <span>{icon}</span>
                  <p className="font-body text-sm text-foreground/70">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="font-display font-black text-2xl text-foreground mb-6 flex items-center gap-2">
            <span>❓</span> FAQ
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="rounded-2xl overflow-hidden shadow-boutique"
                style={{
                  background: "oklch(0.22 0.12 148)",
                  border: "1px solid oklch(0.40 0.16 148 / 0.65)",
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary/50 transition-colors"
                >
                  <span className="font-heading font-bold text-foreground text-sm pr-4">
                    {faq.q}
                  </span>
                  {openFaqIndex === i ? (
                    <ChevronUp className="w-4 h-4 text-primary shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
                  )}
                </button>
                {openFaqIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-4 pb-4"
                  >
                    <p className="font-body text-sm text-foreground/70 leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Fun encouragement */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 text-center p-6 bg-accent/10 border border-accent/30 rounded-3xl"
          >
            <div className="text-4xl mb-3">💖</div>
            <p className="font-display font-black text-lg text-foreground mb-2">
              We love our community!
            </p>
            <p className="font-body text-foreground/60 text-sm">
              Every question is a good question. Don't hesitate to reach out —
              we're always happy to help! 🌿
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
