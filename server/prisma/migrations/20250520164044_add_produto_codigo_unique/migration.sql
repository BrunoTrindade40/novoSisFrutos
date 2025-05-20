/*
  Warnings:

  - A unique constraint covering the columns `[codigo]` on the table `Produto` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- CreateIndex
ALTER TABLE [dbo].[Produto] ADD CONSTRAINT [Produto_codigo_key] UNIQUE NONCLUSTERED ([codigo]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
