

import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { Bien } from './bienes';
import { Mercader } from './mercaderes';
import { Cliente } from './clientes';

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
  if (db.data === null) {
    db.data = defaultData;
  }
  await db.write();
}

export { db, initDataBase };