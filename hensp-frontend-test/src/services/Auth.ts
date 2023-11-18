import { type LoginTypes } from '../types/login'
import { type UserTypes } from '../types/user'

const API = 'https://backend-dummy.hospitaldeespecialidades.com.sv'

export const login = async (user: LoginTypes): Promise<UserTypes> => {
  const response = await fetch(`${API}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  return await response.json()
}
