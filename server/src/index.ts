import { config } from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import router from "./routes"; 
import path from "path";
config();

const allowedOrigins = [
  'https://sisfrutos-adelphofrutas.com.br',      // Produção
  'https://localhost:3000'                       // Desenvolvimento (exemplo)
];

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Não permitido pelo CORS'));
    }
  }
}));

app.use("/api", router);

const frontendBuildPath = path.join(__dirname, '../../client/dist'); // Ajuste o caminho se as pastas estiverem em locais diferentes
app.use(express.static(frontendBuildPath));
// Para lidar com rotas do lado do cliente (Single Page Application),
// redirecione todas as outras requisições para o index.html do React
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(frontendBuildPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor funcionando na porta ${port}`);
});