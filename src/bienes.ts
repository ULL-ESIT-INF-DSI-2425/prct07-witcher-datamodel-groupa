
/**
 * @interface Bienes
 * Representa la estructura de un bien.
 */
export interface Bienes{
  id: number;
  name: string;
  description: string;
  material: string;
  weight: number;
  price: number;
}
/**
 * @class Bien
 * Representa un bien con atributos específicos como nombre, descripción, material, peso y precio.
 * Implementa la interfaz `Bienes`.
 */
export class Bien implements Bienes {
  private _id: number;
  private _name: string;
  private _description: string;
  private _material: string;
  private _weight: number;
  private _price: number;

    /**
     Función del constructor de bienes
   * @param {number} id_nuevo - Identificador único del bien.
   * @param {string} nombre - Nombre del bien.
   * @param {string} descripcion - Descripción del bien.
   * @param {string} material_nuevo - Material del bien.
   * @param {number} peso - Peso del bien.
   * @param {number} precio - Precio del bien.
   */
  constructor(id_nuevo: number, nombre: string, descripcion: string, material_nuevo: string, peso: number, precio: number ) {
    this._id = id_nuevo;
    this._name = nombre;
    this._description = descripcion;
    this._material = material_nuevo;
    this._weight = peso;
    this._price = precio;
  }

   /**
   * Convierte la instancia actual a un objeto JSON.
   * @returns Representación en formato JSON del bien.
   */
  toJSON() {
    return { id: this._id, nombre: this._name, description: this._description, material: this._material, peso: this._weight, precio: this._price };
  }

    /**
   * Crea una instancia de `Bien` a partir de un objeto JSON.
   * @param {any} json - Objeto JSON con los datos del bien.
   * @returns {Bien} Instancia de `Bien` creada a partir del JSON.
   */

  static fromJSON(json: any): Bien {
    if (!json || typeof json.id !== 'number' || typeof json.nombre !== 'string' || typeof json.description !== 'string' || typeof json.material !== 'string' || typeof json.peso !== 'number' || typeof json.precio !== 'number') {
      return new Bien(-1, 'Desconocido', 'Desconocido', "Desconocido", -1, -1); // Valor por defecto en caso de error
    }
    return new Bien(json.id, json.nombre, json.description, json.material, json.peso, json.precio);
  }

    /**
   * Métodos de acceso (getters y setters) para los atributos del bien.
   */

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
 
