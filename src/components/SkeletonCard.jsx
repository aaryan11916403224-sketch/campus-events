export default function SkeletonCard({ featured = false }) {
  return (
    <div className={`overflow-hidden rounded-[28px] border border-line bg-surface ${featured ? 'sm:col-span-2' : ''}`}>
      <div className={`skeleton rounded-none ${featured ? 'h-56 sm:h-64' : 'h-44'}`} />
      <div className="space-y-3 p-6">
        <div className="skeleton h-3 w-2/5" />
        <div className="skeleton h-6 w-4/5" />
        <div className="skeleton h-3.5 w-3/5" />
        <div className="skeleton h-3.5 w-full" />
        <div className="flex items-center justify-between pt-3">
          <div className="skeleton h-3.5 w-20" />
          <div className="skeleton h-10 w-28 rounded-full" />
        </div>
      </div>
    </div>
  )
}
