import React from 'react';
import { BrandConfig } from '../../../config/brandConfig';

// EXPORTAÇÃO NOMEADA (Isso resolve o erro "does not provide an export named Logo")
export const Logo: React.FC = () => {
  return (
    <img
      src={BrandConfig.logo}
      alt={`Logotipo ${BrandConfig.name}`}
      // Se tiver classes CSS globais, mantenha. Senão, o style abaixo garante o visual.
      className="logo-principal"
      style={{ maxHeight: '80px', width: 'auto', objectFit: 'contain' }}
    />
  );
};
