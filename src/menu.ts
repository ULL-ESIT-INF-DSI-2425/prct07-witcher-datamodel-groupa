import inquirer from "inquirer";
import { Posada } from "./posada.js";
import { Cliente, Raza } from "./clientes.js";
import { Mercader, Tipo_mercader, Ubicacion } from "./mercaderes.js";
import { Bien } from "./bienes.js";
import { BienCollections, MercaderCollections, ClienteCollections } from "./collections.js";

// Inicialización de las bases de datos vacías
const bien_collection = new BienCollections([]);
const mercader_collection = new MercaderCollections([]);
const clientes_collection = new ClienteCollections([]);

/**
 * Carga los datos desde la base de datos antes de iniciar el sistema.
 * @async
 * @function initiate_DB
 * @returns {Promise<void>} No retorna ningún valor, pero carga los datos en las colecciones.
 */
async function initiate_DB() {
  await bien_collection.loadFromDB('bienes.json'); // Carga antes de usar
  await mercader_collection.loadFromDB('mercaderes.json');
  await clientes_collection.loadFromDB('clientes.json');
}

// Cargar datos antes de ejecutar el menú
await initiate_DB();

// Crear una instancia de la Posada con las colecciones cargadas
const posada = new Posada(bien_collection, mercader_collection, clientes_collection);

/**
 * Muestra el menú interactivo para la administración de bienes, mercaderes y clientes.
 * @async
 * @function mostrarMenu
 * @returns {Promise<void>} No retorna ningún valor, pero controla la ejecución del sistema de gestión.
 */
export async function mostrarMenu() {
    while (true) {
      const { opcion } = await inquirer.prompt([
        {
          type: "list",
          name: "opcion",
          message: "Bienvenido a la Posada del Lobo Blanco\n ¿Qué desea administrar?:",
          choices: [
            "Bienes",
            "Mercaderes",
            "Clientes",
            "Salir",
          ],
        },
      ]);
      switch (opcion) {
        /**
         * Gestiona la administración de bienes dentro de la posada.
         * Permite añadir, borrar, modificar y consultar bienes.
         * @returns {Promise<void>} No retorna ningún valor, pero ejecuta la gestión de bienes.
         */
        case "Bienes":
          const { opcion_bien } = await inquirer.prompt([
            { 
              type: "list",
              name: "opcion_bien",
              message: "Seleccione que hacer con los Bienes:",
              choices: [ "Añadir", "Borrar", "Modificar", "Consultar bienes"], 
            },
          ]);
          switch(opcion_bien) {
            /**
             * Añade un nuevo bien a la base de datos.
             * @function addBien
             * @returns {Promise<void>}
             */
            case "Añadir":
              const id_nuevo: {uid: number} = await inquirer.prompt([
                { type: "number", name: "uid", message: "Escriba la ID única del nuevo Bien: "},
              ]);
              if (posada.bienes.checkID(id_nuevo.uid)) {
                console.log("\nEse ID ya existe en la base de datos de Bienes\n");
                break;
              }
              const resto_datos: {nombre: string, descripcion: string, material: string, peso: number, valor: number} = await inquirer.prompt([ 
                { type: "input", name: "nombre", message: "Nombre del nuevo Bien:" },
                { type: "input", name: "descripcion", message: "Descripción del nuevo Bien:" },
                { type: "input", name: "material", message: "¿De qué esta hecho el nuevo Bien?:" },
                { type: "number", name: "peso", message: "¿Cuánto pesa el nuevo Bien?(kg):"},
                { type: "number", name: "valor", message: "Valor en coronas del nuevo Bien:" },
              ]);
              posada.bienes.addBien(new Bien(id_nuevo.uid, resto_datos.nombre, resto_datos.descripcion, resto_datos.material, resto_datos.peso, resto_datos.valor));
              console.log("\nBien registrado correctamente en la base de datos\n");
            break;
            /**
             * Elimina un bien de la base de datos.
             * @function removeBien
             * @returns {Promise<void>}
             */
            case "Borrar":
              const Bien_a_quitar: {uid: number} = await inquirer.prompt([
                { type: "number", name: "uid", message: "Escriba la uid del Bien a eliminar: "},
              ]);
              if (posada.bienes.checkID(Bien_a_quitar.uid)) {
                posada.bienes.removeBien(Bien_a_quitar.uid);
                console.log("\nSe ha borrado el Bien correctamente\n");
                break;
              }
              console.log("\nNo hay ningún Bien con ese ID asociado a él\n");
            break;
            /**
             * Modifica un bien en la base de datos.
             * @function modBien
             * @returns {Promise<void>}
             */
            case "Modificar":
              const id_mod: {id: number} = await inquirer.prompt([
                {type: "number", name: "id", message: "Escriba la ID del Bien que quiere modificar:"},
              ]);
              if (posada.bienes.checkID(id_mod.id)) {
                const resto_datos: {nombre: string, descripcion: string, material: string, peso: number, valor: number} = await inquirer.prompt([
                  { type: "input", name: "nombre", message: "Nombre nuevo para el Bien:" },
                  { type: "input", name: "descripcion", message: "Descripción nueva del Bien:" },
                  { type: "input", name: "material", message: "¿De qué esta hecho el Bien?:" },
                  { type: "number", name: "peso", message: "¿Cuánto pesa el Bien?(kg):"},
                  { type: "number", name: "valor", message: "Valor en coronas actualizado del Bien:" },
                ]);
                posada.bienes.modBien(new Bien(id_mod.id, resto_datos.nombre, resto_datos.descripcion, resto_datos.material, resto_datos.peso, resto_datos.valor));
                console.log("\nBien modificado correctamente\n");
                break;
              }
              console.log("\nNo hay ningún Bien con esa ID en la base de la base de datos\n");
            break;
            /**
             * Consulta los bienes en la base de datos a traves de diferentes criterios.
             * @function findBien
             * @returns {Promise<void>}
             */
            case "Consultar bienes":
              const { opcion_consulta_bien } = await inquirer.prompt([
                { 
                  type: "list",
                  name: "opcion_consulta_bien",
                  message: "¿Cómo desea consultar sus bienes?:",
                  choices: ["Nombre", "Material", "Descripción"],
                },
              ]);
              let resultado: Bien[];
              switch (opcion_consulta_bien) {
                case "Nombre":
                  const nombre_buscar_bien: {nombre: string} = await inquirer.prompt([
                    {
                      type: "input", name: "nombre", message: "Nombre del Bien que va a buscar:" 
                    },
                  ]);
                  resultado = posada.findBienByName(nombre_buscar_bien.nombre);
                break;
                case "Material":
                  const material_buscar_bien: {material: string} = await inquirer.prompt([
                    {
                      type: "input", name: "material", message: "Material del que esta hecho el Bien que va a buscar:" 
                    },
                  ]);
                  resultado = posada.findBienByMaterial(material_buscar_bien.material);
                break;
                case "Descripción":
                  const descripcion_buscar_bien: {Descripcion: string} = await inquirer.prompt([
                    {
                      type: "input", name: "Descripcion", message: "Descripcion del Bien que va a buscar:" 
                    },
                  ]);
                  resultado = posada.findBienByDescription(descripcion_buscar_bien.Descripcion);
                  break;
              }
              /**
               * Muestra los resultados de la consulta de bienes en diferentes formatos.
               */
              const { visionado_consulta_bien } = await inquirer.prompt([
                { 
                  type: "list",
                  name: "visionado_consulta_bien",
                  message: "¿Cómo desea ver los resultados de la consulta?:",
                  choices: ["Por Coronas, Mayor a Menor", "Por Coronas, Menor a Mayor", "Alfabéticamente Ascendente (A-Z)", "Alfabéticamente Descendente (Z-A)"],
                },
              ]);
              switch (visionado_consulta_bien) {
                case "Por Coronas, Mayor a Menor":
                  console.log(posada.sortBienesByPriceDes(resultado));
                break;
                case "Por Coronas, Menor a Mayor":
                  console.log(posada.sortBienesByPriceAsc(resultado));
                break;
                case "Alfabéticamente Ascendente (A-Z)":
                  console.log(posada.sortBienesAlphabeticallyAsc(resultado));
                break;
                case "Alfabéticamente Descendente (Z-A)":
                  console.log(posada.sortBienesAlphabeticallyDes(resultado));
                break;
              }
            break;
          }
        break;

        /**
         * Gestiona la administración de mercaderes dentro de la posada.
         * Permite añadir, borrar, modificar y consultar mercaderes.
         * @returns {Promise<void>} No retorna ningún valor, pero ejecuta la gestión de mercaderes.
         */
        case "Mercaderes":
          const { opcion_mercader } = await inquirer.prompt([
            { 
              type: "list",
              name: "opcion_mercader",
              message: "Seleccione que hacer con los Mercaderes:",
              choices: [ "Añadir", "Borrar", "Modificar", "Consultar Mercaderes"], 
            },
          ]);
          switch(opcion_mercader) {
            /**
             * Añade un nuevo mercader a la base de datos.
             * @function addMercader
             * @returns {Promise<void>}
             */
            case "Añadir":
              const id_nuevo: {id: number} = await inquirer.prompt([
                {type: "number", name: "id", message: "Escriba la ID única del nuevo Mercader:"},
              ]);
              if (posada.mercaderes.checkID(id_nuevo.id)) {
                console.log("\nYa hay un Mercader con esa ID en la base de la base de datos\n");
                break;
              }
              const resto_datos: {name: string, Tipo: Tipo_mercader, Ubicación: Ubicacion} = await inquirer.prompt([
                { type: "input", name: "name", message: "Nombre del nuevo Mercader:" },
                { type: "list", name: "Tipo", message: "¿De qué tipo es el nuevo Mercader?:", choices: [Tipo_mercader.ALQUIMISTA, Tipo_mercader.DRUIDA, Tipo_mercader.GENERAL, Tipo_mercader.HERRERO, Tipo_mercader.JOYERO] },
                { type: "list", name: "Ubicación", message: "¿De donde viene el nuevo Mercader?:", choices: [Ubicacion.KAER_MORHEN, Ubicacion.NOVIGRAD, Ubicacion.SKELLIGE, Ubicacion.TORREMOLINOS, Ubicacion.VELEN] },
              ]);
              posada.mercaderes.addMercader(new Mercader(id_nuevo.id, resto_datos.name, resto_datos.Tipo, resto_datos.Ubicación));
              console.log("\nMercader añadido correctamente a la base de datos\n");
            break;
            /**
             * Elimina un mercader de la base de datos.
             * @function removeMercader
             * @returns {Promise<void>}
             */
            case "Borrar":
              const Mercader_a_quitar: {uid: number} = await inquirer.prompt([
                { type: "number", name: "uid", message: "Escriba la ID del Mercader a eliminar: "},
              ]);
              if (posada.mercaderes.checkID(Mercader_a_quitar.uid)) {
                posada.mercaderes.removeMercader(Mercader_a_quitar.uid);
                console.log("\nEl Mercader ha sido eliminado de la base de datos satisfactoriamente\n");
                break;
              }
              console.log("\nNo hay ningún Mercader con esa ID en la base de datos\n");
            break;
            /**
             * Modifica un mercader en la base de datos.
             * @function modMercader
             * @returns {Promise<void>}
             */
            case "Modificar":
              const id_mod: {id: number} = await inquirer.prompt([
                {type: "number", name: "id", message: "Escriba la ID del Mercader que quiere modificar:"},
              ]);
              if (posada.mercaderes.checkID(id_mod.id)) {
                const resto_datos: {name: string, Tipo: Tipo_mercader, Ubicación: Ubicacion} = await inquirer.prompt([
                  { type: "input", name: "name", message: "Nombre nuevo para Mercader:" },
                  { type: "list", name: "Tipo", message: "¿De qué tipo es el Mercader?:", choices: [Tipo_mercader.ALQUIMISTA, Tipo_mercader.DRUIDA, Tipo_mercader.GENERAL, Tipo_mercader.HERRERO, Tipo_mercader.JOYERO] },
                  { type: "list", name: "Ubicación", message: "¿De donde viene el Mercader?:", choices: [Ubicacion.KAER_MORHEN, Ubicacion.NOVIGRAD, Ubicacion.SKELLIGE, Ubicacion.TORREMOLINOS, Ubicacion.VELEN] },
                ]);
                posada.mercaderes.modMercader(new Mercader(id_mod.id, resto_datos.name, resto_datos.Tipo, resto_datos.Ubicación));
                console.log("\nMercader modificado correctamente\n");
                break;
              }
              console.log("\nNo hay ningún Mercader con esa ID en la base de la base de datos\n");
            break;
            /**
             * Consulta los mercaderes en la base de datos a traves de diferentes criterios.
             * @function findMercader
             * @returns {Promise<void>}
             */
            case "Consultar Mercaderes":
              const { opcion_consulta_mercader } = await inquirer.prompt([
                { 
                  type: "list",
                  name: "opcion_consulta_mercader",
                  message: "¿Cómo desea localizar a sus mercaderes?:",
                  choices: ["Nombre", "Tipo", "Ubicación"],
                },
              ]);
              switch (opcion_consulta_mercader) {
                case "Nombre":
                  const nombre_buscar_mercader: {nombre: string} = await inquirer.prompt([
                    {
                      type: "input", name: "nombre", message: "Nombre del Mercader que va a localizar:" 
                    },
                  ]);
                  
                  console.log(posada.findMercaderByName(nombre_buscar_mercader.nombre));
                break;
                case "Tipo":
                  const tipo_buscar_mercader: {Tipo: Tipo_mercader} = await inquirer.prompt([
                    {
                      type: "list", name: "Tipo", message: "Tipo de Mercaderes que quieres localizar:", choices: [Tipo_mercader.ALQUIMISTA, Tipo_mercader.DRUIDA, Tipo_mercader.GENERAL, Tipo_mercader.HERRERO, Tipo_mercader.JOYERO] 
                    },
                  ]);
                  console.log(posada.findMercaderByType(tipo_buscar_mercader.Tipo));
                break;
                case "Ubicación":
                  const ubicacion_buscar_mercader: {Ubicacion: Ubicacion} = await inquirer.prompt([
                    {
                      type: "list", name: "Ubicacion", message: "¿De qué lugar quiere consultar sus Mercaderes?:", choices: [Ubicacion.KAER_MORHEN, Ubicacion.NOVIGRAD, Ubicacion.SKELLIGE, Ubicacion.TORREMOLINOS, Ubicacion.VELEN] 
                    },
                  ]);
                  console.log(posada.findMercaderByLocation(ubicacion_buscar_mercader.Ubicacion));
                break;
              }
            break;
          }  
        break;
        /**
         * Gestiona la administración de clientes dentro de la posada.
         * Permite añadir, borrar, modificar y consultar clientes.
         * @returns {Promise<void>} No retorna ningún valor, pero ejecuta la gestión de clientes.
         */
        case "Clientes":
          const { opcion_clientes } = await inquirer.prompt([
            { 
              type: "list",
              name: "opcion_clientes",
              message: "Seleccione que hacer con los Clientes:",
              choices: [ "Añadir", "Borrar", "Modificar", "Consultar Clientes"], 
            },
          ]);
          switch(opcion_clientes) {
            /**
             * Añade un nuevo cliente a la base de datos.
             * @function addCliente
             * @returns {Promise<void>}
             */
            case "Añadir":
              const id_nuevo: {id: number} = await inquirer.prompt([
                {type: "number", name: "id", message: "Escriba la ID única del Cliente que quiere añadir:"},
              ]);
              if (posada.clientes.checkID(id_nuevo.id)) {
                console.log("\nYa hay un Cliente con esa ID en la base de la base de datos\n");
                break;
              }
              const resto_datos: {nombre: string, Raza: Raza, Ubicación: Ubicacion} = await inquirer.prompt([
                { type: "input", name: "nombre", message: "Nombre para el nuevo Cliente:" },
                { type: "list", name: "Raza", message: "¿De qué raza es el nuevo Cliente?:", choices: [Raza.BRUJO, Raza.ELFO, Raza.ENANO, Raza.HUMANO] },
                { type: "list", name: "Ubicación", message: "¿De donde viene el nuevo Cliente?:", choices: [Ubicacion.KAER_MORHEN, Ubicacion.NOVIGRAD, Ubicacion.SKELLIGE, Ubicacion.TORREMOLINOS, Ubicacion.VELEN] },
              ]);
              posada.clientes.addCliente(new Cliente(id_nuevo.id, resto_datos.nombre, resto_datos.Raza, resto_datos.Ubicación));
              console.log("\nCliente añadido correctamente en la base de datos\n");
            break;
            /**
             * Elimina un cliente de la base de datos.
             * @function removeCliente
             * @returns {Promise<void>}
             */
            case "Borrar":
              const Cliente_a_quitar: {uid: number} = await inquirer.prompt([
                { type: "number", name: "uid", message: "Escriba la ID del Cliente a eliminar: "},
              ]);
              if (posada.clientes.checkID(Cliente_a_quitar.uid)) {
                posada.clientes.removeCliente(Cliente_a_quitar.uid);
                console.log("\nSe ha borrado al Cliente satisfactoriamente\n");
                break;
              }
              console.log("\nNo hay ningún Cliente con esa ID en la base de datos\n");
            break;
            /**
             * Modifica un cliente en la base de datos.
             * @function modCliente
             * @returns {Promise<void>}
             */
            case "Modificar":
              const id_mod: {id: number} = await inquirer.prompt([
                {type: "number", name: "id", message: "Escriba la ID del Cliente que quiere modificar:"},
              ]);
              if (posada.clientes.checkID(id_mod.id)) {
                const resto_datos: {nombre: string, Raza: Raza, Ubicación: Ubicacion} = await inquirer.prompt([
                { type: "input", name: "nombre", message: "Nombre nuevo para el Cliente:" },
                { type: "list", name: "Raza", message: "¿De qué raza es el Cliente?:", choices: [Raza.BRUJO, Raza.ELFO, Raza.ENANO, Raza.HUMANO] },
                { type: "list", name: "Ubicación", message: "¿De donde viene el Cliente?:", choices: [Ubicacion.KAER_MORHEN, Ubicacion.NOVIGRAD, Ubicacion.SKELLIGE, Ubicacion.TORREMOLINOS, Ubicacion.VELEN] },
                ]);
                posada.clientes.modCliente(new Cliente(id_mod.id, resto_datos.nombre, resto_datos.Raza, resto_datos.Ubicación));
                console.log("\nCliente modificado correctamente\n");
                break;
              }
              console.log("\nNo hay ningún Cliente con esa ID en la base de la base de datos\n");
            break;
            /**
             * Consulta los clientes en la base de datos a traves de diferentes criterios.
             * @function findCliente
             * @returns {Promise<void>}
             */
            case "Consultar Clientes":
              const { opcion_consulta_cliente } = await inquirer.prompt([
                { 
                  type: "list",
                  name: "opcion_consulta_cliente",
                  message: "¿Cómo desea localizar a sus clientes?:",
                  choices: ["Nombre", "Raza", "Ubicación"],
                },
              ]);
              switch (opcion_consulta_cliente) {
                case "Nombre":
                  const nombre_buscar_cliente: {nombre: string} = await inquirer.prompt([
                    {
                      type: "input", name: "nombre", message: "Nombre del Cliente que va a localizar:" 
                    },
                  ]);
                  console.log(posada.findClienteByName(nombre_buscar_cliente.nombre));
                break;
                case "Raza":
                  const raza_buscar_cliente: {Raza: Raza} = await inquirer.prompt([
                    {
                      type: "list", name: "Raza", message: "Raza de Clientes que quieres localizar:", choices: [Raza.BRUJO, Raza.ELFO, Raza.ENANO, Raza.HUMANO] 
                    },
                  ]);
                  console.log(posada.findClienteByRace(raza_buscar_cliente.Raza));
                break;
                case "Ubicación":
                  const ubicacion_buscar_clientes: {Ubicacion: Ubicacion} = await inquirer.prompt([
                    {
                      type: "list", name: "Ubicacion", message: "¿De qué lugar quiere consultar sus Clientes?:", choices: [Ubicacion.KAER_MORHEN, Ubicacion.NOVIGRAD, Ubicacion.SKELLIGE, Ubicacion.TORREMOLINOS, Ubicacion.VELEN] 
                    },
                  ]);
                  console.log(posada.findClienteByLocation(ubicacion_buscar_clientes.Ubicacion));
                break;
              }
            break;
          }
        break;
        /** 
         * Finaliza la ejecución del sistema de gestión.
         * @returns {Promise<void>} No retorna ningún valor, pero finaliza el sistema.
         * 
         */
        case "Salir":
          console.log("\n¡Feliz Cacería! Esperamos volver a verle...");
          await bien_collection.saveToDB('bienes.json');
          await mercader_collection.saveToDB('mercaderes.json');
          await clientes_collection.saveToDB('clientes.json');
          return; 
      }
    }
}

// Ejecutar el menú
mostrarMenu();