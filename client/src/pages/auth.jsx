import { useEffect, useState } from 'react'

function EyeOpenIcon() {
	return (
		<svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
			<path
				d="M2.25 12S5.25 6.75 12 6.75 21.75 12 21.75 12 18.75 17.25 12 17.25 2.25 12 2.25 12Z"
				stroke="currentColor"
				strokeWidth="1.8"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<circle cx="12" cy="12" r="2.8" stroke="currentColor" strokeWidth="1.8" />
		</svg>
	)
}

function EyeClosedIcon() {
	return (
		<svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
			<path
				d="M3 3 21 21"
				stroke="currentColor"
				strokeWidth="1.8"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M10.58 10.58A2 2 0 0 0 12 14a2 2 0 0 0 1.42-.58"
				stroke="currentColor"
				strokeWidth="1.8"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M9.88 5.09A10.94 10.94 0 0 1 12 4.88c6.75 0 9.75 5.25 9.75 5.25a18.28 18.28 0 0 1-3.16 3.71M6.61 6.61a18.51 18.51 0 0 0-4.36 3.52s3 5.25 9.75 5.25a11 11 0 0 0 3.14-.44"
				stroke="currentColor"
				strokeWidth="1.8"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	)
}

function GoogleIcon() {
	return (
		<svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
			<path
				d="M21.35 12.23c0-.72-.06-1.25-.2-1.8H12v3.45h5.37c-.11.86-.72 2.16-2.08 3.04l-.02.12 3.01 2.29.21.02c1.92-1.74 3.02-4.31 3.02-7.12Z"
				fill="#4285F4"
			/>
			<path
				d="M12 21.65c2.63 0 4.84-.85 6.45-2.3l-3.2-2.43c-.86.59-2.02 1-3.25 1a5.87 5.87 0 0 1-5.58-3.98l-.12.01-3.13 2.38-.04.11A9.74 9.74 0 0 0 12 21.65Z"
				fill="#34A853"
			/>
			<path
				d="M6.42 13.94A5.87 5.87 0 0 1 6.08 12c0-.68.12-1.33.33-1.94l-.01-.13-3.17-2.42-.1.05A9.53 9.53 0 0 0 2 12c0 1.58.39 3.07 1.13 4.43l3.29-2.49Z"
				fill="#FBBC05"
			/>
			<path
				d="M12 6.08c1.55 0 2.6.66 3.2 1.21l2.33-2.22C16.12 3.78 14.63 3 12 3a9.74 9.74 0 0 0-8.87 5.56l3.28 2.5A5.87 5.87 0 0 1 12 6.08Z"
				fill="#EA4335"
			/>
		</svg>
	)
}

function FacebookIcon() {
	return (
		<svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
			<circle cx="12" cy="12" r="11" fill="#1877F2" />
			<path
				d="M13.47 19v-6.17h2.07l.31-2.4h-2.38V8.9c0-.7.2-1.17 1.2-1.17h1.28V5.58A16.27 16.27 0 0 0 14.09 5c-1.84 0-3.1 1.1-3.1 3.15v2.28H8.91v2.4h2.08V19h2.48Z"
				fill="#fff"
			/>
		</svg>
	)
}   

function EmailIcon() {
	return (
		<svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
			<rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="1.8" />
			<path
				d="m4.5 7 6.72 5.2a1.3 1.3 0 0 0 1.56 0L19.5 7"
				stroke="currentColor"
				strokeWidth="1.8"
				strokeLinecap="round"
			/>
		</svg>
	)
}

function AuthPage() {
	const [showLoginPassword, setShowLoginPassword] = useState(false)
	const [showRegisterPassword, setShowRegisterPassword] = useState(false)
	const [showRegisterRePassword, setShowRegisterRePassword] = useState(false)
	const [showRegisterEmailForm, setShowRegisterEmailForm] = useState(false)
	const [loginForm, setLoginForm] = useState({ email: '', password: '' })
	const [registerForm, setRegisterForm] = useState({ email: '', password: '', repass: '' })
	const [isPageReady, setIsPageReady] = useState(false)

	useEffect(() => {
		const frame = requestAnimationFrame(() => {
			setIsPageReady(true)
		})

		return () => cancelAnimationFrame(frame)
	}, [])

	const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email)
	const loginValid = isValidEmail(loginForm.email) && loginForm.password.trim().length >= 6
	const registerPasswordValid = registerForm.password.trim().length >= 6
	const registerValid =
		isValidEmail(registerForm.email) &&
		registerPasswordValid &&
		registerForm.repass.trim().length >= 6 &&
		registerForm.password === registerForm.repass

	const onLoginInputChange = (event) => {
		const { name, value } = event.target
		setLoginForm((previous) => ({ ...previous, [name]: value }))
	}

	const onRegisterInputChange = (event) => {
		const { name, value } = event.target
		setRegisterForm((previous) => ({ ...previous, [name]: value }))
	}

	const onSubmitLogin = async (event) => {
		event.preventDefault()
		if (!loginValid) return
			try {
			const response = await fetch('http://localhost:3000/api/auth/dangnhap', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ 
					email: loginForm.email, 
					password: loginForm.password 
				})
			})

			const data = await response.json()

			if (response.ok) {
				alert(data.message) 
			} else {
				alert(data.message) 
			}
		} catch (error) {
			console.error('Lỗi:', error)
			alert('Lỗi kết nối server')
		}
	}

	const onSubmitRegister = async (event) => {
		event.preventDefault()
		if (!registerValid) return
			try {
			const response = await fetch('http://localhost:3000/api/auth/dangky', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ 
					email: registerForm.email, 
					password: registerForm.password 
				})
			})

			const data = await response.json()

			if (response.ok) {
				alert(data.message) 
			} else {
				alert(data.message) 
			}
		} catch (error) {
			console.error('Lỗi:', error)
			alert('Lỗi kết nối server')
		}
	}

	const socialButtonClass =
		'flex h-11 sm:h-12 w-full items-center justify-center gap-3 rounded-full border border-gray-300 bg-white px-4 text-sm sm:text-base font-medium text-gray-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50/40 hover:shadow-md active:translate-y-0 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300'
	const inputClass =
		'h-11 sm:h-12 w-full rounded-xl border border-gray-300 px-4 text-sm outline-none transition-all duration-200 hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
	const activeSubmitButtonClass =
		'h-11 min-w-28 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-8 text-base font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:from-blue-600 hover:to-cyan-600 hover:shadow-lg active:translate-y-0 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 sm:h-12 sm:min-w-32 sm:px-10 sm:text-xl'
	const inactiveSubmitButtonClass =
		'h-11 min-w-28 rounded-full bg-gray-300 px-8 text-base font-semibold text-white/90 shadow-inner transition-all duration-200 cursor-not-allowed sm:h-12 sm:min-w-32 sm:px-10 sm:text-xl'
	const activeRegisterButtonClass =
		'h-11 w-full rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-6 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:from-blue-600 hover:to-cyan-600 hover:shadow-lg active:translate-y-0 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300'
	const inactiveRegisterButtonClass =
		'h-11 w-full rounded-xl bg-gray-300 px-6 text-sm font-semibold text-white/90 shadow-inner transition-all duration-200 cursor-not-allowed'

	return (
		<div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a2b63] px-3 py-5 sm:px-4 sm:py-8">
			<div className="pointer-events-none absolute inset-0">
				<div className="absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-gradient-to-tr from-cyan-300/80 to-blue-500/20 blur-2xl sm:h-80 sm:w-80" />
				<div className="absolute -right-24 top-20 hidden h-96 w-96 rounded-full bg-gradient-to-bl from-cyan-300/80 to-blue-500/20 blur-2xl sm:block" />
			</div>

			<div
				className={`relative z-10 w-full max-w-5xl rounded-2xl bg-white text-gray-800 shadow-2xl transition-all duration-700 sm:rounded-3xl md:hover:shadow-[0_30px_80px_-35px_rgba(15,23,42,0.45)] ${
					isPageReady ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-5 scale-[0.985] opacity-0'
				}`}
			>
				<button
					type="button"
					className="absolute right-4 top-3 text-xl text-gray-400 transition-all duration-300 hover:rotate-90 hover:text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 sm:right-5 sm:top-4"
					aria-label="Close"
				>
					×
				</button>

				<div className="flex flex-col items-center px-4 pb-7 pt-6 sm:px-8 sm:pb-10 sm:pt-8 md:px-12">
					<img src="public/ProFolio-logo.png" alt="ProFolio Logo" className="mb-4 h-12 w-12 sm:mb-5 sm:h-16 sm:w-16" />
					<p className="mb-3 text-center text-xl font-medium leading-tight text-gray-700 sm:text-3xl md:text-[32px]">
						Chào mừng bạn tới với ProFolio!
					</p>
					<p className="mb-7 text-center text-sm font-medium leading-relaxed text-gray-500 sm:mb-8 sm:text-xl md:text-[26px] md:leading-tight">
						Dễ dàng tạo hồ sơ cá nhân và chia sẻ với nhà tuyển dụng
					</p>

					<div className="relative w-full overflow-hidden rounded-2xl border border-gray-100 bg-gradient-to-b from-white to-slate-50/40">
						<div
							className={`flex w-[200%] transition-transform duration-500 ease-out ${
								showRegisterEmailForm ? '-translate-x-1/2' : 'translate-x-0'
							}`}
						>
							<div className="w-1/2 p-4 sm:p-6">
								<div className="grid gap-7 md:grid-cols-2 md:gap-10">
									<section className="border-b border-gray-200 pb-7 md:border-b-0 md:border-r md:pr-10">
										<h2 className="mb-5 text-center text-xl font-semibold text-gray-800 sm:mb-6 sm:text-2xl">Đăng Ký</h2>

										<div className="space-y-4">
											<button type="button" className={socialButtonClass}>
												<span aria-hidden="true">
													<GoogleIcon />
												</span>
												Đăng ký với Google
											</button>
											<button type="button" className={socialButtonClass}>
												<span aria-hidden="true">
													<FacebookIcon />
												</span>
												Đăng ký với Facebook
											</button>
											<button
												type="button"
												onClick={() => setShowRegisterEmailForm(true)}
												className={`${socialButtonClass} bg-gradient-to-r from-blue-50 to-cyan-50`}
												aria-expanded={showRegisterEmailForm}
											>
												<span aria-hidden="true" className="text-blue-600">
													<EmailIcon />
												</span>
												Đăng ký với Email
											</button>
										</div>

										<p className="mt-5 text-xs leading-5 text-gray-500 sm:mt-6 sm:text-sm">
											Với việc tạo tài khoản, bạn đồng ý với{' '}
											<a href="#" className="underline decoration-gray-400 underline-offset-2 transition hover:text-gray-700 hover:decoration-gray-700">
												Điều khoản dịch vụ
											</a>{' '}
											và xác nhận bạn đã đọc và đồng ý với{' '}
											<a href="#" className="underline decoration-gray-400 underline-offset-2 transition hover:text-gray-700 hover:decoration-gray-700">
												Chính sách bảo mật của tôi
											</a>
											.
										</p>
									</section>

									<section className="md:pl-1">
										<h2 className="mb-5 text-center text-xl font-semibold text-gray-800 sm:mb-6 sm:text-2xl">Đăng Nhập</h2>

										<form className="space-y-4" onSubmit={onSubmitLogin}>
											<div>
												<label className="mb-2 block text-sm text-gray-500" htmlFor="login-email">
													Email
												</label>
												<input
													id="login-email"
													name="email"
													type="email"
													className={inputClass}
													value={loginForm.email}
													onChange={onLoginInputChange}
													placeholder="email@example.com"
												/>
											</div>

											<div>
												<div className="mb-2 flex items-center justify-between text-sm text-gray-500">
													<label htmlFor="login-password">Mật Khẩu</label>
													<button
														type="button"
														onClick={() => setShowLoginPassword((previous) => !previous)}
														className="inline-flex items-center gap-1 rounded px-1 py-0.5 text-gray-500 transition hover:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
													>
														{showLoginPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
														<span>{showLoginPassword ? 'Ẩn' : 'Hiện'}</span>
													</button>
												</div>
												<input
													id="login-password"
													name="password"
													type={showLoginPassword ? 'text' : 'password'}
													className={inputClass}
													value={loginForm.password}
													onChange={onLoginInputChange}
													placeholder="Tối thiểu 6 ký tự"
												/>
											</div>

											<div className="text-right">
												<a
													href="#"
													className="text-sm text-gray-600 underline decoration-gray-400 underline-offset-2 transition hover:text-gray-800 hover:decoration-gray-800"
												>
													Quên mật khẩu?
												</a>
											</div>

											<div className="flex justify-center pt-1 sm:pt-2">
												<button
													type="submit"
													disabled={!loginValid}
													className={loginValid ? activeSubmitButtonClass : inactiveSubmitButtonClass}
												>
													Đăng Nhập
												</button>
											</div>
										</form>
									</section>
								</div>
							</div>

							<div className="w-1/2">
								<section className="h-full w-full rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/80 via-white to-cyan-50/70 p-6 shadow-sm sm:p-8 md:p-9">
									<div className="mb-6 flex items-center justify-between">
										<h2 className="text-center text-2xl font-semibold text-gray-800 sm:text-3xl">Đăng Ký Bằng Email</h2>
										<button
											type="button"
											onClick={() => setShowRegisterEmailForm(false)}
											className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition hover:border-blue-300 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
										>
											Quay lại
										</button>
									</div>

									<form onSubmit={onSubmitRegister} className="space-y-4">
										<div>
											<label className="mb-2 block text-sm font-medium text-gray-600" htmlFor="register-email">
												Email
											</label>
											<input
												id="register-email"
												name="email"
												type="email"
												className={inputClass}
												value={registerForm.email}
												onChange={onRegisterInputChange}
												placeholder="email@example.com"
											/>
										</div>

										<div>
											<div className="mb-2 flex items-center justify-between text-sm text-gray-600">
												<label htmlFor="register-password">Mật khẩu</label>
												<button
													type="button"
													onClick={() => setShowRegisterPassword((previous) => !previous)}
													className="inline-flex items-center gap-1 rounded px-1 py-0.5 text-gray-500 transition hover:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
												>
													{showRegisterPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
													<span>{showRegisterPassword ? 'Ẩn' : 'Hiện'}</span>
												</button>
											</div>
											<input
												id="register-password"
												name="password"
												type={showRegisterPassword ? 'text' : 'password'}
												className={inputClass}
												value={registerForm.password}
												onChange={onRegisterInputChange}
												placeholder="Tối thiểu 6 ký tự"
											/>
										</div>

										<div>
											<div className="mb-2 flex items-center justify-between text-sm text-gray-600">
												<label htmlFor="register-repass">Nhập lại mật khẩu</label>
												<button
													type="button"
													onClick={() => setShowRegisterRePassword((previous) => !previous)}
													className="inline-flex items-center gap-1 rounded px-1 py-0.5 text-gray-500 transition hover:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
												>
													{showRegisterRePassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
													<span>{showRegisterRePassword ? 'Ẩn' : 'Hiện'}</span>
												</button>
											</div>
											<input
												id="register-repass"
												name="repass"
												type={showRegisterRePassword ? 'text' : 'password'}
												className={inputClass}
												value={registerForm.repass}
												onChange={onRegisterInputChange}
												placeholder="Nhập lại mật khẩu"
											/>
											{registerForm.repass && registerForm.password !== registerForm.repass ? (
												<p className="mt-1 text-xs text-red-500">Mật khẩu nhập lại chưa khớp.</p>
											) : null}
										</div>

										<button
											type="submit"
											disabled={!registerValid}
											onClick={onSubmitRegister}
											className={registerValid ? activeRegisterButtonClass : inactiveRegisterButtonClass}
										>
											Đăng ký
										</button>
									</form>
								</section>
							</div>
						</div>
					</div>
				</div>

				<footer className="rounded-b-2xl border-t border-gray-200 bg-gray-50 px-4 py-3 text-center text-[11px] text-gray-500 sm:rounded-b-3xl sm:px-6 sm:py-4 sm:text-xs">
					<div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-4">
						<a href="#" className="transition hover:text-gray-700">
							Thông Tin 
						</a>
						<a href="#" className="transition hover:text-gray-700">
							Trợ Giúp
						</a>
						<a href="#" className="transition hover:text-gray-700">
							Điều khoản dịch vụ
						</a>
						<a href="#" className="transition hover:text-gray-700">
							Chính sách bảo mật
						</a>
						<a href="#" className="transition hover:text-gray-700">
							Chính sách cookie
						</a>
					</div>
				<span className="mt-3 block text-[11px] leading-5 text-gray-400 italic sm:mt-4 sm:text-xs">
                        © {new Date().getFullYear()} By NgoHuuThuan. All rights reserved.
                </span>
				</footer>
			</div>
		</div>
	)
}

export default AuthPage
