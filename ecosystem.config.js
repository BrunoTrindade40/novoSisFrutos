module.exports = {
  apps: [
    {
      name: "API-Frutas-BS",
      script: "./dist/index.js", // Executa o JS compilado diretamente (sem npm)
      cwd: "./server/", // Raiz onde o comando será executado
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",

      // A Mágica do DevOps: Injeção direta no binário do Node
      node_args: "-r dotenv/config",

      env: {
        // Define o ambiente geral
        NODE_ENV: "production",
        // Diz ao dotenv onde buscar o arquivo (relativo ao cwd)
        DOTENV_CONFIG_PATH: "./config/Frutas_BS/.env.production",
      },
    },
    {
      name: "API-Frutas-Uniao",
      script: "./dist/index.js",
      cwd: "./server/",
      instances: 1,
      autorestart: true,
      watch: false,
      node_args: "-r dotenv/config",
      env: {
        NODE_ENV: "production",
        DOTENV_CONFIG_PATH: "./config/Frutas_Uniao/.env.production",
      },
    },
  ],
};
