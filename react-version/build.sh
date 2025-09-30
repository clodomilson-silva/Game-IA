#!/bin/bash

# 🐳 Script de Build e Deploy - Game IA VR

echo "🚀 Iniciando build da aplicação Game IA..."

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Instale Node.js 16+ primeiro."
    exit 1
fi

# Verificar se npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm não encontrado. Instale npm primeiro."
    exit 1
fi

echo "✅ Node.js $(node --version) detectado"
echo "✅ npm $(npm --version) detectado"

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Erro ao instalar dependências"
    exit 1
fi

# Build da aplicação
echo "🏗️ Executando build de produção..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Erro no build da aplicação"
    exit 1
fi

echo "✅ Build concluído com sucesso!"
echo "📁 Arquivos de produção estão em: ./dist/"

# Verificar se Docker está disponível
if command -v docker &> /dev/null; then
    echo "🐳 Docker detectado. Executando build da imagem..."
    
    # Build da imagem Docker
    docker build -t game-ia:latest .
    
    if [ $? -eq 0 ]; then
        echo "✅ Imagem Docker criada com sucesso!"
        echo "🚀 Para executar: docker run -d -p 8080:80 game-ia:latest"
        echo "🌐 Acesse: http://localhost:8080"
    else
        echo "❌ Erro ao criar imagem Docker"
    fi
else
    echo "⚠️ Docker não detectado. Usando servidor local..."
    echo "🌐 Para testar: npm run preview"
    echo "📍 Acesse: http://localhost:4173"
fi

echo ""
echo "🎯 Build finalizado! Pronto para feira de tecnologia!"
echo "🥽 VR: Acesse a aplicação e clique em 'Experiência VR'"
echo "📚 Documentação: DOCKER-README.md"