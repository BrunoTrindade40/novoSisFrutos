import express, { Request, Response } from "express";
import cors from "cors";
import router from "./routes";
import path from "path";

// Importe a configuração centralizada
import config from "./config";

const app = express();
// Usa a porta definida no arquivo .env do ambiente atual
const port = config.port;

app.use(express.json());

// A configuração do CORS agora é dinâmica
app.use(
  cors({
    origin: function (origin, callback) {
      // Se a origem da requisição estiver na nossa lista de permitidos (ou se não houver origem, como em testes de API)
      if (!origin || config.cors.allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error(`CORS Error: Origem não permitida - ${origin}`);
        callback(new Error("Não permitido pelo CORS"));
      }
    },
  })
);

const frontendBuildPath = path.resolve(__dirname, "..", "..", "client", "dist");
app.use(express.static(frontendBuildPath));

app.use("/api", router);

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(frontendBuildPath, "index.html"));
});

app.listen(port, () => {
  console.log(
    `Servidor rodando no ambiente [${config.nodeEnv}] na porta ${port}`
  );
});
