    import { Bell, FolderKanban, House, Palette, Plus, Square, UserCircle2 } from 'lucide-react'

    const menuItems = [
    { id: 'home', label: 'Trang chủ', icon: House, active: true },
    { id: 'projects', label: 'Dự Án', icon: FolderKanban, active: false },
    { id: 'templates', label: 'Mẫu', icon: Palette, active: false },
    { id: 'contacts', label: 'Thông báo', icon: Bell, active: false },
    ]

    function Sidebar({ currentUser }) {
    const userInitial = currentUser.name?.charAt(0)?.toUpperCase() || 'U'

    return (
        <aside className="w-full border-b border-slate-700 bg-slate-800 md:fixed md:inset-y-0 md:left-0 md:w-72 md:border-b-0 md:border-r">
        <div className="flex h-full flex-col px-5 py-6">
            <div className="flex items-center gap-3 text-slate-100">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-700">
                <Square size={19} />
            </div>
            <span className="text-2xl font-extrabold tracking-tight">ProFolio</span>
            </div>

            <button
            type="button"
            className="mt-7 inline-flex items-center gap-2 self-start rounded-xl bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-400"
            >
            <Plus size={18} />
            Tạo
            </button>

            <div className="my-5 h-px bg-slate-700" />

            <nav className="flex gap-2 overflow-x-auto pb-2 md:flex-col md:overflow-visible md:pb-0">
            {/* eslint-disable-next-line no-unused-vars */}
            {menuItems.map(({ id, label, icon: Icon, active }) => (
                <button
                key={id}
                type="button"
                className={`inline-flex items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-semibold transition-colors duration-200 md:w-full ${
                    active
                    ? 'bg-indigo-500/15 text-indigo-400'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-slate-100'
                }`}
                >
                <Icon size={18} />
                <span className="whitespace-nowrap">{label}</span>
                </button>
            ))}
            </nav>

            <div className="mt-4 md:mt-auto">
            <button
                type="button"
                className="flex w-full items-center gap-3 rounded-xl bg-slate-700/60 px-3 py-2.5 text-left text-slate-100 transition-colors duration-200 hover:bg-slate-700"
            >
                {currentUser.avatar ? (
                <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="h-10 w-10 rounded-full object-cover"
                />
                ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/20 text-sm font-bold text-indigo-300">
                    {userInitial}
                </div>
                )}

                <div className="min-w-0">
                <div className="truncate text-sm font-semibold">{currentUser.name}</div>
                <div className="flex items-center gap-1 text-xs text-slate-400">
                    <UserCircle2 size={14} />
                    Tài khoản
                </div>
                </div>
            </button>
            </div>
        </div>
        </aside>
    )
    }

    export default Sidebar