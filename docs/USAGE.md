# Guia de Uso

## Executando as Análises

### 1. Análise Completa

Execute a análise completa de comparação entre GCP e AWS:

```bash
cd analysis
python run_comparison.py
```

Isso irá:
- Executar análises em 4 categorias: Financeiro, Desempenho, Escalabilidade e Facilidade
- Gerar scores para cada provedor
- Determinar o vencedor geral
- Salvar resultados em `comparison_results.json`

### 2. Coletores de Dados

#### GCP
```bash
cd collectors/gcp
python collector.py
```

#### AWS
```bash
cd collectors/aws
python collector.py
```

### 3. Dashboard

#### Instalação
```bash
cd dashboard/frontend
npm install
```

#### Desenvolvimento
```bash
npm run dev
```

Acesse: http://localhost:3000

#### Produção
```bash
npm run build
npm start
```

## Estrutura dos Resultados

O arquivo `comparison_results.json` contém:

```json
{
  "financial": {
    "gcp": { "score": 83.0, "metrics": {...}, "strengths": [...], "weaknesses": [...] },
    "aws": { "score": 81.0, "metrics": {...}, "strengths": [...], "weaknesses": [...] }
  },
  "performance": {...},
  "scalability": {...},
  "ease_of_use": {...},
  "overall": {
    "gcp": 85.5,
    "aws": 84.78
  },
  "metadata": {
    "timestamp": "2025-11-03T...",
    "version": "1.0.0"
  }
}
```

## Critérios de Avaliação

### 💰 Financeiro (Peso: 30%)
- Modelo de precificação
- Previsibilidade de custos
- Camada gratuita
- Descontos disponíveis
- Transparência de cobrança

### ⚡ Desempenho (Peso: 25%)
- Performance de computação
- Latência de rede
- Throughput de armazenamento
- Performance de banco de dados
- Performance de CDN

### 📈 Escalabilidade (Peso: 25%)
- Auto-scaling
- Balanceamento de carga
- Limites de serviço
- Suporte multi-região
- Escalabilidade serverless

### 🎓 Facilidade de Uso (Peso: 20%)
- Documentação
- Usabilidade do console
- Curva de aprendizado
- Ferramentas de deployment
- Suporte da comunidade

## Releases Automáticos

Cada vez que os resultados são atualizados, uma nova release é criada automaticamente via GitHub Actions.

### Trigger Manual
```bash
# Via GitHub Actions interface
Actions → Release New Comparison → Run workflow
```

### Trigger Automático
Sempre que `analysis/comparison_results.json` é atualizado na branch `main`.
