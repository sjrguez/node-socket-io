import {Router,Response,Request} from 'express'
import Server from '../clases/server';


const router = Router()



router.get('/mensajes',(req:Request,res:Response)=>{

    res.json({
        ok:true,
        mensaje:"It's workinggggg"
    })

})

router.post('/mensajes',(req:Request,res:Response)=>{

    let cuerpo =  req.body.cuerpo
    let de =  req.body.de

    const payload = {
        mensaje:cuerpo,
        de
    } 
    const server = Server.intance
    server.io.emit('mensaje-nuevo',payload)

    res.json({
        ok:true,
        cuerpo,
        de
    })

})

router.post('/mensajes/:id',(req:Request,res:Response)=>{
    let cuerpo =  req.body.cuerpo
    let de =  req.body.de
    let id  = req.params.id

    const payload = {
        cuerpo,
        de
    } 

    const server = Server.intance

    server.io.in(id).emit( 'mensaje-privado', payload )



    res.json({
        ok:true,
        cuerpo,
        de,
        id
    })

})


export default router;