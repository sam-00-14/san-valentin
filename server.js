const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());
app.use(express.static("public"));

const DB_FILE = "mensajes.json";

// Crear archivo si no existe
if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, "[]");
}

// GUARDAR MENSAJE
app.post("/mensaje", (req, res) => {

    const { nombre, mensaje } = req.body;

    if (!nombre || !mensaje) {
        return res.status(400).json({ error: "Faltan datos" });
    }

    const data = JSON.parse(fs.readFileSync(DB_FILE));

    data.push({
        nombre,
        mensaje,
        fecha: new Date()
    });

    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));

    res.json({ ok: true });
});

// OBTENER MENSAJES
app.get("/mensajes", (req, res) => {

    const data = JSON.parse(fs.readFileSync(DB_FILE));
    res.json(data);

});

/* ⭐ ESTA PARTE ES LA IMPORTANTE ⭐ */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Servidor corriendo en puerto " + PORT);
});
