import { config } from 'dotenv';
import express from "express";

config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())
app.get("/api/hello/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Servidor funcionando na porta ${port}`);
});