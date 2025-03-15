
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

  /**
   * Busca bienes por su nombre
   * @param name - Nombre del bien a buscar
   * @returns Array de bienes con el nombre buscado
   */
  findBienByName(name: string): Bien[] {
    /*
     * ESTRICTO
     * let bienes_encontrados = this._bienes.filter(bien => bien.name === name);
     */
    return (this._bienes.filter((bien) => bien.name.includes(name)));
  }

  /**
   * Busca bienes por el material con el que está hecho
   * @param material - Material con el que esta hecho el bien a buscar
   * @returns Array de bienes hechos con el material buscado
   */
  findBienByMaterial(material: string): Bien[] {
    /*
     * ESTRICTO
     * let bienes_encontrados = this._bienes.filter(bien => bien.material === material);
     */
    return (this._bienes.filter((bien) => bien.material.includes(material)));
  }

  /**
   * Busca bienes por su descripción
   * @param description - Descripción del bien a buscar
   * @returns Array de bienes que coinciden con la descripción buscada
   */
  findBienByDescription(description: string): Bien[] {
    /*
     * ESTRICTO
     * let bienes_encontrados = this._bienes.filter(bien => bien.description === description);
     */
    return (this._bienes.filter(bien => bien.description.includes(description)));
  }

  /**
   * Ordena bienes por precio de forma ascendente
   * @param Bienes - Array de bienes a ordenar
   * @returns Array de bienes ordenados por su precio de forma ascendente
   */
  sortBienesByPriceAsc(Bienes: Bien[]): Bien[] {
    return (Bienes.sort((a, b) => a.price - b.price));
  }

  /**
   * Ordena bienes por precio de forma descendente
   * @param Bienes - Array de bienes a ordenar
   * @returns Array de bienes ordenados por su precio de forma descendente
   */
  sortBienesByPriceDes(Bienes: Bien[]): Bien[] {
    return (Bienes.sort((a, b) => b.price - a.price)).reverse();
  }

  /**
   * Ordena bienes alfabéticamente de forma ascendente
   * @param Bienes - Array de bienes a ordenar
   * @returns Array de bienes ordenados alfabéticamente de forma ascendente
   */
  sortBienesAlphabeticallyAsc(Bienes: Bien[]): Bien[] {
    return (Bienes.sort((a, b) => a.name.localeCompare(b.name)));
  }

  /**
   * Ordena bienes alfabéticamente de forma descendente
   * @param Bienes - Array de bienes a ordenar
   * @returns Array de bienes ordenados alfabéticamente de forma descendente
   */
  sortBienesAlphabeticallyDes(Bienes: Bien[]): Bien[] {
    return (Bienes.sort((a, b) => a.name.localeCompare(b.name))).reverse();
  }

  /**
   * Busca mercaderes por su nombre
   * @param name - Nombre del mercader a buscar
   * @returns Array de mercaderes con el nombre buscado
   */
  findMercaderByName(name: string): Mercader[] {
    return (this.mercaderes.filter(merc => merc.name.includes(name)));
  }

  /**
   * Busca mercaderes por su tipo
   * @param type - Tipo de mercader a buscar
   * @returns Array de mercaderes con el tipo buscado
   */
  findMercaderByType(type: Tipo_mercader): Mercader[] {
    return (this.mercaderes.filter(merc => merc.type.includes(type)));
  }

  /**
   * Busca mercaderes por su ubicación
   * @param location - Ubicación del mercader a buscar
   * @returns Array de mercaderes con la ubicación buscada
   */
  findMercaderByLocation(location: Ubicacion): Mercader[] {
    return (this.mercaderes.filter(merc => merc.location.includes(location)));
  }

  /**
   * Busca clientes por su nombre
   * @param name - Nombre del cliente a buscar
   * @returns Array de clientes con el nombre buscado
   */
  findClienteByName(name:string): Cliente[] {
    return (this.clientes.filter(cli => cli.name.includes(name)));
  }

  /**
   * Busca clientes por su raza
   * @param raza - Raza del cliente a buscar
   * @returns Array de clientes con la raza buscada
   */
  findClienteByRace(race: Raza): Cliente[] {
    return (this.clientes.filter(cli => cli.race.includes(race)));
  }

  /**
   * Busca clientes por su ubicación
   * @param location - Ubicación del cliente a buscar
   * @returns Array de clientes con la ubicación buscada
   */
  findClienteByLocation(location: Ubicacion): Cliente[] {
    return (this.clientes.filter(cli => cli.location.includes(location)));
  }
}
