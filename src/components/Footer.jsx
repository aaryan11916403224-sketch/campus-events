export default function Footer() {
  return (
    <footer id="about" className="mt-20 border-t border-line bg-page-deep/50">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <p className="font-display text-xl font-semibold">
              Campus<span className="italic text-accent">Events</span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">
              A calm, single place to discover every tech, cultural and gaming event at USICT — built for
              students who keep missing announcement posts.
            </p>
          </div>

          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink-soft">How it works</h4>
            <ol className="mt-4 space-y-2.5 text-sm text-ink">
              <li>1 — Search or filter the event list</li>
              <li>2 — Open details: date, venue, seats</li>
              <li>3 — Register with a short form</li>
              <li>4 — Keep the confirmation code handy</li>
            </ol>
          </div>

          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink-soft">Under the hood</h4>
            <div className="mt-4 flex flex-wrap gap-2">
              {['React 19', 'Vite', 'Tailwind CSS', 'LocalStorage'].map((tech) => (
                <span key={tech} className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium text-ink-soft">
                  {tech}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              Event data comes from a local JSON file. Bookmarks and registrations never leave your device —
              no accounts, no tracking.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 text-xs text-ink-soft sm:flex-row sm:items-center">
          <p>© 2026 CampusEvents · TechSpace, USICT GGSIPU</p>
          <p>Frontend recruitment project · Designed with a warm-paper design system</p>
        </div>
      </div>
    </footer>
  )
}
