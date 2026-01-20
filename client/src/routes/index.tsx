import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Main } from '../components/Main/Main';
import Home from '../pages/Home';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Rota Raiz */}
      <Route
        path="/"
        element={
          <Main>
            <Home />
          </Main>
        }
      />

      {/* Rota de Rastreio com Parâmetro: Renderiza a mesma Home */}
      {/* A Home vai ler o 'codigoNaUrl' e disparar a busca */}
      <Route
        path="/rastrear/:codigoNaUrl"
        element={
          <Main>
            <Home />
          </Main>
        }
      />

      {/* Redirecionamentos de segurança */}
      <Route path="/rastrear" element={<Navigate to="/" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
