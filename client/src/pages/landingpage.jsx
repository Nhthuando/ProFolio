    import { useEffect, useState } from 'react'

    function CheckIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
        <path
            d="M5 12.5 9.2 17 19 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        </svg>
    )
    }

    function ArrowRightIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
        <path
            d="M5 12h14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="m13 6 6 6-6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        </svg>
    )
    }

    const featureList = [
    {
        title: 'Tạo portfolio nhanh bằng block',
        description: 'Thêm các section như About, Skills, Projects, Experience theo mẫu gọn và dễ tùy chỉnh.',
    },
    {
        title: 'Chỉnh sửa trực quan theo thời gian thực',
        description: 'Mọi thay đổi hiển thị ngay trên bản xem trước giúp bạn tối ưu nội dung và bố cục dễ hơn.',
    },
    {
        title: 'Lưu trữ tập trung, không thất lạc',
        description: 'Quản lý nhiều phiên bản portfolio trong cùng một nơi để tái sử dụng cho từng cơ hội khác nhau.',
    },
    {
        title: 'Chia sẻ chuyên nghiệp với 1 link',
        description: 'Xuất bản nhanh để gửi cho nhà tuyển dụng, khách hàng hoặc cộng đồng chỉ với một URL.',
    },
    ]

    const quickStats = [
    { label: 'Portfolio đã tạo', value: '12,400+' },
    { label: 'Tỉ lệ hoàn thiện hồ sơ', value: '87%' },
    { label: 'Thời gian tạo trung bình', value: '15 phút' },
    ]

    const flowSteps = [
    {
        step: '01',
        title: 'Chọn template phù hợp',
        description: 'Bắt đầu từ layout sạch và hiện đại, tối ưu cho việc đọc nhanh của recruiter.',
    },
    {
        step: '02',
        title: 'Điền nội dung & chỉnh sửa',
        description: 'Cập nhật dự án, kỹ năng, kinh nghiệm và tinh chỉnh giao diện theo phong cách riêng.',
    },
    {
        step: '03',
        title: 'Lưu trữ & chia sẻ',
        description: 'Lưu nhiều phiên bản hồ sơ và phát hành link portfolio ngay khi bạn sẵn sàng.',
    },
    ]

    const demoSlides = [
    {
        title: 'Template Editor',
        caption: 'Tùy chỉnh bố cục portfolio theo style cá nhân.',
        image:
        'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=1400&q=80',
    },
    {
        title: 'Project Showcase',
        caption: 'Trình bày dự án nổi bật rõ ràng và trực quan.',
        image:
        'https://images.unsplash.com/photo-1482062364825-616fd23b8fc1?auto=format&fit=crop&w=1400&q=80',
    },
    {
        title: 'Analytics & Reach',
        caption: 'Theo dõi lượt xem portfolio và hành vi người xem.',
        image:
        'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1400&q=80',
    },
    ]

    const heroSlides = [
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=80',
    ]

    function LandingPage() {
    const [activeSlide, setActiveSlide] = useState(0)
    const [activeHeroSlide, setActiveHeroSlide] = useState(0)

    useEffect(() => {
        const intervalId = setInterval(() => {
        setActiveSlide((previous) => (previous + 1) % demoSlides.length)
        }, 3000)

        return () => clearInterval(intervalId)
    }, [])

    useEffect(() => {
        const heroIntervalId = setInterval(() => {
        setActiveHeroSlide((previous) => (previous + 1) % heroSlides.length)
        }, 3500)

        return () => clearInterval(heroIntervalId)
    }, [])

    return (
        <div className="relative min-h-screen overflow-x-hidden bg-zinc-950 text-zinc-100">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -left-24 top-[-6rem] h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
            <div className="absolute right-[-8rem] top-1/4 h-[26rem] w-[26rem] rounded-full bg-violet-500/15 blur-3xl" />
            <div className="absolute bottom-[-10rem] left-1/3 h-[28rem] w-[28rem] rounded-full bg-cyan-500/10 blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.12),transparent_55%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(24,24,27,0.12),rgba(9,9,11,0.9))]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
            <header className="sticky top-3 z-50 flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/85 px-4 py-3 shadow-lg backdrop-blur sm:px-5">
            <div className="flex items-center gap-2.5">
                <img src="/public/ProFolio-logo.png" alt="ProFolio Logo" className="h-8 w-8" />
                <span className="text-sm font-semibold tracking-wide">ProFolio</span>
            </div>

            <nav className="hidden items-center gap-6 text-sm text-zinc-300 md:flex">
                <a href="#features" className="transition hover:text-white hover:underline hover:underline-offset-8">
                Tính năng
                </a>
                <a href="#workflow" className="transition hover:text-white hover:underline hover:underline-offset-8">
                Quy trình
                </a>
                <a href="#cta" className="transition hover:text-white hover:underline hover:underline-offset-8">
                Bắt đầu
                </a>
            </nav>

            <button className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-sm font-medium transition duration-200 hover:-translate-y-0.5 hover:bg-zinc-700 active:translate-y-0 active:scale-95">
                Đăng nhập
            </button>
            </header>

            <main className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-center">
            <section>
                <p className="inline-flex items-center rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-s font-medium text-zinc-300">
                Nền tảng tạo portfolio cá nhân hiện đại cho mọi ngành nghề!
                </p>
                <h1 className="mt-5 text-4xl font-semibold leading-tight text-white sm:text-5xl">
                Tạo portfolio đẹp,
                <br />
                chỉnh sửa dễ,
                <br />
                lưu trữ lâu dài.
                </h1>
                <p className="mt-5 max-w-xl text-sm leading-6 text-zinc-400 sm:text-base">
                ProFolio giúp bạn xây dựng hồ sơ cá nhân chuyên nghiệp trong vài phút, cập nhật linh hoạt theo từng cơ
                hội công việc và chia sẻ thuận tiện bằng một đường link duy nhất.
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                <button className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-zinc-900 transition duration-200 hover:-translate-y-0.5 hover:bg-zinc-200 hover:shadow-lg active:translate-y-0 active:scale-95">
                    Tạo portfolio ngay
                    <ArrowRightIcon />
                </button>
                <button className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-zinc-200 transition duration-200 hover:-translate-y-0.5 hover:bg-zinc-800 active:translate-y-0 active:scale-95">
                    Xem giao diện mẫu
                </button>
                </div>

                <div className="mt-7 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
                <div className="relative h-44 sm:h-52">
                    {heroSlides.map((slide, index) => (
                    <img
                        key={slide}
                        src={slide}
                        alt="Hero demo"
                        className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
                        index === activeHeroSlide ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
                        }`}
                    />
                    ))}
                    <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/70 via-zinc-950/35 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <p className="text-xs text-zinc-200 sm:text-sm">Template showcase tự chuyển trong phần hero</p>
                    <div className="flex gap-1.5">
                        {heroSlides.map((slide, index) => (
                        <button
                            key={slide}
                            type="button"
                            onClick={() => setActiveHeroSlide(index)}
                            className={`h-1.5 rounded-full transition ${
                            index === activeHeroSlide ? 'w-6 bg-indigo-300' : 'w-3 bg-zinc-500 hover:bg-zinc-300'
                            }`}
                            aria-label={`Hero slide ${index + 1}`}
                        />
                        ))}
                    </div>
                    </div>
                </div>
                </div>

                <ul className="mt-7 space-y-2 text-sm text-zinc-300">
                <li className="flex items-center gap-2">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-zinc-800 text-indigo-300">
                    <CheckIcon />
                    </span>
                    Không cần kinh nghiệm thiết kế vẫn làm được portfolio đẹp
                </li>
                <li className="flex items-center gap-2">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-zinc-800 text-indigo-300">
                    <CheckIcon />
                    </span>
                    Tối ưu hiển thị trên mobile, tablet và desktop
                </li>
                <li className="flex items-center gap-2">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-zinc-800 text-indigo-300">
                    <CheckIcon />
                    </span>
                    Nội dung được lưu trữ an toàn để cập nhật bất cứ lúc nào
                </li>
                </ul>
            </section>

            <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 shadow-2xl sm:p-5">
                <div className="mb-4 flex items-center justify-between border-b border-zinc-800 pb-3">
                </div> 
                <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
                    <img
                    src={demoSlides[activeSlide].image}
                    alt={demoSlides[activeSlide].title}
                    className="h-72 w-full object-cover sm:h-96"
                    />
                    <div className="border-t border-zinc-800 p-3">
                    <p className="text-sm font-semibold text-zinc-100">{demoSlides[activeSlide].title}</p>
                    <p className="mt-1 text-xs text-zinc-400">{demoSlides[activeSlide].caption}</p>
                    <div className="mt-3 flex items-center gap-1.5">
                        {demoSlides.map((slide, index) => (
                        <button
                            key={slide.title}
                            type="button"
                            aria-label={`Go to slide ${index + 1}`}
                            onClick={() => setActiveSlide(index)}
                            className={`h-1.5 rounded-full transition ${
                            index === activeSlide ? 'w-6 bg-indigo-400' : 'w-3 bg-zinc-700 hover:bg-zinc-500'
                            }`}
                        />
                        ))}
                    </div>
                    </div>
                </div>


                <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs">
                {quickStats.map((item) => (
                    <div
                    key={item.label}
                    className="rounded-xl border border-zinc-800 bg-zinc-950 p-3 transition duration-200 hover:-translate-y-0.5 hover:border-zinc-600"
                    >
                    <p className="text-zinc-500">{item.label}</p>
                    <p className="mt-1 text-sm font-semibold text-white">{item.value}</p>
                    </div>
                ))}
                </div>
            </section>
            </main>

            <section id="features" className="scroll-mt-24 mt-14 grid gap-4 sm:grid-cols-2">
            {featureList.map((feature) => (
                <article
                key={feature.title}
                className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition duration-200 hover:-translate-y-0.5 hover:border-zinc-600 hover:shadow-lg"
                >
                <h3 className="text-base font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-400">{feature.description}</p>
                </article>
            ))}
            </section>

            <section id="workflow" className="scroll-mt-24 mt-10 rounded-2xl border border-zinc-800 bg-zinc-900 p-5 sm:p-6">
            <h2 className="text-xl font-semibold text-white">Quy trình sử dụng đơn giản</h2>
            <p className="mt-2 text-sm text-zinc-400">Tập trung vào nội dung của bạn, ProFolio lo phần trình bày.</p>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
                {flowSteps.map((item) => (
                <article
                    key={item.step}
                    className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 transition duration-200 hover:-translate-y-0.5 hover:border-zinc-600"
                >
                    <p className="text-xs font-semibold tracking-wider text-indigo-300">STEP {item.step}</p>
                    <h3 className="mt-2 text-sm font-semibold text-zinc-100">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-400">{item.description}</p>
                </article>
                ))}
            </div>
            </section>

            <section
            id="cta"
            className="scroll-mt-24 mt-10 rounded-2xl border border-zinc-800 bg-gradient-to-r from-zinc-900 to-zinc-800 p-6 text-center sm:p-8"
            >
            <h2 className="text-2xl font-semibold text-white">Sẵn sàng xây portfolio chuyên nghiệp của bạn?</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-zinc-300 sm:text-base">
                Tạo tài khoản, chọn mẫu và bắt đầu cập nhật hồ sơ cá nhân chỉ trong vài phút.
            </p>
            <button className="mt-10 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-zinc-900 transition duration-200 hover:-translate-y-0.5 hover:bg-zinc-200 hover:shadow-xl active:translate-y-0 active:scale-95">
                Bắt đầu miễn phí
                <ArrowRightIcon />
            </button>
            </section>

            <footer className="mt-14 border-t border-zinc-800 pt-10">
            <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
                <div>
                <div className="flex items-center gap-2.5">
                <img src="/public/ProFolio-logo.png" alt="ProFolio Logo" className="h-8 w-8" />
                    <span className="text-base font-semibold text-white">ProFolio</span>
                </div>
                <p className="mt-4 max-w-sm text-sm leading-6 text-zinc-400">
                    Build portfolio cá nhân đẹp, dễ chỉnh sửa và sẵn sàng chia sẻ với nhà tuyển dụng chỉ bằng một link.
                </p>

                </div>

                <div>
                <p className="text-lg font-semibold text-zinc-100">Resources</p>
                <ul className="mt-4 space-y-2.5 text-zinc-400">
                    <li><a href="#features" className="transition hover:text-zinc-200">Customers</a></li>
                    <li><a href="#workflow" className="transition hover:text-zinc-200">Docs</a></li>
                    <li><a href="#" className="transition hover:text-zinc-200">Blog</a></li>
                    <li><a href="#" className="transition hover:text-zinc-200">Partnerships</a></li>
                </ul>
                </div>

                <div>
                <p className="text-lg font-semibold text-zinc-100">Company</p>
                <ul className="mt-4 space-y-2.5 text-zinc-400">
                    <li><a href="#" className="transition hover:text-zinc-200">About</a></li>
                    <li><a href="#" className="transition hover:text-zinc-200">Careers</a></li>
                    <li><a href="#" className="transition hover:text-zinc-200">Status</a></li>
                    <li><a href="#cta" className="transition hover:text-zinc-200">Start free</a></li>
                </ul>
                </div>

                <div>
                <p className="text-lg font-semibold text-zinc-100">Legal</p>
                <ul className="mt-4 space-y-2.5 text-zinc-400">
                    <li><a href="#" className="transition hover:text-zinc-200">Privacy Policy</a></li>
                    <li><a href="#" className="transition hover:text-zinc-200">Terms of Service</a></li>
                    <li><a href="#" className="transition hover:text-zinc-200">Customer Agreement</a></li>
                    <li><a href="#" className="transition hover:text-zinc-200">Cookie Preferences</a></li>
                </ul>
                </div>
            </div>

            <div className="mt-10 border-t border-zinc-800 py-6 text-sm text-zinc-400 sm:flex sm:items-center sm:justify-between">
                <div className="inline-flex items-center gap-3 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                All systems operational
                </div>
                <p className="mt-3 text-zinc-500 sm:mt-0">© {new Date().getFullYear()} By NgoHuuThuan. All rights reserved.</p>
            </div>
            </footer>
        </div>
        </div>
    )
    }

    export default LandingPage
