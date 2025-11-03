interface ScoreCardProps {
  title: string
  score: number
  color: string
}

export default function ScoreCard({ title, score, color }: ScoreCardProps) {
  const percentage = (score / 100) * 100

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4 text-gray-800">{title}</h3>
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-white bg-gray-600">
              Score
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-gray-600">
              {score.toFixed(2)}/100
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-gray-200">
          <div
            style={{ width: `${percentage}%` }}
            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${color}`}
          />
        </div>
      </div>
      <div className="text-3xl font-bold text-center text-gray-800">
        {score.toFixed(1)}
      </div>
    </div>
  )
}
