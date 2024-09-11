import {Router} from 'express'
import { UsuariosManager } from '../dao/UsuariosManager.js'
export const router=Router()

router.get('/',async(req,res)=>{

    const usuarios=await UsuariosManager.getUsers()

    res.status(200).render("home", {
        usuarios
    })
})