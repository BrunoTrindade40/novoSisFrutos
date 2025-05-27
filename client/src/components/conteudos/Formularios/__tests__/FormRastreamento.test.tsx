import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { FormRastreamento } from '../FormRastreamento';
import * as api from '../../../../services/api';
import type { Produto } from '../../../../types/Produto';

// 🔧 Mocks de dependência externa (a API que será "fingida")
vi.mock('../../../../services/api', () => ({
  buscarProdutoPorCodigo: vi.fn(),
}));

describe('FormRastreamento', () => {
  const produtoMock: Produto = {
    fkpalet: 1,
    idromaneio: 1,
    rom_romaneio: '12345',
    rom_talhao: '1',
    rom_dtcolheita: '2024-01-01T00:00:00.000Z',
    rom_dtchegada: '2024-01-01T00:00:00.000Z',
    emp_razaoSocial: 'Empresa Teste',
    fkempresa: 10,
    endereco: 'Rua Teste',
    cidade: 'Cidade Teste',
    pro_descricao: 'Produto Teste',
    tam_descricao: 'Grande',
    cai_descricao: 'Caixa 10kg',
    Cademb_nome: 'Fulano de Tal',
    palcai_qtd: '2',
    palcai_peso: '20',
    codcaixa: '000000000000',
  };

  beforeEach(() => {
    vi.clearAllMocks(); // limpa o histórico dos mocks entre os testes
  });

  it('renderiza o formulário corretamente', () => {
    render(<FormRastreamento />);
    expect(screen.getByLabelText(/código/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enviar/i })).toBeInTheDocument();
  });

  it('exibe erro se o campo for enviado vazio', async () => {
    render(<FormRastreamento />);
    await userEvent.click(screen.getByRole('button', { name: /enviar/i }));
    await waitFor(() => {
      screen.debug();
      expect(screen.getByTestId('erro-codigo')).toHaveTextContent('Campo obrigatório');
    });
  });

  it('exibe erro se o formato do código for inválido', async () => {
    render(<FormRastreamento />);
    await userEvent.type(screen.getByLabelText(/código/i), '123456');
    await userEvent.click(screen.getByRole('button', { name: /enviar/i }));

    await waitFor(() => {
      expect(screen.getByText(/formato inválido/i)).toBeInTheDocument();
    });
  });

  it('exibe os detalhes do produto quando a busca for bem-sucedida', async () => {
    const mockedApi = api.buscarProdutoPorCodigo as ReturnType<typeof vi.fn>;
    mockedApi.mockResolvedValue({
      ok: true,
      json: async () => produtoMock,
    });

    render(<FormRastreamento />);
    await userEvent.type(screen.getByLabelText(/código/i), '000-000.000.000');
    await userEvent.click(screen.getByRole('button', { name: /enviar/i }));

    await waitFor(() => {
      expect(screen.getByText(/produto teste/i)).toBeInTheDocument();
      expect(mockedApi).toHaveBeenCalledWith('000-000.000.000');
    });
  });

  it('exibe mensagem de erro quando o produto não é encontrado', async () => {
    const mockedApi = api.buscarProdutoPorCodigo as ReturnType<typeof vi.fn>;
    mockedApi.mockResolvedValue({
      ok: true,
      json: async () => null,
    });

    render(<FormRastreamento />);
    await userEvent.type(screen.getByLabelText(/código/i), '000-000.000.000');
    await userEvent.click(screen.getByRole('button', { name: /enviar/i }));

    await waitFor(() => {
      expect(screen.getByText(/produto não encontrado/i)).toBeInTheDocument();
    });
  });

  it('exibe mensagem de erro ao falhar a requisição', async () => {
    const mockedApi = api.buscarProdutoPorCodigo as ReturnType<typeof vi.fn>;
    mockedApi.mockRejectedValue(new Error('Falha na API'));

    render(<FormRastreamento />);
    await userEvent.type(screen.getByLabelText(/código/i), '000-000.000.000');
    await userEvent.click(screen.getByRole('button', { name: /enviar/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/falha no envio\. verifique o código ou tente novamente/i)
      ).toBeInTheDocument();
    });
  });
});
