import {define, expect, test} from "vitest";
import {Mercader} from "../src/mercaderes";

define('Cliente', () => {
    test('Creación de un mercader', () => {
        const mercader = new Mercader(12345678, 'Monkey D. Luffy', 'Herrero', 'Novigrad');
        expect(mercader).toBeDefined();
        expect(mercader).toBeInstanceOf(Mercader);
      }
    );
    test('Obtener datos de un mercader', () => {
        const mercader = new Mercader (12345678, 'Monkey D. Luffy', 'Herrero', 'Novigrad');
        expect(mercader.getNombre()).toBe('Monkey D. Luffy');
        expect(mercader.getTipo()).toBe('Herrero');
        expect(mercader.getCiudad()).toBe('Novigrad');
      }
    );