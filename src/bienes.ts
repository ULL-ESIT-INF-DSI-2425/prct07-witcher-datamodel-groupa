export interface Bienes{
  id: number;
  name: string;
  description: string;
  material: string;
  weight: number;
  price: number;
}

export class Bien implements Bienes {
  private _id: number;
  private _name: string;
  private _description: string;
  private _material: string;
  private _weight: number;
  private _price: number;

  constructor(id_nuevo: number, nombre: string, descripcion: string, material_nuevo: string, peso: number, precio: number ) {
    this._id = id_nuevo;
    this._name = nombre;
    this._description = descripcion;
    this._material = material_nuevo;
    this._weight = peso;
    this._price = precio;
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }
  
  get material(): string {
    return this._material;
  }

  get weight(): number {
    return this._weight;
  }

  get price(): number {
    return this._price;
  }

  set id(id : number) {
    this._id = id;
  }
  
  set name(name : string) {
    this._name = name;
  }

  set description(description: string) {
    this._description = description;
  }

  set material(material: string) {
    this._material = material;
  }

  set weight(weight: number) {
    this._weight = weight;
  }

  set price(price: number) {
    this._price = price;
  }
}
 
