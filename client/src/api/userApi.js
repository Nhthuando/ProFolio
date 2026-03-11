import api from './axios'

export const getProfileApi = async () => {
  const { data } = await api.get('/user/profile')
  return data
}

export const updateProfileApi = async (payload) => {
  const { data } = await api.put('/user/profile', payload)
  return data
}
