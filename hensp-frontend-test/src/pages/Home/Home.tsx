import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useGetMedicines } from '../../hooks/useGetMedicines'
import { MedicineCard } from '../../components/MedicineCard/MedicineCard'
import styles from './home.module.css'
import { type medicineForm, type editMedicineForm, type getOneMedicine } from '../../types/medicineForm'
import { Search } from '../../components/Search/Search'
import { deleteMedicine, postMedicine } from '../../services/medicine'
import { Form } from '../../components/Form/Form'

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

  const { medicine, handleLoading, loading, setSearchTerm, fetchMedicine } = useGetMedicines()

  const navigate = useNavigate()

  const handleChangeVariant = (): void => {
    setVariant(variant === 'add' ? 'update' : 'add')
  }

  const handleAddMedicine = async (medicine: medicineForm): Promise<void> => {
    try {
      if (newUser !== null) {
        const newMedicine: medicineForm = {
          nombre: medicine.nombre,
          proveedor: medicine.proveedor,
          costo: Number(medicine.costo),
          precioVenta: Number(medicine.precioVenta)
        }
        await postMedicine(newMedicine, newUser?.token)
      }
    } catch (error: any) {
      throw new Error(error)
    } finally {
      handleLoading(!loading)
    }
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

  const handleDelete = async (id: number): Promise<void> => {
    try {
      if (newUser !== null) {
        await deleteMedicine(id, newUser?.token)
      }
    } catch (error: any) {
      throw new Error(error)
    } finally {
      handleLoading(!loading)
    }
  }

  useEffect(() => {
    if (newUser === null) {
      navigate('/')
    }
  }, [newUser])

  useEffect(() => {
    handleLoading(!loading)
  }, [variant])

  return (
    <section className={styles.home}>

      <Search setSearchTerm ={setSearchTerm} fetchMedicine={fetchMedicine}/>

        <Form editMedicine={editMedicine} handleAddMedicine={handleAddMedicine} medicine={medicine} handleChangeVariant={handleChangeVariant} variant={variant}/>

        <p>Total: {medicine.length}</p>

        {
            medicine.map(item => {
              return (
                   <MedicineCard key={item.id} item={item} onHandleEditMedicine={handleEditMedicine} handleChangeVariant={handleChangeVariant} handleDelete={handleDelete}/>
              )
            })
        }
    </section>
  )
}
