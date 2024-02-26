
import Rutas from "./routes/Rutas"
import axios from "axios";
import storage from "./storage/storage";


function App() {
  axios.interceptors.response.use(
    function (response) {
        return response
    },
    function (error) {

      //manejo de error 403 
        if (error.response.status === 403) {
          setTimeout(()=>{location.href="/login",storage.clear()},2000)
        }
      //manejo de error 404 
        if (error.response.status === 404) {
          location.href="/notFound"
        }
        return Promise.reject(error);
    }
  )
  
  return (
    <>
    <Rutas/>
    </>
  )
}

export default App
