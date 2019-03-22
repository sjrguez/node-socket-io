"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
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
    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });
});
exports.default = router;
