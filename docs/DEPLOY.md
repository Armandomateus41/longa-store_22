# Deploy na Vercel

<p align="center">
  <img src="https://img.shields.io/badge/Vercel-Deploy-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite 8" />
  <img src="https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js 20+" />
  <img src="https://img.shields.io/badge/Output-dist-000000?style=for-the-badge" alt="Output dist" />
</p>

Guia operacional para publicar a **Longa Store** em produção.

## Pré-requisitos

| Item | Detalhe |
|------|---------|
| Conta | [Vercel](https://vercel.com) conectada ao GitHub |
| Repositório | [Armandomateus41/longa-store_22](https://github.com/Armandomateus41/longa-store_22) |
| Node.js | 20.x ou superior (local e CI) |

## Configuração automática (recomendado)

1. Importe o repositório na Vercel.
2. Confirme as configurações detectadas:

| Campo | Valor |
|-------|-------|
| Framework Preset | Vite |
| Root Directory | `.` (raiz do repositório) |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

3. Clique em **Deploy**.

O arquivo `vercel.json` na raiz já inclui o rewrite SPA necessário para o `react-router-dom`. Sem isso, rotas como `/contato` ou `/carrinho` retornam 404 ao atualizar a página.

## Deploy via CLI

```bash
npm install -g vercel
vercel login
vercel
vercel --prod
```

## Checklist pós-deploy

- [ ] Home carrega slides e catálogo
- [ ] Rotas profundas funcionam (`/contato`, `/faq`, `/carrinho`, `/checkout`)
- [ ] Imagens em `/products/` e `/imanges-fora/` aparecem
- [ ] Cadastro/login persiste no mesmo navegador (localStorage)
- [ ] Fluxo carrinho → entrega → pagamento → confirmação

## Limitações conhecidas

- **Autenticação local:** dados de usuário ficam no `localStorage` do navegador; não há backend.
- **API externa:** catálogo depende da [Fake Store API](https://fakestoreapi.com/); indisponibilidade afeta listagem.
- **Pagamento simulado:** fluxo de checkout é demonstrativo, sem gateway real.

## Rollback

Na Vercel: **Deployments** → selecione deploy anterior estável → **Promote to Production**.
