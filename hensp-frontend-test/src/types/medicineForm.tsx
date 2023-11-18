export interface medicineForm {
  nombre: string
  proveedor: string
  costo: number
  precioVenta: number
}

export interface getOneMedicine {
  id: number
  nombre: string
  proveedor: string
  costo: number
  precio_venta: number
}

export interface editMedicineForm {
  id: number
  nombre: string
  proveedor: string
  costo: number
  precioVenta: number
}
