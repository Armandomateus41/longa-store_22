# GitHub Actions — CI

<p align="center">
  <img src="https://github.com/Armandomateus41/longa-store_22/actions/workflows/ci.yml/badge.svg" alt="CI status" />
  <img src="https://img.shields.io/badge/GitHub_Actions-CI-2088FF?style=for-the-badge&logo=githubactions&logoColor=white" alt="GitHub Actions CI" />
</p>

Pipeline de integração contínua da **Longa Store**. Executa automaticamente em push e pull request para a branch `main`.

## Workflow

| Item | Valor |
|------|-------|
| Arquivo | [`.github/workflows/ci.yml`](../.github/workflows/ci.yml) |
| Nome | `CI` |
| Runner | `ubuntu-latest` |
| Node.js | 20.x |

## Etapas

1. Checkout do código
2. `npm ci` — instalação reproduzível
3. `npm run lint` — ESLint
4. `npm run build` — TypeScript + Vite
5. Verificação de `dist/index.html`

## Quando roda

| Evento | Branch |
|--------|--------|
| `push` | `main` |
| `pull_request` | `main` |

Commits em outras branches só disparam CI se abrirem PR para `main`.

## Ver resultados

1. Abra o repositório no GitHub
2. Aba **Actions**
3. Selecione o workflow **CI**

URL direta: [github.com/Armandomateus41/longa-store_22/actions](https://github.com/Armandomateus41/longa-store_22/actions)

## Ativar pela primeira vez

Após enviar o workflow para o GitHub:

```bash
git add .github/workflows/ci.yml docs/CI.md README.md
git commit -m "ci: adicionar GitHub Actions para lint e build"
git push origin main
```

O primeiro run inicia automaticamente após o push.

## Rodar localmente (mesmo que o CI)

```bash
npm ci
npm run lint
npm run build
```

## Troubleshooting

| Problema | Solução |
|----------|---------|
| CI falha no lint | Rode `npm run lint` localmente e corrija os erros |
| CI falha no build | Rode `npm run build` e verifique erros TypeScript/Vite |
| Badge cinza | Workflow ainda não rodou ou branch não é `main` |
| `npm ci` falha | Atualize `package-lock.json` com `npm install` e commite |

## Próximos passos (opcional)

- Deploy preview na Vercel via GitHub Actions
- Cache de artefatos `dist/`
- Proteção de branch exigindo CI verde antes do merge

---

Desenvolvido por **Armando Capita**
