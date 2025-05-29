import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { useParams } from 'react-router-dom';
import { FormRastreamento } from '../FormRastreamento';
import * as api from '../../../../services/api';
import type { Produto } from '../../../../types/Produto';

// Mock da API
vi.mock('../../../../services/api', () => ({
  buscarProdutoPorCodigo: vi.fn(),
}));

// Mock do useParams do react-router-dom
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useParams: vi.fn(),
}));

// Mock do FormInput
vi.mock('./FormInput', () => ({
  FormInput: vi.fn(({ control, name, ariaLabel, placeholder, loading }) => {
    const { field } = control.register(name);
    return (
      <input
        aria-label={ariaLabel}
        placeholder={placeholder}
        name={name}
        value={field.value || ''}
        onChange={field.onChange}
        disabled={loading}
      />
    );
  }),
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

  let consoleErrorSpy: vi.SpyInstance;

  beforeEach(() => {
    vi.clearAllMocks();
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('renderiza o formulário corretamente', () => {
    (useParams as ReturnType<typeof vi.fn>).mockReturnValue({});
    render(<FormRastreamento />);
    expect(screen.getByLabelText(/código/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enviar/i })).toBeInTheDocument();
  });

  it('exibe erro se o campo for enviado vazio', async () => {
    (useParams as ReturnType<typeof vi.fn>).mockReturnValue({});
    render(<FormRastreamento />);
    await userEvent.click(screen.getByRole('button', { name: /enviar/i }));
    await waitFor(() => {
      expect(screen.getByText('Campo obrigatório')).toBeInTheDocument();
    });
  });

  it('exibe erro se o formato do código for inválido', async () => {
    (useParams as ReturnType<typeof vi.fn>).mockReturnValue({});
    render(<FormRastreamento />);
    await userEvent.type(screen.getByLabelText(/código/i), '123456');
    await userEvent.click(screen.getByRole('button', { name: /enviar/i }));

    await waitFor(() => {
      expect(screen.getByText(/formato inválido/i)).toBeInTheDocument();
    });
  });

  it('exibe os detalhes do produto quando a busca for bem-sucedida', async () => {
    (useParams as ReturnType<typeof vi.fn>).mockReturnValue({});
    const mockedApi = api.buscarProdutoPorCodigo as ReturnType<typeof vi.fn>;
    mockedApi.mockResolvedValue({
      ok: true,
      json: async () => produtoMock,
    });

    render(<FormRastreamento />);
    await userEvent.type(screen.getByLabelText(/código/i), '000-000.000.000');
    await userEvent.click(screen.getByRole('button', { name: /enviar/i }));

    await waitFor(() => {
      expect(screen.getByText(/detalhes do produto/i)).toBeInTheDocument();
      expect(screen.getByText(/produto teste/i)).toBeInTheDocument();
      expect(mockedApi).toHaveBeenCalledWith('000-000.000.000');
    });
  });

  it('exibe mensagem de erro quando o produto não é encontrado', async () => {
    (useParams as ReturnType<typeof vi.fn>).mockReturnValue({});
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
    (useParams as ReturnType<typeof vi.fn>).mockReturnValue({});
    const mockedApi = api.buscarProdutoPorCodigo as ReturnType<typeof vi.fn>;
    mockedApi.mockRejectedValue(new Error('Falha na API'));

    render(<FormRastreamento />);
    await userEvent.type(screen.getByLabelText(/código/i), '000-000.000.000');
    await userEvent.click(screen.getByRole('button', { name: /enviar/i }));

    await waitFor(() => {
      expect(screen.getByText(/falha na busca: falha na api/i)).toBeInTheDocument();
    });
  });

  it('exibe loading e desabilita o campo durante a busca', async () => {
    (useParams as ReturnType<typeof vi.fn>).mockReturnValue({});
    const mockedApi = api.buscarProdutoPorCodigo as ReturnType<typeof vi.fn>;
    mockedApi.mockReturnValue(new Promise(() => {})); // Nunca resolve

    vi.doMock('react-hook-form', () => ({
      useForm: () => ({
        register: vi.fn(),
        handleSubmit: vi.fn(),
        setValue: vi.fn(),
        reset: vi.fn(),
        control: {},
        formState: { errors: {}, isSubmitting: true },
      }),
      useFormContext: () => ({ control: {} }),
      Controller: ({ render }: any) => render({ field: { onChange: vi.fn(), value: '' }, fieldState: { invalid: false } }),
    }));

    render(<FormRastreamento />);
    const inputElement = screen.getByLabelText(/código/i).querySelector('input')!;
    const submitButton = screen.getByRole('button', { name: /enviar/i });

    await userEvent.type(inputElement, '000-000.000.000');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
      expect(inputElement).toHaveAttribute('disabled');
      expect(submitButton).toBeDisabled();
    });
  });

  it('limpa o produto e o erro ao iniciar nova busca', async () => {
    (useParams as ReturnType<typeof vi.fn>).mockReturnValue({});
    const mockedApi = api.buscarProdutoPorCodigo as ReturnType<typeof vi.fn>;

    mockedApi.mockResolvedValueOnce({
      ok: true,
      json: async () => produtoMock,
    });

    render(<FormRastreamento />);
    const inputElement = screen.getByLabelText(/código/i).querySelector('input')!;

    await userEvent.type(inputElement, '000-000.000.000');
    await userEvent.click(screen.getByRole('button', { name: /enviar/i }));

    await waitFor(() => {
      expect(screen.getByText(/detalhes do produto/i)).toBeInTheDocument();
    });

    mockedApi.mockResolvedValueOnce({
      ok: false,
      status: 404,
      text: async () => 'Produto não encontrado',
    });

    await userEvent.clear(inputElement);
    await userEvent.type(inputElement, '111-111.111.111');
    await userEvent.click(screen.getByRole('button', { name: /enviar/i }));

    await waitFor(() => {
      expect(screen.queryByText(/detalhes do produto/i)).not.toBeInTheDocument();
      expect(screen.getByText(/falha na busca: erro 404: produto não encontrado/i)).toBeInTheDocument();
    });
  });

  it('preenche e submete o formulário com código da URL se formato válido', async () => {
  (useParams as ReturnType<typeof vi.fn>).mockReturnValue({ codigoNaUrl: '123-456.789.012' });
  const mockedApi = api.buscarProdutoPorCodigo as ReturnType<typeof vi.fn>;
  mockedApi.mockResolvedValue({
    ok: true,
    json: async () => produtoMock,
  });

  render(<FormRastreamento />);

  await waitFor(() => {
    const inputElement = screen.getByLabelText(/código/i).querySelector('input')!;
    expect(inputElement).toHaveValue('123-456.789.012');
    expect(api.buscarProdutoPorCodigo).toHaveBeenCalledWith('123-456.789.012');
    expect(screen.getByText(/detalhes do produto/i)).toBeInTheDocument();
  });
});

  it('exibe erro se o código da URL tiver formato inválido', async () => {
    (useParams as ReturnType<typeof vi.fn>).mockReturnValue({ codigoNaUrl: '123456' });
    render(<FormRastreamento />);

    await waitFor(() => {
      expect(screen.getByText(/formato inválido/i)).toBeInTheDocument();
    });
  });
});