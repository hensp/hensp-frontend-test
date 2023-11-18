import { type MedicineTypes } from '../../types/medicine'
import { type editMedicineForm, type medicineForm } from '../../types/medicineForm'
import { CreateMedicine } from '../CreateMedicine/CreateMedicine'
import { UpdateMedicine } from '../UpdateMedicine/UpdateMedicine'

interface FormProps {
  variant: string
  medicine: MedicineTypes[]
  handleAddMedicine: (medicine: medicineForm) => Promise<void>
  editMedicine: editMedicineForm
  handleChangeVariant: () => void
}
export const Form = ({ variant, handleAddMedicine, medicine, editMedicine, handleChangeVariant }: FormProps): JSX.Element => {
  return (
    <section>
         {
            variant === 'add'
              ? (
                <CreateMedicine onMedicine={handleAddMedicine} />

                )
              : (
                <UpdateMedicine medicine={medicine} editMedicine={editMedicine} handleChangeVariant={handleChangeVariant}/>
                )
        }

    </section>
  )
}
