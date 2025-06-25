import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';

function AppRouter() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Rota "armadilha": se alguém acessar /rastrear/ SEM código, redireciona para a home */}
          <Route path="/rastrear/" element={<Navigate to="/" replace />} />
          {/* Rota para /rastrear/ sem código */}
          <Route path="/rastrear/:codigoNaUrl" element={<Home />} />
          {/* Rota para /rastrear/ com código */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AppRouter;
