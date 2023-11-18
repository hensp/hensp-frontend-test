import { useContext, useState } from 'react'
import { type medicineForm } from '../../types/medicineForm'
import { AuthContext } from '../../context/AuthContext'
import { postMedicine } from '../../services/medicine'
import styles from './createMedicine.module.css'

export const CreateMedicine = (): JSX.Element => {
  const [formMedicine, setFormMedicine] = useState<medicineForm>({
    nombre: '',
    proveedor: '',
    costo: 0,
    precioVenta: 0
  })

  const { newUser } = useContext(AuthContext)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setFormMedicine({
      ...formMedicine,
      [name]: name === 'costo' || name === 'precioVenta' ? parseInt(value) : value
    })
  }

  const handleAddMedicine = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    if (newUser !== null) {
      const response = await postMedicine(formMedicine, newUser?.token)
      console.log(response)
    }
  }

  return (
    <section className={styles['home-form']}>
    <form onSubmit={(e) => {
      void handleAddMedicine(e)
    }} className={styles.form}>
        <label className={styles['form-label']} htmlFor="nombre">
            Nombre
            <input value={formMedicine.nombre} onChange={handleChange} type="text" name="nombre" id="nombre" />
        </label>
        <label className={styles['form-label']} htmlFor="proveedor">
            Proveedor
            <input value={formMedicine.proveedor} onChange={handleChange} type="text" name="proveedor" id="proveedor" />
        </label>
        <label className={styles['form-label']} htmlFor="costo">
            Costo
            <input value={formMedicine.costo} onChange={handleChange} type="number" name='costo' id='costo' />
        </label>
        <label className={styles['form-label']} htmlFor="precioVenta">
            PrecioVenta
            <input value={formMedicine.precioVenta} onChange={handleChange} type="number" name='precioVenta' id='precioVenta' />
        </label>
        <button>Agregar Medicamento</button>
    </form>
</section>
  )
}
