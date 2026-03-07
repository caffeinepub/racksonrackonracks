import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import type { Tab } from "../App";

interface NavbarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  cartCount: number;
  onCartOpen: () => void;
}

const navItems: { label: string; tab: Tab; ocid: string }[] = [
  { label: "Home", tab: "home", ocid: "nav.home.link" },
  { label: "Info", tab: "information", ocid: "nav.information.link" },
  { label: "Shop", tab: "shopping", ocid: "nav.shopping.link" },
  { label: "Support", tab: "support", ocid: "nav.support.link" },
  { label: "Sign In", tab: "signin", ocid: "nav.signin.link" },
];

export default function Navbar({
  activeTab,
  setActiveTab,
  cartCount,
  onCartOpen,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 glass border-b border-border shadow-boutique">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <button
          type="button"
          onClick={() => setActiveTab("home")}
          className="flex items-center gap-2 group shrink-0"
          data-ocid="nav.home.link"
        >
          <span className="font-display font-black text-xl leading-none tracking-tight logo-flicker">
            Rackson<span className="text-glow-amber-rack">Rack</span>OnRacks
          </span>
          <svg
            className="animate-leaf-sway ml-1 shrink-0"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M12 2C7 2 3 7 3 12c0 3.5 2 6.5 5 8l1-4c-1.5-1-2.5-2.5-2.5-4 0-3 2.5-5.5 5.5-5.5S17.5 9 17.5 12c0 1.5-1 3-2.5 4l1 4c3-1.5 5-4.5 5-8 0-5-4-10-9-10z"
              fill="#4ade80"
            />
            <line
              x1="12"
              y1="22"
              x2="12"
              y2="12"
              stroke="#16a34a"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Nav links - desktop */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map(({ label, tab, ocid }) => (
            <button
              type="button"
              key={tab}
              data-ocid={ocid}
              onClick={() => setActiveTab(tab)}
              className={`
                px-4 py-2 rounded-xl font-heading font-semibold text-sm transition-all duration-200
                ${
                  activeTab === tab
                    ? "bg-primary text-primary-foreground shadow-glow"
                    : "text-foreground hover:bg-secondary hover:text-foreground"
                }
              `}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Cart button */}
        <Button
          variant="outline"
          size="icon"
          onClick={onCartOpen}
          data-ocid="nav.cart.button"
          className="relative border-border hover:border-primary hover:bg-secondary btn-glow transition-all shrink-0"
        >
          <ShoppingCart className="w-5 h-5 text-foreground" />
          {cartCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-accent text-accent-foreground text-xs font-bold">
              {cartCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* Mobile nav */}
      <nav className="md:hidden flex items-center gap-1 px-4 pb-3 overflow-x-auto scrollbar-hide">
        {navItems.map(({ label, tab, ocid }) => (
          <button
            type="button"
            key={tab}
            data-ocid={ocid}
            onClick={() => setActiveTab(tab)}
            className={`
              px-3 py-1.5 rounded-xl font-heading font-semibold text-xs whitespace-nowrap transition-all duration-200 shrink-0
              ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground shadow-glow"
                  : "text-foreground hover:bg-secondary"
              }
            `}
          >
            {label}
          </button>
        ))}
      </nav>
    </header>
  );
}
