-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "NodeArea" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "label" TEXT NOT NULL,
    "descricao" TEXT,
    "dragging" BOOLEAN NOT NULL,
    "height" INTEGER NOT NULL,
    "parentNode" TEXT,
    "position.x" REAL NOT NULL,
    "position.y" REAL NOT NULL,
    "positionAbsolute.x" REAL NOT NULL,
    "positionAbsolute.y" REAL NOT NULL,
    "selected" BOOLEAN,
    "style.width" INTEGER NOT NULL,
    "style.height" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "zIndex" INTEGER NOT NULL,
    "usuarioId" TEXT NOT NULL,
    CONSTRAINT "NodeArea_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "NodeProcesso" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "label" TEXT NOT NULL,
    "descricao" TEXT,
    "sistemasUtilizados" TEXT,
    "responsaveis" TEXT,
    "dragging" BOOLEAN NOT NULL,
    "height" INTEGER NOT NULL,
    "parentNode" TEXT,
    "position.x" REAL NOT NULL,
    "position.y" REAL NOT NULL,
    "positionAbsolute.x" REAL NOT NULL,
    "positionAbsolute.y" REAL NOT NULL,
    "selected" BOOLEAN,
    "style.width" INTEGER NOT NULL,
    "style.height" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "zIndex" INTEGER NOT NULL,
    "usuarioId" TEXT NOT NULL,
    CONSTRAINT "NodeProcesso_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Edge" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "source" TEXT NOT NULL,
    "sourceHandle" TEXT NOT NULL,
    "target" TEXT NOT NULL,
    "targetHandle" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    CONSTRAINT "Edge_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
