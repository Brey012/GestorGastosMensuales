const readLine = require("readline");

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const categorias = ["Alimentación", "Transporte", "Entretenimiento"];
const gastos = new Array(categorias.length).fill(0);
const presupuestos = [300000, 200000, 500000];

function mostrarMenu() {
  console.log("Menú de Control de Gastos");
  console.log("1. Ingresar gasto");
  console.log("2. Mostrar total de gastos");
  console.log("0. Salir");
  rl.question("Seleccione una opción: ", (opcion) => {
    switch (parseInt(opcion)) {
      case 1:
        ingresarGasto();
        break;
      case 2:
        mostrarGastos();
        break;
      case 0:
        console.log("Gracias por usar el control de gastos");
        rl.close();
        break;
      default:
        console.log("Opción no válida. Intente de nuevo");
        mostrarMenu();
        break;
    }
  });
}

function ingresarGasto() {
  console.log("Seleccione la categoria del gasto:");
  categorias.forEach((categoria, index) => {
    console.log(`${index + 1}. ${categoria}`);
  });

  rl.question("Seleccione la categoría del gasto:", (categoriaIndex) => {
    categoriaIndex = parseInt(categoriaIndex) - 1;
    if (categoriaIndex < 0 || categoriaIndex >= categorias.length) {
      console.log("Categoría no válida");
      mostrarMenu();
      return;
    }

    rl.question("Ingrese el monto del gasto: ", (monto) => {
      monto = parseFloat(monto);
      if (isNaN(monto)) {
        console.log("Por favor, ingrese eun número válido");
        mostrarMenu();
        return;
      }
      gastos[categoriaIndex] += monto;
      if(gastos[categoriaIndex] > presupuestos[categoriaIndex]) {
        console.log(`Alerta! Ha superado el presupuesto para ${categorias[categoriaIndex]}`);
      }
      console.log("Gasto ingresado exitosamente.");
      mostrarMenu();
    });
  });
}

function mostrarGastos() {
    let totalGastos = 0;
    console.log("Total de gastos por categoría:");
    categorias  .forEach((categoria, index) => {
        console.log(`${categoria}: $${gastos[index]}`);	
        totalGastos += gastos[index];
    });
    console.log(`Total de gastos del mes: $${totalGastos}`);
    mostrarMenu();
}

mostrarMenu();
