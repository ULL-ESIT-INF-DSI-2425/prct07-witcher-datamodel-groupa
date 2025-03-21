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

async function mostrarMenu() {
    while (true) {
      const { opcion } = await inquirer.prompt([
        {
          type: "list",
          name: "opcion",
          message: "Seleccione una opción:",
          choices: [
            "Bienes",
            "Mercaderes",
            "Clientes",
            "Salir",
          ],
        },
      ]);
      switch (opcion) {
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
            case "Añadir":
              const nuevoBien: {uid: number, nombre: string, descripcion: string, material: string, peso: number, valor: number} = await inquirer.prompt([
                { type: "number", name: "uid", message: "Escriba la uid del nuevo Bien: "},
                { type: "input", name: "nombre", message: "Nombre del nuevo Bien:" },
                { type: "input", name: "descripcion", message: "Descripción del nuevo Bien:" },
                { type: "input", name: "material", message: "¿De qué esta hecho el nuevo Bien?:" },
                { type: "number", name: "peso", message: "¿Cuánto pesa el nuevo Bien?:"},
                { type: "number", name: "valor", message: "Valor en coronas del nuevo Bien:" },
              ]);
              posada.bienes.addBien(new Bien(nuevoBien.uid, nuevoBien.nombre, nuevoBien.descripcion, nuevoBien.material, nuevoBien.peso, nuevoBien.valor));
            break;
            case "Borrar":
              const Bien_a_quitar: {uid: number} = await inquirer.prompt([
                { type: "number", name: "uid", message: "Escriba la uid del Bien a eliminar: "},
              ]);
              posada.bienes.removeBien(Bien_a_quitar.uid);
            break;
            case "Modificar":
            // to do 
            break;
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
            case "Añadir":
              const nuevoMercader: {uid: number, nombre: string, Tipo: Tipo_mercader, Ubicación: Ubicacion} = await inquirer.prompt([
                { type: "number", name: "uid", message: "Escriba la uid del nuevo Mercader: "},
                { type: "input", name: "nombre", message: "Nombre del nuevo Mercader:" },
                { type: "list", name: "Tipo", message: "¿De qué tipo es el nuevo Mercader?:", choices: [Tipo_mercader.ALQUIMISTA, Tipo_mercader.DRUIDA, Tipo_mercader.GENERAL, Tipo_mercader.HERRERO, Tipo_mercader.JOYERO] },
                { type: "list", name: "Ubicación", message: "¿De donde viene el nuevo Mercader?:", choices: [Ubicacion.KAER_MORHEN, Ubicacion.NOVIGRAD, Ubicacion.SKELLIGE, Ubicacion.TORREMOLINOS, Ubicacion.VELEN] },
              ]);
              posada.mercaderes.addMercader(new Mercader(nuevoMercader.uid, nuevoMercader.nombre, nuevoMercader.Tipo, nuevoMercader.Ubicación));
            break;
            case "Borrar":
              const Mercader_a_quitar: {uid: number} = await inquirer.prompt([
                { type: "number", name: "uid", message: "Escriba la uid del Mercader a eliminar: "},
              ]);
              posada.mercaderes.removeMercader(Mercader_a_quitar.uid);
            break;
            case "Modificar":
            // to do 
            break;
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
                      type: "list", name: "Tipo", message: "Tipo de mercaderes que quieres localizar:", choices: [Tipo_mercader.ALQUIMISTA, Tipo_mercader.DRUIDA, Tipo_mercader.GENERAL, Tipo_mercader.HERRERO, Tipo_mercader.JOYERO] 
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
            case "Añadir":
              const nuevo_cliente: {uid: number, nombre: string, Raza: Raza, Ubicación: Ubicacion} = await inquirer.prompt([
                { type: "number", name: "uid", message: "Escriba la uid del nuevo Cliente: "},
                { type: "input", name: "nombre", message: "Nombre del nuevo Cliente:" },
                { type: "list", name: "Raza", message: "¿De qué raza es el Cliente a registrar?:", choices: [Raza.BRUJO, Raza.ELFO, Raza.ENANO, Raza.HUMANO] },
                { type: "list", name: "Ubicación", message: "¿De donde viene el nuevo Cliente?:", choices: [Ubicacion.KAER_MORHEN, Ubicacion.NOVIGRAD, Ubicacion.SKELLIGE, Ubicacion.TORREMOLINOS, Ubicacion.VELEN] },
              ]);
              posada.clientes.addCliente(new Cliente(nuevo_cliente.uid, nuevo_cliente.nombre, nuevo_cliente.Raza, nuevo_cliente.Ubicación));
            break;
            case "Borrar":
              const Cliente_a_quitar: {uid: number} = await inquirer.prompt([
                { type: "number", name: "uid", message: "Escriba la uid del Cliente a eliminar: "},
              ]);
              posada.clientes.removeCliente(Cliente_a_quitar.uid);
            break;
            case "Modificar":
            // to do 
            break;
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
        case "Salir":
          console.log("Saliendo...");
          db.data.bienes = bien_collection.bienes;
          db.data.mercaderes = mercader_collection.mercaderes;
          db.data.clientes = clientes_collection.clientes;
          await db.write();
          return; 
      }
    }
}

// Ejecutar el menú
mostrarMenu();