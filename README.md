<h1 align="center">
  TODO Micro-SaaS
</h1>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/yagobmoreira/todo-microsaas">
  <img alt="GitHub Top Language" src="https://img.shields.io/github/languages/top/yagobmoreira/todo-microsaas" />
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/yagobmoreira/todo-microsaas">
</p>

## Descrição

Este repositório abriga um sistema TODO desenvolvido com as melhores práticas de Micro-SaaS, utilizando Next.js para gerenciar o servidor e React para as interfaces gráficas. O Prisma foi empregado para consultas ao banco de dados, e o serviço de assinatura é gerenciado com Stripe.

## Configuração do Projeto

### Pré-requisitos

- Node.js
- NPM

### Variáveis de Ambiente

Crie um arquivo `.env.development.local` na raiz do projeto, de acordo com o exemplo [.env.example](/.env.example)

```shell
touch .env.development.local
```

### Serviço de e-mail

Para desenvolvimento, foi utlizado [mailtrap](https://mailtrap.io/). Após criar uma conta, configure uma Inbox e adicione as credenciais ao arquivo `.env.development.local`

### Serviço de cobrança

Para cobrança de usuários, foi utilizado o [stripe](https://stripe.com/). Após criar uma conta, crie um projeto e adicione as chaves de APi necessárias  ao arquivo `.env.development.local`. Você deve criar os produtos, como FREE e PRO, e adicionar às variáveis de ambiente, os ID's necessários.

### Instalação

Instale as dependências do projeto:

```bash
npm install
```

Gere o Cliente Prisma:

```bash
npx prisma generate
```

Execute as migrations:
```bash
npx prisma migrate dev
```

### Executando o Projeto

#### Desenvolvimento

Para rodar o projeto em modo de desenvolvimento:

```bash
npm run start:dev
```

## 🛠 Tecnologias

As seguintes libs foram usadas na construção do projeto:

- **[NextJs](https://nextjs.org/)**
- **[TypeScript](https://www.typescriptlang.org/)**
- **[Prisma](https://www.prisma.io/)**
- **[Stripe](https://stripe.com/)**
- **[Mailtrap](https://mailtrap.io/)**
- **[shadcn/ui](https://ui.shadcn.com/)**