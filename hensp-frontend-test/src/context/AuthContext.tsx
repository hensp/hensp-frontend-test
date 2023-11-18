import { createContext, useState } from 'react'
import { type UserTypes } from '../types/user'

interface AuthProviderTypes {
  newUser: UserTypes
  handleUser: (user: UserTypes) => void
  handleLogout: () => void
}

interface AuthProviderProps {
  children: React.ReactNode

}

export const AuthContext = createContext<AuthProviderTypes>({
  newUser: {
    token: '',
    user: {
      nombre: '',
      username: ''
    }
  },
  handleUser: () => {},
  handleLogout: () => {}
})

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [newUser, setNewUser] = useState<UserTypes>(null)

  const handleUser = (user: UserTypes): void => {
    setNewUser(user)
  }

  const handleLogout = (): void => {
    setNewUser(null)
  }

  return (
        <AuthContext.Provider value={{ newUser, handleUser, handleLogout }}>
            {children}
        </AuthContext.Provider>
  )
}
