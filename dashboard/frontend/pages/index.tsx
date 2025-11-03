import { useState, useEffect } from 'react'
import Head from 'next/head'
import ComparisonChart from '@/components/ComparisonChart'
import ScoreCard from '@/components/ScoreCard'
import DetailedAnalysis from '@/components/DetailedAnalysis'
import type { ComparisonData } from '@/types/comparison'

export default function Home() {
  const [data, setData] = useState<ComparisonData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In production, this would fetch from an API
    // For now, using sample data
    const sampleData: ComparisonData = {
      overall: { gcp: 85.5, aws: 84.78 },
      financial: {
        gcp: { score: 83.0, metrics: {} },
        aws: { score: 81.0, metrics: {} }
      },
      performance: {
        gcp: { score: 87.6, metrics: {} },
        aws: { score: 88.6, metrics: {} }
      },
      scalability: {
        gcp: { score: 86.8, metrics: {} },
        aws: { score: 88.2, metrics: {} }
      },
      ease_of_use: {
        gcp: { score: 85.0, metrics: {} },
        aws: { score: 81.4, metrics: {} }
      },
      metadata: {
        timestamp: new Date().toISOString(),
        version: '1.0.0'
      }
    }
    
    setData(sampleData)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Carregando...</div>
      </div>
    )
  }

  const winner = data && data.overall.gcp > data.overall.aws ? 'GCP' : 'AWS'

  return (
    <>
      <Head>
        <title>Cloud Providers: Who Will Win?</title>
        <meta name="description" content="Comparação entre GCP e AWS" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="min-h-screen p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 text-gray-800">
              Cloud Providers: Who Will Win? 🚀
            </h1>
            <p className="text-xl text-gray-600">
              Análise Comparativa: GCP vs AWS
            </p>
          </header>

          {data && (
            <>
              <div className="mb-8 text-center">
                <div className="inline-block bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-3xl font-bold mb-2">🏆 Vencedor: {winner}</h2>
                  <p className="text-gray-600">
                    Baseado em análise de 4 critérios principais
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <ScoreCard
                  title="Google Cloud Platform"
                  score={data.overall.gcp}
                  color="bg-blue-500"
                />
                <ScoreCard
                  title="Amazon Web Services"
                  score={data.overall.aws}
                  color="bg-orange-500"
                />
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                  Comparação por Categoria
                </h2>
                <ComparisonChart data={data} />
              </div>

              <DetailedAnalysis data={data} />

              <footer className="text-center mt-12 text-gray-600">
                <p>Última atualização: {new Date(data.metadata.timestamp).toLocaleString('pt-BR')}</p>
                <p className="text-sm mt-2">Versão: {data.metadata.version}</p>
              </footer>
            </>
          )}
        </div>
      </main>
    </>
  )
}
