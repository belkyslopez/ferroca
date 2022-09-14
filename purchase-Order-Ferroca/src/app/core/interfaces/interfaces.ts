 export interface Usuario {
  _id: string,
  name?: string;
  surname?: string; 
  email?: string;
  password?: string; 
  address?: string;
  phone: number;
  rut: number;
  }

export interface Cliente {
    email?: string;
    address?: string;
    rs?: string;
    phone: number;
    rut: number;
  }

export interface Token {
  sub?: string;
  name?: string;
  surname?: string;
  email: number;
  rolName: number;
  image: string;
  iat:string;
}

export interface Producto {
  _id: string;
  name?: string;
  image?: string;
  description ?: string;
  price? : number;
  createdAt? : string;
  updatedAt? : string;
  stock? : string;
  // cantidad : number;
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