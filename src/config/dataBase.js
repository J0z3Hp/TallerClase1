// 1. Importar las dependencias que se necesitan
import mongoose from 'mongoose';

// 2. Crearmos una función para conectar la base de datos

export async function connectionMongo(){

    try{
        // conectar base de datos
        await mongoose.connect(process.env.DB_URL,{dbName: 'pruebaTecnica'});
        console.log('Conexión exitosa con la base de datos');
    }catch(error){
        console.error('Error de conexión: ' + error);
    }
} 