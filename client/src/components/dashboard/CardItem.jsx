import { Pencil, Trash2 } from 'lucide-react'

function CardItem({ item, viewMode }) {
  if (viewMode === 'list') {
    return (
      <article className="group flex items-center gap-4 rounded-xl border border-slate-700 bg-slate-800/80 p-3 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_14px_30px_-14px_rgba(99,102,241,0.55)]">
        <div className={`relative h-24 w-32 overflow-hidden rounded-lg bg-gradient-to-br ${item.gradient}`}>
          <div className="absolute inset-0 bg-black/0 transition-colors duration-200 group-hover:bg-black/35" />
          <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <button
              type="button"
              className="rounded-lg bg-slate-900/80 p-2 text-slate-100 transition-colors hover:bg-slate-800"
            >
              <Pencil size={16} />
            </button>
            <button
              type="button"
              className="rounded-lg bg-slate-900/80 p-2 text-rose-300 transition-colors hover:bg-rose-500/20"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold text-slate-100">{item.name}</h3>
          <p className="mt-1 text-sm text-slate-400">{item.type}</p>
          <p className="mt-0.5 text-xs text-slate-500">{item.updatedAt}</p>
        </div>
      </article>
    )
  }

  return (
    <article className="group rounded-xl border border-slate-700 bg-slate-800/75 p-3 transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[0_20px_34px_-18px_rgba(99,102,241,0.68)]">
      <div className={`relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br ${item.gradient}`}>
        <div className="absolute inset-0 bg-black/0 transition-colors duration-200 group-hover:bg-black/45" />
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <button
            type="button"
            className="rounded-lg bg-slate-900/80 p-2 text-slate-100 transition-colors hover:bg-slate-800"
            aria-label="Edit item"
          >
            <Pencil size={17} />
          </button>
          <button
            type="button"
            className="rounded-lg bg-slate-900/80 p-2 text-rose-300 transition-colors hover:bg-rose-500/20"
            aria-label="Delete item"
          >
            <Trash2 size={17} />
          </button>
        </div>
      </div>

      <div className="pt-3">
        <h3 className="truncate text-base font-semibold text-slate-100">{item.name}</h3>
        <p className="mt-1 text-sm text-slate-400">{item.type}</p>
        <p className="mt-0.5 text-xs text-slate-500">{item.updatedAt}</p>
      </div>
    </article>
  )
}

export default CardItem