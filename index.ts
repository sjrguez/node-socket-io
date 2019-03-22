import { SERVER_PORT } from './global/enviroment';

import Server from './clases/server'
import router from './router/router';
import bodyParser from 'body-parser'
import cors from 'cors'


const server = Server.intance;


// Body-Parser

server.app.use(bodyParser.urlencoded({extended:true}))
server.app.use(bodyParser.json() )

// CORS
server.app.use(cors({origin:true,credentials:true}))


server.app.use('/',router)


server.start(()=>{
    console.log(`Servidor corriendo en el puerto ${SERVER_PORT}`);
})