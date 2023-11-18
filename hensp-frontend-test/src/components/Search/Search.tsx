import { useState, useContext } from 'react'

import { AuthContext } from '../../context/AuthContext'

interface SearchProps {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
  fetchMedicine: (search: string) => Promise<void>
}

export const Search = ({ setSearchTerm, fetchMedicine }: SearchProps): JSX.Element => {
  const [search, setSearch] = useState('')

  const { newUser } = useContext(AuthContext)

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    try {
      if (newUser !== null) {
        await fetchMedicine(search)
        setSearchTerm(search)
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }
  return (
    <section>
        <form onSubmit={(e) => {
          void handleSearch(e)
        }}>
            <input onChange={(e) => { setSearch(e.target.value) }} value={search} type="text" />
            <button>Search</button>
        </form>
    </section>
  )
}
