'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const FEATURES = [
  { icon: '🔍', label: 'SEO' },
  { icon: '✍️', label: 'Copy' },
  { icon: '🎨', label: 'UX' },
  { icon: '🧠', label: 'Psicologia' },
  { icon: '📐', label: 'Leis UX' },
  { icon: '⚡', label: 'PageSpeed' },
  { icon: '🎯', label: 'Quick Wins' },
]

export default function Home() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [report, setReport] = useState('')
  const [error, setError] = useState('')
  const [usage, setUsage] = useState<{ inputTokens: number; outputTokens: number } | null>(null)
  const [screenshotUrl, setScreenshotUrl] = useState('')

  async function analyze() {
    if (!url.trim()) return
    const normalized = url.startsWith('http') ? url : `https://${url}`

    setLoading(true)
    setReport('')
    setError('')
    setUsage(null)
    setScreenshotUrl(`https://image.thum.io/get/width/1200/crop/800/${normalized}`)

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: normalized }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setReport(data.report)
      setUsage(data.usage)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Erro ao analisar a página')
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') analyze()
  }

  function copyReport() {
    navigator.clipboard.writeText(report)
  }

  const showHero = !report && !loading && !error

  return (
    <div className="app-shell">

      {/* ── Header ── */}
      <header className="app-header">
        <div className="header-inner">
          <div className="logo-group">
            <div className="logo-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke="white" strokeWidth="2.2"/>
                <path d="M20 20l-3-3" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="logo-name">CRO Analyzer</span>
          </div>
        </div>
      </header>

      <main className="app-main">

        {/* ── Hero ── */}
        {showHero && (
          <section className="hero">
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-dot" />
              Powered by Claude AI
            </div>
            <h1 className="hero-title">
              Análise CRO completa.<br />Em segundos.
            </h1>
            <p className="hero-subtitle">
              Cole a URL de qualquer página e receba um diagnóstico detalhado de conversão — gerado por inteligência artificial.
            </p>
            <div className="feature-row">
              {FEATURES.map(f => (
                <div key={f.label} className="feature-chip">
                  <span className="chip-icon">{f.icon}</span>
                  {f.label}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Search card ── */}
        <div className={`search-card${report || loading || error ? ' search-card--compact' : ''}`}>
          {(report || loading || error) && (
            <p className="search-label">Nova análise</p>
          )}
          <div className="search-row">
            <input
              type="url"
              value={url}
              onChange={e => setUrl(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="https://seusite.com.br"
              className="search-input"
              disabled={loading}
            />
            <button
              onClick={analyze}
              disabled={loading || !url.trim()}
              className="search-btn"
            >
              {loading ? 'Analisando…' : 'Analisar'}
            </button>
          </div>
        </div>

        {/* ── Loading ── */}
        {loading && (
          <div className="loading-state">
            <div className="spinner" />
            <p className="loading-title">Analisando a página</p>
            <p className="loading-sub">
              Coletando dados de SEO, UX, copy e performance…<br />
              Isso pode levar até 30 segundos.
            </p>
          </div>
        )}

        {/* ── Error ── */}
        {error && !loading && (
          <div className="error-card">
            <p className="error-title">Não foi possível analisar</p>
            <p className="error-msg">{error}</p>
          </div>
        )}

        {/* ── Results ── */}
        {report && !loading && (
          <div className="results">

            {/* Screenshot */}
            <div className="screenshot-card">
              <div className="screenshot-meta">
                <div className="meta-info">
                  <p className="meta-url">{url}</p>
                  {usage && (
                    <p className="meta-cost">
                      {(usage.inputTokens + usage.outputTokens).toLocaleString()} tokens
                      {' · '}~R${(((usage.inputTokens * 0.000003) + (usage.outputTokens * 0.000015)) * 5.5).toFixed(2)}
                    </p>
                  )}
                </div>
                <button onClick={copyReport} className="copy-btn">
                  Copiar relatório
                </button>
              </div>
              {screenshotUrl && (
                <img
                  src={screenshotUrl}
                  alt="Screenshot da página analisada"
                  className="screenshot-img"
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
              )}
            </div>

            {/* Report */}
            <div className="report-card">
              <div className="report-header">
                <span className="report-header-label">Relatório de Análise CRO</span>
                <button onClick={copyReport} className="copy-btn">Copiar</button>
              </div>
              <div className="report-body report-content">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{report}</ReactMarkdown>
              </div>
            </div>

          </div>
        )}

      </main>
    </div>
  )
}
