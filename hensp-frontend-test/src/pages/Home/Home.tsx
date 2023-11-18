import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useGetMedicines } from '../../hooks/useGetMedicines'
import { MedicineCard } from '../../components/MedicineCard/MedicineCard'
import styles from './home.module.css'
import { CreateMedicine } from '../../components/CreateMedicine/CreateMedicine'

import { type editMedicineForm, type getOneMedicine } from '../../types/medicineForm'
import { UpdateMedicine } from '../../components/UpdateMedicine/UpdateMedicine'

export const Home = (): JSX.Element => {
  const [editMedicine, setEditMedicine] = useState<editMedicineForm>({
    id: 0,
    nombre: '',
    proveedor: '',
    costo: 0,
    precioVenta: 0
  })
  const [variant, setVariant] = useState<'add' | 'update'>('add')

  const { newUser } = useContext(AuthContext)
  const { medicine } = useGetMedicines()

  const navigate = useNavigate()

  const handleChangeVariant = (): void => {
    setVariant(variant === 'add' ? 'update' : 'add')
  }

  const handleEditMedicine = (medicine: getOneMedicine): void => {
    setEditMedicine({
      id: medicine.id,
      nombre: medicine.nombre,
      proveedor: medicine.proveedor,
      costo: medicine.costo,
      precioVenta: medicine.precio_venta
    })
    setVariant('update')
  }

  useEffect(() => {
    if (newUser === null) {
      navigate('/')
    }
  }, [newUser])

  return (
    <section className={styles.home}>

        {
            variant === 'add'
              ? (
                <CreateMedicine />

                )
              : (
                <UpdateMedicine medicine={medicine} editMedicine={editMedicine} handleChangeVariant={handleChangeVariant}/>
                )
        }

        {
            medicine.map(item => {
              return (
                   <MedicineCard key={item.id} item={item} onHandleEditMedicine={handleEditMedicine} handleChangeVariant={handleChangeVariant}/>
              )
            })
        }
    </section>
  )
}
