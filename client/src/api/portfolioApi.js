import api from './axios'

export const getPortfolioApi = async () => {
  const { data } = await api.get('/portfolio')
  return data
}

export const getPublicPortfolioBySlugApi = async (slug) => {
  const { data } = await api.get(`/portfolio/${slug}`)
  return data
}
