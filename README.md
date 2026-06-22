# Longa Store

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-6.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript 6.x" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite 8" />
  <img src="https://img.shields.io/badge/React_Router-7-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white" alt="React Router 7" />
  <img src="https://img.shields.io/badge/React_Icons-5-E91E63?style=for-the-badge&logo=react&logoColor=white" alt="React Icons 5" />
  <img src="https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js 20+" />
  <img src="https://img.shields.io/badge/ESLint-10-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint 10" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Fake_Store_API-Catálogo-FF6C37?style=for-the-badge&logo=openapiinitiative&logoColor=white" alt="Fake Store API" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License MIT" />
  <a href="https://github.com/Armandomateus41/longa-store_22/actions/workflows/ci.yml"><img src="https://github.com/Armandomateus41/longa-store_22/actions/workflows/ci.yml/badge.svg" alt="CI status" /></a>
  <img src="https://img.shields.io/badge/GitHub_Actions-CI-2088FF?style=for-the-badge&logo=githubactions&logoColor=white" alt="GitHub Actions" />
  <img src="https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Deploy Vercel" />
  <img src="https://img.shields.io/badge/Autor-Armando_Capita-0066CC?style=for-the-badge&logo=github&logoColor=white" alt="Autor Armando Capita" />
</p>

<p align="center">
  <strong>E-commerce front-end completo</strong> — catálogo, carrinho, checkout e páginas institucionais.
</p>

<p align="center">
  <a href="https://longa-store-22.vercel.app"><strong>Ver site ao vivo</strong></a>
</p>

<p align="center">
  <a href="https://github.com/Armandomateus41/longa-store_22">Repositório</a>
  ·
  <a href="./docs/CI.md">CI</a>
  ·
  <a href="./docs/DEPLOY.md">Deploy</a>
  ·
  <a href="./docs/GIT.md">Git</a>
</p>

---

## Índice

| | Seção |
|---|--------|
| 1 | [Visão geral](#visão-geral) |
| 2 | [Stack](#stack) |
| 3 | [Funcionalidades](#funcionalidades) |
| 4 | [Rotas](#rotas) |
| 5 | [Como rodar](#como-rodar) |
| 6 | [Scripts](#scripts) |
| 7 | [Estrutura do projeto](#estrutura-do-projeto) |
| 8 | [Assets e imagens](#assets-e-imagens) |
| 9 | [Autenticação local](#autenticação-local) |
| 10 | [Deploy na Vercel](#deploy-na-vercel) |
| 11 | [GitHub Actions (CI)](#github-actions-ci) |
| 12 | [Git e primeiro push](#git-e-primeiro-push) |
| 13 | [Validação e qualidade](#validação-e-qualidade) |
| 14 | [Limitações](#limitações) |
| 15 | [Autor](#autor) |

---

## Visão geral

A aplicação consome a [Fake Store API](https://fakestoreapi.com/) para listagem de produtos e combina isso com:

- UI de e-commerce (header em duas faixas, hero slider, categorias, cards, footer institucional)
- Fluxo de compra: carrinho → entrega → pagamento → confirmação
- Conta de usuário persistida no navegador (`localStorage`)
- Páginas de contato, sobre, entregas, FAQ e login/cadastro

Imagens de produto são servidas localmente de `public/products/` para performance e controle visual.

---

## Stack

| Camada | Tecnologia |
|--------|------------|
| UI | React 19 |
| Linguagem | TypeScript 6 |
| Build | Vite 8 |
| Roteamento | React Router DOM 7 |
| Ícones | react-icons |
| API de produtos | Fake Store API |
| Persistência local | localStorage (auth + sessão) |

---

## Funcionalidades

### Catálogo

- Grid responsivo (2 colunas mobile / 4 desktop)
- Busca por nome e filtro por categoria
- Hero slider full-width com transição suave
- Banners promocionais e vitrine de categorias
- Skeleton loading, empty state e retry em erro

### Carrinho e checkout

- Carrinho com quantidade, remoção e resumo sticky
- Indicador de frete grátis a partir de R$ 200
- Etapas: Carrinho → Entrega → Pagamento
- Formulário de entrega com validação
- Pagamento simulado (cartão, Pix, boleto)

### Conta do usuário

- Cadastro com nome, e-mail e senha
- Login/logout com sessão persistente
- Perfil com endereço salvo no navegador
- Checkout exige login; dados pré-preenchidos do perfil

### Institucional

- `/contato` — cards WhatsApp, e-mail e telefone
- `/sobre`, `/entregas`, `/faq` — layout com sidebar
- `/conta` — login, cadastro e área logada

---

## Rotas

| Rota | Descrição |
|------|-----------|
| `/` | Home e catálogo |
| `/carrinho` | Carrinho |
| `/checkout` | Dados de entrega (requer login) |
| `/pagamento` | Pagamento (requer login) |
| `/pedido-confirmado` | Confirmação do pedido |
| `/contato` | Atendimento ao cliente |
| `/sobre` | Sobre a loja |
| `/entregas` | Entregas e prazos |
| `/faq` | Perguntas frequentes |
| `/conta` | Login, cadastro e perfil |

---

## Como rodar

### Pré-requisitos

- Node.js **20+**
- npm 10+

### Instalação

```bash
git clone https://github.com/Armandomateus41/longa-store_22.git
cd longa-store
npm install
npm run dev
```

Acesse: [http://localhost:5173](http://localhost:5173)

### Build de produção

```bash
npm run build
npm run preview
```

---

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Typecheck + build Vite (`dist/`) |
| `npm run preview` | Preview do build local |
| `npm run lint` | ESLint |
| `npm run download:images` | Baixa imagens da API para `public/products/` |

---

## Estrutura do projeto

```
longa-store/
├── public/
│   ├── imange-logo/      # Logos da marca
│   ├── imanges-fora/     # Slides, categorias, pagamento, selos
│   └── products/         # Imagens locais dos produtos (1–20)
├── docs/
│   ├── DEPLOY.md         # Guia Vercel
│   └── GIT.md            # Guia commit e push
├── scripts/
│   └── download-images.mjs
├── src/
│   ├── components/       # UI reutilizável
│   ├── context/          # Cart, Checkout, Auth
│   ├── data/             # Imagens, FAQ, contato
│   ├── pages/            # Rotas da aplicação
│   ├── services/         # API e authStorage
│   ├── types/            # Tipos TypeScript
│   └── utils/            # Formatação e helpers
├── vercel.json           # Rewrite SPA
├── package.json
└── README.md
```

---

## Assets e imagens

| Pasta | Conteúdo |
|-------|----------|
| `public/products/` | PNGs dos produtos (`/products/{id}.png`) |
| `public/imanges-fora/` | Slides, categorias, formas de pagamento |
| `public/imange-logo/` | Logo header, footer e favicon |

Paths centralizados em `src/data/storeImages.ts`.

Para regenerar imagens de produto:

```bash
npm run download:images
```

---

## Autenticação local

| Chave localStorage | Uso |
|--------------------|-----|
| `longa-store:users` | Usuários cadastrados |
| `longa-store:session` | Sessão ativa |

> **Atenção:** autenticação apenas no front-end, sem backend. Adequado para demonstração e deploy estático. Não use senhas reais de produção.

---

## Deploy na Vercel

1. Conecte o repositório [Armandomateus41/longa-store_22](https://github.com/Armandomateus41/longa-store_22) na Vercel.
2. Framework: **Vite** | Output: **`dist`** | Build: **`npm run build`**
3. O `vercel.json` garante rewrite SPA para todas as rotas.

Guia detalhado: [docs/DEPLOY.md](./docs/DEPLOY.md)

---

## GitHub Actions (CI)

Pipeline configurado em `.github/workflows/ci.yml`:

| Gatilho | Ação |
|---------|------|
| Push em `main` | Lint + build |
| Pull request → `main` | Lint + build |

Badge de status no topo deste README. Guia completo: [docs/CI.md](./docs/CI.md)

Para ativar no GitHub, envie o workflow:

```bash
git add .github/workflows/ci.yml docs/CI.md README.md
git commit -m "ci: adicionar GitHub Actions para lint e build"
git push origin main
```

Depois acompanhe em **Actions** no repositório.

---

## Git e primeiro push

Ambiente preparado para Git. Passo a passo completo: [docs/GIT.md](./docs/GIT.md)

Resumo:

```bash
git init
git branch -M main
git remote add origin https://github.com/Armandomateus41/longa-store_22.git
git add .
git commit -m "feat: e-commerce Longa Store"
git pull origin main --allow-unrelated-histories
git push -u origin main
```

---

## Validação e qualidade

Antes de commit ou deploy, execute:

```bash
npm run lint
npm run build
```

| Verificação | Status esperado |
|-------------|-----------------|
| TypeScript | Sem erros (`tsc -b`) |
| ESLint | Sem erros |
| Build Vite | Gera `dist/` |
| Rotas SPA | `vercel.json` presente |

---

## Limitações

- Pagamento e pedidos são **simulados**
- Catálogo depende da disponibilidade da Fake Store API
- Dados de usuário ficam **somente no navegador** atual
- Limpar cache/localStorage remove cadastro e sessão

---

## Autor

**Armando Capita**

Projeto concebido, desenvolvido e documentado por Armando Capita.

- GitHub: [Armandomateus41/longa-store_22](https://github.com/Armandomateus41/longa-store_22)
- Licença: [MIT](./LICENSE) — Copyright (c) 2026 Armando Capita

---

<p align="center">
  <strong>Longa Store</strong> — Feito por <strong>Armando Capita</strong>
</p>
