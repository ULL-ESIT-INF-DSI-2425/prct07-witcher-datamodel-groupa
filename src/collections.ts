import { Bien } from './bienes.js';
import { Mercader, Tipo_mercader, Ubicacion } from './mercaderes.js';
import { Cliente, Raza } from './clientes.js';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

/**
 * Tipos de datos específicos para poder llevar a cabo las funciones de LowDB
 */
type Data_bienes = { bienes: { id: number; nombre: string; description: string; material: string; peso: number; precio: number; }[] };
type Data_mercaderes = { mercaderes: { id: number; name: string; type: Tipo_mercader; location: Ubicacion; }[] };
type Data_clientes = { clientes: { id: number; name: string; race: Raza; location: Ubicacion; }[] };


/**
 * Clase que representa una colección de bienes
 */
export class BienCollections {
  private _list: Bien[];
  /**
   * Constructor de la clase BienCollections
   * @param bienes Bienes a colocar en la colección
   */
  constructor(bienes: Bien[]) {
    this._list = bienes;
  }

  /**
   * Métodos de acceso a los atributos privados de la clase
   */

  get bienes(): Bien[] {
    return this._list;
  }

  set bienes(bienes: Bien[]) {
    this._list = bienes;
  }
  /**
   * Función que se encarga de cargar los datos de un .json en la colección de clientes
   * @param dbFile Nombre del fichero .json del que se extraerán los datos
   * @returns Nada, termina el proceso en caso de que no exista el fichero
   */
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
  /**
   * Función que se encarga de tranformar los datos a un formato adecuado para almacenarse en un .json
   * @param dbFile Nombre del fichero a guardar
   * @returns Nada, sirve para terminar la función en caso de que no exista el fichero
   */
  async saveToDB(dbFile: string) {
    if (!dbFile) return;

    const adapter = new JSONFile<Data_bienes>(dbFile);
    const db = new Low(adapter, { bienes: [] });

    // Guardamos en JSON con un formato válido
    db.data.bienes = this._list.map(b => b.toJSON());
    await db.write();
  }

  /**
   * Método que añade un bien a la colección
   * @param bien - Bien a añadir
   */
  addBien(bien: Bien) {
    this._list.push(bien);
  }

  /**
   * Método que elimina un bien de la colección
   * @param bien - Bien a eliminar
   */
  removeBien(bien: number) {
    this._list = this._list.filter(m => m.id !== bien);
  }
  /**
   * Método que se encarga de modificar un Bien con un ID específico
   * @param bien Bien ya construido, que sustituirá al viejo
   */
  modBien(bien: Bien) {
    this._list = this._list.map(b => b.id === bien.id ? bien: b);
  }
  /**
   * Método que se encarga de encontrar una id específica en el array
   * @param id ID a buscar entre todos los bienes
   * @returns True si esa ID está en el array, false si no
   */
  checkID(id: number): boolean {
    return this._list.some(b => b.id === id);
  }
}

/**
 * Clase que representa una colección de mercaderes
 */
export class MercaderCollections {
  private _list: Mercader[];
  /**
   * Constructor principal de la clase MercaderCollections
   * @param mercaderes Array de mercaderes ya establecidos
   */
  constructor(mercaderes: Mercader[]) {
    this._list = mercaderes;
  }
  /**
   * Métodos de acceso a los datos de los atributos privados de la clase
   */

  get mercaderes(): Mercader[] {
    return this._list;
  }

  set mercaderes(mercaderes: Mercader[]) {
    this._list = mercaderes;
  }
  /**
   * Función que se encarga de cargar los datos de un .json en la colección de clientes
   * @param dbFile Nombre del fichero .json del que se extraerán los datos
   * @returns Nada, termina el proceso en caso de que no exista el fichero
   */
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
  /**
   * Función que se encarga de tranformar los datos a un formato adecuado para almacenarse en un .json
   * @param dbFile Nombre del fichero a guardar
   * @returns Nada, sirve para terminar la función en caso de que no exista el fichero
   */
  async saveToDB(dbFile: string) {
    if (!dbFile) return;

    const adapter = new JSONFile<Data_mercaderes>(dbFile);
    const db = new Low(adapter, { mercaderes: [] });

    // Guardamos en JSON con un formato válido
    db.data.mercaderes = this._list.map(b => b.toJSON());
    await db.write();
  }

  /**
   * Método que añade un mercader a la colección
   * @param mercader - Mercader a añadir
   */
  addMercader(mercader: Mercader) {
    this._list.push(mercader);
  }

  /**
   * Método que elimina un mercader de la colección
   * @param id - ID del Mercader a eliminar
   */
  removeMercader(id: number) {
    this._list = this._list.filter(m => m.id !== id);
  }
  /**
   * Método que se encarga de cambiar la información a un mercader existente
   * @param mercader Mercader con el mismo ID, pero con posibles datos distintos a cambiar
   */
  modMercader(mercader: Mercader) {
    this._list = this._list.map(m => m.id === mercader.id ? mercader: m);
  }
  /**
   * Método que se encarga de ver si un id pertenece al array o no
   * @param id ID a comprobar en la base de datos
   * @returns True si está en la base de datos, false si no lo está
   */
  checkID(id: number): boolean {
    return this._list.some(b => b.id === id);
  }
}
/**
 * Clase que representa una colección de clientes
 */
export class ClienteCollections {
  private _list: Cliente[];
  /**
   * Contructor de la clase ClienteCollections
   * @param clientes Array con los datos de clientes
   */
  constructor(clientes: Cliente[]) {
    this._list = clientes;
  }
  
  /**
   * Métodos de acceso a los atributos privados de la clase
   */

  get clientes(): Cliente[] {
    return this._list;
  }

  set clientes(clientes: Cliente[]) {
    this._list = clientes;
  }
  /**
   * Función que se encarga de cargar los datos de un .json en la colección de clientes
   * @param dbFile Nombre del fichero .json del que se extraerán los datos
   * @returns Nada, termina el proceso en caso de que no exista el fichero
   */
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
  /**
   * Función que se encarga de tranformar los datos a un formato adecuado para almacenarse en un .json
   * @param dbFile Nombre del fichero a guardar
   * @returns Nada, sirve para terminar la función en caso de que no exista el fichero
   */
  async saveToDB(dbFile: string) {
    if (!dbFile) return;

    const adapter = new JSONFile<Data_clientes>(dbFile);
    const db = new Low(adapter, { clientes: [] });

    // Guardamos en JSON con un formato válido
    db.data.clientes = this._list.map(b => b.toJSON());
    await db.write();
  }

  /**
   * Método que añade un cliente a la colección
   * @param cliente - Cliente a añadir
   */
  addCliente(cliente: Cliente) {
    this._list.push(cliente);
  }

  /**
   * Método que elimina un cliente de la colección
   * @param id - ID del Cliente a eliminar
   */
  removeCliente(id: number) {
    this._list = this._list.filter(c => c.id !== id);
  }
  /**
   * Método que mediante un Cliente con id específico, 
   * modifica el contenido de aquel con el mismo id en la base de datos
   * @param cliente Cliente actualizado a sustituir por el de la base de datos
   */
  modCliente(cliente: Cliente) {
    this._list = this._list.map(c => c.id === cliente.id ? cliente: c);
  }
  /**
   * Método que mediante un ID, comprueba si ese ID está en la base de datos
   * @param id ID a comprobar en la base
   * @returns Verdadero si está en la base de datos, falso si no
   */
  checkID(id: number): boolean {
    return this._list.some(c => c.id === id);
  }
}