export default function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(window.location.hostname);

  return (
    <footer className="border-t border-border bg-card/50 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6 mb-6 text-center md:text-left">
          {/* Brand */}
          <div>
            <h3 className="font-display font-black text-xl text-foreground mb-2">
              Rackson<span className="text-accent">Rack</span>OnRacks
            </h3>
            <p className="font-body text-foreground/60 text-sm">
              Founded by Kissel Guzman.
            </p>
          </div>

          {/* Links */}
          <div className="text-center">
            <h4 className="font-heading font-bold text-foreground/80 text-sm mb-2 uppercase tracking-wider">
              Quick Links
            </h4>
            <div className="flex flex-col gap-1">
              {["Home", "Virtual Shopping", "Support"].map((label) => (
                <span
                  key={label}
                  className="font-body text-sm text-foreground/50"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Vendor Event */}
          <div className="text-center md:text-right">
            <h4 className="font-heading font-bold text-foreground/80 text-sm mb-2 uppercase tracking-wider">
              📍 Vendor Event
            </h4>
            <p className="font-body text-sm text-foreground/60">
              March 7, 2026
              <br />
              Los Angeles, CA
              <br />
              5:00AM – 5:30PM
            </p>
          </div>
        </div>

        <div className="border-t border-border pt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-body text-foreground/40 text-sm">
            © {year} RacksonRackOnRacks. All rights reserved.
          </p>
          <p className="font-body text-foreground/30 text-xs">
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground/60 transition-colors underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
