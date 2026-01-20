// Função pura de máscara
const trackingCodeMask = (value: string) => {
  return value
    .replace(/\D/g, '') // Remove tudo o que não é dígito
    .replace(/(\d{3})(\d)/, '$1-$2') // 000-
    .replace(/(\d{3})(\d)/, '$1.$2') // 000-000.
    .replace(/(\d{3})(\d{1,3})/, '$1.$2') // 000-000.000.
    .replace(/(-\d{3})\.(\d{3})\.(\d{3})\d+?$/, '$1.$2.$3'); // Limita tamanho
};

export const aplicaMascaraRastreio = (
  value: string | undefined | null
): string => {
  if (!value) return '';
  const stringValue = String(value);
  // Limita a 18 caracteres para não quebrar o layout se o usuário colar texto gigante
  return trackingCodeMask(stringValue.substring(0, 18));
};

// Função auxiliar para limpar a máscara (útil antes de enviar para API se necessário)
export const removeMascara = (value: string): string => {
  return value.replace(/\D/g, '');
};
