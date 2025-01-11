// 1. Importar controladores y dependencias
import express from 'express';
import { showUsers, createUser } from '../controllers/user.controller.js';

// 2. Configurar el router
const usersRouter = express.Router();

// 3. Nos creamos la ruta para cada petición
usersRouter.post('/', createUser);
usersRouter.get('/', showUsers);

export default usersRouter;