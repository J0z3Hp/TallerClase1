// 1. Importar dependencias y módulos que necesitemos
import { userModel } from "../models/users.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/jwt.js";


// Petición POST -> Crear usuarios
export const createUser = async (req, res) => {
    try {

        const { fullName, email, password } = req.body;
        const codedPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
            fullName,
            email,
            password: codedPassword,
        });

        return res.status(201).json({
            mensaje: 'Usuario creado correctamente',
            datos: newUser
        });

    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrió un error al crear un usuario',
            problema: error || error.message
        });
    }
};


// ----------------------------------------------------------

// Petición GET -> Mostrar todos los usuarios
export const showUsers = async (req, res) => {

    try {

        let users = await userModel.find();
        if (users.length === 0) {
            return res.status(200).json({
                mensaje: 'No hay usuarios almacenados'
            })
        }

        return res.status(200).json({
            mensaje: 'Se encontraron usuarios almacenados',
            numeroUsuarios: users.length,
            datos: users
        })

    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrió un error al mostrar los usuarios',
            problema: error || error.message
        });
    }
};


// ---------------------------------------------------------------

// Petición POST para iniciar sesión
export const loginUser = async (request, response) => {

    try {

        // VALIDACIÓN 1: CORREO ---------------------------------------------------------
        const { emailLogin, passwordLogin } = request.body;
        const userFound = await userModel.findOne({
            email: emailLogin
        });

        if (!userFound) {
            return response.status(404).json({ mensaje: 'Usuario no encontrado, por favor registrarse' });
        }

        // VALIDACIÓN 2: CONTRASEÑA ------------------------------------------------------
        const isValidPassword = await bcrypt.compare(passwordLogin, userFound.password);

        if (!isValidPassword) {
            return response.status(401).json({ mensaje: 'Contraseña incorrecta' });
        }

        // VALIDACIÓN 3: GENERAR EL TOKEN ----------------------------------------------------------
        const payload = {
            id: userFound._id,
            name: userFound.fullName
        }
        const token = await generateToken(payload);


        return response.status(200).json({
            mensaje: 'Inicio de sesión exitoso',
            // token: token
        });


    } catch (error) {
        return response.status(400).json({
            mensaje: 'Hubo un error al iniciar sesión',
            error: error.message || error
        });
    }

}