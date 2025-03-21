import { describe, test, expect } from 'vitest' ;
import { Cliente } from '../src/clientes.js';
import { Mercader } from '../src/mercaderes.js';
import { Bien } from '../src/bienes.js';
import { ClienteCollections, MercaderCollections, BienCollections } from '../src/collections.js';

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
    test('ADD CLIENTE', () => {
        clientesCollection.addCliente(cliente2);
        expect(clientesCollection.clientes).toEqual([cliente, cliente2]);
        clientesCollection2.addCliente(cliente3);
        expect(clientesCollection2.clientes).toEqual([cliente, cliente2, cliente3]);
    });
    test('REMOVE CLIENTE', () => {
        clientesCollection.removeCliente(cliente2);
        expect(clientesCollection.clientes).toEqual([cliente]);
        clientesCollection2.removeCliente(cliente2);
        expect(clientesCollection2.clientes).toEqual([cliente, cliente3]);
    });
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
    test('ADD MERCADER', () => {
        mercaderesCollection.addMercader(mercader2);
        expect(mercaderesCollection.mercaderes).toEqual([mercader, mercader2]);
        mercaderesCollection2.addMercader(mercader3);
        expect(mercaderesCollection2.mercaderes).toEqual([mercader, mercader2, mercader3]);
    });
    test('REMOVE MERCADER', () => {
        mercaderesCollection.removeMercader(mercader2);
        expect(mercaderesCollection.mercaderes).toEqual([mercader]);
        mercaderesCollection2.removeMercader(mercader2);
        expect(mercaderesCollection2.mercaderes).toEqual([mercader, mercader3]);
    });
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
    test('ADD BIEN', () => {
        bienesCollection.addBien(bien2);
        expect(bienesCollection.bienes).toEqual([bien, bien2]);
        bienesCollection2.addBien(bien3);
        expect(bienesCollection2.bienes).toEqual([bien, bien2, bien3]);
    });

    test('REMOVE BIEN', () => {
        bienesCollection.removeBien(bien2);
        expect(bienesCollection.bienes).toEqual([bien]);
        bienesCollection2.removeBien(bien2);
        expect(bienesCollection2.bienes).toEqual([bien, bien3]);
    });
});