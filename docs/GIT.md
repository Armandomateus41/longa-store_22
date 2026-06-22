# Git — primeiro envio ao GitHub

<p align="center">
  <img src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
  <img src="https://img.shields.io/badge/Branch-main-0066CC?style=for-the-badge&logo=git&logoColor=white" alt="Branch main" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License MIT" />
</p>

Repositório remoto: [https://github.com/Armandomateus41/longa-store_22.git](https://github.com/Armandomateus41/longa-store_22.git)

Execute os comandos abaixo **na pasta raiz do projeto** (`longa-store`), onde está o `package.json`.

## 1. Inicializar e conectar

```bash
git init
git branch -M main
git remote add origin https://github.com/Armandomateus41/longa-store_22.git
```

Se o remote já existir:

```bash
git remote set-url origin https://github.com/Armandomateus41/longa-store_22.git
```

## 2. Revisar o que será enviado

```bash
git status
git add -A
git status
```

Confirme que **não** entram: `node_modules/`, `dist/`, arquivos `.env` ou credenciais.

## 3. Commit inicial

```bash
git commit -m "feat: e-commerce Longa Store com catálogo, checkout e páginas institucionais"
```

## 4. Push

O repositório remoto já contém um commit com `LICENSE`. Na primeira vez, use:

```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

Se houver conflito apenas no `LICENSE`, mantenha a versão local (já alinhada ao MIT com copyright Armando Capita) e conclua o merge antes do push.

## Commits seguintes

```bash
git add .
git commit -m "descrição objetiva da mudança"
git push
```

## Boas práticas

- Um commit por mudança lógica
- Mensagem no imperativo (`feat:`, `fix:`, `docs:`, `refactor:`)
- Rodar `npm run build` e `npm run lint` antes de push
