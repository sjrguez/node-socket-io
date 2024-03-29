"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const server_1 = __importDefault(require("../clases/server"));
const router = express_1.Router();
router.get('/mensajes', (req, res) => {
    res.json({
        ok: true,
        mensaje: "It's workinggggg"
    });
});
router.post('/mensajes', (req, res) => {
    let cuerpo = req.body.cuerpo;
    let de = req.body.de;
    const payload = {
        mensaje: cuerpo,
        de
    };
    const server = server_1.default.intance;
    server.io.emit('mensaje-nuevo', payload);
    res.json({
        ok: true,
        cuerpo,
        de
    });
});
router.post('/mensajes/:id', (req, res) => {
    let cuerpo = req.body.cuerpo;
    let de = req.body.de;
    let id = req.params.id;
    const payload = {
        cuerpo,
        de
    };
    const server = server_1.default.intance;
    server.io.in(id).emit('mensaje-privado', payload);
    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });
});
exports.default = router;
