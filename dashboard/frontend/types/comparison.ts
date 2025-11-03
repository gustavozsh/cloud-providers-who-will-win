// Type definitions for comparison data structures

export interface ProviderMetrics {
  [key: string]: number
}

export interface ProviderAnalysis {
  score: number
  metrics: ProviderMetrics
  strengths?: string[]
  weaknesses?: string[]
}

export interface CategoryData {
  gcp: ProviderAnalysis
  aws: ProviderAnalysis
  category?: string
  description?: string
}

export interface ComparisonData {
  overall: {
    gcp: number
    aws: number
  }
  financial: CategoryData
  performance: CategoryData
  scalability: CategoryData
  ease_of_use: CategoryData
  metadata: {
    timestamp: string
    version: string
  }
}
