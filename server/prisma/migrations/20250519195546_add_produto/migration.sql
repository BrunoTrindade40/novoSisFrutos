BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Produto] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nome] NVARCHAR(1000) NOT NULL,
    [descricao] NVARCHAR(1000),
    [preco] FLOAT(53) NOT NULL,
    [estoque] INT NOT NULL CONSTRAINT [Produto_estoque_df] DEFAULT 0,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Produto_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [produtor] NVARCHAR(1000),
    [romaneio] NVARCHAR(1000),
    [talhao] NVARCHAR(1000),
    [endereco] NVARCHAR(1000),
    [cidade] NVARCHAR(1000),
    [colheita] DATETIME2,
    [chegada] DATETIME2,
    [embalagem] NVARCHAR(1000),
    [embalador] NVARCHAR(1000),
    CONSTRAINT [Produto_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
