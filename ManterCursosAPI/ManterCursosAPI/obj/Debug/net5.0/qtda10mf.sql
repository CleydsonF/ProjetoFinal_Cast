IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

CREATE TABLE [Categorias] (
    [CategoriaID] int NOT NULL IDENTITY,
    [Nome] varchar(100) NOT NULL,
    CONSTRAINT [PK_Categorias] PRIMARY KEY ([CategoriaID])
);
GO

CREATE TABLE [Usuarios] (
    [UsuarioID] int NOT NULL IDENTITY,
    [NomeUsuario] varchar(100) NOT NULL,
    [Email] varchar(100) NOT NULL,
    [Senha] varchar(100) NOT NULL,
    [ConfirmaSenha] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_Usuarios] PRIMARY KEY ([UsuarioID])
);
GO

CREATE TABLE [Cursos] (
    [CursoID] int NOT NULL IDENTITY,
    [DescricaoCurso] varchar(300) NOT NULL,
    [DataInicio] DateTime NOT NULL,
    [Datatermino] DateTime NOT NULL,
    [QuantidadeAlunos] int NOT NULL,
    [CategoriaID] int NOT NULL,
    CONSTRAINT [PK_Cursos] PRIMARY KEY ([CursoID]),
    CONSTRAINT [FK_Cursos_Categorias_CategoriaID] FOREIGN KEY ([CategoriaID]) REFERENCES [Categorias] ([CategoriaID]) ON DELETE CASCADE
);
GO

CREATE TABLE [Logs] (
    [LogID] int NOT NULL IDENTITY,
    [DataInclusao] Date NOT NULL,
    [UltimaAtualizacao] Date NOT NULL,
    [Acao] varchar(50) NOT NULL,
    [Curso] varchar(50) NOT NULL,
    [UsuarioID] int NOT NULL,
    CONSTRAINT [PK_Logs] PRIMARY KEY ([LogID]),
    CONSTRAINT [FK_Logs_Usuarios_UsuarioID] FOREIGN KEY ([UsuarioID]) REFERENCES [Usuarios] ([UsuarioID]) ON DELETE CASCADE
);
GO

CREATE INDEX [IX_Cursos_CategoriaID] ON [Cursos] ([CategoriaID]);
GO

CREATE INDEX [IX_Logs_UsuarioID] ON [Logs] ([UsuarioID]);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20211118223349_Add Log atua', N'5.0.12');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20211118223457_Add Log agr vai', N'5.0.12');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20211118224732_Add Log ja ficou chato', N'5.0.12');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20211118225505_Add Log ja ficou lalala', N'5.0.12');
GO

COMMIT;
GO

