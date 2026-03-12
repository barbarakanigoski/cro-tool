'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">CRO</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">CRO Analyzer</h1>
              <p className="text-xs text-gray-500">Análise de Conversion Rate Optimization</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* Search box */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Cole a URL da página que deseja analisar
          </h2>
          <div className="flex gap-3">
            <input
              type="url"
              value={url}
              onChange={e => setUrl(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="https://seusite.com.br"
              className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
              disabled={loading}
            />
            <button
              onClick={analyze}
              disabled={loading || !url.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-medium px-6 py-3 rounded-xl transition-colors whitespace-nowrap"
            >
              {loading ? 'Analisando…' : 'Analisar'}
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            Análise completa: SEO · Copy · UX · Psicologia · Leis UX · PageSpeed · Quick Wins
          </p>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-10 text-center">
            <div className="inline-block w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4" />
            <p className="text-gray-600 font-medium">Analisando a página…</p>
            <p className="text-gray-400 text-sm mt-1">
              Carregando conteúdo, coletando dados de performance e gerando relatório
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-6">
            <p className="text-red-700 font-medium">Erro ao analisar</p>
            <p className="text-red-600 text-sm mt-1">{error}</p>
          </div>
        )}

        {/* Results */}
        {report && !loading && (
          <div className="space-y-6">
            {/* Screenshot + meta */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">Screenshot da página</p>
                  <p className="text-xs text-gray-400 mt-0.5">{url}</p>
                </div>
                {usage && (
                  <div className="text-right">
                    <p className="text-xs text-gray-400">
                      Tokens: {(usage.inputTokens + usage.outputTokens).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-300">
                      ~R${(((usage.inputTokens * 0.000003) + (usage.outputTokens * 0.000015)) * 5.5).toFixed(2)}
                    </p>
                  </div>
                )}
              </div>
              {screenshotUrl && (
                <img
                  src={screenshotUrl}
                  alt="Screenshot da página analisada"
                  className="w-full h-64 object-cover object-top"
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
              )}
            </div>

            {/* Report */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">Relatório CRO</h3>
                <button
                  onClick={copyReport}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Copiar
                </button>
              </div>
              <div className="px-6 py-6 report-content">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {report}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!report && !loading && !error && (
          <div className="text-center py-16 text-gray-400">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-lg font-medium text-gray-500">Cole uma URL acima para começar</p>
            <p className="text-sm mt-2">
              O relatório inclui análise de SEO, copy, UX, psicologia de conversão e performance
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
