import {describe, expect, test} from "vitest";
import {Mercader} from "../src/mercaderes";

describe('Cliente', () => {
  const mercader = new Mercader(1, "Andre", "Herrero", "Skellige");
  const mercader2 = new Mercader(2, "Roshi", "Druida", "Kaer Morhen");

  // Getters
  test('GET ID', () => {
    expect(mercader.id).toBe(1);
    expect(mercader2.id).toBe(2);
  });
  test('GET NAME', () => {
    expect(mercader.name).toBe('Andre');
    expect(mercader2.name).toBe('Roshi');
  });
  test('GET TYPE', () => {
    expect(mercader.type).toBe('Herrero');
    expect(mercader2.type).toBe('Druida');
  });
  test('GET LOCATION', () => {
    expect(mercader.location).toBe('Skellige');
    expect(mercader2.location).toBe('Kaer Morhen');
  });

  // Setters
  test('SET ID', () => {
    mercader.id = 3;
    expect(mercader.id).toBe(3);
    mercader2.id = 4;
    expect(mercader2.id).toBe(4);
  });
  test('SET NAME', () => {
    mercader.name = 'Francisco';
    expect(mercader.name).toBe('Francisco');
    mercader2.name = 'Eduardo';
    expect(mercader2.name).toBe('Eduardo');
  });
  test('SET TYPE', ()=>{
    mercader.type = 'General';
    expect(mercader.type).toBe('General');
    mercader2.type = 'Alquimista';
    expect(mercader2.type).toBe('Alquimista');
  });
  test('SET LOCATION', () => {
    mercader.location = 'Novigrad';
    expect(mercader.location).toBe('Novigrad');
    mercader2.location = 'Velen';
    expect(mercader2.location).toBe('Velen');
  });

});