import { Bien } from './bienes';
import { Mercader } from './mercaderes';
import { Cliente } from './clientes';

class BienesCollections implements Bien {
  private _bienes: Bien[];

  constructor(bienes: Bien[]) {
    this._bienes = bienes;
  }

  get bienes(): Bien[] {
    return this._bienes;
  }

  set bienes(bienes: Bien[]) {
    this._bienes = bienes;
  }

  addBien(bien: Bien) {
    this._bienes.push(bien);
  }

  removeBien(bien: Bien) {
    this._bienes = this._bienes.filter(b => b.id !== bien.id);
  }
}

class MercaderCollections implements Mercader {
  private _mercaderes: Mercader[];

  constructor(mercaderes: Mercader[]) {
    this._mercaderes = mercaderes;
  }

  get mercaderes(): Mercader[] {
    return this._mercaderes;
  }

  set mercaderes(mercaderes: Mercader[]) {
    this._mercaderes = mercaderes;
  }

  addMercader(mercader: Mercader) {
    this._mercaderes.push(mercader);
  }

  removeMercader(mercader: Mercader) {
    this._mercaderes = this._mercaderes.filter(m => m.id !== mercader.id);
  }
}

class ClienteCollections implements Cliente {
  private _clientes: Cliente[];

  constructor(clientes: Cliente[]) {
    this._clientes = clientes;
  }

  get clientes(): Cliente[] {
    return this._clientes;
  }

  set clientes(clientes: Cliente[]) {
    this._clientes = clientes;
  }

  addCliente(cliente: Cliente) {
    this._clientes.push(cliente);
  }

  removeCliente(cliente: Cliente) {
    this._clientes = this._clientes.filter(c => c.id !== cliente.id);
  }
}