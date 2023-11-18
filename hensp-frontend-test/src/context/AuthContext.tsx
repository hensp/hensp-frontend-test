import { createContext, useState } from 'react'
import { type UserTypes } from '../types/user'

interface AuthProviderTypes {
  newUser: UserTypes
  handleUser: (user: UserTypes) => void
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
  handleUser: () => {}
})

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [newUser, setNewUser] = useState<UserTypes>(null)

  const handleUser = (user: UserTypes): void => {
    setNewUser(user)
  }

  return (
        <AuthContext.Provider value={{ newUser, handleUser }}>
            {children}
        </AuthContext.Provider>
  )
}
