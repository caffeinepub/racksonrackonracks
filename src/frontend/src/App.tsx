import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import CartDrawer from "./components/CartDrawer";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import InformationPage from "./components/InformationPage";
import Navbar from "./components/Navbar";
import ShoppingPage from "./components/ShoppingPage";
import SignInPage from "./components/SignInPage";
import SupportPage from "./components/SupportPage";

export type Tab = "home" | "information" | "shopping" | "support" | "signin";

export interface CartLocalItem {
  productId: string;
  name: string;
  price: bigint;
  imageUrl: string;
  quantity: number;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [cartOpen, setCartOpen] = useState(false);
  const [localCart, setLocalCart] = useState<CartLocalItem[]>([]);

  const addToLocalCart = (item: CartLocalItem) => {
    setLocalCart((prev) => {
      const existing = prev.find((c) => c.productId === item.productId);
      if (existing) {
        return prev.map((c) =>
          c.productId === item.productId
            ? { ...c, quantity: c.quantity + 1 }
            : c,
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromLocalCart = (productId: string) => {
    setLocalCart((prev) => prev.filter((c) => c.productId !== productId));
  };

  const cartCount = localCart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background font-body flex flex-col">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
      />

      <main className="flex-1">
        {activeTab === "home" && <HomePage setActiveTab={setActiveTab} />}
        {activeTab === "information" && <InformationPage />}
        {activeTab === "shopping" && (
          <ShoppingPage addToCart={addToLocalCart} />
        )}
        {activeTab === "support" && <SupportPage />}
        {activeTab === "signin" && <SignInPage />}
      </main>

      <Footer />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={localCart}
        onRemove={removeFromLocalCart}
      />

      <Toaster richColors position="top-right" />
    </div>
  );
}
