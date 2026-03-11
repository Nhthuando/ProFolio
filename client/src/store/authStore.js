import { create } from 'zustand'
import { loginApi, registerApi } from '../api/authApi'

const AUTH_STORAGE_KEY = 'portfolio_builder_auth'

const readPersistedAuth = () => {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY)
    return raw ? JSON.parse(raw) : { token: null, user: null }
  } catch {
    return { token: null, user: null }
  }
}

const persistAuth = (token, user) => {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ token, user }))
}

const clearAuth = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY)
}

const initialAuth = readPersistedAuth()

export const useAuthStore = create((set) => ({
  user: initialAuth.user,
  token: initialAuth.token,
  isLoading: false,
  error: null,
  setAuth: ({ token, user }) => {
    persistAuth(token, user)
    set({ token, user, error: null })
  },
  clearError: () => set({ error: null }),
  logout: () => {
    clearAuth()
    set({ user: null, token: null, error: null })
  },
  login: async (payload) => {
    set({ isLoading: true, error: null })
    try {
      const data = await loginApi(payload)
      persistAuth(data.token, data.user)
      set({ token: data.token, user: data.user, isLoading: false })
      return data
    } catch (error) {
      const message = error?.response?.data?.message || 'Login failed'
      set({ isLoading: false, error: message })
      throw error
    }
  },
  register: async (payload) => {
    set({ isLoading: true, error: null })
    try {
      const data = await registerApi(payload)
      if (data?.token && data?.user) {
        persistAuth(data.token, data.user)
        set({ token: data.token, user: data.user, isLoading: false })
      } else {
        set({ isLoading: false })
      }
      return data
    } catch (error) {
      const message = error?.response?.data?.message || 'Register failed'
      set({ isLoading: false, error: message })
      throw error
    }
  },
}))
