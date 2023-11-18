import { useContext, useState } from 'react'
import { type medicineForm } from '../../types/medicineForm'
import { AuthContext } from '../../context/AuthContext'

import styles from './createMedicine.module.css'

interface CreateMedicineProps {
  onMedicine: (medicine: medicineForm) => Promise<void>
}

export const CreateMedicine = ({ onMedicine }: CreateMedicineProps): JSX.Element => {
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
      [name]: value
    })
  }

  const handleAddMedicine = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    try {
      if (newUser !== null) {
        await onMedicine(formMedicine)
        setFormMedicine({
          nombre: '',
          proveedor: '',
          costo: 0,
          precioVenta: 0
        })
      }
    } catch (error: any) {
      throw new Error(error)
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
