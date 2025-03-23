import { describe, test, expect } from 'vitest' ;
import { Cliente } from '../src/clientes.js';

describe('Cliente', () => {
    const cliente = new Cliente(1, 'Geralt', 'Brujo', 'Torremolinos');
    const cliente2 = new Cliente(2, 'Vicente', 'Enano', 'Novigrad' );
    
    // Getters
    test('GET ID', () => {
        expect(cliente.id).toBe(1);
        expect(cliente2.id).toBe(2);
    });
    test('GET NAME', () => {
        expect(cliente.name).toBe('Geralt');
        expect(cliente2.name).toBe('Vicente');
    });
    test('GET RACE', () => {
        expect(cliente.race).toBe('Brujo');
        expect(cliente2.race).toBe('Enano');
    });
    test('GET LOCATION', () => {
        expect(cliente.location).toBe('Torremolinos');
        expect(cliente2.location).toBe('Novigrad');
    });

    // Setters
    test('SET ID', () => {
        cliente.id = 3;
        expect(cliente.id).toBe(3);
        cliente2.id = 4;
        expect(cliente2.id).toBe(4);
    });
    test('SET NAME', () => {
        cliente.name = 'Antonio';
        expect(cliente.name).toBe('Antonio');
        cliente2.name = 'Paco';
        expect(cliente2.name).toBe('Paco');
    });
    test('SET RACE', () => {
        cliente.race = 'Humano';
        expect(cliente.race).toBe('Humano');
        cliente2.race = 'Elfo';
        expect(cliente2.race).toBe('Elfo');
    });
    test('SET LOCATION', () => {
        cliente.location = 'Velen';
        expect(cliente.location).toBe('Velen');
        cliente2.location = 'Skellige';
        expect(cliente2.location).toBe('Skellige');
    });

    // test funcion fromJSON
    test('FROM JSON', () => {
        const json = JSON.stringify(cliente);
        const clienteFromJSON = Cliente.fromJSON(json);
        expect(clienteFromJSON.id).toBe(-1);
        expect(clienteFromJSON.name).toBe('Desconocido');
        expect(clienteFromJSON.race).toBe('Brujo');
        expect(clienteFromJSON.location).toBe('Torremolinos');
    });
});

