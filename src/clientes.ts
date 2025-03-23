import { Ubicacion } from "./mercaderes.js";
/**
 * Tipo que contiene las posibles razas de los clientes
 */
export const Raza = {
  HUMANO: "Humano",
  ELFO: "Elfo",
  ENANO: "Enano",
  BRUJO: "Brujo"
} as const;

export type Raza = typeof Raza[keyof typeof Raza];
/**
 * Interfaz que representa un cliente en el sistema.
 */
export interface Clientes {
    id: number;
    name: string;
    race: Raza;
    location: Ubicacion;
}

/**
 * Clase que representa un cliente dentro del sistema.
 */
export class Cliente implements Clientes {
  private _id: number;
  private _name: string;
  private _race: Raza;
  private _location: Ubicacion;

  /**
   * Constructor de la clase Cliente.
   * @param id Identificador único del cliente.
   * @param name Nombre del cliente.
   * @param race Raza del cliente.
   * @param location Ubicación actual del cliente.
   */  
  constructor(id: number, name: string, race: Raza, location: Ubicacion) {
    this._id = id;
    this._name = name;
    this._race = race;
    this._location = location;
  }

    /**
   * Métodos de acceso (getters y setters) para los atributos de la clase.
   */

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get race(): Raza {
    return this._race;
  }

  get location(): Ubicacion {
    return this._location;
  }

  set id(id: number) {
    this._id = id;
  }

  set name(name: string) {
    this._name = name;
  }

  set race(race: Raza) {
    this._race = race;
  }

  set location(location: Ubicacion) {
    this._location = location;
  }

    /**
   * Convierte el objeto Cliente a un formato JSON.
   * @returns Un objeto JSON con los atributos del cliente.
   */
  toJSON() {
    return { id: this._id, name: this._name, race: this._race, location: this._location  };
  }

  
  /**
   * Crea un objeto Cliente a partir de un objeto JSON.
   * @param json Objeto JSON con los atributos del cliente.
   * @returns Un objeto Cliente.
   */
  static fromJSON(json: any): Cliente {
    if (!json || typeof json.id !== 'number' || typeof json.name !== 'string') {
      return new Cliente(-1, 'Desconocido', 'Brujo', "Torremolinos"); // Valor por defecto en caso de error
    }
    return new Cliente(json.id, json.name, json.race, json.location);
  }
}