import { Bien } from "./bienes.js";
import { Mercader, Ubicacion, Tipo_mercader } from "./mercaderes.js";
import { BienCollections, MercaderCollections, ClienteCollections } from "./collections.js";
import { Cliente, Raza } from "./clientes.js";

/**
 * Clase que representa una posada en el sistema.
 * Contiene colecciones de bienes, mercaderes y clientes.
 */
export class Posada {
  private _bienes: BienCollections;
  private _mercaderes: MercaderCollections;
  private _clientes: ClienteCollections;

    /**
   * Constructor de la clase Posada.
   * @param bienes Colección de bienes disponibles en la posada.
   * @param mercaderes Colección de mercaderes presentes en la posada.
   * @param clientes Colección de clientes hospedados en la posada.
   */
  
  constructor(bienes: BienCollections, mercaderes: MercaderCollections, clientes: ClienteCollections) {
    this._bienes = bienes;
    this._mercaderes = mercaderes;
    this._clientes = clientes;
  }
  
   /**
   * Métodos de acceso (getters y setters) para los atributos de la clase.
   */
  
  get bienes(): BienCollections {
    return this._bienes;
  }

  get mercaderes(): MercaderCollections {
    return this._mercaderes;
  }

  get clientes(): ClienteCollections {
    return this._clientes;
  }

  set bienes(bienes: BienCollections) {
    this._bienes = bienes;
  }

  set mercaderes(mercaderes: MercaderCollections) {
    this._mercaderes = mercaderes;
  }

  set clientes(clientes: ClienteCollections) {
    this._clientes = clientes;
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
    return ((this._bienes.bienes.filter((bien) => bien.name.includes(name))));
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
    return (this._bienes.bienes.filter((bien) => bien.material.includes(material)));
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
    return (this._bienes.bienes.filter(bien => bien.description.includes(description)));
  }

  /**
   * Ordena bienes por precio de forma ascendente
   * @returns Array de bienes ordenados por su precio de forma ascendente
   */
  sortBienesByPriceAsc(Bienes: Bien[]): Bien[] {
    return (Bienes.sort((a, b) => a.price - b.price));
  }

  /**
   * Ordena bienes por precio de forma descendente
   * @returns Array de bienes ordenados por su precio de forma descendente
   */
  sortBienesByPriceDes(Bienes: Bien[]): Bien[] {
    return (Bienes.sort((a, b) => a.price - b.price)).reverse();
  }

  /**
   * Ordena bienes alfabéticamente de forma ascendente
   * @returns Array de bienes ordenados alfabéticamente de forma ascendente
   */
  sortBienesAlphabeticallyAsc(Bienes: Bien[]): Bien[] {
    return (Bienes.sort((a, b) => a.name.localeCompare(b.name)));
  }

  /**
   * Ordena bienes alfabéticamente de forma descendente
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
    return (this.mercaderes.mercaderes.filter(merc => merc.name.includes(name)));
  }

  /**
   * Busca mercaderes por su tipo
   * @param type - Tipo de mercader a buscar
   * @returns Array de mercaderes con el tipo buscado
   */
  findMercaderByType(type: Tipo_mercader): Mercader[] {
    return (this.mercaderes.mercaderes.filter(merc => merc.type.includes(type)));
  }

  /**
   * Busca mercaderes por su ubicación
   * @param location - Ubicación del mercader a buscar
   * @returns Array de mercaderes con la ubicación buscada
   */
  findMercaderByLocation(location: Ubicacion): Mercader[] {
    return (this.mercaderes.mercaderes.filter(merc => merc.location.includes(location)));
  }

  /**
   * Busca clientes por su nombre
   * @param name - Nombre del cliente a buscar
   * @returns Array de clientes con el nombre buscado
   */
  findClienteByName(name:string): Cliente[] {
    return (this.clientes.clientes.filter(cli => cli.name.includes(name)));
  }

  /**
   * Busca clientes por su raza
   * @param race - Raza del cliente a buscar
   * @returns Array de clientes con la raza buscada
   */
  findClienteByRace(race: Raza): Cliente[] {
    return (this.clientes.clientes.filter(cli => cli.race.includes(race)));
  }

  /**
   * Busca clientes por su ubicación
   * @param location - Ubicación del cliente a buscar
   * @returns Array de clientes con la ubicación buscada
   */
  findClienteByLocation(location: Ubicacion): Cliente[] {
    return (this.clientes.clientes.filter(cli => cli.location.includes(location)));
  }
}
