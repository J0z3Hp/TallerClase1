// 1.Importar módulos y dependencias que necesitemos
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// 2. configurar el uso de la clave secreta creada en el archivo .env
const key = process.env.SECRET_KEY;

// 3. función para generar token
export function generateToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, key, { expiresIn: "1h" }, (error, token) => {
      if (error) {
        reject(new Error("Error al generar JWT " + error.message));
      } else {
        resolve(token);
      }
    });
  });
}

