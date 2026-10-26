import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { failed: false, message: '' }
  }

  static getDerivedStateFromError(error) {
    return { failed: true, message: error?.message ?? 'Unexpected error' }
  }

  componentDidCatch(error, info) {
    console.error('App crashed:', error, info?.componentStack)
  }

  render() {
    if (!this.state.failed) return this.props.children
    return (
      <div className="flex min-h-screen items-center justify-center bg-page p-6">
        <div className="w-full max-w-md rounded-[28px] border border-line bg-surface p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-danger-soft text-danger">
            <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 3L2.5 20h19L12 3z" />
              <path d="M12 9.5v4.5M12 17.2v.3" />
            </svg>
          </div>
          <h1 className="mt-5 font-display text-2xl font-semibold">Something went wrong</h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            The page hit an unexpected error and stopped rendering. Your bookmarks and registrations are safe on
            this device — reloading usually fixes it.
          </p>
          <p className="mt-3 rounded-2xl bg-page-deep/60 px-4 py-2.5 text-left font-mono text-xs text-ink-soft">
            {this.state.message}
          </p>
          <div className="mt-6 flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="h-12 rounded-full bg-ink font-semibold text-page transition hover:brightness-110"
            >
              Reload the page
            </button>
            <button
              type="button"
              onClick={() => this.setState({ failed: false, message: '' })}
              className="h-12 rounded-full border border-line font-semibold text-ink transition hover:bg-page-deep/50"
            >
              Try rendering again
            </button>
          </div>
        </div>
      </div>
    )
  }
}
