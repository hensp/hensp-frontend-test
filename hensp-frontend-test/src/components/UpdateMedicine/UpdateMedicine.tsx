import { useContext, useEffect, useState } from 'react'
import styles from './updateMedicine.module.css'
import { type editMedicineForm, type medicineForm } from '../../types/medicineForm'
import { type MedicineTypes } from '../../types/medicine'
import { AuthContext } from '../../context/AuthContext'
import { putMedicine } from '../../services/medicine'

interface UpdateMedicineProps {
  medicine: MedicineTypes[]
  editMedicine: editMedicineForm
  handleChangeVariant: () => void

}

export const UpdateMedicine = ({ medicine, editMedicine, handleChangeVariant }: UpdateMedicineProps): JSX.Element => {
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

  const handleUpdateMedicine = async (e: React.FormEvent<HTMLFormElement>, id: number): Promise<void> => {
    e.preventDefault()

    const newMedicine = {
      nombre: formMedicine.nombre,
      proveedor: formMedicine.proveedor,
      costo: Number(formMedicine.costo),
      precioVenta: Number(formMedicine.precioVenta)
    }

    try {
      if (newUser !== null) {
        const response = await putMedicine(id, newUser.token, newMedicine)
        if (response.ok !== null) {
          handleChangeVariant()
        }

        handleChangeVariant()
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    if (medicine.length < 0) return
    if (Object.keys(editMedicine).length > 0) {
      setFormMedicine({
        nombre: editMedicine.nombre,
        proveedor: editMedicine.proveedor,
        costo: editMedicine.costo,
        precioVenta: editMedicine.precioVenta

      })
    }
  }, [editMedicine])
  return (
    <section className={styles['home-form']}>
    <form onSubmit={(e) => {
      void handleUpdateMedicine(e, editMedicine.id)
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
        <button>Editar medicina</button>
    </form>
</section>
  )
}
