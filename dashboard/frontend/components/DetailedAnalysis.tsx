import type { ComparisonData } from '@/types/comparison'

interface DetailedAnalysisProps {
  data: ComparisonData
}

export default function DetailedAnalysis({ data }: DetailedAnalysisProps) {
  const categories = [
    { key: 'financial', name: 'Financeiro', icon: '💰' },
    { key: 'performance', name: 'Desempenho', icon: '⚡' },
    { key: 'scalability', name: 'Escalabilidade', icon: '📈' },
    { key: 'ease_of_use', name: 'Facilidade de Uso', icon: '🎓' },
  ]

  return (
    <div className="space-y-6">
      {categories.map((category) => {
        const categoryData = data[category.key]
        return (
          <div key={category.key} className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">
              {category.icon} {category.name}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* GCP */}
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="text-xl font-semibold mb-2 text-blue-600">
                  Google Cloud Platform
                </h4>
                <p className="text-3xl font-bold mb-4 text-gray-800">
                  {categoryData.gcp.score.toFixed(1)}/100
                </p>
                
                {categoryData.gcp.strengths && (
                  <div className="mb-4">
                    <h5 className="font-semibold text-green-600 mb-2">Pontos Fortes:</h5>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                      {categoryData.gcp.strengths.map((strength: string, idx: number) => (
                        <li key={idx}>{strength}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {categoryData.gcp.weaknesses && (
                  <div>
                    <h5 className="font-semibold text-red-600 mb-2">Pontos Fracos:</h5>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                      {categoryData.gcp.weaknesses.map((weakness: string, idx: number) => (
                        <li key={idx}>{weakness}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* AWS */}
              <div className="border-l-4 border-orange-500 pl-4">
                <h4 className="text-xl font-semibold mb-2 text-orange-600">
                  Amazon Web Services
                </h4>
                <p className="text-3xl font-bold mb-4 text-gray-800">
                  {categoryData.aws.score.toFixed(1)}/100
                </p>
                
                {categoryData.aws.strengths && (
                  <div className="mb-4">
                    <h5 className="font-semibold text-green-600 mb-2">Pontos Fortes:</h5>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                      {categoryData.aws.strengths.map((strength: string, idx: number) => (
                        <li key={idx}>{strength}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {categoryData.aws.weaknesses && (
                  <div>
                    <h5 className="font-semibold text-red-600 mb-2">Pontos Fracos:</h5>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                      {categoryData.aws.weaknesses.map((weakness: string, idx: number) => (
                        <li key={idx}>{weakness}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
