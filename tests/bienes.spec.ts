import { describe, test, expect } from 'vitest' ;
import { Bien } from '../src/bienes.js';

describe('Bien', () => {
    const bien = new Bien(1, 'Espada', 'Espada de acero maldita', 'Acero', 2, 250);
    const bien2 = new Bien(2, 'Yelmo', 'Yelmo de cota de malla', 'Cota de malla', 10, 500);

    // Getters
    test('GET ID', () => {
        expect(bien.id).toBe(1);
        expect(bien2.id).toBe(2);
    });
    test('GET NAME', () => {
        expect(bien.name).toBe('Espada');
        expect(bien2.name).toBe('Yelmo');
    });
    test('GET DESCRIPTION', () => {
        expect(bien.description).toBe('Espada de acero maldita');
        expect(bien2.description).toBe('Yelmo de cota de malla');
    });
    test('GET MATERIAL', () => {
        expect(bien.material).toBe('Acero');
        expect(bien2.material).toBe('Cota de malla');
    });
    test('GET WEIGHT', () => {
        expect(bien.weight).toBe(2);
        expect(bien2.weight).toBe(10);
    });
    test('GET PRICE', () => {
        expect(bien.price).toBe(250);
        expect(bien2.price).toBe(500);
    });

    // Setters
    test('SET ID', () => {
        bien.id = 3;
        expect(bien.id).toBe(3);
        bien2.id = 4;
        expect(bien2.id).toBe(4);
    });
    test('SET NAME', () => {
        bien.name = 'Espadón';
        expect(bien.name).toBe('Espadón');
        bien2.name = 'Escudo';
        expect(bien2.name).toBe('Escudo');
    });
    test('SET DESCRIPTION', () => {
        bien.description = 'Un gigantesco espadón recto';
        expect(bien.description).toBe('Un gigantesco espadón recto');
        bien2.description = 'Escudo metálico mediano y antiguo, de origen desconocido, imbuído en magia';
        expect(bien2.description).toBe('Escudo metálico mediano y antiguo, de origen desconocido, imbuído en magia');
    });
    test('SET MATERIAL', () => {
        bien.material = 'Hierro';
        expect(bien.material).toBe('Hierro');
        bien2.material = 'Metal';
        expect(bien2.material).toBe('Metal');
    });
    test('SET WEIGHT', () => {
        bien.weight = 12;
        expect(bien.weight).toBe(12);
        bien2.weight = 3;
        expect(bien2.weight).toBe(3);
    });
    test('SET PRICE', () => {
        bien.price = 280;
        expect(bien.price).toBe(280);
        bien2.price = 1000;
        expect(bien2.price).toBe(1000);
    });

    // test funcion fromJSON
    test('FROM JSON', () => {
        const json = JSON.stringify(bien);
        const bienFromJSON = Bien.fromJSON(json);
        expect(bienFromJSON.id).toBe(-1);
        expect(bienFromJSON.name).toBe('Desconocido');
        expect(bienFromJSON.description).toBe('Desconocido');
        expect(bienFromJSON.material).toBe('Desconocido');
        expect(bienFromJSON.weight).toBe(-1);
        expect(bienFromJSON.price).toBe(-1);
    });
});