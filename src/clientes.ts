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
 * Interfaz de un cliente
 */
export interface Clientes {
    id: number;
    name: string;
    race: Raza;
    location: Ubicacion;
}

/**
 * Clase que representa un cliente
 */
export class Cliente implements Clientes {
  private _id: number;
  private _name: string;
  private _race: Raza;
  private _location: Ubicacion;

  constructor(id: number, name: string, race: Raza, location: Ubicacion) {
    this._id = id;
    this._name = name;
    this._race = race;
    this._location = location;
  }

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

}