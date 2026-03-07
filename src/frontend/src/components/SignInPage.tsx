import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2, LogOut, User } from "lucide-react";
import { GraduationCap, Mail } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { SiApple, SiGoogle } from "react-icons/si";
import { toast } from "sonner";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

type AuthTab = "signin" | "create";

export default function SignInPage() {
  const [activeTab, setActiveTab] = useState<AuthTab>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login, clear, loginStatus, isLoggingIn, isLoginSuccess, identity } =
    useInternetIdentity();

  const isLoggedIn = !!identity;

  const handleEmailSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields!");
      return;
    }
    toast.info("Signing in via Internet Identity...");
    login();
  };

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields!");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }
    toast.info("Creating account via Internet Identity...");
    login();
  };

  const handleSocialLogin = (provider: string) => {
    toast.info(`Connecting with ${provider}...`);
    login();
  };

  const handleSignOut = () => {
    clear();
    toast.success("Signed out successfully! See you soon 👋");
  };

  // Logged in state
  if (isLoggedIn) {
    const principal = identity.getPrincipal().toString();
    const shortPrincipal = `${principal.slice(0, 8)}...${principal.slice(-6)}`;

    return (
      <div className="max-w-xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card border border-border rounded-3xl p-10 shadow-boutique text-center"
        >
          <div className="w-24 h-24 rounded-full bg-primary/20 border-4 border-primary mx-auto mb-6 flex items-center justify-center">
            <User className="w-12 h-12 text-primary" />
          </div>
          <h2 className="font-display font-black text-3xl text-foreground mb-2">
            Welcome back! 🎉
          </h2>
          <p className="font-body text-foreground/60 text-sm mb-1">
            You're signed in as:
          </p>
          <p className="font-mono text-xs text-muted-foreground bg-secondary/50 px-3 py-1.5 rounded-lg mb-6 break-all">
            {shortPrincipal}
          </p>

          <div className="space-y-3 mb-8">
            {[
              { icon: "🛍️", text: "Your cart is saved to your account" },
              { icon: "💌", text: "Order updates sent to your email" },
              { icon: "🌟", text: "Access exclusive member deals" },
            ].map(({ icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-3 text-left px-4"
              >
                <span className="text-xl">{icon}</span>
                <p className="font-body text-foreground/70 text-sm">{text}</p>
              </div>
            ))}
          </div>

          <Button
            onClick={handleSignOut}
            variant="outline"
            className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground font-display font-bold rounded-xl px-8"
          >
            <LogOut className="mr-2 w-4 h-4" />
            Sign Out
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="text-3xl">🔑</span>
          <h1 className="font-display font-black text-4xl text-foreground">
            {activeTab === "signin" ? "Welcome Back!" : "Join Us!"}
          </h1>
          <span className="text-3xl">🌿</span>
        </div>
        <p className="font-body text-foreground/60">
          {activeTab === "signin"
            ? "Sign in to access your account and orders."
            : "Create an account to start shopping!"}
        </p>
      </motion.div>

      <div className="bg-card border border-border rounded-3xl p-8 shadow-boutique">
        {/* Tab Switcher */}
        <div className="flex gap-2 mb-8 bg-secondary/50 p-1 rounded-2xl">
          <button
            type="button"
            data-ocid="signin.signin.tab"
            onClick={() => setActiveTab("signin")}
            className={`flex-1 py-2.5 rounded-xl font-heading font-bold text-sm transition-all ${
              activeTab === "signin"
                ? "bg-primary text-primary-foreground shadow-glow"
                : "text-foreground/70 hover:text-foreground"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            data-ocid="signin.create.tab"
            onClick={() => setActiveTab("create")}
            className={`flex-1 py-2.5 rounded-xl font-heading font-bold text-sm transition-all ${
              activeTab === "create"
                ? "bg-primary text-primary-foreground shadow-glow"
                : "text-foreground/70 hover:text-foreground"
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Social Login Providers */}
        <div className="space-y-3 mb-6">
          <p className="font-heading font-semibold text-foreground/60 text-xs text-center uppercase tracking-wider">
            Continue with
          </p>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={() => handleSocialLogin("Google")}
              data-ocid="signin.google.button"
              className="border-border hover:border-primary hover:bg-secondary font-heading font-semibold text-sm rounded-xl gap-2"
            >
              <SiGoogle className="w-4 h-4 text-red-400" />
              Google
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSocialLogin("Apple")}
              data-ocid="signin.apple.button"
              className="border-border hover:border-primary hover:bg-secondary font-heading font-semibold text-sm rounded-xl gap-2"
            >
              <SiApple className="w-4 h-4 text-foreground" />
              Apple
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSocialLogin("ComptonUSD")}
              data-ocid="signin.compton.button"
              className="border-border hover:border-primary hover:bg-secondary font-heading font-semibold text-xs rounded-xl gap-2"
            >
              <GraduationCap className="w-4 h-4 text-boutique-blue" />
              ComptonUSD.com
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSocialLogin("Outlook")}
              data-ocid="signin.outlook.button"
              className="border-border hover:border-primary hover:bg-secondary font-heading font-semibold text-sm rounded-xl gap-2"
            >
              <Mail className="w-4 h-4 text-blue-400" />
              Outlook
            </Button>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-border" />
          <span className="text-muted-foreground text-xs font-body">or</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Sign In Form */}
        {activeTab === "signin" && (
          <motion.form
            key="signin"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onSubmit={handleEmailSignIn}
            className="space-y-4"
          >
            <div>
              <Label
                htmlFor="signin-email"
                className="font-heading font-semibold text-foreground/80 mb-1.5 block text-sm"
              >
                Email Address
              </Label>
              <Input
                id="signin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                data-ocid="signin.email.input"
                className="rounded-xl border-border bg-secondary/50 text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div>
              <Label
                htmlFor="signin-password"
                className="font-heading font-semibold text-foreground/80 mb-1.5 block text-sm"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="signin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  data-ocid="signin.password.input"
                  className="rounded-xl border-border bg-secondary/50 text-foreground placeholder:text-muted-foreground pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              disabled={isLoggingIn}
              data-ocid="signin.submit.button"
              className="w-full bg-primary text-primary-foreground font-display font-bold py-3 rounded-xl btn-glow hover:scale-105 transition-all"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                "Sign In 🔑"
              )}
            </Button>
          </motion.form>
        )}

        {/* Create Account Form */}
        {activeTab === "create" && (
          <motion.form
            key="create"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onSubmit={handleCreateAccount}
            className="space-y-4"
          >
            <div>
              <Label
                htmlFor="create-name"
                className="font-heading font-semibold text-foreground/80 mb-1.5 block text-sm"
              >
                Display Name 🌸
              </Label>
              <Input
                id="create-name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Your name"
                className="rounded-xl border-border bg-secondary/50 text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div>
              <Label
                htmlFor="create-email"
                className="font-heading font-semibold text-foreground/80 mb-1.5 block text-sm"
              >
                Email Address
              </Label>
              <Input
                id="create-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                data-ocid="signin.email.input"
                className="rounded-xl border-border bg-secondary/50 text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div>
              <Label
                htmlFor="create-password"
                className="font-heading font-semibold text-foreground/80 mb-1.5 block text-sm"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="create-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  data-ocid="signin.password.input"
                  className="rounded-xl border-border bg-secondary/50 text-foreground placeholder:text-muted-foreground pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <Label
                htmlFor="confirm-password"
                className="font-heading font-semibold text-foreground/80 mb-1.5 block text-sm"
              >
                Confirm Password
              </Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="rounded-xl border-border bg-secondary/50 text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <Button
              type="submit"
              disabled={isLoggingIn}
              data-ocid="signin.submit.button"
              className="w-full bg-accent text-accent-foreground font-display font-bold py-3 rounded-xl pink-glow hover:scale-105 transition-all"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account 🌟"
              )}
            </Button>
          </motion.form>
        )}

        {/* Login status message */}
        {loginStatus === "loginError" && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-center text-sm text-destructive font-body"
          >
            Login failed. Please try again.
          </motion.p>
        )}

        {isLoginSuccess && !isLoggedIn && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-center text-sm text-green-400 font-body"
          >
            ✓ Signed in successfully!
          </motion.p>
        )}
      </div>

      {/* Fun disclaimer */}
      <p className="text-center mt-6 font-body text-foreground/40 text-xs">
        🌿 Your account is secured with Internet Identity technology 🌿
      </p>
    </div>
  );
}
