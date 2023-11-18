import { useContext } from 'react'
import { getMedicineById } from '../../services/medicine'
import { type MedicineTypes } from '../../types/medicine'
import styles from './medicineCard.module.css'
import { AuthContext } from '../../context/AuthContext'
import { type getOneMedicine } from '../../types/medicineForm'

interface MedicineCartProps {
  item: MedicineTypes
  onHandleEditMedicine: (medicine: getOneMedicine) => void
  handleChangeVariant: () => void
  handleDelete: (id: number) => Promise<void>
}

export const MedicineCard = ({ item, onHandleEditMedicine, handleChangeVariant, handleDelete }: MedicineCartProps): JSX.Element => {
  const { costo, nombre, proveedor, precio_venta: precioVenta, id } = item

  const { newUser } = useContext(AuthContext)

  const handleEditMedicine = async (id: number): Promise<void> => {
    try {
      if (newUser !== null) {
        const response = await getMedicineById(id, newUser.token)
        if (Array.isArray(response) && response.length > 0) {
          onHandleEditMedicine(response[0])
          handleChangeVariant()
        }
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }

  return (
    <section className={styles['home-cards']}>
        <p>Nombre: <span>{nombre}</span></p>
        <p>Proveedor: <span>{proveedor}</span></p>
        <p>Costo: <span>{costo}</span></p>
        <p>Precio Venta: : <span>{precioVenta}</span></p>
        <section>
          <button onClick={() => { void handleEditMedicine(id) } }>edit</button>
        <button onClick={() => { void handleDelete(id) }}>delete</button>
        </section>
    </section>
  )
}
