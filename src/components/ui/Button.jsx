const variants = {
  primary:
    'bg-accent text-white hover:bg-accent-bright focus-visible:outline-accent shadow-[0_6px_20px_rgba(20,107,82,0.18)]',
  secondary:
    'bg-ink text-page hover:bg-ink/85 focus-visible:outline-ink',
  outline:
    'border border-line bg-transparent text-ink hover:border-ink/40 hover:bg-page-deep/50 focus-visible:outline-ink',
  ghost: 'bg-transparent text-ink-soft hover:text-ink hover:bg-page-deep/60 focus-visible:outline-ink',
  danger: 'bg-danger text-white hover:brightness-110 focus-visible:outline-danger',
}

const sizes = {
  sm: 'h-9 px-4 text-[13px]',
  md: 'h-11 px-6 text-sm',
  lg: 'h-13 px-7 text-[15px]',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  disabled = false,
  children,
  ...props
}) {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />
      )}
      {children}
    </button>
  )
}
