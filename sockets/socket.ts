import { UsuarioLista } from './../clases/usuariolista';
import { Socket } from 'socket.io';
import { Usuario } from '../clases/usuario';


export  const usuariosConectados = new UsuarioLista()



export const conectarCliente = (cliente: Socket)=>{
    const usuario = new Usuario(cliente.id)

    usuariosConectados.agregarUsuario(usuario)
    
}



export const desconectar = (cliente:Socket)=>{
    cliente.on('disconnect',()=>{
        console.log('Cliente desconectado');
        usuariosConectados.borrarUsuario(cliente.id)
    })
}


export const mensaje = (cliente:Socket,io:SocketIO.Server)=>{
    cliente.on('mensaje',(payload)=>{
        console.log('Mensaje recibido',payload);

        io.emit('mensaje-nuevo',payload)
    })
}   

export const loginWS = (cliente:Socket,io:SocketIO.Server)=>{
   
    cliente.on('configurar-usuario',(payload:{nombre:string},callback:Function)=>{
        usuariosConectados.actualizarUsuario(cliente.id,payload.nombre)
        
        callback({
            ok:true,
            mensaje:`Usuario: ${payload.nombre}`
        })
    })
    
}