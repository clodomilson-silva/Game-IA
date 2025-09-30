# 🐳 Game IA - Guia de Dockerização

## 📋 Pré-requisitos

- **Docker** 20.10+ instalado
- **Docker Compose** 2.0+ (incluído no Docker Desktop)
- **8GB RAM** disponível (recomendado)
- **2GB** de espaço em disco

## 🚀 Como Executar com Docker

### 🔧 **Método 1: Docker Compose (Recomendado)**

```bash
# Clone o repositório
git clone https://github.com/clodomilson-silva/Game-IA.git
cd Game-IA/react-version

# Execute com Docker Compose
docker-compose up -d

# Acesse a aplicação
http://localhost:8080
```

### 🛠️ **Método 2: Docker Build Manual**

```bash
# Build da imagem
docker build -t game-ia:latest .

# Execute o container
docker run -d \
  --name game-ia-app \
  -p 8080:80 \
  --restart unless-stopped \
  game-ia:latest

# Acesse a aplicação
http://localhost:8080
```

## 📊 **Detalhes da Imagem Docker**

### 🏗️ **Arquitetura Multi-Stage:**
- **Stage 1**: Build com Node.js 18 Alpine (otimizado)
- **Stage 2**: Servir com Nginx Alpine (leve e rápido)

### 📦 **Configurações:**
- **Porta**: 80 (mapeada para 8080 no host)
- **Servidor**: Nginx com configurações otimizadas
- **Compressão**: Gzip habilitado para performance
- **Cache**: Assets estáticos com cache de 1 ano
- **Headers VR**: COEP/COOP configurados para WebXR

### 🎯 **Otimizações para VR:**
- **Headers CORS** configurados para recursos 3D
- **Cross-Origin-Embedder-Policy** para WebXR
- **Cache específico** para modelos 3D (.gltf, .glb)
- **Compressão otimizada** para JavaScript pesado

## 🔧 **Comandos Úteis**

### 📝 **Logs e Monitoramento:**
```bash
# Ver logs do container
docker-compose logs -f

# Status dos containers
docker-compose ps

# Estatísticas de uso
docker stats game-ia-app
```

### 🔄 **Manutenção:**
```bash
# Restart da aplicação
docker-compose restart

# Update da aplicação
git pull
docker-compose down
docker-compose up -d --build

# Limpeza (remove container e volumes)
docker-compose down -v
```

### 🛠️ **Debug:**
```bash
# Entrar no container
docker exec -it game-ia-app /bin/sh

# Ver configuração do Nginx
docker exec game-ia-app cat /etc/nginx/nginx.conf

# Verificar arquivos da aplicação
docker exec game-ia-app ls -la /usr/share/nginx/html
```

## 🌐 **Acessos e Portas**

- **Aplicação Web**: http://localhost:8080
- **VR (se disponível)**: Clique em "🥽 Experiência VR"
- **Health Check**: http://localhost:8080 (response 200 = OK)

## 🎮 **Testando VR no Docker**

### ✅ **Funcionará:**
- Todos os jogos 2D normalmente
- Interface responsiva
- Performance otimizada

### ⚠️ **VR Limitações:**
- **WebXR requer HTTPS** em produção
- **Localhost funciona** para desenvolvimento
- **Certificado SSL** necessário para acesso externo VR

### 🔐 **Para Produção VR:**
```bash
# Use um proxy reverso com SSL (recomendado)
# Exemplo com Traefik labels já incluído no docker-compose.yml
```

## 📈 **Performance**

### 📊 **Métricas Esperadas:**
- **Tamanho da imagem**: ~50MB (nginx alpine + build)
- **Tempo de startup**: ~3-5 segundos
- **Uso de RAM**: ~10-20MB
- **Uso de CPU**: <1% em idle

### 🚀 **Otimizações Aplicadas:**
- **Multi-stage build** reduz tamanho final
- **Alpine Linux** base mínima e segura
- **Gzip compression** reduz transfer
- **Cache headers** melhoram performance
- **Health checks** garantem disponibilidade

## 🔒 **Segurança**

- ✅ **Headers de segurança** configurados
- ✅ **Non-root user** no container
- ✅ **Minimal attack surface** (Alpine)
- ✅ **No secrets** expostos
- ✅ **Read-only filesystem** para app

## 🎯 **Para Produção**

### 🌐 **Deploy Recomendado:**
```bash
# Com SSL/TLS para VR funcionar
version: '3.8'
services:
  game-ia:
    image: game-ia:latest
    environment:
      - VIRTUAL_HOST=game-ia.seudominio.com
      - LETSENCRYPT_HOST=game-ia.seudominio.com
      - LETSENCRYPT_EMAIL=seu@email.com
```

### ☁️ **Cloud Providers:**
- **AWS ECS/Fargate**: Suportado
- **Google Cloud Run**: Suportado
- **Azure Container Instances**: Suportado
- **DigitalOcean App Platform**: Suportado

---

## 🆘 **Troubleshooting**

### ❌ **Container não inicia:**
```bash
docker-compose logs
# Verificar se porta 8080 está disponível
```

### ❌ **VR não funciona:**
- Verifique se está acessando via HTTPS (produção)
- Confirme que navegador suporta WebXR
- Teste primeiro sem Docker para isolar problema

### ❌ **Performance baixa:**
```bash
# Verificar recursos disponíveis
docker system df
docker system prune -f
```

**🐳 Sua aplicação Game IA está pronta para Docker! 🚀**