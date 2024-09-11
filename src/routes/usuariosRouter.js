import { Router } from 'express'
import { UsuariosManager } from '../dao/UsuariosManager.js'
import { isValidObjectId } from 'mongoose'
export const router = Router()

router.get("/", async (req, res) => {
    try {
        let usuarios = await UsuariosManager.getUsers()
        res.setHeader('Content-Type', 'application/json')
        return res.status(200).json({ usuarios })

    } catch (error) {
        console.log(error)
        res.setHeader('Content-Type', 'application/json')
        return res.status(500).json({ message: 'Internal Server Error' })

    }
})

router.get("/:id", async (req, res) => {
    let { id } = req.params;
    if (!isValidObjectId(id)) {
        res.setHeader('Content-Type', 'application/json')
        return res.status(400).json({ message: 'Invalid id' })
    }

    try {
        let usuario = await UsuariosManager.getUser(id)
        res.setHeader('Content-Type', 'application/json')
        return res.status(200).json({ usuario })
    } catch (error) {
        console.log(error)
        res.setHeader('Content-Type', 'application/json')
        return res.status(404).json({ message: `No existe usuarios con ${id}` })
    }
}
)

router.post("/", async (req, res) => {
    let { nombre, email, ...otros } = req.body;
    if (!nombre || !email) {
        res.setHeader('Content-Type', 'application/json')
        return res.status(400).json({ message: 'Falta nombre o email' })
    }

    let exRegEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!exRegEmail.test(email)) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ message: 'Email invalido' });
    }
    //validaciones

    try {
        let existe = await UsuariosManager.getUserBy({ email })
        if (existe) {
            res.setHeader('Content-Type', 'application/json')
            return res.status(400).json({ message: 'Email ya existe' })
        }
        let nuevoUsuario = await UsuariosManager.createUser({ nombre, email, ...otros })
        req.io.emit("nuevoUsuario", nuevoUsuario)
        res.setHeader('Content-Type', 'application/json')
        return res.status(201).json({ nuevoUsuario })
    } catch (error) {
        console.log(error)
        res.setHeader('Content-Type', 'application/json')
        return res.status(500).json({ message: 'Error al crear usuario' })
    }
})

router.put("/:id", async (req, res) => {
    let { id } = req.params;
    if(!isValidObjectId(id)){
        res.setHeader('Content-Type', 'application/json')
        return res.status(400).json({ message: 'Invalid id' })
    }
    let { nombre, email, ...otros } = req.body;
    if (!nombre || !email) {
        res.setHeader('Content-Type', 'application/json')
        return res.status(400).json({ message: 'Falta nombre o email' })
    }
    let exRegEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!exRegEmail.test(email)) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ message: 'Email invalido' });
    }
    try {
        let existe = await UsuariosManager.getUserBy({ email })
        if (existe && existe.id != id) {
            res.setHeader('Content-Type', 'application/json')
            return res.status(400).json({ message: 'Email ya existe' })
        }
        let usuarioActualizado = await UsuariosManager.updateUser(id, {
            nombre, email, ...otros
        })
        res.setHeader('Content-Type', 'application/json')
        return res.status(200).json({ usuarioActualizado })
    } catch (error) {
        console.log(error)
        res.setHeader('Content-Type', 'application/json')
        return res.status(500).json({ message: 'Error al actualizar usuario' })
    }
})

router.delete("/:id", async(req,res)=>{
    let { id } = req.params;
    if(!isValidObjectId(id)){
        res.setHeader('Content-Type', 'application/json')
        return res.status(400).json({ message: 'Invalid id' })
        }
        try {
            let usuarioEliminado = await UsuariosManager.deleteUser(id)
            res.setHeader('Content-Type', 'application/json')
            return res.status(200).json({ usuarioEliminado })
            } catch (error) {
                console.log(error)
                res.setHeader('Content-Type', 'application/json')
                return res.status(500).json({ message: 'Error al eliminar usuario' })
                }
})

