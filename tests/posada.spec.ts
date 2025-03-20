import {describe, expect, test} from "vitest";
import { Cliente } from "../src/clientes.js";
import { Mercader } from "../src/mercaderes.js";
import { Bien } from "../src/bienes.js";
import { ClienteCollections, MercaderCollections, BienCollections } from "../src/collections.js";
import { Posada } from "../src/posada.js";

describe('Posada', () => {
    const cliente = new Cliente(1, 'Geralt', 'Brujo', 'Torremolinos');
    const cliente2 = new Cliente(2, 'Vicente', 'Enano', 'Novigrad');
    const cliente3 = new Cliente(3, 'Antonio', 'Humano', 'Velen');
    const clientesCollection = new ClienteCollections([cliente, cliente2]);

    const mercader = new Mercader(1, "Andre", "Herrero", "Skellige");
    const mercader2 = new Mercader(2, "Roshie", "Druida", "Kaer Morhen");
    const mercader3 = new Mercader(3, "Francisco", "General", "Novigrad");
    const mercaderesCollection = new MercaderCollections([mercader, mercader2]);

    const bien = new Bien(1, 'Espada', 'Espada de acero', 'Acero', 2, 100);
    const bien2 = new Bien(3, 'Escudo', 'Escudo de madera', 'Madera', 1, 30);
    const bien3 = new Bien(2, 'Yelmo', 'Yelmo de cota de malla', 'Cota de malla', 10, 500);
    const bienCollection = new BienCollections([bien, bien2]);

    const posada = new Posada(new BienCollections([]), new MercaderCollections([]), new ClienteCollections([]));
    const posada2 = new Posada(bienCollection, mercaderesCollection, clientesCollection);

    // Constructor
    test('CONSTRUCTOR', () => {
        expect(posada.bienes.bienes).toEqual([]);
        expect(posada.mercaderes.mercaderes).toEqual([]);
        expect(posada.clientes.clientes).toEqual([]);
        expect(posada2.bienes.bienes).toEqual([bien, bien2]);
        expect(posada2.mercaderes.mercaderes).toEqual([mercader, mercader2]);
        expect(posada2.clientes.clientes).toEqual([cliente, cliente2]);
    });

    // Getters
    test('GET BIENES', () => {
        expect(posada.bienes.bienes).toEqual([]);
        expect(posada2.bienes.bienes).toEqual([bien, bien2]);
    });
    test('GET MERCADERES', () => {
        expect(posada.mercaderes.mercaderes).toEqual([]);
        expect(posada2.mercaderes.mercaderes).toEqual([mercader, mercader2]);
    });
    test('GET CLIENTES', () => {
        expect(posada.clientes.clientes).toEqual([]);
        expect(posada2.clientes.clientes).toEqual([cliente, cliente2]);
    });

    // Setters
    test('SET BIENES', () => {
        posada.bienes = bienCollection;
        expect(posada.bienes.bienes).toEqual([bien, bien2]);
        posada.bienes = new BienCollections([bien]);
        expect(posada.bienes.bienes).toEqual([bien]);
    });
    test('SET MERCADERES', () => {
        posada.mercaderes = mercaderesCollection;
        expect(posada.mercaderes.mercaderes).toEqual([mercader, mercader2]);
        posada.mercaderes = new MercaderCollections([mercader]);
        expect(posada.mercaderes.mercaderes).toEqual([mercader]);
    });
    test('SET CLIENTES', () => {
        posada.clientes = clientesCollection;
        expect(posada.clientes.clientes).toEqual([cliente, cliente2]);
        posada.clientes = new ClienteCollections([cliente]);
        expect(posada.clientes.clientes).toEqual([cliente]);
    });

    //// METODOS ////
    // Bienes
    test('FIND BIEN BY NAME', () => {
        expect(posada2.findBienByName('Espada')).toEqual([bien]);
        expect(posada2.findBienByName('Es')).toEqual([bien, bien2]);
        expect(posada2.findBienByName('Escudo')).toEqual([bien2]);
        expect(posada2.findBienByName('Yelmo')).toEqual([]);
    });

    test('FIND BIEN BY MATERIAL', () => {
        expect(posada2.findBienByMaterial('Acero')).toEqual([bien]);
        expect(posada2.findBienByMaterial('e')).toEqual([bien, bien2]);
        expect(posada2.findBienByMaterial('Madera')).toEqual([bien2]);
        expect(posada2.findBienByMaterial('Cota de malla')).toEqual([]);
    });

    test('FIND BIEN BY DESCRIPTION', () => {
        expect(posada2.findBienByDescription('Espada')).toEqual([bien]);
        expect(posada2.findBienByDescription('de ')).toEqual([bien, bien2]);
        expect(posada2.findBienByDescription('made')).toEqual([bien2]);
        expect(posada2.findBienByDescription('Cota de')).toEqual([]);
    });

    test('SORT BIEN BY PRICE ASC', () => {
        expect(posada2.sortBienesByPriceAsc([bien, bien2])).toEqual([bien2, bien]);
        posada2.bienes.addBien(bien3);
        expect(posada2.sortBienesByPriceAsc([bien2, bien, bien3])).toEqual([bien2, bien, bien3]);
        posada2.bienes.removeBien(bien3);
    });

    test('SORT BIEN BY PRICE DESC', () => {
        expect(posada2.sortBienesByPriceDes([bien2, bien])).toEqual([bien, bien2]);
        posada2.bienes.addBien(bien3);
        expect(posada2.sortBienesByPriceDes([bien2, bien, bien3])).toEqual([bien3, bien, bien2]);
        posada2.bienes.removeBien(bien3);
    });

    test('SORT BIEN ALPHABETICALLY ASC', () => {
        expect(posada2.sortBienesAlphabeticallyAsc([bien, bien2])).toEqual([bien2, bien]);
        posada2.bienes.addBien(bien3);
        expect(posada2.sortBienesAlphabeticallyAsc([bien, bien2, bien3])).toEqual([bien2, bien, bien3]);
        posada2.bienes.removeBien(bien3);
    });

    test('SORT BIEN ALPHABETICALLY DESC', () => {
        expect(posada2.sortBienesAlphabeticallyDes([bien, bien2])).toEqual([bien, bien2]);
        posada2.bienes.addBien(bien3);
        expect(posada2.sortBienesAlphabeticallyDes([bien, bien2, bien3])).toEqual([bien3, bien, bien2]);
        posada2.bienes.removeBien(bien3);
    });


    // Clientes
    test('FIND CLIENTE BY NAME', () => {
        expect(posada2.findClienteByName('Geralt')).toEqual([cliente]);
        expect(posada2.findClienteByName('e')).toEqual([cliente, cliente2]);
        expect(posada2.findClienteByName('Antonio')).toEqual([]);
        expect(posada2.findClienteByName('Vicente')).toEqual([cliente2]);
    });

    test('FIND CLIENTE BY RACE', () => {
        expect(posada2.findClienteByRace('Brujo')).toEqual([cliente]);
        expect(posada2.findClienteByRace('Humano')).toEqual([]);
        expect(posada2.findClienteByRace('Enano')).toEqual([cliente2]);
    });

    test('FIND CLIENTE BY LOCATION', () => {
        expect(posada2.findClienteByLocation('Torremolinos')).toEqual([cliente]);
        expect(posada2.findClienteByLocation('Velen')).toEqual([]);
        expect(posada2.findClienteByLocation('Novigrad')).toEqual([cliente2]);
    });

    // Mercaderes
    test('FIND MERCADER BY NAME', () => {
        expect(posada2.findMercaderByName('Andre')).toEqual([mercader]);
        expect(posada2.findMercaderByName('e')).toEqual([mercader, mercader2]);
        expect(posada2.findMercaderByName('Francisco')).toEqual([]);
        expect(posada2.findMercaderByName('Roshie')).toEqual([mercader2]);
    });

    test('FIND MERCADER BY TYPE', () => {
        expect(posada2.findMercaderByType('Herrero')).toEqual([mercader]);
        expect(posada2.findMercaderByType('General')).toEqual([]);
        expect(posada2.findMercaderByType('Druida')).toEqual([mercader2]);
    });

    test('FIND MERCADER BY LOCATION', () => {
        expect(posada2.findMercaderByLocation('Skellige')).toEqual([mercader]);
        expect(posada2.findMercaderByLocation('Novigrad')).toEqual([]);
        expect(posada2.findMercaderByLocation('Kaer Morhen')).toEqual([mercader2]);
    });
});