# CRO Analyzer

Ferramenta de análise completa de CRO (Conversion Rate Optimization) para o seu time.

## Como usar

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar variáveis de ambiente
Copie o arquivo de exemplo e preencha suas chaves:
```bash
cp .env.example .env.local
```

Edite `.env.local`:
```
ANTHROPIC_API_KEY=sk-ant-...         # obrigatório
GOOGLE_PAGESPEED_API_KEY=...         # opcional, para dados reais de PageSpeed
```

**Onde obter:**
- API Key Anthropic: https://console.anthropic.com/settings/keys
- API Key Google PageSpeed: https://console.developers.google.com (habilite "PageSpeed Insights API")

### 3. Rodar localmente
```bash
npm run dev
```
Acesse: http://localhost:3000

### 4. Deploy no Vercel (gratuito)

#### Via CLI:
```bash
npm install -g vercel
vercel
```

#### Via interface:
1. Acesse https://vercel.com/new
2. Importe este repositório do GitHub
3. Em "Environment Variables", adicione `ANTHROPIC_API_KEY`
4. Clique em Deploy

## Custo por análise

| Modelo | Input ($/1M tokens) | Output ($/1M tokens) | Custo médio por análise |
|--------|--------------------|--------------------|------------------------|
| claude-sonnet-4-5 | $3.00 | $15.00 | ~$0.15–0.25 (≈R$0.80–1.40) |

## O que a análise inclui

1. **SEO** — title, meta, H1, URL, schema, mobile
2. **Copy & Conteúdo** — headline, USP, CTAs, tom de voz
3. **UX & Heurísticas de Nielsen** — 10 heurísticas + mobile
4. **Psicologia de Conversão** — 20 vieses cognitivos (baseado em ENVIESADOS, Rian Dutra)
5. **Leis de UX** — Fitts, Hick, Jakob, Miller, Pareto, Posição Serial
6. **Performance** — Core Web Vitals via PageSpeed API
7. **Quick Wins** — priorização por matriz ICE

## Tecnologias

- Next.js 14 (App Router)
- Anthropic Claude API
- Jina Reader (leitura de páginas, gratuito)
- Google PageSpeed Insights API (opcional, gratuito)
- thum.io (screenshots, gratuito)
- Tailwind CSS
