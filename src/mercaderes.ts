
export type Tipo_mercader = "Herrero"| "Alquimista" | "General" | "Joyero" | "Druida"
export type Ubicacion = "Novigrad" | "Velen" | "Skellige" | "Kaer Morhen" | "Torremolinos"

export interface Mercader {
    id: number;
    name: string;
    type: Tipo_mercader;
    location: Ubicacion;
}

export class Mercaderes implements Mercader {
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

}
