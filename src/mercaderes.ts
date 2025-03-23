/**
 * Tipo que recoge los posibles tipos de mercaderes
 */
export const Tipo_mercader = {
  HERRERO: "Herrero",
  ALQUIMISTA: "Alquimista",
  GENERAL: "General",
  JOYERO: "Joyero",
  DRUIDA: "Druida"
} as const;

export type Tipo_mercader = typeof Tipo_mercader[keyof typeof Tipo_mercader];
/**
 * Tipo que contiene las posibles ubicaciones de los mercaderes
 */
export const Ubicacion = {
  NOVIGRAD: "Novigrad",
  VELEN: "Velen",
  SKELLIGE: "Skellige",
  KAER_MORHEN: "Kaer Morhen",
  TORREMOLINOS: "Torremolinos"
} as const;

export type Ubicacion = typeof Ubicacion[keyof typeof Ubicacion];
/**
 * Interfaz de un mercader
 */
export interface Mercaderes {
    id: number;
    name: string;
    type: Tipo_mercader;
    location: Ubicacion;
}

/**
 * Clase que representa un mercader
 */
export class Mercader implements Mercaderes {
  private _id: number;
  private _name: string;
  private _type: Tipo_mercader;
  private _location: Ubicacion;

  constructor(id: number, name: string, type: Tipo_mercader, location: Ubicacion) {
    this._id = id;
    this._name = name;
    this._type = type;
    this._location = location;
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get type(): Tipo_mercader {
    return this._type;
  }

  get location(): Ubicacion {
    return this._location;
  }

  set id(value: number) {
    this._id = value;
  }

  set name(value: string) {
    this._name = value;
  }

  set type(value: Tipo_mercader) {
    this._type = value;
  }

  set location(value: Ubicacion) {
    this._location = value;
  }

  toJSON() {
    return { id: this._id, name: this._name, type: this._type, location: this._location  };
  }

  static fromJSON(json: any): Mercader {
    if (!json || typeof json.id !== 'number' || typeof json.name !== 'string') {
      return new Mercader(-1, 'Desconocido', 'Alquimista', "Torremolinos"); // Valor por defecto en caso de error
    }
    return new Mercader(json.id, json.name, json.type, json.location);
  }
}
