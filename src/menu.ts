import inquirer from "inquirer";
import { db, initDataBase } from "./Database.js";
import { Posada } from "./posada.js";
import { Cliente, Raza } from "./clientes.js";
import { Mercader, Tipo_mercader, Ubicacion } from "./mercaderes.js";
import { Bien } from "./bienes.js";
import { BienCollections, MercaderCollections, ClienteCollections } from "./collections.js";

// Inicializar la base de datos
await initDataBase(); // Asegúrate de que la base de datos se lea correctamente

const bien_collection = new BienCollections(db.data.bienes);
const mercader_collection = new MercaderCollections(db.data.mercaderes);
const clientes_collection = new ClienteCollections(db.data.clientes);

const posada = new Posada(bien_collection, mercader_collection, clientes_collection);

async function menu_Bienes() {
  console.log("Ha entrado en los bienes.\n");
  inquirer.prompt([
  {
    type:"list",
    name:"Opcion_bienes",
    message: "¿Qué desea hacer con los bienes?:",
    choices: ["Añadir", "Eliminar", "Modificar", "Consultar información de bienes específicos"],
  }]).then(async (respuesta) => {
  switch (respuesta.Opcion_bienes) {
    case "Añadir":
      await addBien();
      break;
    case "Eliminar":
      await DeleteBien();
      break;
    case "Modificar":
      break;
    case "Consultar información de bienes específicos":
      await menu_consulta_Bienes();
      break;
  }
  })
}

async function menu_consulta_Bienes() {
  console.log("Ha entrado en el menú de la consulta de Bienes.\n");
  inquirer.prompt([
  {
    type:"list",
    name:"Opcion_consulta",
    message: "¿Cómo desea consultar sus bienes?:",
    choices: ["Nombre", "Material", "Descripción"],
  }]).then(async (respuesta) => {
  switch (respuesta.Opcion_consulta) {
    case "Nombre":
      await consulta_nombre_bien();
      break;
    case "Material":
      await consulta_material_Bien();
      break;
    case "Descripción":
      await consulta_descripcion_Bien();
      break;
  }
  })
}

async function consulta_nombre_bien() {
  const respuesta: {nombre: string} = await inquirer.prompt([
  {
    type: "input",
    name: "nombre",
    message: "¿Qué nombre de bien desea buscar?:",
  }])
  let aux: string = respuesta.nombre;
  let resultado: Bien[] = posada.findBienByName(aux);
  const opcion = await inquirer.prompt([
  {
    type: "list",
    name: "visualización",
    message: "¿Cómo desea ver el resultado?:",
    choices: ["Por Coronas, Mayor a Menor", "Por Coronas, Menor a Mayor", "Alfabéticamente Ascendente (A-Z)", "Alfabéticamente Descendente (Z-A)"],
  }]).then(async (visualización) => {
    switch(visualización.visualización) {
      case "Por Coronas, Mayor a Menor":
        resultado = posada.sortBienesByPriceDes(resultado);
        console.log(resultado);
        break;
      case "Por Coronas, Menor a Mayor":
        resultado = posada.sortBienesByPriceAsc(resultado);
        console.log(resultado);
        break;
      case "Alfabéticamente Ascendente (A-Z)":
        resultado = posada.sortBienesAlphabeticallyAsc(resultado);
        console.log(resultado);
        break;
      case "Alfabéticamente Descendente (Z-A)":
        resultado = posada.sortBienesAlphabeticallyDes(resultado);
        console.log(resultado);
        break;
    }
  })
  await main();
}

async function consulta_material_Bien() {
  const respuesta: {Material: string} = await inquirer.prompt([
    {
      type: "input",
      name: "Material",
      message: "¿De qué material están hechos los bienes a buscar?:",
    }])
    let aux: string = respuesta.Material;
    let resultado: Bien[] = posada.findBienByMaterial(aux);
    const opcion = await inquirer.prompt([
    {
      type: "list",
      name: "visualización",
      message: "¿Cómo desea ver el resultado?:",
      choices: ["Por Coronas, Mayor a Menor", "Por Coronas, Menor a Mayor", "Alfabéticamente Ascendente (A-Z)", "Alfabéticamente Descendente (Z-A)"],
    }]).then(async (visualización) => {
      switch(visualización.visualización) {
        case "Por Coronas, Mayor a Menor":
          resultado = posada.sortBienesByPriceDes(resultado);
          console.log(resultado);
          break;
        case "Por Coronas, Menor a Mayor":
          resultado = posada.sortBienesByPriceAsc(resultado);
          console.log(resultado);
          break;
        case "Alfabéticamente Ascendente (A-Z)":
          resultado = posada.sortBienesAlphabeticallyAsc(resultado);
          console.log(resultado);
          break;
        case "Alfabéticamente Descendente (Z-A)":
          resultado = posada.sortBienesAlphabeticallyDes(resultado);
          console.log(resultado);
          break;
      }
    })
    await main();
}

async function consulta_descripcion_Bien() {
  const respuesta: {Descripcion: string} = await inquirer.prompt([
    {
      type: "input",
      name: "Descripcion",
      message: "¿Qué descripción tienen los bienes a buscar?:",
    }])
    let aux: string = respuesta.Descripcion;
    let resultado: Bien[] = posada.findBienByMaterial(aux);
    const opcion = await inquirer.prompt([
    {
      type: "list",
      name: "visualización",
      message: "¿Cómo desea ver el resultado?:",
      choices: ["Por Coronas, Mayor a Menor", "Por Coronas, Menor a Mayor", "Alfabéticamente Ascendente (A-Z)", "Alfabéticamente Descendente (Z-A)"],
    }]).then(async (visualización) => {
      switch(visualización.visualización) {
        case "Por Coronas, Mayor a Menor":
          resultado = posada.sortBienesByPriceDes(resultado);
          console.log(resultado);
          break;
        case "Por Coronas, Menor a Mayor":
          resultado = posada.sortBienesByPriceAsc(resultado);
          console.log(resultado);
          break;
        case "Alfabéticamente Ascendente (A-Z)":
          resultado = posada.sortBienesAlphabeticallyAsc(resultado);
          console.log(resultado);
          break;
        case "Alfabéticamente Descendente (Z-A)":
          resultado = posada.sortBienesAlphabeticallyDes(resultado);
          console.log(resultado);
          break;
      }
    })
    await main();
}

// Función de inquirer de añadir un bien
async function addBien() {
  const answers = await inquirer.prompt([
    {
        type: 'input',
        name: 'uid',
        message: '¿UID del Bien a añadir?',
    },
    {
       type: 'input',
       name: 'name',
       message: '¿Como se llama el bien que va introducir?',
    },
    {
        type: 'input',
        name: 'Descripcion',
        message: '¿Cuál es la descripción del Bien?:',
    },
    {
       type: 'input',
       name: 'Material',
       message: '¿De qué está hecho el nuevo Bien?:',
    },
    {
       type: 'input',
       name: 'Peso',
       message: '¿Cuánto pesa el nuevo Bien?(kg):',
    },
    {
       type: 'input',
       name: 'Precio',
       message: "¿Cuántas coronas cuesta este Bien?:",
    },
  ]);
  const nuevo_bien = new Bien(answers.uid, answers.name, answers.Descripcion, answers.Material, answers.Peso, answers.Precio);
  posada.bienes.addBien(nuevo_bien);
  db.data.bienes = posada.bienes.bienes; // Actualiza la base de datos
  await db.write(); // Guarda la base de datos
  console.log("Se ha añadido el Bien satisfactoriamente.\n");
  await main();
}

async function DeleteBien() {
  const answers = await inquirer.prompt([
    {
        type: 'input',
        name: 'uid',
        message: '¿UID del Bien a borrar?',
    },
    {
       type: 'input',
       name: 'name',
       message: '¿Como se llama el bien que va a borrar?',
    },
    {
        type: 'input',
        name: 'Descripcion',
        message: '¿Cuál es la descripción del Bien?:',
    },
    {
       type: 'input',
       name: 'Material',
       message: '¿De qué está hecho el Bien?:',
    },
    {
       type: 'input',
       name: 'Peso',
       message: '¿Cuánto pesa el Bien?(kg):',
    },
    {
       type: 'input',
       name: 'Precio',
       message: "¿Cuántas coronas cuesta este Bien?:",
    },
  ]);
  const nuevo_bien = new Bien(answers.uid, answers.name, answers.Descripcion, answers.Material, answers.Peso, answers.Precio);
  posada.bienes.removeBien(nuevo_bien);
  db.data.bienes = posada.bienes.bienes; // Actualiza la base de datos
  await db.write(); // Guarda la base de datos
  console.log("Se ha borrado el Bien que ha escrito. \n");
  await main();
}

async function menu_mercaderes() {
  console.log("Ha entrado en los Mercaderes.\n");
  inquirer.prompt([
  {
    type:"list",
    name:"Opcion_mercaderes",
    message: "¿Qué desea hacer con los mercaderes?:",
    choices: ["Añadir", "Eliminar", "Modificar", "Localizar mercaderes específicos"],
  }]).then(async (respuesta) => {
  switch (respuesta.Opcion_mercaderes) {
    case "Añadir":
      await addMercader();
      break;
    case "Eliminar":
      await DeleteMercader();
      break;
    case "Modificar":
      break;
    case "Localizar mercaderes específicos":
      await consulta_Mercaderes();
      break;
  }
  })
}

async function addMercader() {
  const answers = await inquirer.prompt([
    {
        type: 'input',
        name: 'uid',
        message: '¿UID del Mercader a añadir?',
    },
    {
       type: 'input',
       name: 'name',
       message: '¿Como se llama el mercader nuevo que va introducir?',
    },
    {
       type: 'list',
       name: 'Tipo',
       message: '¿Ha qué se dedica el nuevo mercader?:',
       choices: [Tipo_mercader.ALQUIMISTA, Tipo_mercader.DRUIDA, Tipo_mercader.GENERAL, Tipo_mercader.HERRERO, Tipo_mercader.JOYERO],
    },
    {
       type: 'list',
       name: 'Ubicacion',
       message: '¿De dónde viene el nuevo mercader?:',
       choices: [Ubicacion.KAER_MORHEN, Ubicacion.NOVIGRAD, Ubicacion.SKELLIGE, Ubicacion.TORREMOLINOS, Ubicacion.VELEN],
    },
  ]);
  const nuevo_mercader = new Mercader(answers.uid, answers.name, answers.Tipo, answers.Ubicacion);
  posada.mercaderes.addMercader(nuevo_mercader);
  db.data.mercaderes = posada.mercaderes.mercaderes; // Actualiza la base de datos
  await db.write(); // Guarda la base de datos
  console.log("Se ha añadido al Mercader satisfactoriamente.\n");
  await main();
}

async function DeleteMercader() {
  const answers = await inquirer.prompt([
    {
        type: 'input',
        name: 'uid',
        message: '¿UID del Mercader a borrar?',
    },
    {
       type: 'input',
       name: 'name',
       message: '¿Como se llama el mercader que va a borrar?',
    },
    {
       type: 'list',
       name: 'Tipo',
       message: '¿Ha qué se dedica el mercader?:',
       choices: [Tipo_mercader.ALQUIMISTA, Tipo_mercader.DRUIDA, Tipo_mercader.GENERAL, Tipo_mercader.HERRERO, Tipo_mercader.JOYERO],
    },
    {
       type: 'list',
       name: 'Ubicacion',
       message: '¿De dónde viene el mercader?:',
       choices: [Ubicacion.KAER_MORHEN, Ubicacion.NOVIGRAD, Ubicacion.SKELLIGE, Ubicacion.TORREMOLINOS, Ubicacion.VELEN],
    },
  ]);
  const mercader_a_borrar = new Mercader(answers.uid, answers.name, answers.Tipo, answers.Ubicacion);
  posada.mercaderes.removeMercader(mercader_a_borrar);
  db.data.mercaderes = posada.mercaderes.mercaderes; // Actualiza la base de datos
  await db.write(); // Guarda la base de datos
  console.log("Se ha borrado al Mercader satisfactoriamente.\n");
  await main();
}

async function consulta_Mercaderes() {
  console.log("Ha entrado en el menú de la consulta de Mercaderes.\n");
  inquirer.prompt([
  {
    type:"list",
    name:"Opcion_consulta",
    message: "¿Cómo desea consultar sus Mercaderes?:",
    choices: ["Nombre", "Tipo", "Ubicación"],
  }]).then(async (respuesta) => {
  switch (respuesta.Opcion_consulta) {
    case "Nombre":
      await consulta_nombre_mercader();
      break;
    case "Tipo":
      await consulta_tipo_mercader();
      break;
    case "Ubicación":
      await consulta_ubicacion_mercader();
      break;
  }
  })
}

async function consulta_nombre_mercader() {
  const respuesta: {nombre: string} = await inquirer.prompt([
  {
    type: "input",
    name: "nombre",
    message: "¿Qué nombre de mercader desea buscar?:",
  }])
  let aux: string = respuesta.nombre;
  let resultado: Mercader[] = posada.findMercaderByName(aux);
  console.log(resultado);
  await main();
}

async function consulta_tipo_mercader() {
  const respuesta: {Tipo: Tipo_mercader} = await inquirer.prompt([
  {
    type: "list",
    name: "Tipo",
    message: "¿Qué tipo de oficio quiere buscar entre sus mercaderes?:",
    choices: [Tipo_mercader.ALQUIMISTA, Tipo_mercader.DRUIDA, Tipo_mercader.GENERAL, Tipo_mercader.HERRERO, Tipo_mercader.JOYERO],
  }]);
  let resultado: Mercader[] = posada.findMercaderByType(respuesta.Tipo);
  console.log(resultado);
  await main();
}

async function consulta_ubicacion_mercader() {
  const respuesta: {Ubicación: Ubicacion} = await inquirer.prompt([
  {
    type: "list",
    name: "Ubicación",
    message: "¿De qué lugar quiere filtrar sus mercaderes?:",
    choices: [Ubicacion.KAER_MORHEN, Ubicacion.NOVIGRAD, Ubicacion.SKELLIGE, Ubicacion.TORREMOLINOS, Ubicacion.VELEN],
  }]);
  let resultado: Mercader[] = posada.findMercaderByLocation(respuesta.Ubicación);
  console.log(resultado);
  await main();
}

async function menu_clientes() {
  console.log("Ha entrado en los Clientes.\n");
  inquirer.prompt([
  {
    type:"list",
    name:"Opcion_clientes",
    message: "¿Qué desea hacer con los clientes?:",
    choices: ["Añadir", "Eliminar", "Modificar", "Localizar clientes específicos"],
  }]).then(async (respuesta) => {
  switch (respuesta.Opcion_clientes) {
    case "Añadir":
      await addClientes();
      break;
    case "Eliminar":
      await DeleteClientes();
      break;
    case "Modificar":
      break;
    case "Localizar clientes específicos":
      await consulta_Clientes();
      break;
  }
  })
}

async function addClientes() {
  const answers = await inquirer.prompt([
  {
    type: 'input',
    name: 'uid',
    message: '¿UID del Cliente a añadir?',
  },
  {
    type: 'input',
    name: 'name',
    message: '¿Como se llama el cliente nuevo que va introducir?',
  },
  {
    type: 'list',
    name: 'Raza',
    message: '¿De qué raza es el nuevo cliente?:',
    choices: [Raza.BRUJO, Raza.ELFO, Raza.ENANO, Raza.HUMANO],
  },
  {
    type: 'list',
    name: 'Ubicacion',
    message: '¿De dónde viene el nuevo cliente?:',
    choices: [Ubicacion.KAER_MORHEN, Ubicacion.NOVIGRAD, Ubicacion.SKELLIGE, Ubicacion.TORREMOLINOS, Ubicacion.VELEN],
  },
  ]);
  const nuevo_cliente = new Cliente(answers.uid, answers.name, answers.Raza, answers.Ubicacion);
  posada.clientes.addCliente(nuevo_cliente);
  db.data.clientes = posada.clientes.clientes; // Actualiza la base de datos
  await db.write(); // Guarda la base de datos
  console.log("Se ha añadido al cliente satisfactoriamente.\n");
  await main();
}

async function DeleteClientes() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'uid',
      message: '¿UID del Cliente a borrar?',
    },
    {
      type: 'input',
      name: 'name',
      message: '¿Como se llama el cliente que va a borrar?',
    },
    {
      type: 'list',
      name: 'Raza',
      message: '¿De qué raza es el cliente?:',
      choices: [Raza.BRUJO, Raza.ELFO, Raza.ENANO, Raza.HUMANO],
    },
    {
      type: 'list',
      name: 'Ubicacion',
      message: '¿De dónde viene el cliente?:',
      choices: [Ubicacion.KAER_MORHEN, Ubicacion.NOVIGRAD, Ubicacion.SKELLIGE, Ubicacion.TORREMOLINOS, Ubicacion.VELEN],
    },
  ]);
  const cliente_a_borrar = new Cliente(answers.uid, answers.name, answers.Raza, answers.Ubicacion);
  posada.clientes.removeCliente(cliente_a_borrar);
  db.data.clientes = posada.clientes.clientes; // Actualiza la base de datos
  await db.write(); // Guarda la base de datos
  console.log("Se ha borrado el Cliente satisfactoriamente.\n");
  await main();
}

async function consulta_Clientes() {
  console.log("Ha entrado en el menú de la consulta de Clientes.\n");
  inquirer.prompt([
  {
    type:"list",
    name:"Opcion_consulta",
    message: "¿Cómo desea consultar sus Clientes?:",
    choices: ["Nombre", "Raza", "Ubicación"],
  }]).then(async (respuesta) => {
  switch (respuesta.Opcion_consulta) {
    case "Nombre":
      await consulta_nombre_cliente();
      break;
    case "Raza":
      await consulta_raza_cliente();
      break;
    case "Ubicación":
      await consulta_ubicacion_cliente();
      break;
  }
  })
}

async function consulta_nombre_cliente() {
  const respuesta: {nombre: string} = await inquirer.prompt([
  {
    type: "input",
    name: "nombre",
    message: "¿Qué nombre quiere buscar entre los mercaderes?:",
  }]);
  let resultado: Cliente[] = posada.findClienteByName(respuesta.nombre);
  console.log(resultado);
  await main();
}

async function consulta_raza_cliente() {
  const respuesta: {Raza: Raza} = await inquirer.prompt([
  {
    type: "list",
    name: "Raza",
    message: "¿En base a qué raza quiere filtrar sus clientes?:",
    choices: [Raza.BRUJO, Raza.ELFO, Raza.ENANO, Raza.HUMANO],
  }]);
  let resultado: Cliente[] = posada.findClienteByRace(respuesta.Raza);
  console.log(resultado);
  await main();
}

async function consulta_ubicacion_cliente() {
  const respuesta: {Ubicación: Ubicacion} = await inquirer.prompt([
  {
    type: "list",
    name: "Ubicación",
    message: "¿De qué lugar quiere filtrar sus clientes?:",
    choices: [Ubicacion.KAER_MORHEN, Ubicacion.NOVIGRAD, Ubicacion.SKELLIGE, Ubicacion.TORREMOLINOS, Ubicacion.VELEN],
  }]);
  let resultado: Cliente[] = posada.findClienteByLocation(respuesta.Ubicación);
  console.log(resultado);
  await main();
}

// Opciones del menú
async function main() {

  inquirer.prompt([
  {
    type: "list",
    name: "opcion",
    message: "Bienvenido a la Posada del Lobo Blanco.\n¿Qué quieres administrar?:",
    choices: ["Bienes", "Mercaderes", "Clientes", "Salir del sistema"],
  }
  ]).then(async (respuesta) => {
      switch (respuesta.opcion) {
        case "Bienes":
          await menu_Bienes();
          break;
        case "Mercaderes":
          await menu_mercaderes();
          break;
        case "Clientes":
          await menu_clientes();
          break;
        case "Salir del sistema":
          console.log("Saliendo del sistema");
          // Guardar los datos en la base de datos
          db.data.bienes = bien_collection.bienes;
          db.data.mercaderes = mercader_collection.mercaderes;
          db.data.clientes = clientes_collection.clientes;
          await db.write();

          // Aquí guardar las cosas respectivas en la base de datos

          process.exit(0); // Terminar el programa
      }    
    });
}

// Ejecutar menú
main();


// compilar: npx tsc
// ejecutar: node dist/menu.js