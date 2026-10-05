# Leggare Site

Site institucional da Leggare Consultoria Regulatória.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript 7
- CSS próprio e Lucide React

## Desenvolvimento local

```bash
cd ragb-site-nextjs
npm ci
npm run dev
```

Abra `http://localhost:3000` no navegador. Para gerar a versão otimizada, execute `npm run build`; para iniciá-la localmente, use `npm run start`.

O projeto não tem script ou configuração de lint neste momento. A checagem TypeScript pode ser executada com `npx tsc --noEmit`.

## Deploy

Os deployments são realizados pela Vercel a partir do repositório Git.
