# Guia de Integração com Dados Reais / Real Data Integration Guide

## 🎯 Objetivo / Purpose

Este guia explica como integrar dados reais de GCP e AWS de forma segura, mantendo a privacidade e seguindo as melhores práticas de segurança.

---

## ⚠️ Antes de Começar / Before You Start

### Perguntas Importantes / Important Questions:

1. **Você tem permissão?** Verifique se pode compartilhar os dados da sua organização
2. **Os dados são públicos?** Prefira sempre APIs públicas de pricing
3. **Existem NDAs?** Não viole acordos de confidencialidade
4. **Os dados estão anonimizados?** Remova informações sensíveis

### Opções de Integração / Integration Options:

#### Opção 1: APIs Públicas (RECOMENDADO ✅)
- Não requer credenciais de conta
- Dados oficiais dos provedores
- Sem riscos de segurança
- Ideal para pricing e especificações

#### Opção 2: Conta de Teste/Sandbox (ACEITÁVEL ⚠️)
- Use conta separada de produção
- Apenas com permissões de leitura
- Budget limits configurados
- Para benchmarks controlados

#### Opção 3: Conta de Produção (NÃO RECOMENDADO ❌)
- Alto risco de exposição de dados sensíveis
- Pode violar políticas corporativas
- Difícil de anonimizar completamente
- **Evite esta opção**

---

## 📋 Opção 1: Integração com APIs Públicas (Recomendado)

### GCP Cloud Pricing API

#### 1. Setup Inicial

```bash
# Instalar SDK
pip install google-cloud-billing

# Opcional: Autenticação (para alguns endpoints)
gcloud auth application-default login
```

#### 2. Exemplo de Implementação

```python
# collectors/gcp/collector.py
from google.cloud import billing_v1
import os

class GCPCollector:
    def __init__(self):
        self.provider = 'gcp'
        # Use service account ou credenciais padrão
        # Credenciais vêm de variáveis de ambiente, não hardcoded
        
    def collect_pricing_data(self):
        """Coleta dados de pricing da API pública do GCP."""
        try:
            client = billing_v1.CloudCatalogClient()
            
            # Lista serviços públicos
            services = client.list_services()
            
            pricing_data = {}
            for service in services:
                # Processa apenas serviços relevantes
                if 'Compute Engine' in service.display_name:
                    skus = client.list_skus(parent=service.name)
                    # Extrai pricing de SKUs públicos
                    for sku in skus:
                        # Processa dados públicos
                        pass
            
            return pricing_data
            
        except Exception as e:
            print(f"Erro ao coletar dados GCP: {e}")
            # Fallback para dados sintéticos
            return self._get_fallback_data()
    
    def _get_fallback_data(self):
        """Dados sintéticos como fallback."""
        return {
            'compute': {
                'n1-standard-1': {'price_per_hour': 0.0475, 'vcpus': 1, 'memory_gb': 3.75},
            }
        }
```

#### 3. Referências Oficiais

- **Documentação**: https://cloud.google.com/billing/docs/apis
- **Python Client**: https://googleapis.dev/python/cloudbilling/latest/
- **Pricing Calculator API**: https://cloud.google.com/products/calculator

### AWS Pricing API

#### 1. Setup Inicial

```bash
# Instalar boto3
pip install boto3

# Configurar credenciais (opcional para pricing API)
aws configure
```

#### 2. Exemplo de Implementação

```python
# collectors/aws/collector.py
import boto3
import json
import os

class AWSCollector:
    def __init__(self):
        self.provider = 'aws'
        # AWS Pricing API não requer autenticação para dados públicos
        
    def collect_pricing_data(self):
        """Coleta dados de pricing da API pública da AWS."""
        try:
            # Pricing API está em us-east-1
            client = boto3.client('pricing', region_name='us-east-1')
            
            pricing_data = {}
            
            # Exemplo: Get EC2 pricing
            response = client.get_products(
                ServiceCode='AmazonEC2',
                Filters=[
                    {
                        'Type': 'TERM_MATCH',
                        'Field': 'instanceType',
                        'Value': 't3.medium'
                    },
                    {
                        'Type': 'TERM_MATCH',
                        'Field': 'location',
                        'Value': 'US East (N. Virginia)'
                    }
                ],
                MaxResults=100
            )
            
            # Processa resultados públicos
            for price_item in response['PriceList']:
                price_data = json.loads(price_item)
                # Extrai informações relevantes
                pass
            
            return pricing_data
            
        except Exception as e:
            print(f"Erro ao coletar dados AWS: {e}")
            return self._get_fallback_data()
    
    def _get_fallback_data(self):
        """Dados sintéticos como fallback."""
        return {
            'compute': {
                't3.medium': {'price_per_hour': 0.0416, 'vcpus': 2, 'memory_gb': 4},
            }
        }
```

#### 3. Referências Oficiais

- **Documentação**: https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/price-changes.html
- **Boto3 Pricing**: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/pricing.html
- **Price List API**: https://aws.amazon.com/blogs/aws/aws-price-list-api/

---

## 🔒 Opção 2: Integração Segura com Conta de Teste

Se você **realmente precisa** usar uma conta (para benchmarks, por exemplo):

### Preparação da Conta

#### GCP

1. **Crie um projeto de teste separado**
   ```bash
   gcloud projects create cloud-comparison-test
   ```

2. **Crie service account com permissões mínimas**
   ```bash
   gcloud iam service-accounts create comparison-reader \
       --display-name="Comparison Platform Reader"
   
   # Adicione apenas roles de leitura
   gcloud projects add-iam-policy-binding cloud-comparison-test \
       --member="serviceAccount:comparison-reader@cloud-comparison-test.iam.gserviceaccount.com" \
       --role="roles/viewer"
   ```

3. **Gere chave de service account**
   ```bash
   gcloud iam service-accounts keys create ~/gcp-key.json \
       --iam-account=comparison-reader@cloud-comparison-test.iam.gserviceaccount.com
   ```

4. **Configure variável de ambiente (NUNCA commite o arquivo)**
   ```bash
   export GOOGLE_APPLICATION_CREDENTIALS=~/gcp-key.json
   ```

#### AWS

1. **Crie usuário IAM específico**
   - Acesse IAM Console
   - Crie usuário "comparison-reader"
   - **Sem acesso ao console**, apenas programático

2. **Crie política personalizada**
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Action": [
           "pricing:DescribeServices",
           "pricing:GetProducts",
           "ec2:DescribeInstanceTypes",
           "ec2:DescribeRegions"
         ],
         "Resource": "*"
       }
     ]
   }
   ```

3. **Configure credenciais localmente**
   ```bash
   aws configure
   # Insira Access Key ID e Secret Access Key
   # NUNCA commite estas credenciais
   ```

### Configuração do Projeto

#### 1. Crie arquivo `.env` (já está no .gitignore)

```bash
# .env
GCP_PROJECT_ID=cloud-comparison-test
GCP_CREDENTIALS_PATH=/path/to/gcp-key.json

AWS_ACCESS_KEY_ID=seu_access_key_aqui
AWS_SECRET_ACCESS_KEY=seu_secret_key_aqui
AWS_REGION=us-east-1
```

#### 2. Adicione ao `.gitignore` (verificar se já existe)

```
# Credentials
.env
.env.local
*.json  # Service account keys
gcp-key.json
aws-credentials.json
```

#### 3. Carregue variáveis de ambiente

```python
# analysis/__init__.py ou run_comparison.py
from dotenv import load_dotenv
import os

load_dotenv()

# Agora as variáveis estão disponíveis
gcp_project = os.getenv('GCP_PROJECT_ID')
```

### Benchmarking Seguro

```python
# collectors/benchmark.py
import time
import os
from google.cloud import compute_v1
import boto3

class BenchmarkCollector:
    def __init__(self):
        self.gcp_project = os.getenv('GCP_PROJECT_ID')
        self.aws_region = os.getenv('AWS_REGION', 'us-east-1')
    
    def run_compute_benchmark_gcp(self):
        """Executa benchmark básico em instância GCP."""
        # Use apenas instâncias de teste pequenas
        # Configure timeout e budget limits
        pass
    
    def run_compute_benchmark_aws(self):
        """Executa benchmark básico em instância AWS."""
        # Use apenas instâncias de teste pequenas
        pass
    
    def collect_anonymized_metrics(self):
        """Coleta apenas métricas agregadas e anonimizadas."""
        metrics = {
            'compute_benchmark': {
                'cpu_score': 0,  # Resultado do benchmark
                'memory_bandwidth_gbps': 0,
            },
            'network_latency_ms': {}
        }
        # Não inclua custos específicos ou configurações privadas
        return metrics
```

---

## 📝 Boas Práticas para Contribuição / Contribution Best Practices

### O Que Documentar / What to Document:

```markdown
## Dados Contribuídos / Contributed Data

**Fonte**: [Seu nome/organização]
**Data da Coleta**: 2025-11-04
**Metodologia**:
- API: GCP Cloud Pricing API
- Região: us-east1
- Período: Outubro 2025
- Ferramentas: Python 3.11, google-cloud-billing 1.x

**Métricas Coletadas**:
- Pricing de instâncias n1-standard-* (dados públicos)
- Latências inter-região (agregadas de 100 testes)
- Throughput de rede (média de 50 testes)

**Limitações**:
- Dados coletados em horário de baixo tráfego
- Apenas regiões Americas
- Sem incluir descontos corporativos
```

### Anonimização de Dados / Data Anonymization:

```python
def anonymize_pricing_data(raw_data):
    """Remove informações específicas da organização."""
    anonymized = {}
    
    for service, prices in raw_data.items():
        # Use apenas preços públicos, não descontos específicos
        anonymized[service] = {
            'base_price': prices['list_price'],  # Preço de lista
            'region': 'generic',  # Não revele sua região específica
            # Não inclua: volume discounts, corporate agreements, etc.
        }
    
    return anonymized
```

---

## ✅ Checklist de Segurança / Security Checklist

Antes de compartilhar dados:

- [ ] Verificou permissões para compartilhar?
- [ ] Removeu todas as credenciais do código?
- [ ] Anonimizou dados sensíveis?
- [ ] Usou apenas dados públicos ou agregados?
- [ ] Documentou a metodologia de coleta?
- [ ] Testou que nenhuma informação privada está exposta?
- [ ] Adicionou `.env` e arquivos de credenciais ao `.gitignore`?
- [ ] Revisou que nenhum custo específico da organização está incluído?

---

## 🆘 Suporte / Support

Se tiver dúvidas sobre como integrar dados de forma segura:

1. Abra uma issue no GitHub com a tag `data-integration`
2. Descreva seu caso de uso específico
3. Não inclua credenciais ou dados sensíveis na issue

---

**Última Atualização**: 2025-11-04
