import { ArrowDownUp, ChevronDown, List, LayoutGrid } from 'lucide-react'
import CardItem from './CardItem'

function RecentGrid({
  items,
  ownerFilter,
  setOwnerFilter,
  typeFilter,
  setTypeFilter,
  sortDirection,
  setSortDirection,
  viewMode,
  setViewMode,
}) {
  return (
    <section className="mt-12">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-bold text-slate-100">Gần đây</h2>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <select
              value={ownerFilter}
              onChange={(event) => setOwnerFilter(event.target.value)}
              className="appearance-none rounded-lg border border-slate-700 bg-slate-800 py-2 pl-3 pr-9 text-sm text-slate-200 outline-none transition-colors duration-200 focus:border-indigo-500"
            >
              <option value="all">Chủ sở hữu</option>
              <option value="mine">Của tôi</option>
              <option value="team">Nhóm</option>
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>

          <div className="relative">
            <select
              value={typeFilter}
              onChange={(event) => setTypeFilter(event.target.value)}
              className="appearance-none rounded-lg border border-slate-700 bg-slate-800 py-2 pl-3 pr-9 text-sm text-slate-200 outline-none transition-colors duration-200 focus:border-indigo-500"
            >
              <option value="all">Loại</option>
              <option value="Portfolio">Portfolio</option>
              <option value="Project">Project</option>
              <option value="Skills">Skills</option>
              <option value="Experience">Experience</option>
              <option value="Education">Education</option>
              <option value="Social Links">Social Links</option>
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>

          <button
            type="button"
            onClick={() => setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-200 transition-colors duration-200 hover:bg-slate-700"
          >
            <ArrowDownUp size={16} />
            {sortDirection === 'asc' ? 'A-Z' : 'Z-A'}
          </button>

          <button
            type="button"
            onClick={() => setViewMode((prev) => (prev === 'grid' ? 'list' : 'grid'))}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-200 transition-colors duration-200 hover:bg-slate-700"
          >
            {viewMode === 'grid' ? <List size={16} /> : <LayoutGrid size={16} />}
            {viewMode === 'grid' ? 'List' : 'Grid'}
          </button>
        </div>
      </div>

      <div
        className={
          viewMode === 'grid' ? 'grid gap-5 sm:grid-cols-2 xl:grid-cols-3' : 'grid grid-cols-1 gap-3'
        }
      >
        {items.map((item) => (
          <CardItem key={item.id} item={item} viewMode={viewMode} />
        ))}
      </div>

      {items.length === 0 && (
        <div className="mt-6 rounded-xl border border-dashed border-slate-700 bg-slate-900/40 px-4 py-8 text-center text-sm text-slate-400">
          Không có dữ liệu phù hợp với bộ lọc hiện tại.
        </div>
      )}
    </section>
  )
}

export default RecentGrid