import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import axios from "axios"
import storage from "../../storage/storage"
import { PaginationControl } from "react-bootstrap-pagination-control"

const Index = () => {

  const [medicamentos,setMedicamentos]= useState([])
  const [isLoading,setIsLoading]=useState(false);
  const [total,setTotal] = useState(0);
  const [page,setPage] = useState(1);
  const [pageSize,setPageSize] = useState(0);
  const navigate = useNavigate();

  useEffect(()=>{
    getMedicamentos(1)
  },[]);
  //obtener lista de medicamentos
  const getMedicamentos = async(page)=>{
    setIsLoading(true)
    const authtoken = storage.get("authToken");
    
    authtoken ?axios.defaults.headers.common['Authorization'] = 'Bearer '+authtoken : axios.defaults.headers.common['Authorization']="";
    
  
    await axios.get("/medicamentos?page="+ page).then(
      response =>{
          (response.status==200)?(setMedicamentos(response.data.medicamento),setTotal(response.data.params.total),setPageSize(10)):""
      }).catch((errors)=>{
          let desc=""

          if(Array.isArray(errors.response.data.message)){
              errors.response.data.message.map((e)=>{desc = desc +"\n- "+e})
              
          }else{
              desc = errors.response.data.message
          }
          Swal.fire({title:desc,icon:"error"})
      },setTimeout(2000));
      
    setIsLoading(false)
  }
  //pagination recibe como parametro page
  const goPage = (p)=>{
    setPage(p);
    getMedicamentos(p)
  }

  //eliminar medicamento
  const deleteMedicamento = (id,name)=>{
    const alert = Swal.mixin({
          buttonsStyling:true
      })
      alert.fire({
          title:'Seguro que quiere eliminar '+name+' con el id '+id+'?',
          icon:'question',
          showCancelButton:true,
          confirmButtonText:'<i class="fa-solid fa-check"></i> Si, borrar',
              cancelButtonText:'<i class="fa-solid fa-ban"></i> Cancel'
      }).then(async (result)=>{
          if(result.isConfirmed){
            await axios.delete("/medicamentos/"+id).then(
              response =>{
                  (response.status==200)?(Swal.fire({title:"Registro eliminado con exito!",icon:'success',buttonsStyling:true}),goPage(page)):"",
                  setTimeout(()=>{navigate("/") 
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
      });
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
    <div className="container pt-5 ">
      <div className="row mt-2">
      <div className="col-md-12">
          <div aria-label="breadcrumb">
            <ol className="breadcrumb float-star">
              <li className="breadcrumb-item active" aria-current="page"><i className="fa-solid fa-clipboard-list"></i> Medicamentos</li>
            </ol>
          </div>
        </div>
      </div>
      <div className="row pt-2 ">
        <div className="col-sm-6">
          <h1>Medicamentos</h1>
        </div>
        <div className="col-md-6 ">
          <Link to={'/create'} className="btn btn-success float-end"><i className="fa-solid fa-plus"></i> Nuevo medicamento</Link>
        </div>
      </div>
      <table className=" pt-3 table table-hover">
        <thead className="table-dark ">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Nombre</th>
            <th scope="col">Costo</th>
            <th scope="col">Precio de venta</th>
            <th scope="col">Proveedor</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            
            medicamentos.map((data,index)=>(
              <tr key={index}>
                <td>{data.id}</td>
                <td>{data.nombre}</td>
                <td>${data.costo}</td>
                <td>${data.precio_venta}</td>
                <td>{data.proveedor}</td>
                <td>
                  <Link to={"/edit/"+data.id} className="btn btn-warning"> <i className="fa fa-pencil-alt"></i></Link>
                  <Link to={"/detail/"+data.id} className="btn btn-primary ms-2"> <i className="fa fa-circle-info"></i></Link>
                  <button onClick={()=>{deleteMedicamento(parseInt(data.id),data.nombre)}} className="btn btn-danger ms-2"><i className="text-white fa fa-trash"></i></button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <PaginationControl changePage={page => goPage(page)} next={true} limit={pageSize} page={page} total={total}></PaginationControl>
    </div>
  )
}

export default Index
