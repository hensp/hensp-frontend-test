import { useState, useContext, useEffect } from 'react'
import { getMedicine } from '../services/medicine'
import { AuthContext } from '../context/AuthContext'
import { type MedicineTypes } from '../types/medicine'

interface useGetMedicinesTypes {
  medicine: MedicineTypes[]
}

export const useGetMedicines = (): useGetMedicinesTypes => {
  const [medicine, setMedicine] = useState<MedicineTypes[]>([])

  const { newUser } = useContext(AuthContext)

  const fetchMedicine = async (): Promise<void> => {
    try {
      if ((newUser?.token) != null) {
        const response = await getMedicine(newUser?.token)
        setMedicine(response)
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }
  useEffect(() => {
    void fetchMedicine()
  }, [newUser])

  return { medicine }
}
