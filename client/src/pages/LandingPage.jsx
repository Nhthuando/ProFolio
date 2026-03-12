import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Facebook,
  Instagram,
  LayoutTemplate,
  Link2,
  Menu,
  RefreshCw,
  Search,
  Star,
  Twitter,
  Wand2,
  X,
} from 'lucide-react'

/* ─── Scroll animation hook ─── */
function useScrollAnimations() {
  useEffect(() => {
    const els = document.querySelectorAll('.scroll-animate')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/* ─── Navbar ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Top Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'About Us', href: '#why' },
    { label: 'Register', href: '#register' },
  ]

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/5 bg-slate-950/90 shadow-lg shadow-black/30 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="text-xl font-bold">
          <span className="text-white">Pro</span><span className="text-indigo-400">Folio</span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-sm font-medium text-slate-400 transition-colors hover:text-white"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="hidden rounded-full border border-indigo-500/40 px-5 py-2 text-sm font-medium text-indigo-300 transition-all hover:border-indigo-400 hover:bg-indigo-500/10 hover:text-white sm:inline-flex"
          >
            Login
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="rounded-lg p-2 text-slate-400 transition-colors hover:text-white md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-white/5 bg-slate-950/95 px-6 py-4 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-4">
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-sm font-medium text-slate-400 transition-colors hover:text-white"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
            <Link
              to="/login"
              className="mt-2 w-fit rounded-full border border-indigo-500/40 px-5 py-2 text-sm font-medium text-indigo-300"
            >
              Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

/* ─── Hero Section ─── */
function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-slate-950 pt-20"
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)',
      }}
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(99,102,241,0.25),transparent)]" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      {/* Floating blobs */}
      <div className="absolute left-1/4 top-1/4 h-80 w-80 rounded-full bg-indigo-600/10 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 lg:grid-cols-2 lg:py-32">
        {/* Left */}
        <div className="scroll-animate space-y-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm font-semibold text-indigo-300">
            ✦ Build your brand in minutes
          </span>
          <h1 className="text-5xl font-extrabold leading-[1.1] tracking-tight text-white lg:text-6xl xl:text-7xl">
            Create a Portfolio
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              That Gets You Hired.
            </span>
          </h1>
          <p className="max-w-lg text-lg leading-relaxed text-slate-400">
            Build a stunning professional portfolio in minutes — no code needed. Showcase your
            skills, projects, and experience to land your dream job.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/register"
              className="rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/40"
            >
              Get Started — It&apos;s Free
            </Link>
            <a
              href="#features"
              className="rounded-full border border-slate-700 px-8 py-3.5 text-base font-semibold text-slate-300 transition-all hover:border-slate-500 hover:text-white"
            >
              See Features
            </a>
          </div>
          <p className="text-sm text-slate-600">No credit card required · Free forever plan</p>
        </div>

        {/* Right: Dashboard mockup */}
        <div className="scroll-animate scroll-animate-delay-2">
          <div
            className="relative rounded-2xl border border-white/10 p-1 shadow-2xl"
            style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(59,130,246,0.1))' }}
          >
            <div className="rounded-xl bg-slate-900 p-5">
              {/* Mock top bar */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-rose-500" />
                  <div className="h-3 w-3 rounded-full bg-amber-500" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500" />
                </div>
                <div className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-500">
                  profolio.io/username
                </div>
                <div className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-medium text-emerald-400">
                  Live
                </div>
              </div>
              {/* Mock content */}
              <div className="space-y-3">
                <div className="h-10 rounded-lg bg-gradient-to-r from-indigo-600/40 to-blue-600/30" />
                <div className="grid grid-cols-3 gap-3">
                  {['Projects', 'Skills', 'Experience'].map((label) => (
                    <div key={label} className="rounded-lg bg-slate-800 p-3">
                      <div className="mb-1 h-2 w-8 rounded bg-slate-700" />
                      <div className="text-lg font-bold text-white">
                        {label === 'Projects' ? '12' : label === 'Skills' ? '24' : '3y'}
                      </div>
                      <div className="text-xs text-slate-500">{label}</div>
                    </div>
                  ))}
                </div>
                <div className="h-32 rounded-lg bg-gradient-to-br from-indigo-900/50 to-blue-900/30 p-4">
                  <div className="mb-2 text-xs font-medium text-slate-400">Featured Projects</div>
                  {[1, 2].map((i) => (
                    <div key={i} className="mb-2 flex items-center gap-3">
                      <div className="h-7 w-7 flex-shrink-0 rounded bg-indigo-600/40" />
                      <div className="flex-1 space-y-1">
                        <div className="h-2 w-24 rounded bg-slate-700" />
                        <div className="h-1.5 w-16 rounded bg-slate-800" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {['JS', 'TS', 'React', 'Node', 'SQL'].map((s) => (
                    <div
                      key={s}
                      className="rounded-md bg-indigo-600/20 py-1 text-center text-xs font-medium text-indigo-300"
                    >
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 60L1440 60L1440 0C1200 40 900 60 720 60C540 60 240 40 0 0L0 60Z" fill="#0f172a" />
        </svg>
      </div>
    </section>
  )
}

/* ─── Features Section ─── */
const FEATURES = [
  {
    icon: Wand2,
    title: 'Easy to Build',
    desc: 'Create a professional portfolio in just a few minutes — no coding knowledge required. Intuitive drag-and-drop editor guides you every step.',
    color: 'from-violet-500 to-indigo-500',
    glow: 'group-hover:shadow-indigo-500/25',
  },
  {
    icon: LayoutTemplate,
    title: 'Custom Themes',
    desc: 'Choose from dozens of expertly-designed templates. Fully customize colors, fonts, and layout to match your personal brand perfectly.',
    color: 'from-blue-500 to-cyan-500',
    glow: 'group-hover:shadow-cyan-500/25',
  },
  {
    icon: Link2,
    title: 'Share Instantly',
    desc: 'Get a unique link to your portfolio and share it with recruiters instantly. One click — your work is visible to anyone, anywhere.',
    color: 'from-emerald-500 to-teal-500',
    glow: 'group-hover:shadow-emerald-500/25',
  },
]

function FeaturesSection() {
  return (
    <section id="features" className="bg-slate-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="scroll-animate mb-16 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-indigo-400">
            Why us
          </p>
          <h2 className="text-4xl font-extrabold text-white lg:text-5xl">OUR FEATURES</h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500" />
          <p className="mx-auto mt-5 max-w-xl text-lg text-slate-400">
            Everything you need to build a portfolio that truly stands out in the crowd.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* eslint-disable-next-line no-unused-vars */}
          {FEATURES.map(({ icon: Icon, title, desc, color, glow }, i) => (
            <div
              key={title}
              className={`scroll-animate group scroll-animate-delay-${i + 1} relative overflow-hidden rounded-2xl border border-white/5 bg-slate-900 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-white/10 hover:shadow-xl ${glow}`}
            >
              <div
                className={`mb-5 inline-flex rounded-xl bg-gradient-to-br p-3 ${color}`}
              >
                <Icon size={24} className="text-white" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-white">{title}</h3>
              <p className="text-slate-400 leading-relaxed">{desc}</p>
              <div
                className={`absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br ${color}`}
                style={{ opacity: 0.04 }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Pricing Section ─── */
const PLANS = [
  {
    name: 'Starter',
    monthlyPrice: 0,
    yearlyPrice: 0,
    desc: 'Perfect for getting started',
    features: ['1 Portfolio', 'Up to 5 Projects', 'Skills section', 'Basic templates', 'profolio.io subdomain'],
    cta: 'Get Started Free',
    highlight: false,
  },
  {
    name: 'Pro',
    monthlyPrice: 9,
    yearlyPrice: 7,
    desc: 'For serious job seekers',
    badge: 'Most Popular',
    features: [
      'Everything in Starter',
      'Unlimited projects',
      'Custom themes & colors',
      'Custom domain support',
      'Portfolio analytics',
      'Priority email support',
    ],
    cta: 'Start Pro',
    highlight: true,
  },
  {
    name: 'Enterprise',
    monthlyPrice: 29,
    yearlyPrice: 23,
    desc: 'For teams & agencies',
    features: [
      'Everything in Pro',
      'Unlimited portfolios',
      'White-label branding',
      'Priority phone support',
      'API access',
      'Dedicated account manager',
    ],
    cta: 'Contact Sales',
    highlight: false,
  },
]

function PricingSection() {
  const [yearly, setYearly] = useState(false)

  return (
    <section id="pricing" className="bg-[#0a0f1e] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="scroll-animate mb-12 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-indigo-400">
            Simple pricing
          </p>
          <h2 className="text-4xl font-extrabold text-white lg:text-5xl">PRICING</h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500" />
          <p className="mx-auto mt-5 max-w-xl text-lg text-slate-400">
            Start free, scale as you grow. No hidden fees.
          </p>

          {/* Tab switch */}
          <div className="mt-8 inline-flex items-center gap-1 rounded-full border border-white/10 bg-slate-900 p-1">
            <button
              type="button"
              onClick={() => setYearly(false)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${!yearly ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setYearly(true)}
              className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all ${yearly ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              Yearly
              <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs text-emerald-400">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid items-center gap-6 md:grid-cols-3">
          {PLANS.map(({ name, monthlyPrice, yearlyPrice, desc, badge, features, cta, highlight }, i) => (
            <div
              key={name}
              className={`scroll-animate scroll-animate-delay-${i + 1} relative flex flex-col rounded-2xl border p-8 transition-all duration-300 ${
                highlight
                  ? 'scale-105 border-indigo-500/50 bg-gradient-to-b from-indigo-900/40 to-slate-900 shadow-xl shadow-indigo-500/20'
                  : 'border-white/5 bg-slate-900 hover:-translate-y-1 hover:border-white/10'
              }`}
            >
              {badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-indigo-600 px-4 py-1 text-xs font-bold text-white shadow-lg shadow-indigo-500/40">
                    {badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="mb-1 text-lg font-bold text-white">{name}</h3>
                <p className="text-sm text-slate-500">{desc}</p>
                <div className="mt-4 flex items-end gap-1">
                  <span className="text-5xl font-extrabold text-white">
                    ${yearly ? yearlyPrice : monthlyPrice}
                  </span>
                  <span className="mb-2 text-slate-500">/month</span>
                </div>
                {yearly && yearlyPrice > 0 && (
                  <p className="mt-1 text-xs text-slate-500">Billed ${yearlyPrice * 12}/year</p>
                )}
              </div>

              <ul className="mb-8 flex-1 space-y-3">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-400">
                    <CheckCircle2
                      size={16}
                      className={`mt-0.5 flex-shrink-0 ${highlight ? 'text-indigo-400' : 'text-slate-600'}`}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                to="/register"
                className={`block w-full rounded-full py-3 text-center text-sm font-bold transition-all duration-300 ${
                  highlight
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 hover:bg-indigo-500 hover:shadow-xl'
                    : 'border border-white/10 text-slate-300 hover:border-white/30 hover:text-white'
                }`}
              >
                {cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            type="button"
            className="text-sm font-medium text-indigo-400 transition-colors hover:text-indigo-300 underline underline-offset-4"
          >
            Show more options
          </button>
        </div>
      </div>
    </section>
  )
}

/* ─── Why Choose Us ─── */
const STRENGTHS = [
  {
    icon: LayoutTemplate,
    title: 'Professional Templates',
    desc: 'Dozens of beautiful templates designed by professionals, optimised for every industry and role.',
  },
  {
    icon: Search,
    title: 'SEO Optimized',
    desc: 'Every portfolio is built with SEO best practices so recruiters and clients can find you on Google.',
  },
  {
    icon: RefreshCw,
    title: 'Always Up to Date',
    desc: 'Update your content any time, in real-time. Changes are instantly live — no redeploy needed.',
  },
]

function WhySection() {
  return (
    <section id="why" className="bg-slate-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="scroll-animate mb-16 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-indigo-400">Our advantages</p>
          <h2 className="text-4xl font-extrabold text-white lg:text-5xl">WHY CHOOSE US?</h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500" />
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: main mockup */}
          <div className="scroll-animate">
            <div
              className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/50"
              style={{ background: 'linear-gradient(135deg, #1e3a5f, #0f172a)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-transparent" />
              <div className="relative p-8">
                {/* Mock portfolio card */}
                <div className="mb-6 flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-indigo-400 to-blue-500" />
                  <div>
                    <div className="mb-1 h-4 w-32 rounded bg-white/20" />
                    <div className="h-3 w-24 rounded bg-white/10" />
                  </div>
                </div>
                <div className="mb-4 space-y-2">
                  <div className="h-3 w-full rounded bg-white/10" />
                  <div className="h-3 w-4/5 rounded bg-white/10" />
                  <div className="h-3 w-3/5 rounded bg-white/10" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="aspect-video rounded-lg bg-gradient-to-br from-indigo-900/60 to-blue-900/40" />
                  ))}
                </div>
                <div className="mt-4 flex gap-2">
                  {['React', 'Node.js', 'Python', 'SQL'].map((tag) => (
                    <span key={tag} className="rounded-full bg-indigo-600/30 px-2 py-0.5 text-xs text-indigo-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: list */}
          <div className="space-y-8">
            {/* eslint-disable-next-line no-unused-vars */}
            {STRENGTHS.map(({ icon: Icon, title, desc }, i) => (
              <div
                key={title}
                className={`scroll-animate scroll-animate-delay-${i + 1} flex items-start gap-5`}
              >
                <div className="flex-shrink-0 rounded-xl bg-indigo-600/20 p-3 ring-1 ring-indigo-500/30">
                  <Icon size={22} className="text-indigo-400" />
                </div>
                <div>
                  <h3 className="mb-1.5 text-lg font-bold text-white">{title}</h3>
                  <p className="leading-relaxed text-slate-400">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom two mockups */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {[
            { from: 'from-violet-900/50', to: 'to-indigo-900/30', label: 'Mobile View' },
            { from: 'from-blue-900/50', to: 'to-cyan-900/30', label: 'Analytics Dashboard' },
          ].map(({ from, to, label }) => (
            <div
              key={label}
              className="scroll-animate overflow-hidden rounded-2xl border border-white/5"
            >
              <div className={`bg-gradient-to-br ${from} ${to} p-10`}>
                <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
                  {label}
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-3/4 rounded bg-white/10" />
                  <div className="h-3 w-1/2 rounded bg-white/5" />
                </div>
                <div className="mt-6 grid grid-cols-4 gap-2">
                  {[...Array(8)].map((_, j) => (
                    <div
                      key={j}
                      className="rounded bg-white/5"
                      style={{ height: `${20 + Math.sin(j * 1.5) * 10 + 10}px` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Testimonials ─── */
const TESTIMONIALS = [
  {
    name: 'Sarah Johnson',
    role: 'Frontend Developer',
    avatar: 'SJ',
    rating: 5,
    text: 'I landed 3 interviews within a week of launching my portfolio. The templates are stunning and the setup took less than 20 minutes!',
  },
  {
    name: 'Marcus Chen',
    role: 'UX Designer',
    avatar: 'MC',
    rating: 5,
    text: 'The custom theme feature is incredible. My portfolio looks exactly like my brand. Recruiters always comment on how polished it looks.',
  },
  {
    name: 'Priya Patel',
    role: 'Full Stack Developer',
    avatar: 'PP',
    rating: 4,
    text: 'Best investment I made in my career. The SEO features helped me get discovered organically. Already at my dream company!',
  },
]

function TestimonialsSection() {
  const [active, setActive] = useState(0)
  const total = TESTIMONIALS.length

  return (
    <section className="bg-[#0a0f1e] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="scroll-animate mb-16 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-indigo-400">
            Social proof
          </p>
          <h2 className="text-4xl font-extrabold text-white lg:text-5xl">
            TRUSTED AND USED BY THOUSANDS
            <br />
            OF CUSTOMERS
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500" />
        </div>

        <div className="scroll-animate grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map(({ name, role, avatar, rating, text }, i) => (
            <div
              key={name}
              className={`group relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                i === active
                  ? 'border-indigo-500/40 bg-gradient-to-b from-indigo-900/30 to-slate-900 shadow-lg shadow-indigo-500/10'
                  : 'border-white/5 bg-slate-900 hover:border-white/10'
              }`}
              onClick={() => setActive(i)}
              role="button"
              tabIndex={0}
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 text-sm font-bold text-white">
                  {avatar}
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{name}</div>
                  <div className="text-xs text-slate-500">{role}</div>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      size={12}
                      className={j < rating ? 'fill-amber-400 text-amber-400' : 'text-slate-700'}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm leading-relaxed text-slate-400">&ldquo;{text}&rdquo;</p>
            </div>
          ))}
        </div>

        {/* Dots + arrows */}
        <div className="mt-10 flex items-center justify-between">
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                className={`h-2 rounded-full transition-all ${i === active ? 'w-8 bg-indigo-500' : 'w-2 bg-slate-700 hover:bg-slate-600'}`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setActive((a) => (a - 1 + total) % total)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-all hover:border-indigo-500/50 hover:bg-indigo-600/10 hover:text-white"
              aria-label="Previous"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => setActive((a) => (a + 1) % total)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-all hover:border-indigo-500/50 hover:bg-indigo-600/10 hover:text-white"
              aria-label="Next"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Footer ─── */
const FOOTER_LINKS = {
  About: ['About Us', 'Careers', 'Blog'],
  Community: ['Forum', 'Events', 'Help Center'],
  Socials: ['Twitter', 'LinkedIn', 'GitHub'],
}

function Footer() {
  return (
    <footer className="border-t border-white/5 bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="text-2xl font-bold">
              <span className="text-white">Pro</span><span className="text-indigo-400">Folio</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-500">
              The easiest way to create a professional portfolio and get hired faster.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Facebook, name: 'facebook', href: '#' },
                { Icon: Twitter, name: 'twitter', href: '#' },
                { Icon: Instagram, name: 'instagram', href: '#' },
              ].map(({ Icon, name, href }) => ( // eslint-disable-line no-unused-vars
                <a
                  key={name}
                  href={href}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-500 transition-all hover:border-indigo-500/50 hover:bg-indigo-600/10 hover:text-indigo-400"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-300">
                {heading}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-slate-500 transition-colors hover:text-indigo-400"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 px-6 py-5">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
          <span>©2026 By NgoHuuThuan. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-slate-400">
              Privacy &amp; Policy
            </a>
            <a href="#" className="transition-colors hover:text-slate-400">
              Terms &amp; Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ─── Page ─── */
function LandingPage() {
  useScrollAnimations()

  return (
    <div className="bg-slate-950 text-slate-100">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <WhySection />
      <TestimonialsSection />
      <Footer />
    </div>
  )
}

export default LandingPage

