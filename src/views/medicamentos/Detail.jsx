import axios from "axios";
import { useState,useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import storage from "../../storage/storage";

const Detail = () => {
  const [nombre,setNombre] = useState('')
  const [proveedor,setProveedor] = useState('')
  const [precio_compra,setPrecioCompra] = useState('')
  const [precio_venta,setPrecioVenta] = useState('')

  const [isLoading,setIsLoading] = useState(false)


  const params = useParams();

  useEffect(()=>{
    getMedicamento()
  },[]);

  //Detalle medicamento
  const getMedicamento = async()=>{
    
    setIsLoading(true)

    const authtoken = storage.get("authToken");
        axios.defaults.headers.common['Authorization'] = 'Bearer '+authtoken;
    await axios.get("medicamentos/"+params.id,).then( response =>{
      (response.status==200)?(setNombre(response.data[0].nombre),setProveedor(response.data[0].proveedor),setPrecioVenta(response.data[0].precio_venta),setPrecioCompra(response.data[0].costo)):""
    }).catch((errors)=>{
      let desc=""
      if(Array.isArray(errors.response.data.message)){
          errors.response.data.message.map((e)=>{desc = desc +"\n- "+e})
          
      }else{
          desc = errors.response.data.message
      }
      Swal.fire({title:desc,icon:"error"})
  });
    setIsLoading(false)
  }

  if(isLoading){
    return(
      <div className="container pt-5">
        <div className="row pt-5">
          <div className="d-flex justify-content-center">
          <p className="fs-2 pe-3">Loading... </p>  
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>  
        </div>
      </div>
      )
  }
  return (
    <div className="container mt-5">
    <div className="row mt-2">
      <div className="col-md-6">
          <div aria-label="breadcrumb">
            <ol className="breadcrumb float-star">
            <Link to={"/"} className="breadcrumb-item" ><i className="fa-solid fa-clipboard-list"></i> Medicamentos</Link>
              <li className="breadcrumb-item active" aria-current="page"><i className="fa-solid fa-prescription-bottle-medical"></i> Detalle Medicamento</li>
             
            </ol>
          </div>
      </div>
      <div className="col-md-6">
         <Link to={"/"} className="btn btn-primary float-end"> <i className="fas fa-arrow-circle-left"></i> Regresar</Link>
      </div>
    </div>
    <div className="row justify-content-center">
      <div className="col-md-4 col-lg-4 col-sm-6 mt-4">
        <div className="card border border-primary">
          <div className="card-header">
            <h5 className="card-title">Detalle Medicamento</h5>
          </div>
          <div className="card-body">
          
            <form className="mt-4" >
              <div className="form-floating mb-3">
                <input type="text" value={nombre} name="nombre" disabled  className="form-control rounded-left" id="idNombre" placeholder="nombre"/>
                <label htmlFor="floatingInput">Nombre</label>
              </div>
              <div className="form-floating mb-3">
                <input type="proveedor" value={proveedor} name="proveedor" disabled className="form-control rounded-left" id="idProveedor" placeholder="proveedor"/>
                <label htmlFor="floatingInput">proveedor</label>
              </div>
              <div className="form-floating mb-3">
                <input type="number" value={precio_compra} min={0} name="precio_compra" disabled className="form-control rounded-left" id="idPrecioCompra" placeholder="precio de compra"/>
                <label htmlFor="floatingInput">precio de compra</label>
              </div>
              <div className="form-floating mb-3">
                <input type="number" value={precio_venta} min={0} name="precio_venta" disabled className="form-control rounded-left" id="idPrecioVenta" placeholder="precio de venta"/>
                <label htmlFor="floatingInput">precio de venta</label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
export default Detail