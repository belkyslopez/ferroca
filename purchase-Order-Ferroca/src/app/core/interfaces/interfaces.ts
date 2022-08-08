 export interface Usuario {
  name?: string;
  surname?: string; 
  email?: string;
  password?: string; 
   /* direccion?: string;
    img?: string[];
    telefono: number;
    rut: number;*/
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
  name?: string;
  description ?: string;
    img ?: string[];
   // cantidad : number;
    price : number;
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

export interface Componente{
  icon : string;
  name : string;
  redirecTo: string; 
}