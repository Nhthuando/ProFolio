import { ArrowLeft, Facebook, Globe, Mail, X } from 'lucide-react'

function AuthShell({
  mode,
  form,
  onSubmit,
  onToggleMode,
  loading,
  error,
  showPassword,
  onTogglePassword,
  layoutState = 'default',
  onRightInputFocus,
  onLeftEmailClick,
  onCollapse,
  onSignupExpandedSubmit,
  onClose,
}) {
  const isLogin = mode === 'login'
  const isDefault = layoutState === 'default'
  const isLoginExpanded = layoutState === 'login-expanded'
  const isSignupExpanded = layoutState === 'signup-expanded'
  const isExpanded = isLoginExpanded || isSignupExpanded

  const leftColumnClass = [
    'overflow-hidden transition-all duration-[360ms] ease-out dark:border-slate-700/60',
    isDefault
      ? 'max-h-[800px] opacity-100 p-8 border-b border-slate-200/70 lg:border-b-0 lg:border-r lg:basis-1/2 lg:translate-x-0'
      : '',
    isLoginExpanded
      ? 'max-h-0 p-0 border-0 pointer-events-none opacity-0 lg:basis-0 lg:-translate-x-8'
      : '',
    isSignupExpanded
      ? 'max-h-[800px] opacity-100 p-8 border-b border-slate-200/70 lg:border-b-0 lg:border-r-0 lg:basis-full lg:translate-x-0'
      : '',
  ].join(' ')

  const rightColumnClass = [
    'overflow-hidden transition-all duration-[360ms] ease-out',
    isDefault
      ? 'max-h-[800px] opacity-100 p-8 lg:basis-1/2 lg:translate-x-0'
      : '',
    isLoginExpanded
      ? 'max-h-[800px] opacity-100 p-8 lg:basis-full lg:translate-x-0'
      : '',
    isSignupExpanded
      ? 'max-h-0 p-0 pointer-events-none opacity-0 lg:basis-0 lg:translate-x-8'
      : '',
  ].join(' ')

  return (
    <div className="auth-bg min-h-screen w-full p-4 sm:p-8">
      <div
        className="auth-card mx-auto max-w-4xl overflow-hidden rounded-3xl border border-white/40 bg-white/90 shadow-2xl shadow-slate-900/15 backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-950/80 dark:shadow-black/40"
      >
        <div className="relative border-b border-slate-200/70 px-6 pb-6 pt-10 text-center dark:border-slate-700/60">
          <button
            type="button"
            onClick={isExpanded ? onCollapse : (onClose || onToggleMode)}
            className="absolute left-6 top-6 flex items-center gap-1.5 rounded-full p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
            aria-label={isExpanded ? 'Go back' : 'Close'}
          >
            {isExpanded ? (
              <>
                <ArrowLeft size={18} />
                <span className="pr-1 text-sm font-medium">Back</span>
              </>
            ) : (
              <X size={18} />
            )}
          </button>

          <div className="mx-auto h-12 w-12 rounded-full bg-slate-300/90 dark:bg-slate-700" />
          <h1 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-slate-700 dark:text-slate-100 sm:text-4xl">
            Your Work, Your Story, Your Portfolio!
          </h1>
        </div>

        <div className="lg:flex">
          <section className={leftColumnClass}>
            <h2 className="mb-6 text-center text-3xl font-semibold text-slate-800 dark:text-slate-100">Sign up</h2>

            {isSignupExpanded && form.renderSignupExpandedFields ? (
              <form className="space-y-5" onSubmit={onSignupExpandedSubmit || onSubmit}>
                {form.renderSignupExpandedFields({ showPassword, onTogglePassword, onFocus: onRightInputFocus })}

                {error ? (
                  <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-600 dark:border-rose-500/40 dark:bg-rose-500/10 dark:text-rose-300">
                    {error}
                  </p>
                ) : null}

                <button
                  disabled={loading}
                  type="submit"
                  className="w-full rounded-full bg-slate-800 px-4 py-3 text-lg font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-900 hover:shadow-lg active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
                >
                  {loading ? 'Processing...' : 'Create account'}
                </button>
              </form>
            ) : (
              <div className="space-y-4">
                <button className="auth-provider-btn" type="button">
                  <Globe size={20} /> Continue with Google
                </button>
                <button className="auth-provider-btn" type="button">
                  <Facebook size={20} /> Continue with Facebook
                </button>
                <button className="auth-provider-btn" type="button" onClick={onLeftEmailClick}>
                  <Mail size={20} /> Sign up with email
                </button>
              </div>
            )}

            <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">
              By signing up, you agree to the Terms of Service and acknowledge you've read our Privacy Policy.
            </p>
          </section>

          <section className={rightColumnClass}>
            <h2 className="mb-6 text-center text-3xl font-semibold text-slate-800 dark:text-slate-100">
              {isLogin ? 'Login' : 'Register'}
            </h2>

            <form className="space-y-5" onSubmit={onSubmit}>
              {form.renderFields({ showPassword, onTogglePassword, onFocus: onRightInputFocus })}

              {error ? (
                <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-600 dark:border-rose-500/40 dark:bg-rose-500/10 dark:text-rose-300">
                  {error}
                </p>
              ) : null}

              <button
                disabled={loading}
                type="submit"
                className="w-full rounded-full bg-slate-800 px-4 py-3 text-lg font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-900 hover:shadow-lg active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
              >
                {loading ? 'Processing...' : isLogin ? 'Sign in' : 'Create account'}
              </button>

              {isLoginExpanded && !isLogin ? (
                <p className="text-center text-sm text-slate-600 dark:text-slate-300">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={onToggleMode}
                    className="font-semibold text-slate-800 underline-offset-2 transition-colors hover:underline dark:text-white"
                  >
                    Sign in
                  </button>
                </p>
              ) : null}
            </form>
          </section>
        </div>

        <div className="border-y border-slate-200/70 py-4 text-center text-sm text-slate-500 dark:border-slate-700/60 dark:text-slate-400">
          English (United States)
        </div>

        <footer className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 py-6 text-xs text-slate-500 dark:text-slate-500">
          <span>About</span>
          <span>Help Center</span>
          <span>Terms of Service</span>
          <span>Privacy Policy</span>
          <span>Cookie Policy</span>
          <span>Careers</span>
          <span>@2026 By NgoHuuThuan</span>
        </footer>
      </div>
    </div>
  )
}

export default AuthShell
