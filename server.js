import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let mensajes = [];

app.get("/", (req, res) => {
  res.send("API San Valentín 💖");
});

app.get("/mensajes", (req, res) => {
  res.json(mensajes);
});

app.post("/mensaje", (req, res) => {
  const { nombre, mensaje } = req.body;
  mensajes.push({ nombre, mensaje, fecha: new Date() });
  res.json({ ok: true });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("Servidor listo", PORT));
