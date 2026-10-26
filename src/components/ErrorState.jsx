import Button from './ui/Button'
import Icon from './ui/Icon'

export default function ErrorState({ title = 'Could not load events', message, onRetry }) {
  return (
    <div className="anim-fade-in flex flex-col items-center rounded-[32px] border border-line bg-surface px-6 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-danger-soft text-danger">
        <Icon name="alert" className="h-8 w-8" />
      </div>
      <h3 className="mt-5 font-display text-2xl font-semibold">{title}</h3>
      <p className="mt-2.5 max-w-md text-sm leading-relaxed text-ink-soft">
        {message ??
          'Something went wrong while loading the event catalogue. This is usually a temporary network issue.'}
      </p>
      {onRetry && (
        <Button variant="primary" size="lg" className="mt-7" onClick={onRetry}>
          <Icon name="refresh" className="h-4.5 w-4.5" />
          Try again
        </Button>
      )}
    </div>
  )
}
