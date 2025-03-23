import { describe, test, expect, beforeEach, vi } from 'vitest' ;
import { JSONFile } from 'lowdb/node';
import { Low } from 'lowdb';
import { Cliente } from '../src/clientes.js';
import { Mercader } from '../src/mercaderes.js';
import { Bien } from '../src/bienes.js';
import { ClienteCollections, MercaderCollections, BienCollections } from '../src/collections.js';

// Simulamos el archivo JSON con Jest (sin tocar archivos reales)
vi.mock('lowdb/node', () => {
    const data = { clientes: [] };
  
    return {
      JSONFile: vi.fn(() => ({
        read: vi.fn(async () => {}),
        write: vi.fn(async () => {}),
      })),
      Low: vi.fn(() => ({
        data,
        read: vi.fn(async () => {}),
        write: vi.fn(async () => {}),
      })),
    };
  });

  
describe('ClientesCollection', () => {
    const clientesCollection = new ClienteCollections([]);
    const cliente = new Cliente(1, 'Geralt', 'Brujo', 'Torremolinos');
    const cliente2 = new Cliente(2, 'Vicente', 'Enano', 'Novigrad');
    const cliente3 = new Cliente(3, 'Antonio', 'Humano', 'Velen');
    const clientesCollection2 = new ClienteCollections([cliente, cliente2]);

    // Constructor
    test('CONSTRUCTOR', () => {
        expect(clientesCollection.clientes).toEqual([]);
        expect(clientesCollection2.clientes).toEqual([cliente, cliente2]);
    });

    // Getters
    test('GET CLIENTES', () => {
        expect(clientesCollection.clientes).toEqual([]);
        expect(clientesCollection2.clientes).toEqual([cliente, cliente2]);
    });

    // Setters
    test('SET CLIENTES', () => {
        clientesCollection.clientes = [cliente, cliente2];
        expect(clientesCollection.clientes).toEqual([cliente, cliente2]);
        clientesCollection.clientes = [cliente];
        expect(clientesCollection.clientes).toEqual([cliente]);
    });

    // Métodos

    let collection = new ClienteCollections([]);
    beforeEach(() => {
        collection.loadFromDB('clientes.json');
      });
    
      test('Debe agregar bienes correctamente', async () => {
        const cliente4 = new Cliente(4, 'Geralt', 'Brujo', 'Torremolinos');
        collection.addCliente(cliente4);
    
        expect(collection.clientes).toHaveLength(1);
        expect(collection.clientes[0].name).toBe('Geralt');
        expect(collection.clientes[0].race).toBe('Brujo');
        expect(collection.clientes[0].location).toBe('Torremolinos');
      });
    
      test('Debe convertir un JSON en una instancia de Bien', () => {
        const json = {  id: 5, name: 'Geralt', race: 'Brujo', location: 'Torremolinos' };
        const cliente5 = Cliente.fromJSON(json);
    
        expect(cliente5.id).toBe(5);
        expect(cliente5.name).toBe('Geralt');
        expect(cliente5.race).toBe('Brujo');
        expect(cliente5.location).toBe('Torremolinos');
        
      });
    
      test('Debe guardar bienes en la base de datos (mock)', async () => {
        const cliente6 = new Cliente(6, 'Antonio', 'Humano', 'Velen');
        collection.addCliente(cliente6);
    
        await collection.saveToDB('bienes.json');
      });
    test('ADD CLIENTE', () => {
        clientesCollection.addCliente(cliente2);
        expect(clientesCollection.clientes).toEqual([cliente, cliente2]);
        clientesCollection2.addCliente(cliente3);
        expect(clientesCollection2.clientes).toEqual([cliente, cliente2, cliente3]);
    });
    test('REMOVE CLIENTE', () => {
        clientesCollection.removeCliente(2);
        expect(clientesCollection.clientes).toEqual([cliente]);
        clientesCollection2.removeCliente(2);
        expect(clientesCollection2.clientes).toEqual([cliente, cliente3]);
    });
    test('CHECK ID', () => {
        expect(clientesCollection.checkID(1)).toBe(true);
        expect(clientesCollection.checkID(123465)).toBe(false);
    });
    test('MOD CLIENTE', () => {
        let cliente7 = new Cliente(1, "pepe", "Brujo", "Skellige");
        clientesCollection.modCliente(cliente7);
        expect(clientesCollection.clientes).toEqual([cliente7]);
        clientesCollection.addCliente(cliente2);
        clientesCollection.modCliente(cliente);
        expect(clientesCollection.clientes).toEqual([cliente, cliente2]);
    });

});

vi.mock('lowdb/node', () => {
    const data = { mercaderes: [] };
  
    return {
      JSONFile: vi.fn(() => ({
        read: vi.fn(async () => {}),
        write: vi.fn(async () => {}),
      })),
      Low: vi.fn(() => ({
        data,
        read: vi.fn(async () => {}),
        write: vi.fn(async () => {}),
      })),
    };
  });

describe('MercaderesCollection', () => {
    const mercaderesCollection = new MercaderCollections([]);
    const mercader = new Mercader(1, "Andre", "Herrero", "Skellige");
    const mercader2 = new Mercader(2, "Roshi", "Druida", "Kaer Morhen");
    const mercader3 = new Mercader(3, "Francisco", "General", "Novigrad");
    const mercaderesCollection2 = new MercaderCollections([mercader, mercader2]);

    // Constructor
    test('CONSTRUCTOR', () => {
        expect(mercaderesCollection.mercaderes).toEqual([]);
        expect(mercaderesCollection2.mercaderes).toEqual([mercader, mercader2]);
    });

    // Getters
    test('GET MERCADERES', () => {
        expect(mercaderesCollection.mercaderes).toEqual([]);
        expect(mercaderesCollection2.mercaderes).toEqual([mercader, mercader2]);
    });

    // Setters
    test('SET MERCADERES', () => {
        mercaderesCollection.mercaderes = [mercader, mercader2];
        expect(mercaderesCollection.mercaderes).toEqual([mercader, mercader2]);
        mercaderesCollection.mercaderes = [mercader];
        expect(mercaderesCollection.mercaderes).toEqual([mercader]);
    });

    // Métodos
    let collection = new MercaderCollections([]);
    beforeEach(() => {
        collection.loadFromDB('clientes.json');
      });
    
      test('Debe agregar bienes correctamente', async () => {
        const mercader4 = new Mercader(4, 'Geralt', 'General', 'Torremolinos');
        collection.addMercader(mercader4);
    
        expect(collection.mercaderes).toHaveLength(1);
        expect(collection.mercaderes[0].name).toBe('Geralt');
        expect(collection.mercaderes[0].type).toBe('General');
        expect(collection.mercaderes[0].location).toBe('Torremolinos');
      });
    
      test('Debe convertir un JSON en una instancia de Bien', () => {
        const json = {  id: 5, name: 'Geralt', type: 'General', location: 'Torremolinos' };
        const mercader5 = Mercader.fromJSON(json);
    
        expect(mercader5.id).toBe(5);
        expect(mercader5.name).toBe('Geralt');
        expect(mercader5.type).toBe('General');
        expect(mercader5.location).toBe('Torremolinos');
        
      });
    
      test('Debe guardar bienes en la base de datos (mock)', async () => {
        const mercader6 = new Mercader(6, 'Antonio', 'Druida', 'Velen');
        collection.addMercader(mercader6);
    
        await collection.saveToDB('bienes.json');
      });

    test('ADD MERCADER', () => {
        mercaderesCollection.addMercader(mercader2);
        expect(mercaderesCollection.mercaderes).toEqual([mercader, mercader2]);
        mercaderesCollection2.addMercader(mercader3);
        expect(mercaderesCollection2.mercaderes).toEqual([mercader, mercader2, mercader3]);
    });
    test('REMOVE MERCADER', () => {
        mercaderesCollection.removeMercader(2);
        expect(mercaderesCollection.mercaderes).toEqual([mercader]);
        mercaderesCollection2.removeMercader(2);
        expect(mercaderesCollection2.mercaderes).toEqual([mercader, mercader3]);
    });
    test('CHECK ID', () => {
       expect(mercaderesCollection.checkID(1)).toBe(true);
       expect(mercaderesCollection.checkID(24)).toBe(false);
    });
    test('MOD MERCADER', () => {
        let mercader7 = new Mercader(1, "pepe", "Alquimista", "Skellige");
        mercaderesCollection.modMercader(mercader7);
        expect(mercaderesCollection.mercaderes).toEqual([mercader7]);
        mercaderesCollection.addMercader(mercader2);
        mercaderesCollection.modMercader(mercader);
        expect(mercaderesCollection.mercaderes).toEqual([mercader, mercader2]);
    });

});

vi.mock('lowdb/node', () => {
    const data = { bienes: [] };
  
    return {
      JSONFile: vi.fn(() => ({
        read: vi.fn(async () => {}),
        write: vi.fn(async () => {}),
      })),
      Low: vi.fn(() => ({
        data,
        read: vi.fn(async () => {}),
        write: vi.fn(async () => {}),
      })),
    };
  });

describe('BienesCollection', () => {
    const bienesCollection = new BienCollections([]);
    const bien = new Bien(1, 'Espada', 'Espada de acero maldita', 'Acero', 2, 250);
    const bien2 = new Bien(2, 'Yelmo', 'Yelmo de cota de malla', 'Cota de malla', 10, 500);
    const bien3 = new Bien(3, 'Escudo', 'Escudo de madera', 'Madera', 5, 100);
    const bienesCollection2 = new BienCollections([bien, bien2]);

    // Constructor
    test('CONSTRUCTOR', () => {
        expect(bienesCollection.bienes).toEqual([]);
        expect(bienesCollection2.bienes).toEqual([bien, bien2]);
    });

    // Getters
    test('GET BIENES', () => {
        expect(bienesCollection.bienes).toEqual([]);
        expect(bienesCollection2.bienes).toEqual([bien, bien2]);
    });

    // Setters
    test('SET BIENES', () => {
        bienesCollection.bienes = [bien, bien2];
        expect(bienesCollection.bienes).toEqual([bien, bien2]);
        bienesCollection.bienes = [bien];
        expect(bienesCollection.bienes).toEqual([bien]);
    });

    // Métodos
    let collection = new BienCollections([]);
    beforeEach(() => {
        collection.loadFromDB('bienes.json');
      });
    
      test('Debe agregar bienes correctamente', async () => {
        const bien4 = new Bien(4, 'Espada', 'Espada de acero maldita', 'Acero', 2, 250);
        collection.addBien(bien4);
    
        expect(collection.bienes).toHaveLength(1);
        expect(collection.bienes[0].name).toBe('Espada');
      });
    
      test('Debe convertir un JSON en una instancia de Bien', () => {
        const json = { id: 5, nombre: 'Espada' , description: 'Espada de acero maldita' , material: 'Acero' , peso: 2 , precio: 250  };
        const bien5 = Bien.fromJSON(json);
    
        expect(bien5.id).toBe(5);
        expect(bien5.name).toBe('Espada');
        expect(bien5.description).toBe('Espada de acero maldita');
        expect(bien5.material).toBe('Acero');
        expect(bien5.weight).toBe(2);
        expect(bien5.price).toBe(250);
      });
    
      test('Debe guardar bienes en la base de datos (mock)', async () => {
        const bien6 = new Bien(6, 'Yelmo', 'Yelmo de cota de malla', 'Cota de malla', 10, 500);
        collection.addBien(bien6);
    
        await collection.saveToDB('bienes.json');
      });
    
    test('ADD BIEN', () => {
        bienesCollection.addBien(bien2);
        expect(bienesCollection.bienes).toEqual([bien, bien2]);
        bienesCollection2.addBien(bien3);
        expect(bienesCollection2.bienes).toEqual([bien, bien2, bien3]);
    });

    test('REMOVE BIEN', () => {
        bienesCollection.removeBien(2);
        expect(bienesCollection.bienes).toEqual([bien]);
        bienesCollection2.removeBien(2);
        expect(bienesCollection2.bienes).toEqual([bien, bien3]);
    });

    test('CHECK ID', () => {
        expect(bienesCollection.checkID(1)).toBe(true);
        expect(bienesCollection.checkID(10)).toBe(false);
    });
    test('MOD CLIENTE', () => {
        let bien7 = new Bien(1, "pepe", "El pepe", "Acero", 34, 56);
        bienesCollection.modBien(bien7);
        expect(bienesCollection.bienes).toEqual([bien7]);
        bienesCollection.addBien(bien2);
        bienesCollection.modBien(bien);
        expect(bienesCollection.bienes).toEqual([bien, bien2]);
    });
});