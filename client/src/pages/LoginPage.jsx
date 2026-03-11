    import { useNavigate } from 'react-router-dom'
    import { useForm } from 'react-hook-form'
    import { Eye, EyeOff } from 'lucide-react'
    import { useState } from 'react'
    import { useAuthStore } from '../store/authStore'
    import AuthShell from '../components/AuthShell'

    function LoginPage() {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [showSignupPassword, setShowSignupPassword] = useState(false)
    const [layoutState, setLayoutState] = useState('default')
    const login = useAuthStore((state) => state.login)
    const registerRequest = useAuthStore((state) => state.register)
    const isLoading = useAuthStore((state) => state.isLoading)
    const error = useAuthStore((state) => state.error)
    const clearError = useAuthStore((state) => state.clearError)

    const {
        register: registerLogin,
        handleSubmit: handleLoginSubmit,
        formState: { errors: loginErrors },
    } = useForm({
        defaultValues: {
        email: '',
        password: '',
        },
    })

    const {
        register: registerSignup,
        handleSubmit: handleSignupSubmit,
        formState: { errors: signupErrors },
    } = useForm({
        defaultValues: {
        name: '',
        email: '',
        password: '',
        },
    })

    const onLoginSubmit = handleLoginSubmit(async (values) => {
        clearError()
        await login(values)
        navigate('/dashboard')
    })

    const onSignupSubmit = handleSignupSubmit(async (values) => {
        clearError()
        await registerRequest(values)
        setLayoutState('login-expanded')
    })

    const handleRightFormFocus = () => {
        setLayoutState('login-expanded')
    }

    const handleLeftEmailClick = () => {
        setLayoutState('signup-expanded')
    }

    const handleCollapse = () => {
        setLayoutState('default')
    }

    return (
        <AuthShell
        mode="login"
        loading={isLoading}
        error={error}
        showPassword={showPassword}
        layoutState={layoutState}
        onTogglePassword={() => setShowPassword((prev) => !prev)}
        onToggleMode={() => navigate('/register')}
        onRightInputFocus={handleRightFormFocus}
        onLeftEmailClick={handleLeftEmailClick}
        onCollapse={handleCollapse}
        onClose={() => navigate('/')}
        onSubmit={onLoginSubmit}
        onSignupExpandedSubmit={onSignupSubmit}
        form={{
            renderFields: ({ showPassword, onTogglePassword, onFocus }) => (
            <>
                <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">Email address</span>
                <input
                    className="auth-input"
                    type="email"
                    placeholder="you@example.com"
                    onFocus={onFocus}
                    {...registerLogin('email', {
                    required: 'Email is required',
                    pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: 'Invalid email format',
                    },
                    })}
                />
                {loginErrors.email ? <span className="auth-error">{loginErrors.email.message}</span> : null}
                </label>

                <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">Password</span>
                <div className="relative">
                    <input
                    className="auth-input pr-20"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Your password"
                    onFocus={onFocus}
                    {...registerLogin('password', {
                        required: 'Password is required',
                        minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                        },
                    })}
                    />
                    <button
                    className="absolute right-3 top-1/2 inline-flex -translate-y-1/2 items-center gap-1 text-sm text-slate-500 transition-colors hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                    type="button"
                    onClick={onTogglePassword}
                    >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />} {showPassword ? 'Hide' : 'Show'}
                    </button>
                </div>
                {loginErrors.password ? <span className="auth-error">{loginErrors.password.message}</span> : null}
                </label>
            </>
            ),
            renderSignupExpandedFields: () => (
            <>
                <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">Full name</span>
                <input
                    className="auth-input"
                    type="text"
                    placeholder="Your full name"
                    {...registerSignup('name', {
                    required: 'Name is required',
                    minLength: {
                        value: 2,
                        message: 'Name is too short',
                    },
                    })}
                />
                {signupErrors.name ? <span className="auth-error">{signupErrors.name.message}</span> : null}
                </label>

                <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">Email address</span>
                <input
                    className="auth-input"
                    type="email"
                    placeholder="you@example.com"
                    {...registerSignup('email', {
                    required: 'Email is required',
                    pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: 'Invalid email format',
                    },
                    })}
                />
                {signupErrors.email ? <span className="auth-error">{signupErrors.email.message}</span> : null}
                </label>

                <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">Password</span>
                <div className="relative">
                    <input
                    className="auth-input pr-20"
                    type={showSignupPassword ? 'text' : 'password'}
                    placeholder="Minimum 6 characters"
                    {...registerSignup('password', {
                        required: 'Password is required',
                        minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                        },
                    })}
                    />
                    <button
                    className="absolute right-3 top-1/2 inline-flex -translate-y-1/2 items-center gap-1 text-sm text-slate-500 transition-colors hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                    type="button"
                    onClick={() => setShowSignupPassword((prev) => !prev)}
                    >
                    {showSignupPassword ? <EyeOff size={16} /> : <Eye size={16} />}{' '}
                    {showSignupPassword ? 'Hide' : 'Show'}
                    </button>
                </div>
                {signupErrors.password ? <span className="auth-error">{signupErrors.password.message}</span> : null}
                </label>
            </>
            ),
        }}
        />
    )
    }

    export default LoginPage
