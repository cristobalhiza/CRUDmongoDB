import mongoose from "mongoose";

const usuariosColl = "usuarios"
const usuariosSchema = new mongoose.Schema(
    {
        nombre: String,
        email: {
            type: String, unique: true
        },
        edad: Number,
        rol: {
            type: String,
            default: "user"
        },
        materias: []
    },
    {
        timestamps: true,
        strict: false, //permite introducir otras propiedades o datos diferentes a los definidos anteriormente
        // collection:"usuarios" 
    }
)

export const usuariosModelo = mongoose.model(
    usuariosColl,
    usuariosSchema
)


