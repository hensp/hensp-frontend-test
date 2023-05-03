import { useState, useEffect } from 'react';
import { show_alert } from '../functions';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const BASE_URL = `https://backend-dummy.hospitaldeespecialidades.com.sv/api/medicamentos`;
const accessToken = localStorage.getItem('accessToken');

function DrugList() {
  const [drugs, setDrugs] = useState([]);

  // READ OPERATION
  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await response.json();
      setDrugs(data.medicamento);
      console.log(data.medicamento);
    } catch (error) {
      console.error(error);
    }
  };

  const sendRequest = async ({ method, path = '', body }, message) => {
    try {
      const response = await fetch(`${BASE_URL}/${path}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: body ? JSON.stringify(body) : null,
      });

      const data = await response.json();
      console.log(`${method}`, response.status, data);

      if (response.ok) {
        show_alert(`Producto ${message}`, 'success');
        document.getElementById('btnClose').click();
        fetchData();
      }
    } catch (error) {
      show_alert('Error en la solicitud', 'error');
      console.error(error);
    }
  };

  // DELETE OPERATION
  const deleteProduct = async (id, name) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: `¿Seguro de eliminar el producto ${name}?`,
      icon: 'question',
      text: 'No se podrá dar marcha atrás',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        setId(id);
        sendRequest({ method: 'DELETE', path: id.toString() }, 'eliminado');
      } else {
        show_alert('El producto NO fue eliminado', 'info');
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [operation, setOperation] = useState(1);
  const [title, setTitle] = useState('');
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [supplier, setSupplier] = useState('');
  const [cost, setCost] = useState('');
  const [salePrice, setSalePrice] = useState('');

  const openModal = (op, { id, name, supplier, cost, salePrice }) => {
    setOperation(op);
    setId('');
    setName('');
    setSupplier('');
    setCost('');
    setSalePrice('');

    if (op === 1) {
      setTitle('Registrar Producto');
    } else if (op === 2) {
      setTitle('Editar Producto');
      setId(id);
      setName(name);
      setSupplier(supplier);
      setCost(cost);
      setSalePrice(salePrice);
    }

    // focus first input of form
    window.setTimeout(function () {
      document.getElementById('name').focus();
    }, 500);
  };

  const validateData = () => {
    if (name.trim() === '') {
      show_alert(`Escribe el nombre del medicamento`);
    } else if (cost === '') {
      show_alert(`Escribe el costo del medicamento`);
    } else if (salePrice === '') {
      show_alert(`Escribe el precio de venta del medicamento`);
    } else if (supplier.trim() === '') {
      show_alert(`Escribe el proveedor del medicamento`);
    } else {
      if (operation === 1) {
        sendRequest(
          {
            method: 'POST',
            body: {
              nombre: name.trim(),
              proveedor: supplier.trim(),
              costo: Number.parseInt(cost),
              precioVenta: Number.parseInt(salePrice),
            },
          },
          'guardado'
        );
      } else {
        sendRequest(
          {
            method: 'PUT',
            body: {
              nombre: name.trim(),
              proveedor: supplier.trim(),
              costo: Number.parseInt(cost),
              precioVenta: Number.parseInt(salePrice),
            },
            path: id.toString(),
          },
          'actualizado'
        );
      }
    }
  };

  return (
    <>
      <div className="App">
        {/* TABLE COMPONENT */}
        <div className="container-fluid">
          <div className="row mt-3">
            <div className="col-md-4 offset-md-4">
              <div className="d-grid mx-auto">
                <button
                  onClick={() => openModal(1, {})}
                  className="btn btn-dark"
                  data-bs-toggle="modal"
                  data-bs-target="#modalProducts">
                  <i className="fa-solid fa-circle-plus"></i> Añadir
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
                          <td className="">
                            <button
                              onClick={() =>
                                openModal(2, {
                                  id: medicamento.id,
                                  name: medicamento.nombre,
                                  cost: medicamento.costo,
                                  salePrice: medicamento.precio_venta,
                                  supplier: medicamento.proveedor,
                                })
                              }
                              className="btn btn-warning"
                              data-bs-toggle="modal"
                              data-bs-target="#modalProducts">
                              <i className="fa-solid fa-edit"></i>
                            </button>
                            &nbsp;
                            <button
                              onClick={() => {
                                deleteProduct(
                                  medicamento.id,
                                  medicamento.nombre
                                );
                              }}
                              className="btn btn-danger">
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

        {/* MODAL COMPONENT */}
        <div id="modalProducts" className="modal fade" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <label className="h5">{title}</label>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"></button>
              </div>

              <div className="modal-body">
                <input type="hidden" id="id" />

                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="fa-solid fa-prescription-bottle-medical"></i>
                  </span>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    placeholder="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="fa-sharp fa-solid fa-dollar-sign"></i>
                  </span>
                  <input
                    type="number"
                    min={1}
                    max={999}
                    id="cost"
                    className="form-control"
                    placeholder="Costo"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                  />
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="fa-sharp fa-solid fa-dollar-sign"></i>
                  </span>
                  <input
                    type="number"
                    min={1}
                    max={999}
                    id="salePrice"
                    className="form-control"
                    placeholder="Precio de venta"
                    value={salePrice}
                    onChange={(e) => setSalePrice(e.target.value)}
                  />
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="fa-sharp fa-solid fa-parachute-box"></i>
                  </span>
                  <input
                    type="text"
                    id="supplier"
                    className="form-control"
                    placeholder="Proveedor"
                    value={supplier}
                    onChange={(e) => setSupplier(e.target.value)}
                  />
                </div>

                <div className="d-grid col-6 mx-auto">
                  <button
                    onClick={() => validateData()}
                    className="btn btn-success">
                    <i className="fa-solid fa-floppy-disk"></i> Guardar
                  </button>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  id="btnClose"
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal">
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DrugList;
