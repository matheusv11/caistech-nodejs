-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "senha" VARCHAR(24) NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);
