import Button from './ui/Button'

export default function Hero({ eventCount, categoryCount, featuredEvent }) {
  return (
    <section className="relative overflow-hidden">
      <div className="blob pointer-events-none absolute -right-24 -top-20 h-[420px] w-[420px] bg-accent-soft/80 blur-[2px] dark:bg-accent-soft/30" aria-hidden="true" />
      <div className="blob pointer-events-none absolute -left-32 top-40 h-[320px] w-[320px] bg-amber-soft/70 dark:bg-amber-soft/20" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-5 pb-14 pt-14 sm:px-8 sm:pb-20 sm:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="anim-fade-up">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-accent">
              Autumn–Winter 2026 · On campus
            </p>
            <h1 className="mt-4 font-display text-[42px] font-semibold leading-[1.04] tracking-tight sm:text-6xl lg:text-[64px]">
              Find your <em className="font-normal italic text-accent">next</em> reason to leave your room.
            </h1>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-ink-soft">
              Hackathons, workshops, expos, esports and campus traditions — gathered in one calm place.
              Search it, filter it, save it, and register before the seats go.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button size="lg" onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}>
                Browse events
              </Button>
              <Button size="lg" variant="outline" onClick={() => document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' })}>
                See featured
              </Button>
            </div>

            <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-5">
              {[
                { label: 'Live events', value: `${eventCount}` },
                { label: 'Categories', value: `${categoryCount}` },
                { label: 'Seats released', value: '1,500+' },
              ].map((stat) => (
                <div key={stat.label}>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-soft">{stat.label}</dt>
                  <dd className="mt-1 font-display text-3xl font-semibold">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {featuredEvent && (
            <aside className="anim-fade-up relative" style={{ animationDelay: '120ms' }}>
              <div className="rounded-[32px] border border-line bg-surface p-3 shadow-[0_24px_60px_rgba(34,30,27,0.10)]">
                <div className={`cover cover-${featuredEvent.cover} h-52 rounded-[24px]`}>
                  <span className="relative rounded-full bg-white/25 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                    Editor’s pick
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-amber">
                    {featuredEvent.category}
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-semibold leading-snug">{featuredEvent.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{featuredEvent.summary}</p>
                  <a
                    href={`#/event/${featuredEvent.id}`}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent underline decoration-accent/30 underline-offset-4 transition hover:decoration-accent"
                  >
                    View event details
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </a>
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </section>
  )
}
