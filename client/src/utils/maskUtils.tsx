export function applyProductCodeMask(value: string): string {
  if (!value) return '';

  // Remove tudo que não é número
  const numbersOnly = value.replace(/\D/g, '');

  // Aplica a máscara: 000-000.000.000
  let maskedValue = '';
  if (numbersOnly.length > 0) {
    maskedValue += numbersOnly.substring(0, 3);
  }
  if (numbersOnly.length > 3) {
    maskedValue += '-' + numbersOnly.substring(3, 6);
  }
  if (numbersOnly.length > 6) {
    maskedValue += '.' + numbersOnly.substring(6, 9);
  }
  if (numbersOnly.length > 9) {
    maskedValue += '.' + numbersOnly.substring(9, 12);
  }

  return maskedValue;
}