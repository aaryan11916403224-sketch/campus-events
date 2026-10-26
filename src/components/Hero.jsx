export default function Hero({ eventCount, categoryCount }) {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.14),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.22),transparent_60%)]" />
      <div className="mx-auto max-w-6xl px-4 pt-14 pb-10 sm:px-6 sm:pt-20 sm:pb-14">
        <div className="anim-fade-up max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3.5 py-1.5 text-xs font-semibold text-indigo-600 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-500" />
            TechSpace · USICT, GGSIPU
          </span>

          <h1 className="mt-5 font-display text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
            Find your next{' '}
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              campus event
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-base text-slate-600 sm:text-lg dark:text-slate-300">
            Hackathons, workshops, expos, esports and more — everything happening at USICT in one
            place. Filter by category, save what you like, and never miss out again.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#events"
              className="rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:-translate-y-0.5 hover:bg-indigo-600"
            >
              Browse events
            </a>
            <a
              href="#about"
              className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-indigo-400 hover:text-indigo-500 dark:border-slate-700 dark:text-slate-200"
            >
              How it works
            </a>
          </div>

          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">Live events</dt>
              <dd className="font-display text-2xl font-bold">{eventCount}+</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">Categories</dt>
              <dd className="font-display text-2xl font-bold">{categoryCount}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">Entry cost</dt>
              <dd className="font-display text-2xl font-bold">From free</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
