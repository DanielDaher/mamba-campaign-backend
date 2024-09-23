<h1 align="center">Mamba Campaign Backend</h1>
<div align="center">
  <img width="auto" height="23em" src="https://img.shields.io/badge/TypeScript-323330?style=flat&logo=TypeScript">
  <img width="auto" height="23em" src="https://img.shields.io/badge/Node.js-323330?style=flat&logo=Node.js">
  <img width="auto" height="23em" src="https://img.shields.io/badge/Express.js-323330?style=flat&logo=express">
  <img width="auto" height="23em" src="https://img.shields.io/badge/Prisma-323330?style=flat&logo=Prisma">
  <img width="auto" height="23em" src="https://img.shields.io/badge/MySQL-323330?style=flate&logo=mysql">
  <img width="auto" height="23em" src="https://img.shields.io/badge/Vitest-323330?style=flat&logo=vitest">
</div>

Boas vindas à API Mamba Campaign, onde o usuário pode se cadastrar, autenticar e gerenciar campanhas!

## Objetivos:

Construir uma API que permita aos usuários criar, editar e deletar campanhas. Existem regras de negócio para tais ações, que estão documentadas no swagger da aplicação.

## Tecnologias utilizadas:

As principais tecnologias utilizadas no projeto foram Node.JS, Express.Js, swagger, bcrypt, JSON Web Token, Moment.js, Typescript, Prisma, MySQL e Zod Validator.

## Como rodar o projeto?

Siga os passos abaixo.

## Pré-Requisitos

  * NodeJS (v20.10.0) e npm (v10.2.3).
  * MySQL (v8.0).

## Executando o projeto

01 - Instale as dependências:
```bash
$ npm install
```

02 - Configure as variáveis de ambiente:
  - Crie uma copia do arquivo .env.example.
  - Modifique o nome de uma copia para `.env` e preencha com as informações necessárias.

03 - Rode as migrations e seeds:
```bash
$ npm run prisma:migration
$ npm run prisma:seed
```

04 - Builde o projeto:
```bash
$ npm run build
```

05 - Inicie o projeto:
```bash
$ npm start
```

## Executando o projeto com docker (opcional)

01 - Configure as variáveis de ambiente:
  - Importante se atentar com o valor do `DB_HOST`.

02 - Suba o projeto:
```bash
$ docker compose up -d
```

## Documentação

A documentação pode ser consultada através do endpoint: `/swagger`.

Se o projeto estiver rodando na porta 3000, por exemplo, basta acessar em `http://127.0.0.1:3000/swagger/`.
