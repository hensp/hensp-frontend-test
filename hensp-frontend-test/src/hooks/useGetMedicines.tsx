import { useState, useContext, useEffect } from 'react'
import { getMedicine } from '../services/medicine'
import { AuthContext } from '../context/AuthContext'
import { type MedicineTypes } from '../types/medicine'

interface useGetMedicinesTypes {
  medicine: MedicineTypes[]
  loading: boolean
  handleLoading: (value: boolean) => void
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
  fetchMedicine: (search: string) => Promise<void>

}

export const useGetMedicines = (): useGetMedicinesTypes => {
  const [medicine, setMedicine] = useState<MedicineTypes[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const { newUser } = useContext(AuthContext)

  const fetchMedicine = async (search: string): Promise<void> => {
    try {
      if ((newUser?.token) != null) {
        const response = await getMedicine(newUser?.token, search)

        setMedicine(response)
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }

  const handleLoading = (value: boolean): void => {
    setLoading(value)
  }

  useEffect(() => {
    void fetchMedicine(searchTerm)
  }, [newUser, loading])

  return { medicine, loading, handleLoading, setSearchTerm, fetchMedicine }
}
