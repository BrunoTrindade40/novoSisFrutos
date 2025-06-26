import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { FormRastreamento } from '../FormRastreamento';
import * as api from '../../../../services/api';
import type { Produto } from '../../../../types/Produto';

vi.mock('../../../../services/api', () => ({
  buscarProdutoPorCodigo: vi.fn(),
}));

const produtoMock: Produto = {
  codigoCaixa: '000-000.000.000',
  nomeProduto: 'Produto Teste',
  dataColheita: '2024-01-01T00:00:00.000Z',
  dataChegada: '2024-01-01T00:00:00.000Z',
  produtorEmpresa: 'Empresa Teste',
  nomeEmbalador: 'Fulano de Tal',
  embalagem: 'Caixa 10kg',
  numeroRomaneio: '12345',
  talhaoRomaneio: '1',
  endereco: 'Rua Teste',
  cidade: 'Cidade Teste',
  tamanhoProduto: 'Grande',
};

// *** INÍCIO DA CORREÇÃO ***
// Helper atualizado para conhecer todas as rotas relevantes.
const renderComponent = (
  props: { isLoading?: boolean; initialCodigo?: string } = {},
  initialPath = '/'
) => {
  const onSearchResultMock = vi.fn();
  const { isLoading = false, initialCodigo } = props;

  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        {/* Rota para a raiz */}
        <Route
          path="/"
          element={
            <FormRastreamento
              onSearchResult={onSearchResultMock}
              isLoading={isLoading}
              initialCodigo={initialCodigo}
            />
          }
        />
        {/* Rota para o caminho com o código */}
        <Route
          path="/rastrear/:codigoNaUrl"
          element={
            <FormRastreamento
              onSearchResult={onSearchResultMock}
              isLoading={isLoading}
              initialCodigo={initialCodigo}
            />
          }
        />
      </Routes>
    </MemoryRouter>
  );

  return { onSearchResultMock };
};
// *** FIM DA CORREÇÃO ***

describe('FormRastreamento', () => {
  const mockedApi = api.buscarProdutoPorCodigo as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renderiza o formulário corretamente', () => {
    renderComponent();
    expect(
      screen.getByRole('textbox', { name: /código/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enviar/i })).toBeInTheDocument();
  });

  it('exibe erro de validação se o campo for enviado vazio', async () => {
    renderComponent();
    await userEvent.click(screen.getByRole('button', { name: /enviar/i }));
    await waitFor(() => {
      expect(screen.getByText('Campo obrigatório')).toBeInTheDocument();
    });
  });

  it('exibe erro de validação se o formato do código for inválido', async () => {
    renderComponent();
    await userEvent.type(
      screen.getByRole('textbox', { name: /código/i }),
      '123456'
    );
    await userEvent.click(screen.getByRole('button', { name: /enviar/i }));
    await waitFor(() => {
      expect(screen.getByText(/formato inválido/i)).toBeInTheDocument();
    });
  });

  it('chama onSearchResult com os dados do produto em caso de sucesso', async () => {
    mockedApi.mockResolvedValue({ ok: true, json: async () => produtoMock });
    // Ajuste na chamada para ser mais explícito
    const { onSearchResultMock } = renderComponent({}, '/');

    await userEvent.type(
      screen.getByRole('textbox', { name: /código/i }),
      '000-000.000.000'
    );
    await userEvent.click(screen.getByRole('button', { name: /enviar/i }));

    await waitFor(() => {
      expect(mockedApi).toHaveBeenCalledWith('000-000.000.000');
      expect(onSearchResultMock).toHaveBeenCalledWith({
        produto: produtoMock,
        erro: null,
      });
    });
  });

  it('chama onSearchResult com erro quando o produto não é encontrado', async () => {
    mockedApi.mockResolvedValue({ ok: true, json: async () => null });
    const { onSearchResultMock } = renderComponent();
    await userEvent.type(
      screen.getByRole('textbox', { name: /código/i }),
      '111-111.111.111'
    );
    await userEvent.click(screen.getByRole('button', { name: /enviar/i }));
    await waitFor(() => {
      expect(onSearchResultMock).toHaveBeenCalledWith({
        produto: null,
        erro: 'Produto não encontrado para o código informado.',
      });
    });
  });

  it('chama onSearchResult com erro ao falhar a requisição da API', async () => {
    mockedApi.mockRejectedValue(new Error('Falha na rede'));
    const { onSearchResultMock } = renderComponent();
    await userEvent.type(
      screen.getByRole('textbox', { name: /código/i }),
      '222-222.222.222'
    );
    await userEvent.click(screen.getByRole('button', { name: /enviar/i }));
    await waitFor(() => {
      expect(onSearchResultMock).toHaveBeenCalledWith({
        produto: null,
        erro: 'Falha na rede',
      });
    });
  });

  it('chama onSearchResult para limpar o estado antes de cada busca', async () => {
    mockedApi.mockResolvedValue({ ok: true, json: async () => produtoMock });
    // Ajuste na chamada para ser mais explícito
    const { onSearchResultMock } = renderComponent({}, '/');

    await userEvent.type(
      screen.getByRole('textbox', { name: /código/i }),
      '000-000.000.000'
    );
    await userEvent.click(screen.getByRole('button', { name: /enviar/i }));

    await waitFor(() => {
      expect(onSearchResultMock).toHaveBeenCalledTimes(2);
      expect(onSearchResultMock).toHaveBeenCalledWith({
        produto: null,
        erro: null,
      });
      expect(onSearchResultMock).toHaveBeenCalledWith({
        produto: produtoMock,
        erro: null,
      });
    });
  });

  it('desabilita o formulário e exibe o spinner quando isLoading é true', () => {
    renderComponent({ isLoading: true });
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /código/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /enviar/i })).toBeDisabled();
  });

  it('preenche e submete o formulário com código da URL se o formato for válido', async () => {
    mockedApi.mockResolvedValue({ ok: true, json: async () => produtoMock });
    const codigo = '123-456.789.012';
    // Ajuste na chamada para usar a nova assinatura do helper
    const { onSearchResultMock } = renderComponent(
      { initialCodigo: codigo },
      `/rastrear/${codigo}`
    );

    await waitFor(() => {
      expect(mockedApi).toHaveBeenCalledWith(codigo);
      expect(onSearchResultMock).toHaveBeenCalledWith({
        produto: produtoMock,
        erro: null,
      });
    });
  });

  it('NÃO submete o formulário se o código da URL tiver formato inválido', async () => {
    const codigo = '12345';
    // Ajuste na chamada
    const { onSearchResultMock } = renderComponent(
      { initialCodigo: codigo },
      `/rastrear/${codigo}`
    );

    await new Promise((r) => setTimeout(r, 100));
    expect(mockedApi).not.toHaveBeenCalled();
    expect(onSearchResultMock).not.toHaveBeenCalled();
  });
});
