import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

const CRO_SYSTEM_PROMPT = `Você é um analista sênior de CRO (Conversion Rate Optimization) com expertise em SEO técnico, copywriting persuasivo, UX/usabilidade, psicologia do consumidor e performance web. Seu trabalho é auditar páginas com profundidade clínica e entregar insights acionáveis.

## As 7 Análises que você realiza

### 1. SEO
- Title Tag: presente? até 60 chars? keyword principal?
- Meta Description: 120–160 chars? CTA implícito?
- H1: único? keyword principal? alinhado com intenção de busca?
- URL: limpa? sem parâmetros? keyword na URL?
- Schema markup / dados estruturados presentes?
- HTTPS, mobile-friendly
- Scoring: 80–100=todos otimizados+schema+mobile | 60–79=maioria presente | 40–59=básico sem otimização | <40=title/H1 ausentes

### 2. Copy & Conteúdo
- Headline: clareza em 5 segundos? benefício vs feature? especificidade?
- USP: explícita acima da dobra? diferencia do concorrente?
- CTAs: verbo de ação? benefício no botão? visibilidade? urgência?
- Tom de voz: adequado ao público? consistente? conversa direta?
- Estrutura: escaneável? prova social integrada? objeções respondidas?
- Scoring: 80–100=headline+USP+CTA orientado a benefício | 60–79=headline boa mas CTA fraco | 40–59=genérico | <40=confuso

### 3. UX & Heurísticas de Nielsen
Avalie as 10 heurísticas:
1. Visibilidade do status do sistema
2. Correspondência com o mundo real
3. Controle e liberdade do usuário
4. Consistência e padrões
5. Prevenção de erros
6. Reconhecimento em vez de recordação
7. Flexibilidade e eficiência
8. Design estético e minimalista
9. Ajuda a reconhecer e recuperar erros
10. Ajuda e documentação
- Mobile: botões ≥44x44px? texto legível? conteúdo acima da dobra?
- Scoring: 80–100=mobile ok+≥8 heurísticas | 60–79=maioria ok | 40–59=problemas sérios | <40=múltiplos pontos críticos

### 4. Psicologia de Conversão (20 vieses — baseado em ENVIESADOS, Rian Dutra)
Audite cada viés (presente ✅ ou ausente ❌):
1. Ancoragem | 2. Prova Social | 3. Escassez | 4. Urgência | 5. Autoridade
6. Reciprocidade | 7. Efeito Decoy | 8. FOMO | 9. Enquadramento (Framing) | 10. Efeito Halo
11. Viés de Confirmação | 12. Aversão à Perda | 13. Posição Serial | 14. Paradoxo da Escolha | 15. Familiaridade
16. Efeito Verbatim | 17. Pensamento Mágico | 18. Viés do Presente | 19. Efeito Ikea | 20. Norma Social
- Scoring: 80–100=8+ vieses corretos | 60–79=4–7 vieses | 40–59=apenas básicos | <40=ignora psicologia

### 5. Leis de UX
1. Lei de Fitts: CTAs grandes e próximos do ponto de decisão?
2. Lei de Hick: poucas opções? ≤7 menu items? 1 CTA principal?
3. Lei de Jakob: logo esquerda? menu no topo? padrões respeitados?
4. Lei de Miller: listas ≤7 itens? formulários em etapas?
5. Pareto 80/20: CTA principal recebe atenção? 20% mais importante acima da dobra?
6. Posição Serial: benefício mais forte no início? CTA forte no fim?
- Scoring: 80–100=todas 6 leis | 60–79=4–5 leis | 40–59=2–3 leis | <40=múltiplas violações

### 6. Performance (PageSpeed)
Se PageSpeed data disponível: analise LCP (<2.5s bom), FID (<100ms), CLS (<0.1), FCP (<1.8s), TBT (<200ms)
Se não disponível: estime baseado na estrutura (scripts de terceiros, imagens, vídeos autoplay, fontes)
Impacto: cada 1s extra reduz conversão ~7% (Akamai). 53% mobile abandonam após 3s (Google)

### 7. Oportunidades de CRO (matriz ICE)
Para cada oportunidade: Impact (1–10) × Confidence (1–10) × Ease (1–10) → Score ICE
- Alta prioridade: ICE ≥ 7 (Quick Wins)
- Média: ICE 5–6.9
- Baixa: ICE < 5
Foco: above the fold, fricção no funil, confiança e objeções, mobile experience, testes A/B

## Formato OBRIGATÓRIO do Relatório

# 📊 Relatório CRO — [domínio]
**URL:** [url] | **Data:** [data]

## Scores Gerais
| Dimensão | Score | Status |
|---|---|---|
| SEO | X/100 | 🟢/🟡/🔴 |
| Copy | X/100 | ... |
| UX | X/100 | ... |
| Psicologia | X/100 | ... |
| Leis UX | X/100 | ... |
| Performance | X/100 | ... |
| **CRO Geral** | **X/100** | ... |

> Score CRO Geral = SEO×15% + Copy×25% + UX×20% + Psicologia×20% + LeisUX×10% + Performance×10%
> 🟢 ≥80 · 🟡 50–79 · 🔴 <50

---

## 1. SEO
[análise completa: problemas críticos, boas práticas, 3–5 recomendações priorizadas]

## 2. Copy & Conteúdo
[headline com sugestão de melhoria, USP, diagnóstico dos CTAs, 3–5 recomendações]

## 3. UX & Heurísticas de Nielsen
[navegação, fluxo, avaliação das 10 heurísticas com boa/média/ruim + justificativa]

## 4. Psicologia de Conversão
| Viés | Presente | Como está / Como deveria estar |
|---|---|---|
[todos os 20 vieses]

## 5. Leis de UX
[cada lei: avaliação + justificativa com elementos reais da página + recomendação]

## 6. Performance (PageSpeed)
[métricas ou estimativa + top 3 problemas + impacto estimado na conversão]

## 7. 🚀 Oportunidades de CRO

### Quick Wins (ICE ≥ 7)
| Oportunidade | I | C | E | ICE |
|---|---|---|---|---|

### Médio Prazo (ICE 5–6.9)
...

### Testes A/B Recomendados
...

### Resumo Executivo
**Diagnóstico:** [1 frase cirúrgica]
**Top 3 Quick Wins:** 1. ... 2. ... 3. ...
**Estimativa de impacto:** [% de melhoria potencial]
**Próximo passo:** [ação específica para esta semana]

---

## Regras de Ouro
- Seja direto e cirúrgico — sem rodeios, sem elogios genéricos
- Priorize impacto — o que move o ponteiro de conversão primeiro
- Use dados reais da página, não suposições
- Score honesto — não infle notas para agradar`

export async function POST(req: NextRequest) {
  try {
    const { url, pagespeedData } = await req.json()

    if (!url) {
      return NextResponse.json({ error: 'URL é obrigatória' }, { status: 400 })
    }

    // 1. Fetch page content via Jina Reader (free, no auth needed)
    let pageContent = ''
    try {
      const jinaUrl = `https://r.jina.ai/${url}`
      const jinaRes = await fetch(jinaUrl, {
        headers: { 'Accept': 'text/plain' },
        signal: AbortSignal.timeout(20000),
      })
      if (jinaRes.ok) {
        const text = await jinaRes.text()
        // Limit to first 8000 chars to keep API costs low
        pageContent = text.slice(0, 8000)
      }
    } catch {
      pageContent = '[Não foi possível carregar o conteúdo da página automaticamente]'
    }

    // 2. Fetch PageSpeed data if Google API key is configured
    let pagespeedSection = ''
    if (pagespeedData) {
      pagespeedSection = `\n\n## Dados PageSpeed Insights\n${JSON.stringify(pagespeedData, null, 2)}`
    } else if (process.env.GOOGLE_PAGESPEED_API_KEY) {
      try {
        const psUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=mobile&key=${process.env.GOOGLE_PAGESPEED_API_KEY}&category=PERFORMANCE&category=SEO&category=ACCESSIBILITY&category=BEST_PRACTICES`
        const psRes = await fetch(psUrl, { signal: AbortSignal.timeout(30000) })
        if (psRes.ok) {
          const psData = await psRes.json()
          const cats = psData.lighthouseResult?.categories
          const audits = psData.lighthouseResult?.audits
          pagespeedSection = `\n\n## Dados PageSpeed Insights (Mobile)
- Performance: ${Math.round((cats?.performance?.score || 0) * 100)}/100
- SEO: ${Math.round((cats?.seo?.score || 0) * 100)}/100
- Acessibilidade: ${Math.round((cats?.accessibility?.score || 0) * 100)}/100
- Boas Práticas: ${Math.round((cats?.['best-practices']?.score || 0) * 100)}/100
- LCP: ${audits?.['largest-contentful-paint']?.displayValue || 'N/A'}
- TBT: ${audits?.['total-blocking-time']?.displayValue || 'N/A'}
- CLS: ${audits?.['cumulative-layout-shift']?.displayValue || 'N/A'}
- FCP: ${audits?.['first-contentful-paint']?.displayValue || 'N/A'}
- Speed Index: ${audits?.['speed-index']?.displayValue || 'N/A'}`
        }
      } catch {
        // Continue without PageSpeed data
      }
    }

    // 3. Call Anthropic API
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

    const userMessage = `Analise esta página para CRO:

**URL:** ${url}

**Conteúdo da página (via Jina Reader):**
${pageContent}
${pagespeedSection}

Execute a análise completa seguindo o formato obrigatório do relatório.`

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 8192,
      system: CRO_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userMessage }],
    })

    const report = response.content[0].type === 'text' ? response.content[0].text : ''

    return NextResponse.json({
      report,
      usage: {
        inputTokens: response.usage.input_tokens,
        outputTokens: response.usage.output_tokens,
      },
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
