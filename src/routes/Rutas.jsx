
import { BrowserRouter,Routes,Route } from "react-router-dom"
import Nav from "../components/Layouts/Nav"
import Create from "../views/medicamentos/Create"
import Index from "../views/medicamentos/Index"
import Edit from "../views/medicamentos/Edit"
import Detail from "../views/medicamentos/Detail"
import Login from "../views/Login"
import ProtectedRoutes from "../components/ProtectedRoutes"
import NotFound from "../views/errors/NotFound"

const Rutas = () => {
  return (
    <BrowserRouter>
      <Nav/>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route element={<ProtectedRoutes/>}>
          <Route path="/" element={<Index/>}/>
          <Route path="/medicamentos" element={<Index/>}/>
          <Route path="/create" element={<Create/>}/>
          <Route path="/edit/:id" element={<Edit/>}/>
          <Route path="/detail/:id" element={<Detail/>}/>
        </Route>
        <Route path="*" element={<NotFound/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Rutas