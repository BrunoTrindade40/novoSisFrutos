import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

// Importar o componente que será testado
import { FormRastreamento } from '../FormRastreamento';
// Importar o mock da API
import * as api from '../../../../services/api';
// Importar o tipo de Produto
import type { Produto } from '../../../../types/Produto';

// Mocks de dependência externa (a API que será "fingida")
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

  // Limpa o histórico dos mocks entre os testes
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Teste 1: Renderiza o formulário corretamente
  it('renderiza o formulário corretamente', () => {
    render(<FormRastreamento />);
    // O label "Código" está fora do TextField como Typography,
    // mas o TextField ainda tem um aria-label implícito ou o placeholder.
    // O seletor getByLabelText(/código/i) deve funcionar se o TextField tiver um `label` ou `aria-label` que o `react-hook-form` ou Material-UI adicionem.
    // Se não, podemos usar `getByPlaceholderText` ou `getByRole('textbox', { name: /código/i })`.
    expect(screen.getByLabelText(/código/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enviar/i })).toBeInTheDocument();
  });

  // Teste 2: Exibe erro se o campo for enviado vazio
  it('exibe erro se o campo for enviado vazio', async () => {
    render(<FormRastreamento />);
    await userEvent.click(screen.getByRole('button', { name: /enviar/i }));
    await waitFor(() => {
      // screen.debug(); // Útil para depurar e ver o HTML renderizado
      // O helperText do TextField é usado para exibir erros de validação
      expect(screen.getByText('Campo obrigatório')).toBeInTheDocument();
    });
  });

  // Teste 3: Exibe erro se o formato do código for inválido
  it('exibe erro se o formato do código for inválido', async () => {
    render(<FormRastreamento />);
    await userEvent.type(screen.getByLabelText(/código/i), '123456');
    await userEvent.click(screen.getByRole('button', { name: /enviar/i }));

    await waitFor(() => {
      // O helperText do TextField exibirá a mensagem de erro da regex
      expect(screen.getByText(/formato inválido/i)).toBeInTheDocument();
    });
  });

  // Teste 4: Exibe os detalhes do produto quando a busca for bem-sucedida
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
      // Verifica se o título dos detalhes do produto está presente
      expect(screen.getByText(/detalhes do produto/i)).toBeInTheDocument();
      // Verifica se um dado específico do produto mock está presente
      expect(screen.getByText(/produto teste/i)).toBeInTheDocument();
      // Verifica se a API foi chamada com o código correto
      expect(mockedApi).toHaveBeenCalledWith('000-000.000.000');
    });
  });

  // Teste 5: Exibe mensagem de erro quando o produto não é encontrado
  it('exibe mensagem de erro quando o produto não é encontrado', async () => {
    const mockedApi = api.buscarProdutoPorCodigo as ReturnType<typeof vi.fn>;
    mockedApi.mockResolvedValue({
      ok: true,
      json: async () => null, // Retorna null para simular produto não encontrado
    });

    render(<FormRastreamento />);
    await userEvent.type(screen.getByLabelText(/código/i), '000-000.000.000');
    await userEvent.click(screen.getByRole('button', { name: /enviar/i }));

    await waitFor(() => {
      // A MensagemErro exibe uma Alert do Material-UI
      expect(screen.getByText(/produto não encontrado para o código informado\./i)).toBeInTheDocument();
    });
  });

  // Teste 6: Exibe mensagem de erro ao falhar a requisição
  it('exibe mensagem de erro ao falhar a requisição', async () => {
    const mockedApi = api.buscarProdutoPorCodigo as ReturnType<typeof vi.fn>;
    // Simula uma falha na requisição (erro de rede, erro 500, etc.)
    mockedApi.mockRejectedValue(new Error('Falha na API'));

    render(<FormRastreamento />);
    await userEvent.type(screen.getByLabelText(/código/i), '000-000.000.000');
    await userEvent.click(screen.getByRole('button', { name: /enviar/i }));

    await waitFor(() => {
      // A MensagemErro exibe a mensagem de falha
      expect(screen.getByText(/falha na busca: falha na api/i)).toBeInTheDocument();
    });
  });

  // Teste 7: Garante que o estado de loading é exibido e o campo é desabilitado
  it('exibe o estado de loading e desabilita o campo durante a busca', async () => {
    const mockedApi = api.buscarProdutoPorCodigo as ReturnType<typeof vi.fn>;
    // Usa um mock de promessa pendente para simular o estado de carregamento
    mockedApi.mockReturnValue(new Promise(() => {})); // Nunca resolve

    render(<FormRastreamento />);
    const input = screen.getByLabelText(/código/i);
    const submitButton = screen.getByRole('button', { name: /enviar/i });

    await userEvent.type(input, '000-000.000.000');
    await userEvent.click(submitButton);

    await waitFor(() => {
      // screen.debug(); // Mantenha isso se quiser continuar depurando o DOM completo
      // screen.debug(submitButton); // Ou apenas o botão para focar

      // ESTA É A LINHA CORRETA QUE DEVE FICAR E VAI PASSAR:
      expect(screen.getByRole('progressbar')).toBeInTheDocument();

      // Verificações adicionais
      expect(input).toBeDisabled();
      expect(submitButton).toBeDisabled();
    });
  });

  // Teste 8: Limpa o produto e o erro ao iniciar nova busca
  it('limpa o produto e o erro ao iniciar nova busca', async () => {
    const mockedApi = api.buscarProdutoPorCodigo as ReturnType<typeof vi.fn>;
    
    // Primeiro cenário: busca com sucesso
    mockedApi.mockResolvedValueOnce({
      ok: true,
      json: async () => produtoMock,
    });

    render(<FormRastreamento />);
    await userEvent.type(screen.getByLabelText(/código/i), '000-000.000.000');
    await userEvent.click(screen.getByRole('button', { name: /enviar/i }));

    await waitFor(() => {
      expect(screen.getByText(/detalhes do produto/i)).toBeInTheDocument();
    });

    // Segundo cenário: busca com erro (simulando uma nova busca)
    mockedApi.mockResolvedValueOnce({
      ok: false,
      status: 404,
      text: async () => 'Produto não encontrado',
    });

    // Clica novamente no botão enviar (pode ser necessário limpar o input primeiro se a validação impedir)
    // Para este teste, vamos garantir que o input está limpo para nova digitação
    await userEvent.clear(screen.getByLabelText(/código/i));
    await userEvent.type(screen.getByLabelText(/código/i), '111-111.111.111');
    await userEvent.click(screen.getByRole('button', { name: /enviar/i }));

    await waitFor(() => {
      // Verifica que o ProdutoDetalhes foi removido
      expect(screen.queryByText(/detalhes do produto/i)).not.toBeInTheDocument();
      // Verifica que a nova mensagem de erro está visível
      expect(screen.getByText(/falha na busca: erro 404: produto não encontrado/i)).toBeInTheDocument();
    });
  });
});