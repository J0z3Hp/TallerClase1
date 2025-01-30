
// 1. IMPORTAR LAS DEPENDENCIAS Y MÓDULOS QUE NECESITAMOS
import express from 'express'; 
import dotenv from 'dotenv'; 
import { connectionMongo } from './src/config/dataBase.js';
import usersRouter from './src/routes/user.routes.js';
import loginRouter from './src/routes/login.routes.js';
import cors from 'cors'; 
// Importaciones para acceder a las rutas del frontend -  configurar el acceso al frontend
import path from "path";
import { fileURLToPath } from "url";

// 2. configurar el uso de nuestro servidor y dependencias
const app = express(); 
dotenv.config(); 
connectionMongo();
app.use(cors()); 

// Configuraciones para el acceso al frontend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Le indico las rutas que debe utilizar
app.use(express.json());
app.use('/usuarios', usersRouter);
app.use('/iniciarSesion', loginRouter);

// Vamos a hacer la peticion de la ruta de la carpeta public
app.use(express.static(path.join(__dirname, "public")));

// Configuración de la ruta de la página principal
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

export default app; 


