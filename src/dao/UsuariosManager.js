import { usuariosModelo } from "./models/usuariosModels.js"

export class UsuariosManager {
    static async getUsers() {
        return await usuariosModelo.find().lean()
    }

    static async getUserBy(filtro = {}) {
        return await usuariosModelo.findOne(filtro).lean()
    }

    static async createUser(usuario) {
        let usuarioNuevo = await usuariosModelo.create(usuario)
        return usuarioNuevo.toJSON()
        
    }

    static async updateUser(id, usuario) {
        return await usuariosModelo.findByIdAndUpdate(id, usuario, { new: true }).lean()

    }

    static async deleteUser(id) {
        return await usuariosModelo.findByIdAndDelete(id, { new: true }).lean()

    }

}