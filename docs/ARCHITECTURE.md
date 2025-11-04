# Arquitetura do Sistema

## Visão Geral

```
┌─────────────────────────────────────────────────────────┐
│                    GitHub Actions                        │
│              (Automação de Releases)                     │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                  Analysis Engine                         │
│              (Python - Core Logic)                       │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │  Financial   │  │ Performance  │  │ Scalability  │ │
│  │   Analyzer   │  │   Analyzer   │  │   Analyzer   │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
│  ┌──────────────┐                                      │
│  │ Ease of Use  │                                      │
│  │   Analyzer   │                                      │
│  └──────────────┘                                      │
└────────────┬────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────┐
│                   Data Collectors                        │
│            (Python - Data Gathering)                     │
│                                                          │
│  ┌──────────────┐              ┌──────────────┐        │
│  │     GCP      │              │     AWS      │        │
│  │  Collector   │              │  Collector   │        │
│  └──────────────┘              └──────────────┘        │
└────────────┬────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────┐
│              comparison_results.json                     │
│                  (Data Store)                            │
└────────────┬────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────┐
│                    Dashboard                             │
│           (Next.js + React + TypeScript)                 │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │   ScoreCard  │  │ Comparison   │  │  Detailed    │ │
│  │  Component   │  │    Chart     │  │  Analysis    │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────┘
```

## Componentes

### 1. Analysis Engine (Python)
- **Localização**: `/analysis`
- **Responsabilidade**: Executar análises comparativas
- **Módulos**:
  - `financial/`: Análise de custos e precificação
  - `performance/`: Análise de desempenho
  - `scalability/`: Análise de escalabilidade
  - `ease_of_use/`: Análise de usabilidade
- **Output**: `comparison_results.json`

### 2. Data Collectors (Python)
- **Localização**: `/collectors`
- **Responsabilidade**: Coletar dados dos provedores
- **Módulos**:
  - `gcp/`: Coleta dados do Google Cloud Platform
  - `aws/`: Coleta dados da Amazon Web Services
- **Output**: JSON com dados brutos

### 3. Dashboard (Next.js/React)
- **Localização**: `/dashboard/frontend`
- **Responsabilidade**: Visualização interativa dos resultados
- **Tecnologias**:
  - Next.js 14 (React framework)
  - TypeScript (Type safety)
  - Tailwind CSS (Styling)
  - Recharts (Charts/Graphs)
- **Componentes**:
  - `ScoreCard`: Exibe score individual
  - `ComparisonChart`: Gráfico de barras comparativo
  - `DetailedAnalysis`: Análise detalhada por categoria

### 4. GitHub Actions
- **Localização**: `/.github/workflows`
- **Responsabilidade**: Automação de releases
- **Triggers**:
  - Push em `comparison_results.json`
  - Execução manual via workflow_dispatch
- **Ações**:
  1. Executa análise
  2. Gera versão
  3. Cria release no GitHub
  4. Anexa resultados

## Fluxo de Dados

1. **Coleta** → Collectors obtêm dados de GCP/AWS
2. **Análise** → Engine processa dados e gera scores
3. **Armazenamento** → Resultados salvos em JSON
4. **Visualização** → Dashboard lê JSON e renderiza UI
5. **Release** → GitHub Actions cria release automática

## Tecnologias Utilizadas

- **Backend/Analysis**: Python 3.8+
- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **CI/CD**: GitHub Actions
- **Package Management**: pip (Python), npm (Node.js)

## Extensibilidade

### Adicionar Novo Critério de Análise

1. Criar novo módulo em `/analysis/novo_criterio/`
2. Implementar classe `NovoAnalyzer` com método `analyze()`
3. Adicionar import em `run_comparison.py`
4. Atualizar pesos em `calculate_overall_score()`
5. Atualizar componentes do dashboard

### Adicionar Novo Provedor

1. Criar pasta em `/collectors/novo_provedor/`
2. Implementar `collector.py`
3. Atualizar análises para incluir novo provedor
4. Atualizar componentes de visualização
