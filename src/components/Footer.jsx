export default function Footer() {
  return (
    <footer id="about" className="mt-16 border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 font-display text-lg font-bold text-white">
                E
              </span>
              <span className="font-display text-lg font-bold tracking-tight">
                Campus<span className="text-indigo-500">Events</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              A single place to discover every tech, cultural and gaming event happening at USICT,
              GGSIPU — built for students, by students.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">How it works</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-600 dark:text-slate-300">
              <li>1. Browse or search upcoming events</li>
              <li>2. Filter by category that interests you</li>
              <li>3. Bookmark events to revisit them later</li>
              <li>4. Open details and register in one tap</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Tech stack</h4>
            <div className="mt-4 flex flex-wrap gap-2">
              {['React 19', 'Vite', 'Tailwind CSS', 'LocalStorage'].map((tech) => (
                <span key={tech} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  {tech}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              Event data served from a local JSON file. No backend, no tracking.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row dark:border-slate-800">
          <p>© 2026 CampusEvents · TechSpace, USICT GGSIPU</p>
          <p>Frontend recruitment project · Built with React + Tailwind CSS</p>
        </div>
      </div>
    </footer>
  )
}
