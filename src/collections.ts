import { Bien } from './bienes.js';
import { Mercader, Tipo_mercader, Ubicacion } from './mercaderes.js';
import { Cliente, Raza } from './clientes.js';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';


type Data_bienes = { bienes: { id: number; nombre: string; description: string; material: string; peso: number; precio: number; }[] };

type Data_mercaderes = { mercaderes: { id: number; name: string; type: Tipo_mercader; location: Ubicacion; }[] };

type Data_clientes = { clientes: { id: number; name: string; race: Raza; location: Ubicacion; }[] };


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

  async loadFromDB(dbFile: string) {
    if (!dbFile) return;

    const adapter = new JSONFile<Data_bienes>(dbFile);
    const db = new Low(adapter, { bienes: [] });

    await db.read();

    if (!db.data || !db.data.bienes) {
      db.data = { bienes: [] };
    }

    // Convertimos los datos JSON en instancias de Bien
    this._list = db.data.bienes.map(b => Bien.fromJSON(b));

  }

  async saveToDB(dbFile: string) {
    if (!dbFile) return;

    const adapter = new JSONFile<Data_bienes>(dbFile);
    const db = new Low(adapter, { bienes: [] });

    // Guardamos en JSON con un formato válido
    db.data.bienes = this._list.map(b => b.toJSON());
    await db.write();
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
  removeBien(bien: number) {
    this._list = this._list.filter(m => m.id !== bien);
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
  
  async loadFromDB(dbFile: string) {
    if (!dbFile) return;

    const adapter = new JSONFile<Data_mercaderes>(dbFile);
    const db = new Low(adapter, { mercaderes: [] });

    await db.read();

    if (!db.data || !db.data.mercaderes) {
      db.data = { mercaderes: [] };
    }

    // Convertimos los datos JSON en instancias de Bien
    this._list = db.data.mercaderes.map(b => Mercader.fromJSON(b));

  }

  async saveToDB(dbFile: string) {
    if (!dbFile) return;

    const adapter = new JSONFile<Data_mercaderes>(dbFile);
    const db = new Low(adapter, { mercaderes: [] });

    // Guardamos en JSON con un formato válido
    db.data.mercaderes = this._list.map(b => b.toJSON());
    await db.write();
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
  removeMercader(id: number) {
    this._list = this._list.filter(m => m.id !== id);
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
  
  async loadFromDB(dbFile: string) {
    if (!dbFile) return;

    const adapter = new JSONFile<Data_clientes>(dbFile);
    const db = new Low(adapter, { clientes: [] });

    await db.read();

    if (!db.data || !db.data.clientes) {
      db.data = { clientes: [] };
    }

    // Convertimos los datos JSON en instancias de Bien
    this._list = db.data.clientes.map(b => Cliente.fromJSON(b));

  }

  async saveToDB(dbFile: string) {
    if (!dbFile) return;

    const adapter = new JSONFile<Data_clientes>(dbFile);
    const db = new Low(adapter, { clientes: [] });

    // Guardamos en JSON con un formato válido
    db.data.clientes = this._list.map(b => b.toJSON());
    await db.write();
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
  removeCliente(id: number) {
    this._list = this._list.filter(c => c.id !== id);
  }
}