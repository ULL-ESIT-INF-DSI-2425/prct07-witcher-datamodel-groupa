import { Bien } from './bienes.js';
import { Mercader } from './mercaderes.js';
import { Cliente } from './clientes.js';

/**
 * Clase que representa una colección de bienes
 */
export class BienCollections {
  private _list: Bien[];

  constructor(bienes: Bien[]) {
    this._list = bienes;
  }

  get bienes(): Bien[] {
    return this._list;
  }

  set bienes(bienes: Bien[]) {
    this._list = bienes;
  }

  /**
   * Añade un bien a la colección
   * @param bien - Bien a añadir
   */
  addBien(bien: Bien) {
    this._list.push(bien);
  }

  /**
   * Elimina un bien de la colección
   * @param bien - Bien a eliminar
   */
  removeBien(bien: Bien) {
    this._list = this._list.filter(b => b.id !== bien.id);
  }
}

/**
 * Clase que representa una colección de mercaderes
 */
export class MercaderCollections {
  private _list: Mercader[];

  constructor(mercaderes: Mercader[]) {
    this._list = mercaderes;
  }

  get mercaderes(): Mercader[] {
    return this._list;
  }

  set mercaderes(mercaderes: Mercader[]) {
    this._list = mercaderes;
  }

  /**
   * Añade un mercader a la colección
   * @param mercader - Mercader a añadir
   */
  addMercader(mercader: Mercader) {
    this._list.push(mercader);
  }

  /**
   * Elimina un mercader de la colección
   * @param mercader - Mercader a eliminar
   */
  removeMercader(mercader: Mercader) {
    this._list = this._list.filter(m => m.id !== mercader.id);
  }
}
/**
 * Clase que representa una colección de clientes
 */
export class ClienteCollections {
  private _list: Cliente[];

  constructor(clientes: Cliente[]) {
    this._list = clientes;
  }

  get clientes(): Cliente[] {
    return this._list;
  }

  set clientes(clientes: Cliente[]) {
    this._list = clientes;
  }

  /**
   * Añade un cliente a la colección
   * @param cliente - Cliente a añadir
   */
  addCliente(cliente: Cliente) {
    this._list.push(cliente);
  }

  /**
   * Elimina un cliente de la colección
   * @param cliente - Cliente a eliminar
   */
  removeCliente(cliente: Cliente) {
    this._list = this._list.filter(c => c.id !== cliente.id);
  }
}