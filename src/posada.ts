
import { Bien } from "./bienes";
import { Mercader, Ubicacion, Tipo_mercader } from "./mercaderes";
import { Cliente, Raza } from "./clientes";


export class Posada {
  private _bienes: Bien[];
  private _mercaderes: Mercader[];
  private _clientes: Cliente[];
  
  constructor(bienes: Bien[], mercaderes: Mercader[], clientes: Cliente[]) {
    this._bienes = bienes;
    this._mercaderes = mercaderes;
    this._clientes = clientes;
  }
  
  get bienes(): Bien[] {
    return this._bienes;
  }

  get mercaderes(): Mercader[] {
    return this._mercaderes;
  }

  get clientes(): Cliente[] {
    return this._clientes;
  }

  set bienes(bienes: Bien[]) {
    this._bienes = bienes;
  }

  set mercaderes(mercaderes: Mercader[]) {
    this._mercaderes = mercaderes;
  }

  set clientes(clientes: Cliente[]) {
    this._clientes = clientes;
  }

}

