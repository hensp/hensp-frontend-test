import { useState, useEffect } from 'react';

const fetchData = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch(
      'https://backend-dummy.hospitaldeespecialidades.com.sv/api/medicamentos',
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

function DrugList() {
  const [drugs, setDrugs] = useState([]);

  useEffect(() => {
    fetchData().then((data) => {
      setDrugs(data.medicamento);
      console.log(data);
    });
  }, []);

  return (
    <>
      <div className="App">
        <div className="container-fluid">
          <div className="row mt-3">
            <div className="col-md-4 offset-md-4">
              <div className="d-grid mx-auto">
                <button
                  // onClick={() => openModal(1)}
                  className="btn btn-dark"
                  data-bs-toggle="modal"
                  data-bs-target="#modalProducts">
                  <i className="fa-solid fa-circle-plus"></i> Add
                </button>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12 col-lg-8 offset-0 offset-lg-2">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr className="text-uppercase">
                      <th>#</th>
                      <th>nombre</th>
                      <th>costo</th>
                      <th>precio_venta</th>
                      <th>proveedor</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                    {drugs.map((medicamento) => {
                      return (
                        <tr key={medicamento.id}>
                          <td>{medicamento.id}</td>
                          <td>{medicamento.nombre}</td>
                          <td>
                            {new Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: 'USD',
                            }).format(medicamento.costo)}
                          </td>
                          <td>
                            {new Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: 'USD',
                            }).format(medicamento.precio_venta)}
                          </td>
                          <td>{medicamento.proveedor}</td>
                          <td className="d-flex">
                            <button
                              className="btn btn-warning"
                              data-bs-toggle="modal"
                              data-bs-target="#modalProducts">
                              <i className="fa-solid fa-edit"></i>
                            </button>
                            &nbsp;
                            <button className="btn btn-danger">
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DrugList;
