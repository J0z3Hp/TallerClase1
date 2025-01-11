// 1. importamos dependencias
import mongoose from "mongoose";


// 2. crearnos el esquema de datos
const userSchema = new mongoose.Schema({
    fullName: {type: String, required:true},
    email: {type:String, required:true, unique:true},
    password: {type: String, required:true}
});

//3. definir nuestro modelo
export const userModel = mongoose.model('user', userSchema);