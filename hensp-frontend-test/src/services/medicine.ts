import { type MedicineTypes } from '../types/medicine'
import { type medicineForm } from '../types/medicineForm'

const API = 'https://backend-dummy.hospitaldeespecialidades.com.sv'

export const getMedicine = async (token: string, search: string): Promise<MedicineTypes[]> => {
  const response = await fetch(`${API}/api/medicamentos?filter=${search}&limit=999`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const data = await response.json()
  const medicine = await data.medicamento

  return medicine
}

export const getMedicineById = async (id: number, token: string): Promise<MedicineTypes> => {
  const response = await fetch(`${API}/api/medicamentos/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return await response.json()
}

export const postMedicine = async (medicine: medicineForm, token: string): Promise<any> => {
  const response = await fetch(`${API}/api/medicamentos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(medicine)

  })

  return await response.json()
}

export const putMedicine = async (id: number, token: string, medicine: medicineForm): Promise<any> => {
  const response = await fetch(`${API}/api/medicamentos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(medicine)
  })
  return await response.json()
}

export const deleteMedicine = async (id: number, token: string): Promise<MedicineTypes> => {
  const response = await fetch(`${API}/api/medicamentos/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return await response.json()
}
