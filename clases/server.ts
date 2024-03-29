
import express from 'express'
import { SERVER_PORT } from '../global/enviroment';
import socketIO from 'socket.io'
import http from 'http'
import * as socket from '../sockets/socket'

export default class Server{

    // Private
    private static _intance:Server
    private httpServer:http.Server
    
    //Public 

    public app:express.Application
    public port:number

    public io:socketIO.Server
     

    private constructor(){
        this.app  =  express()    
        this.port = SERVER_PORT
        this.httpServer =  new http.Server(this.app)
        this.io =  socketIO(this.httpServer)


        this.escuchandoSockets()
    }

    public static get intance(){
        return this._intance || (this._intance = new this() )
    }


    private escuchandoSockets(){
        console.log('Escuchando conexiones -- Sockets'); 
        this.io.on('connection',cliente=>{
            socket.conectarCliente( cliente )
            // Mensaje
            socket.mensaje(cliente,this.io)
            // Desconectar
            socket.desconectar(cliente)
            //Usuario
            socket.loginWS(cliente,this.io) 
        })

    }


    start(callback:Function){
        this.httpServer.listen(this.port,callback)
    }

}  

