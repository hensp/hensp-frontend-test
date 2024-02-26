import { Link, useNavigate } from "react-router-dom"
import storage from "../../storage/storage"
import img from "../../assets/img/logo.png"
const Nav = () => {

  const navigate = useNavigate();
  const loguot = async()=>{
    storage.clear()
    navigate("/login");
  }
  return (
    <>
    {
    storage.get("authUser") ? (
    <div className="container pt-4">
      <nav className="navbar rounded-3 navbar-expand-lg bg-body-tertiary shadow p-4" >
        
          <Link className="navbar-brand " to={'/medicamentos'}>
            <img src={img} alt="logo" width="250" className="d-inline-block align-text-top"/>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
         
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item dropdown border border-secundary border-3 rounded">
                <a className="nav-link dropdown-toggle fs-5" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="fa-solid fa-circle-user"></i> { storage.get("authUser")}
                </a>
                <ul className="dropdown-menu ml-5">
                  <li><button className="dropdown-item" href="#" onClick={loguot}>Cerrar Sesion</button></li>
                </ul>
              </li>
            </ul>
          </div>
          
      </nav>
    </div>
    ):''}
  </>
  )
}

export default Nav