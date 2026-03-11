import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 p-6 dark:bg-slate-950">
      <div className="text-center">
        <h1 className="font-heading text-5xl font-bold text-slate-900 dark:text-white">404</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">Page not found.</p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-full bg-slate-900 px-5 py-2.5 font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg dark:bg-white dark:text-slate-900"
        >
          Back to home
        </Link>
      </div>
    </main>
  )
}

export default NotFoundPage
