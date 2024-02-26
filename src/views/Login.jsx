import { useState } from "react"
import img from "../assets/img/logo.png"
import { useNavigate } from "react-router-dom"
import storage from "../storage/storage"
import axios from "axios"
import Swal from "sweetalert2"

const Login = () => {

  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  

  const navigate = useNavigate()

  const login = async(e) =>{
    e.preventDefault();
    const form = {usuario:username,password:password}
    // eslint-disable-next-line no-unused-vars
    let res;
    // peticion login axios
    await axios.post("/auth/login",form).then(
      response =>{
          res = response.data,
          (response.ok)?Swal.fire({title:"Bienvenido "+response.user.nombre,icon:'success',buttonsStyling:true}):"",
          setTimeout(()=>{navigate("/") 
          ,storage.set('authToken',res.token),
          storage.set('authUser', res.user.username) ,2000})
          
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
    <div className="row justify-content-center">
      <div className="col-md-4 col-lg-4 mt-5">
        <div className="card">
          <div className="card-body">
            <img src={img} className="mx-auto d-block img-fluid" alt="" />
            <form className="mt-4" onSubmit={login}>
              <div className="form-group mb-3">
                <input type="text"  onChange={(e)=>{setUsername(e.target.value)}} className="form-control rounded-left" id="username" placeholder="Username"/>
              </div>
              <div className="form-group">
                <input type="password" onChange={(e)=>{setPassword(e.target.value)}} className="form-control rounded-left" id="password" placeholder="Password"/>
              </div>
              <button type="submit" className="btn btn-primary mt-4">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
      
  )
}

export default Login