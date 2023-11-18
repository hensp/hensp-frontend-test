import { useContext, useState } from 'react'
import { type LoginTypes } from '../../types/login'
import styles from './auth.module.css'
import { login as loginService } from '../../services/Auth'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export const Auth = (): JSX.Element => {
  const [login, setLogin] = useState<LoginTypes>({
    usuario: '',
    password: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setLogin({
      ...login,
      [name]: value
    })
  }

  const { handleUser } = useContext(AuthContext)

  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    try {
      const response = await loginService(login)
      handleUser(response)
      navigate('/home')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <section className={styles.auth}>
        <form onSubmit={(e) => {
          void handleLogin(e)
        }} className={styles.form}>
            <label className={styles['form-label']} htmlFor="usuario">
                Usuario
                <input value={login.usuario} onChange={handleChange} type="text" name="usuario" id="usuario" />
            </label>
            <label className={styles['form-label']} htmlFor="password">
                Contraseña
                <input value={login.password} onChange={handleChange} type="password" name="password" id="password" />
            </label>

            <button type="submit">Iniciar Sesion</button>
        </form>
    </section>
  )
}
