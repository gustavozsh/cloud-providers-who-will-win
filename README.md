# Cloud Providers: Who Will Win? 🚀

Um sistema abrangente de comparação entre provedores de nuvem (GCP vs AWS) baseado em múltiplos critérios.

## 🎯 Objetivo

Analisar e comparar recursos de dados do Google Cloud Platform (GCP) e Amazon Web Services (AWS) para determinar qual provedor é melhor baseado em:

- 💰 **Financeiro**: Custo-benefício e modelos de precificação
- ⚡ **Desempenho**: Velocidade, latência e throughput
- 📈 **Escalabilidade**: Capacidade de crescimento e elasticidade
- 🎓 **Facilidade**: Aprendizado e implantação em produção

## 📁 Estrutura do Projeto

```
cloud-providers-who-will-win/
├── analysis/                 # Módulos de análise
│   ├── financial/           # Análise financeira
│   ├── performance/         # Análise de desempenho
│   ├── scalability/         # Análise de escalabilidade
│   └── ease_of_use/         # Análise de facilidade
├── collectors/              # Coletores de dados
│   ├── gcp/                 # Scripts para GCP
│   └── aws/                 # Scripts para AWS
├── dashboard/               # Interface web
│   ├── frontend/            # React dashboard
│   └── backend/             # API Node.js
├── docs/                    # Documentação
└── .github/workflows/       # CI/CD e releases automáticos
```

## 🚀 Começando

### Pré-requisitos

- Python 3.8+
- Node.js 16+
- Credenciais GCP (opcional, para coleta de dados reais)
- Credenciais AWS (opcional, para coleta de dados reais)

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/gustavozsh/cloud-providers-who-will-win.git
cd cloud-providers-who-will-win
```

2. Configure os módulos de análise:
```bash
cd analysis
pip install -r requirements.txt
```

3. Configure o dashboard:
```bash
cd dashboard/frontend
npm install
```

### Executando

#### Análise de Dados
```bash
cd analysis
python run_comparison.py
```

#### Dashboard
```bash
cd dashboard/frontend
npm run dev
```

O dashboard estará disponível em `http://localhost:3000`

## 📊 Resultados

Os resultados das comparações são apresentados de forma visual através do dashboard, incluindo:
- Gráficos comparativos
- Tabelas de scoring
- Recomendações baseadas em critérios

## 🔄 Releases

A cada nova análise comparativa completa, uma nova release é automaticamente criada com os resultados atualizados.

## 📝 Licença

Este projeto está sob a licença MIT.