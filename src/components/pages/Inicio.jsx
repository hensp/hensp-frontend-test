import React from 'react'
import {Link} from "react-router-dom"

export const Inicio = () => {
  return (
    <div className='jumbo'>
      <h1>Bienvenido a la farmacia migueleña</h1>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores, numquam assumenda optio, excepturi quia aspernatur quidem cum aperiam quo sunt tempora eos! Libero temporibus est pariatur, iusto sunt quisquam labore!</p>

      <Link to="/medicamentos" className='button'>Ver los medicamentos</Link>
      
    </div>
  )
}
