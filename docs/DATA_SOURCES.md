# Fontes de Dados / Data Sources

## ⚠️ Importante / Important

**Este projeto atualmente utiliza dados sintéticos e de exemplo para fins de demonstração.**

**This project currently uses synthetic and sample data for demonstration purposes.**

---

## 🔍 Origem dos Dados / Data Origin

### Dados Atuais (Sample Data)

Os dados utilizados nesta versão inicial são:

1. **Dados Sintéticos**: Valores estimados baseados em conhecimento público geral sobre GCP e AWS
2. **Não São Dados Oficiais**: Não foram fornecidos diretamente pela Google ou Amazon
3. **Propósito Demonstrativo**: Servem para ilustrar a funcionalidade da plataforma de comparação

### Fontes de Informação para Estimativas

As estimativas foram baseadas em:

- Documentação pública oficial de GCP e AWS
- Páginas de precificação públicas dos provedores
- Benchmarks de performance publicados pela comunidade
- Análises comparativas de mercado (Gartner, Forrester, etc.)
- Experiência geral da indústria

---

## 📊 Dados Por Módulo / Data by Module

### 1. Análise Financeira (Financial Analysis)

**Arquivo**: `analysis/financial/analyzer.py`

```python
# Sample data - in production, this would fetch real pricing data
gcp_metrics = {
    'pricing_model': 85,  # Estimativa baseada em billing por segundo
    'cost_predictability': 80,  # Baseado em ferramentas de estimativa
    ...
}
```

**Origem**: Valores estimados (0-100) baseados em características conhecidas dos modelos de precificação.

**Fontes Públicas de Referência**:
- https://cloud.google.com/pricing
- https://aws.amazon.com/pricing/
- Calculadoras de custo públicas de ambos provedores

### 2. Análise de Desempenho (Performance Analysis)

**Arquivo**: `analysis/performance/analyzer.py`

**Origem**: Scores estimados baseados em benchmarks públicos e características documentadas.

**Fontes Públicas de Referência**:
- Documentação de performance oficial
- Benchmarks da comunidade (TPC, SPECcloud, etc.)
- Relatórios de analistas de mercado

### 3. Análise de Escalabilidade (Scalability Analysis)

**Arquivo**: `analysis/scalability/analyzer.py`

**Origem**: Avaliações baseadas em capacidades documentadas publicamente.

**Fontes Públicas de Referência**:
- Documentação técnica oficial
- Limites de serviço publicados
- Casos de uso publicados

### 4. Análise de Facilidade de Uso (Ease of Use Analysis)

**Arquivo**: `analysis/ease_of_use/analyzer.py`

**Origem**: Scores baseados em:
- Pesquisas de desenvolvedores (Stack Overflow, etc.)
- Avaliações de documentação
- Complexidade de interface observada publicamente

### 5. Coletores de Dados (Data Collectors)

**Arquivos**: 
- `collectors/gcp/collector.py`
- `collectors/aws/collector.py`

```python
# Sample data - in production, would use GCP Pricing API
return {
    'compute': {
        'n1-standard-1': {'price_per_hour': 0.0475, ...}
    }
}
```

**Origem**: Valores de exemplo aproximados dos preços públicos em momento específico.

---

## ✅ Garantia de Precisão / Accuracy Guarantee

### Versão Atual (Sample Data)

**⚠️ AVISO IMPORTANTE**: 

Os dados atuais são **aproximações** e **não devem ser usados para decisões de produção reais** por:

1. ✗ **Não são dados em tempo real**
2. ✗ **Não vêm de APIs oficiais**
3. ✗ **Não incluem todas as variáveis de precificação**
4. ✗ **Podem estar desatualizados**
5. ✗ **São simplificações de modelos complexos**

**✓ O que eles demonstram**:
- Funcionalidade da plataforma de comparação
- Estrutura para análise multi-dimensional
- Interface de visualização de dados
- Sistema de scoring ponderado

### Como Obter Dados Reais e Confiáveis

Para usar dados reais e garantir precisão, o sistema precisa ser conectado a:

#### 1. APIs Oficiais de Precificação

**Google Cloud Platform**:
```python
# Exemplo futuro com API real
from google.cloud import billing
client = billing.CloudCatalogClient()
# Fetch real pricing data
```

Documentação: https://cloud.google.com/billing/docs/apis

**Amazon Web Services**:
```python
# Exemplo futuro com API real
import boto3
pricing = boto3.client('pricing', region_name='us-east-1')
# Fetch real pricing data
```

Documentação: https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/price-changes.html

#### 2. Benchmarks de Performance Reais

- Executar testes próprios em ambas as plataformas
- Usar ferramentas de benchmark padronizadas
- Coletar métricas ao longo do tempo

#### 3. Dados de Configuração Real

- Limites de serviço via APIs
- Disponibilidade de regiões
- Catálogo de serviços

---

## 🔮 Roadmap para Dados Reais / Real Data Roadmap

### Fase 1: Dados Semi-Reais (Planejada)
- [ ] Integração com APIs públicas de precificação
- [ ] Cache de dados para evitar rate limiting
- [ ] Atualização periódica (diária/semanal)

### Fase 2: Benchmarks Proprietários (Planejada)
- [ ] Scripts de benchmark automatizados
- [ ] Testes de performance em ambas plataformas
- [ ] Coleta de métricas reais de latência

### Fase 3: Dados Contextualizados (Futura)
- [ ] Análise baseada em workload específico
- [ ] Recomendações personalizadas
- [ ] Estimativas de custo para casos de uso reais

---

## 📝 Disclaimer / Isenção de Responsabilidade

**Português**:

Este projeto é uma ferramenta de comparação demonstrativa e educacional. Os dados fornecidos são estimativas baseadas em informações públicas e não representam dados oficiais ou certificados pela Google ou Amazon. Para decisões de produção, consulte sempre:

1. Documentação oficial dos provedores
2. Suas próprias calculadoras de custo
3. Representantes de vendas oficiais
4. Testes em seus workloads específicos

**English**:

This project is a demonstrative and educational comparison tool. The data provided are estimates based on public information and do not represent official or certified data from Google or Amazon. For production decisions, always consult:

1. Official provider documentation
2. Your own cost calculators
3. Official sales representatives
4. Tests on your specific workloads

---

## 🤝 Contribuindo com Dados Reais / Contributing Real Data

Se você tem acesso a dados reais de benchmark ou pricing e gostaria de contribuir:

1. Certifique-se de que tem permissão para compartilhar os dados
2. Documente a metodologia de coleta
3. Inclua timestamps e contexto
4. Abra uma issue ou pull request

---

## 📧 Contato / Contact

Para questões sobre fontes de dados ou precisão:
- Abra uma issue no GitHub
- Revise a documentação dos provedores diretamente

**Última Atualização**: 2025-11-04
