import inquirer from "inquirer";

function mostrarMenu() {
    inquirer.prompt([
        {
            type: "list",
            name: "opcion",
            message: "Selecciona una opción:",
            choices: ["Ver productos", "Comprar", "Salir"],
        }
    ]).then((respuesta) => {
        switch (respuesta.opcion) {
            case "Ver productos":
                console.log("🔍 Mostrando productos...");
                break;
            case "Comprar":
                console.log("🛒 Procesando compra...");
                break;
            case "Salir":
                console.log("👋 Saliendo...");
                process.exit(0); // Terminar el programa
        }

        // Volver a mostrar el menú después de ejecutar la opción
        mostrarMenu();
    });
}

// Ejecutar el menú
mostrarMenu();