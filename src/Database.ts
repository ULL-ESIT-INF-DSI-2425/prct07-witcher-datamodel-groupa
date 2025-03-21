import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { Bien } from './bienes.js';
import { Mercader } from './mercaderes.js';
import { Cliente } from './clientes.js';

type Data = {
  bienes: Bien[],
  mercaderes: Mercader[],
  clientes: Cliente[]
};

const defaultData: Data = {
  bienes: [],
  mercaderes: [],
  clientes: []
};

const db = new Low<Data>(new JSONFile<Data>('db.json'), defaultData);

async function initDataBase() {
  await db.read();
  if (db.data === null || Object.keys(db.data).length === 0) {
    db.data = defaultData;
  }
  await db.write();
}

export { db, initDataBase };