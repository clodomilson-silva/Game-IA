@echo off
REM 🐳 Script de Build e Deploy - Game IA VR (Windows)

echo 🚀 Iniciando build da aplicação Game IA...

REM Verificar se Node.js está instalado
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js não encontrado. Instale Node.js 16+ primeiro.
    pause
    exit /b 1
)

REM Verificar se npm está instalado
where npm >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm não encontrado. Instale npm primeiro.
    pause
    exit /b 1
)

echo ✅ Node.js detectado
echo ✅ npm detectado

REM Instalar dependências
echo 📦 Instalando dependências...
npm install

if %errorlevel% neq 0 (
    echo ❌ Erro ao instalar dependências
    pause
    exit /b 1
)

REM Build da aplicação
echo 🏗️ Executando build de produção...
npm run build

if %errorlevel% neq 0 (
    echo ❌ Erro no build da aplicação
    pause
    exit /b 1
)

echo ✅ Build concluído com sucesso!
echo 📁 Arquivos de produção estão em: .\dist\

REM Verificar se Docker está disponível
where docker >nul 2>&1
if %errorlevel% equ 0 (
    echo 🐳 Docker detectado. Executando build da imagem...
    
    REM Build da imagem Docker
    docker build -t game-ia:latest .
    
    if %errorlevel% equ 0 (
        echo ✅ Imagem Docker criada com sucesso!
        echo 🚀 Para executar: docker run -d -p 8080:80 game-ia:latest
        echo 🌐 Acesse: http://localhost:8080
    ) else (
        echo ❌ Erro ao criar imagem Docker
    )
) else (
    echo ⚠️ Docker não detectado. Usando servidor local...
    echo 🌐 Para testar: npm run preview
    echo 📍 Acesse: http://localhost:4173
)

echo.
echo 🎯 Build finalizado! Pronto para feira de tecnologia!
echo 🥽 VR: Acesse a aplicação e clique em 'Experiência VR'
echo 📚 Documentação: DOCKER-README.md

pause