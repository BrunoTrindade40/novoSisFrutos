import z from "zod";

export const produtoCodigoSchema = z.object({
  codigo: z
    .string()
    .min(10, "Código é obrigatório")
    .regex(/^\d{3}-\d{3}\.\d{3}\.\d{3}$/, {
      message: "O código deve seguir o formato XXX-XXX.XXX.XXX",
    }),
});

export type ProdutoCodigoInput = z.infer<typeof produtoCodigoSchema>;