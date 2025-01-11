// 1. importar dependencias y módulos
import { loginUser } from '../controllers/user.controller.js';
import express from 'express';

// 2. configurar nuestro router de express
const loginRouter = express.Router();

//3. crearnos la ruta -> crear un inicio de sesión
loginRouter.post('/', loginUser);

export default loginRouter;
