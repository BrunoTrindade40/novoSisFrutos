import express, { Request, Response } from "express";
import cors from "cors";
import router from "./routes";
import path from "path";
import config from "./config";

const app = express();
const port = config.port;

app.use(express.json());

// 1. Definição do Middleware de CORS
const corsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) {
    // Permite requisições sem origem (como mobile apps ou curl) ou origens listadas
    if (!origin || config.cors.allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`Bloqueio CORS. Origem tentada: ${origin}`);
      // NÃO lance um erro 'new Error', isso gera 500. Retorne false para gerar 403/401 controlado se preferir,
      // mas o padrão do library 'cors' com erro é o comportamento correto para segurança estrita.
      callback(new Error("Não permitido pelo CORS"));
    }
  },
};

// 2. Aplicar CORS SOMENTE nas rotas da API
// Isso impede que problemas de CORS bloqueiem o carregamento do site (HTML/JS/CSS)
app.use("/api", cors(corsOptions), router);

// 3. Servir Arquivos Estáticos
// Certifique-se que esta pasta existe no servidor: ../client/dist
const frontendBuildPath = path.resolve(__dirname, "..", "..", "client", "dist");
app.use(express.static(frontendBuildPath));

// 4. Fallback para SPA (Single Page Application)
// Qualquer rota não capturada pela API ou estáticos cai aqui
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(frontendBuildPath, "index.html"), (err) => {
    if (err) {
      // Se der erro aqui, é porque o frontend não foi buildado no servidor
      res.status(500).send("Erro fatal: Frontend build not found.");
    }
  });
});

app.listen(port, () => {
  console.log(
    `Servidor rodando no ambiente [${config.nodeEnv}] na porta ${port}`
  );
  console.log(`Origens permitidas: ${config.cors.allowedOrigins.join(", ")}`);
});
