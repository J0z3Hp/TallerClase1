// 1. Importamos dependencias, modulos y/o funciones
import supertest from "supertest";
import app from "../app.js";// Nos permite probar la conexion a DB, probar rutas -> probar los controllers
import mongoose from "mongoose";
import { userModel } from "../src/models/users.model.js";

// 2. Definir los bloques de prueba
describe("Pruebas de los controladores de los usuarios", () => {

    /* 
    Configuración global de las pruebas:
        beforeEach: Para ejecutar acciones que queremos que se haga antes de cada prueba
        afterAll: Ejecuta acciones que queramos que se hagan al final de TODAS las pruebas
    */

    // Limpiar base de datos antes de cada prueba 
    beforeEach(async () => {
        await  userModel.deleteMany({}); // Con esto le estasmos diciendo que borre todo lo de la DB(dataBase)
    });

    // Cerrar la conexion a mongoDB despues de todas las pruebas 
    afterAll(async () => {
        await mongoose.connection.close();
    });

    const testUser = {
        "fullName": "jhon salchichon",
        "email": "jhon@gmail.com",
        "password": "1234"
    }

    // 2.1 Defino bloque de prueba para peticion POST
    describe("Pruebas POST /users", () => {
        /* 
            Casos exitosos
            Casos fallidos: Faltan campos requeridos, credenciales incorrectas, elementos no encontrados 
        */

        // Primer caso de prueba: Creación de ususarios
        it("Deberia crear un usuario, correctamente", async () => {
            const res = await supertest(app).post("/usuarios").send(testUser) // Puede ser depende de la peticion ("/usuarios/crear") - ("/usuarios/get")

            // Definir que esperamos de esa respuesta
            expect(res.statusCode).toBe(201);
        });
        
        // Segundo caso de prueba: Error si falta un campo obligatorio 
        it("Deberia devolver un error si falta un campo obligatorio", async () => {
            const res = await supertest(app).post("/usuarios").send({"email": testUser.email});

            // Definir que esperamos de esa respuesta
            expect(res.body).toHaveProperty("mensaje", "Ocurrió un error al crear un usuario"); // El mensaje tiene que ser igual al mensaje del controlador 
        });
    });

    // 2.2 Defino otro bloque de pruebas para peticion GET
    describe("Pruebas GET /users", () => {
        
        // Primer caso de prueba: Deberia indicar que no hay usuarios almacenados
        it("Deberia indicar que no hay ususarios almacenados", async() => {
            const res = await supertest(app).get("/usuarios");
            expect(res.statusCode).toBe(200); // El mismo statusCode que tenemos en el controlador
            expect(res.body).toHaveProperty("mensaje", "No hay usuarios almacenados");
        });





        // Si van a probar que funcione la peticion get teniendo usuarios almacenados 
        //await new userModel(testUser).save(); // Debemos primero guardar un usuario
    });
});