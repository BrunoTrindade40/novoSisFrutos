module.exports = {
  apps: [
    {
      name: "novosisfrutos",
      // Aponta diretamente para o ficheiro de arranque na pasta 'dist'
      script: "./dist/index.js",
      // Define o ambiente de produção
      env: {
        NODE_ENV: "production",
      },
      // Mantém a configuração de fiabilidade
      autorestart: true,
      watch: false,
      restart_delay: 5000,
    },
  ],
};
