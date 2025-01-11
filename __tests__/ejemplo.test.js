// Las pruebas unitarias testean funciones, logicas etc

// 1. Importar dependencias, servicios, funciones 
import suma from "../src/utils/ejemplo.js";

// 2. Definir un bloque de pruebas -> fn suma 
/* 
    PALABRAS RESERVADAS PARA HACER PRUEBAS SON:

    Describe -> Agrupar el bloque de pruebas 
    it -> Define casos individuales dentro de cada bloque de pruebas
    Expect - toBe -> Que es lo que queremos qeu suceda -> definimos cual es la respuesta que debe de suceder
*/

// 1. Paso una descripcion, y 2. luego una fn flecha
describe("Probar la función suma", () => {
    // Acá esta nuectro bloque de pruebas 

    // Caso de pruba 1: se sumen números positivos
    // 1. Descibo qué es lo que quiero que suceda
    // 2. Defini qué es lo que quiero que suceda
    it("Deberia sumar 2 número positivos, correctamente", () => {
        expect(suma(5, 2)).toBe(7);
    });

    // Caso de prueba 2: se sume número negativos
    it("Deberia sumar numeros negativos, correctamente", () => {
        expect(suma(-5, -2)).toBe(-7);
    })
});