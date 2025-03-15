
import { Bien } from "./bienes";
import { Mercader, Ubicacion, Tipo_mercader } from "./mercaderes";
import { Cliente, Raza } from "./clientes";

/**
 * Clase que representa una posada
 */
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

  /**
   * Añade un bien a la posada
   * @param bien - Bien a añadir
   */
  addBien(bien: Bien) {
    this._bienes.push(bien);
  }

  /**
   * Elimina un bien de la posada
   * @param bien - Bien a eliminar
   */
  removeBien(bien: Bien) {
    this._bienes = this._bienes.filter(b => b.id !== bien.id);
  }

  /**
   * Añade un mercader a la posada
   * @param mercader - Mercader a añadir
   */
  addMercader(mercader: Mercader) {
    this._mercaderes.push(mercader);
  }

  /**
   * Elimina un mercader de la posada
   * @param mercader - Mercader a eliminar
   */
  removeMercader(mercader: Mercader) {
    this._mercaderes = this._mercaderes.filter(merc => merc.id !== mercader.id);
  }

  /**
   * Añade un cliente a la posada
   * @param cliente - Cliente a añadir
   */
  addCliente(cliente: Cliente) {
    this._clientes.push(cliente);
  }

  /**
   * Elimina un cliente de la posada
   * @param cliente - Cliente a eliminar
   */
  removeCliente(cliente: Cliente) {
    this._clientes = this._clientes.filter(ccli => ccli.id !== cliente.id);
  }  

}

