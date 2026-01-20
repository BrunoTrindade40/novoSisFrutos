module.exports = {
  apps: [
    {
      name: "DIAG-NODE-VERSION",
      script: "npm",
      args: "run check-node-version",
      cwd: "./server/",
      autorestart: false, // Não precisa reiniciar
    },
    {
      name: "DIAG-NPM-VERSION",
      script: "npm",
      args: "run check-npm-version",
      cwd: "./server/",
      autorestart: false,
    },
  ],
};
