import axios from 'axios';

// Cria uma instância do axios com configurações padrão.
// Todas as chamadas de serviço usarão esta instância.
const api = axios.create({
  /**
   * A baseURL é configurada para '/api'. O proxy do Vite (em vite.config.ts)
   * interceptará qualquer requisição que comece com '/api' e a redirecionará
   * para o servidor backend, tornando a configuração agnóstica ao ambiente.
   */
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Interceptadores (opcional, mas recomendado para o futuro):
 * Aqui você pode adicionar lógica para, por exemplo, injetar um token de autenticação
 * em todas as requisições ou lidar com erros globais (como 401 Unauthorized).
 *
 * api.interceptors.request.use(config => {
 *   const token = localStorage.getItem('authToken');
 *   if (token) {
 *     config.headers.Authorization = `Bearer ${token}`;
 *   }
 *   return config;
 * });
 */

export default api;
