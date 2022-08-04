 export interface Usuario {
    nombre?: string;
    apellido?: string; 
    correo?: string;
    clave?: string; 
    direccion?: string;
    img?: string[];
    telefono: number;
    rut: number;
  }

export interface Cliente {
    nombre?: string;
    correo?: string;
    direccion?: string;
    img?: string[];
    telefono: number;
    rut: number;
  }

export interface Producto {
    nombre?: string;
    descripcion ?: string;
    img ?: string[];
    cantidad : number;
    precio : number;
  }

export interface OrdenCompra {
    usuario?: Usuario;
    producto?: Producto;
    direccion?: string;
    numeroOrdenCompra : number;
    fecha : Date;
    estado?: string; 
  }

export interface ListadoOrdenes {
    ordenCompra?: OrdenCompra[];
  }

export interface Catalogo {
    producto?: Producto[];
  }

export interface inventario {
    producto?: Producto[];
  }