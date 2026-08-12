export default function Footer() {
  return (
    <footer className="rounded-[2rem] border border-line bg-ink px-6 py-10 text-white shadow-xl shadow-black/20 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-lg">
            <p className="text-lg font-display font-semibold text-gold">Artistic Fine Art</p>
            <p className="mt-3 max-w-sm text-sm text-white/70">
              Rare gems & minerals — sourced from Pakistan and beyond.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-gold">Quick Links</p>
              <div className="mt-4 space-y-3 text-sm text-white/70">
                <a href="#home" className="block hover:text-gold">Home</a>
                <a href="#products" className="block hover:text-gold">Collection</a>
                <a href="#about" className="block hover:text-gold">About</a>
                <a href="#contact" className="block hover:text-gold">Contact</a>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-gold">Media</p>
              <div className="mt-4 space-y-3 text-sm text-white/70">
                <a href="#videos" className="block hover:text-gold">
                  Video Gallery
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-line pt-8 text-sm text-white/60">
          <p>© 2026 Artistic Fine Art. All Rights Reserved.</p>
          <p className="mt-3">All specimens are 100% natural and untreated.</p>
        </div>
      </div>
    </footer>
  );
}
