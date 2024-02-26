import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import storage from "../../storage/storage";

const Create = () => {

  const [nombre,setNombre] = useState('')
  const [proveedor,setProveedor] = useState('')
  const [precio_compra,setPrecioCompra] = useState('')
  const [precio_venta,setPrecioVenta] = useState('')

  const navigate = useNavigate()
  //Guardar Medicamento
  const addMedicamento= async(e) =>{
    e.preventDefault();
    const form = {
      nombre:nombre,
      proveedor:proveedor,
      costo:parseInt(precio_compra),
      precioVenta:parseInt(precio_venta)
    }
    
    const authtoken = storage.get("authToken");
    axios.defaults.headers.common['Authorization'] = 'Bearer '+authtoken;

    
    // eslint-disable-next-line no-unused-vars
    let res;
    await axios.post("/medicamentos",form).then(
      response =>{
          res = response.data,
          (response.status==201)?(Swal.fire({title:"Registro guardado con exito! ",icon:'success',buttonsStyling:true}),setNombre(''),setProveedor(''),setPrecioVenta(''),setPrecioCompra('')):"",
          setTimeout(()=>{navigate("/create") 
           ,2000})
          
      }).catch((errors)=>{
          let desc=""
          if(Array.isArray(errors.response.data.message)){
              errors.response.data.message.map((e)=>{desc = desc +"\n- "+e})
              
          }else{
              desc = errors.response.data.message
          }
          Swal.fire({title:desc,icon:"error"})
      });
  }
  return (
    <div className="container mt-5">
    <div className="row mt-2">
      <div className="col-md-6">
          <div aria-label="breadcrumb">
            <ol className="breadcrumb float-star">
            <Link to={"/"} className="breadcrumb-item" ><i className="fa-solid fa-clipboard-list"></i> Medicamentos</Link>
              <li className="breadcrumb-item active" aria-current="page"><i className="fa-solid fa-prescription-bottle-medical"></i> Registrar Medicamento</li>
             
            </ol>
          </div>
      </div>
      <div className="col-md-6">
         <Link to={"/"} className="btn btn-primary float-end"> <i className="fas fa-arrow-circle-left"></i> Regresar</Link>
      </div>
    </div>
    <div className="row justify-content-center">
      <div className="col-md-4 col-lg-4 col-sm-6 mt-5">
        <div className="card border border-success">
          <div className="card-header">
            <h5 className="card-title">Registrar Medicamento</h5>
          </div>
          <div className="card-body">
          
            <form className="mt-4" onSubmit={addMedicamento}>
              <div className="form-floating mb-3">
                <input type="text" value={nombre} name="nombre" onChange={(e)=>{setNombre(e.target.value)}} className="form-control rounded-left" id="idNombre" placeholder="nombre"/>
                <label htmlFor="floatingInput">Nombre</label>
              </div>
              <div className="form-floating mb-3">
                <input type="proveedor" value={proveedor} name="proveedor" onChange={(e)=>{setProveedor(e.target.value)}} className="form-control rounded-left" id="idProveedor" placeholder="proveedor"/>
                <label htmlFor="floatingInput">proveedor</label>
              </div>
              <div className="form-floating mb-3">
                <input type="number" value={precio_compra} min={0} name="precio_compra"  onChange={(e)=>{setPrecioCompra(e.target.value)}} className="form-control rounded-left" id="idPrecioCompra" placeholder="precio de compra"/>
                <label htmlFor="floatingInput">precio de compra</label>
              </div>
              <div className="form-floating mb-3">
                <input type="number" value={precio_venta} min={0} name="precio_venta" onChange={(e)=>{setPrecioVenta(e.target.value)}} className="form-control rounded-left" id="idPrecioVenta" placeholder="precio de venta"/>
                <label htmlFor="floatingInput">precio de venta</label>
              </div>
              <button type="submit" className="btn btn-success mt-4">Guardar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
export default Create