import Button from './ui/Button'
import Icon from './ui/Icon'

export default function Navbar({ dark, onToggleTheme, savedCount, onShowSaved }) {
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-page/85 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#/" className="group flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-ink text-page">
            <Icon name="compass" className="h-5 w-5" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-[19px] font-semibold tracking-tight">
              Campus<span className="italic text-accent">Events</span>
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
              TechSpace · USICT
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 text-sm font-medium text-ink-soft md:flex">
          <a className="transition-colors hover:text-ink" href="#/">Discover</a>
          <a className="transition-colors hover:text-ink" href="#/#featured">Featured</a>
          <a className="transition-colors hover:text-ink" href="#/#about">About</a>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onShowSaved} aria-label={`Show bookmarked events (${savedCount})`}>
            <Icon name="bookmark" className="h-4 w-4" fill={savedCount ? 'currentColor' : 'none'} />
            <span className="hidden sm:inline">Saved</span>
            <span className="rounded-full bg-accent-soft px-1.5 text-xs font-bold text-accent">{savedCount}</span>
          </Button>
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition hover:border-ink/30 hover:bg-page-deep/50"
          >
            <Icon name={dark ? 'sun' : 'moon'} className="h-[18px] w-[18px]" />
          </button>
        </div>
      </div>
    </header>
  )
}
