export default function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="skeleton h-40 rounded-none" />
      <div className="space-y-3 p-5">
        <div className="skeleton h-5 w-3/4" />
        <div className="skeleton h-4 w-1/2" />
        <div className="skeleton h-4 w-2/3" />
        <div className="skeleton h-4 w-full" />
        <div className="flex justify-between pt-2">
          <div className="skeleton h-4 w-16" />
          <div className="skeleton h-9 w-28 rounded-full" />
        </div>
      </div>
    </div>
  )
}
