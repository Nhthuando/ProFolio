import { Search, Sparkles } from 'lucide-react'

function HeroSection({ activeTab, setActiveTab, searchInput, setSearchInput }) {
  return (
    <section
      className="animate-hero rounded-3xl border border-slate-700/70 px-6 py-10 md:px-10"
      style={{
        background:
          'linear-gradient(130deg, rgba(15,23,42,0.95) 0%, rgba(30,35,64,0.95) 50%, rgba(15,23,42,0.95) 100%)',
      }}
    >
      <div className="mb-10 flex items-center gap-2 text-slate-300">
        <Sparkles size={17} className="text-indigo-400" />
        <span className="text-sm font-semibold tracking-wide">ProFolio</span>
      </div>

      <h1 className="text-center text-3xl font-extrabold tracking-tight text-slate-100 md:text-5xl">
        <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
          Bạn muốn sáng tạo nội dung gì?
        </span>
      </h1>

      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => setActiveTab('design')}
          className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
            activeTab === 'design'
              ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          Thiết kế của bạn
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('templates')}
          className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
            activeTab === 'templates'
              ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          Mẫu
        </button>
      </div>

      <label className="mx-auto mt-8 flex max-w-4xl items-center gap-3 rounded-2xl border border-slate-700 bg-slate-800 px-5 py-4 transition-colors duration-200 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/35">
        <Search size={20} className="text-slate-400" />
        <input
          type="text"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          placeholder="Search for..."
          className="w-full bg-transparent text-base text-slate-100 outline-none placeholder:text-slate-400"
        />
      </label>
    </section>
  )
}

export default HeroSection