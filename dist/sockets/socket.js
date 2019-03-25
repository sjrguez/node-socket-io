"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usuariolista_1 = require("./../clases/usuariolista");
const usuario_1 = require("../clases/usuario");
exports.usuariosConectados = new usuariolista_1.UsuarioLista();
exports.conectarCliente = (cliente) => {
    const usuario = new usuario_1.Usuario(cliente.id);
    exports.usuariosConectados.agregarUsuario(usuario);
};
exports.desconectar = (cliente) => {
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
        exports.usuariosConectados.borrarUsuario(cliente.id);
    });
};
exports.mensaje = (cliente, io) => {
    cliente.on('mensaje', (payload) => {
        console.log('Mensaje recibido', payload);
        io.emit('mensaje-nuevo', payload);
    });
};
exports.loginWS = (cliente, io) => {
    cliente.on('configurar-usuario', (payload, callback) => {
        exports.usuariosConectados.actualizarUsuario(cliente.id, payload.nombre);
        callback({
            ok: true,
            mensaje: `Usuario: ${payload.nombre}`
        });
    });
};
