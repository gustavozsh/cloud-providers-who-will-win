import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import type { ComparisonData } from '@/types/comparison'

interface ComparisonChartProps {
  data: ComparisonData
}

export default function ComparisonChart({ data }: ComparisonChartProps) {
  const chartData = [
    {
      name: 'Financeiro',
      GCP: data.financial.gcp.score,
      AWS: data.financial.aws.score,
    },
    {
      name: 'Desempenho',
      GCP: data.performance.gcp.score,
      AWS: data.performance.aws.score,
    },
    {
      name: 'Escalabilidade',
      GCP: data.scalability.gcp.score,
      AWS: data.scalability.aws.score,
    },
    {
      name: 'Facilidade',
      GCP: data.ease_of_use.gcp.score,
      AWS: data.ease_of_use.aws.score,
    },
  ]

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={chartData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[0, 100]} />
        <Tooltip />
        <Legend />
        <Bar dataKey="GCP" fill="#4285F4" />
        <Bar dataKey="AWS" fill="#FF9900" />
      </BarChart>
    </ResponsiveContainer>
  )
}
