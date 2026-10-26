import Button from './ui/Button'
import Icon from './ui/Icon'

export default function EmptyState({ onClear, savedOnly, query }) {
  return (
    <div className="anim-fade-in flex flex-col items-center rounded-[32px] border border-dashed border-line bg-surface/70 px-6 py-16 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-page-deep text-ink-soft">
        <Icon name={savedOnly ? 'bookmark' : 'search'} className="h-9 w-9" />
      </div>
      <h3 className="mt-6 font-display text-2xl font-semibold">
        {savedOnly ? 'Nothing saved here yet' : 'No events match that search'}
      </h3>
      <p className="mt-2.5 max-w-sm text-sm leading-relaxed text-ink-soft">
        {savedOnly
          ? 'Tap the bookmark icon on any event card to keep it here — your saved list stays on this device.'
          : query?.trim()
            ? `We could not find anything for “${query.trim()}”. Try a shorter keyword, a category like “Workshop”, or clear the filters.`
            : 'Try adjusting the category filters to see more events.'}
      </p>
      <Button variant="secondary" size="lg" className="mt-7" onClick={onClear}>
        <Icon name="refresh" className="h-4 w-4" />
        Reset search & filters
      </Button>
    </div>
  )
}
