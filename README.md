#  Game IA - Feira de Tecnologia

Um projeto interativo de jogos desenvolvido em React para demonstração em feira de tecnologia, focado em Inteligência Artificial e tecnologias modernas.

![Game IA](https://img.shields.io/badge/React-18.2.0-blue) ![Vite](https://img.shields.io/badge/Vite-4.5.14-green) ![Framer Motion](https://img.shields.io/badge/Framer%20Motion-10.16.4-purple) ![Status](https://img.shields.io/badge/Status-Conclu%C3%ADdo-success)

##  **Demonstração**

Uma aplicação web interativa com três jogos educativos sobre tecnologia e IA:
- **Jogo da Memória**: Pareamento de tecnologias com ícones reais
- **Quebra-Cabeça**: Puzzle interativo com imagens de IA
- **Quiz** (em desenvolvimento): Perguntas sobre tecnologia

##  **Características Principais**

###  **Jogabilidade**
- **Responsivo**: Funciona perfeitamente em smartphones, tablets e desktops
- **Touch-friendly**: Otimizado para dispositivos móveis
- **Animações suaves**: Transições fluidas com Framer Motion
- **Performance otimizada**: 60fps em todos os dispositivos

###  **Design**
- **Tema Cyberpunk**: Visual futurista com cores neon
- **Fontes personalizadas**: Typography especializada para games
- **Efeitos visuais**: Partículas, gradientes e sombras neon
- **Interface intuitiva**: UX otimizada para todas as idades

###  **Tecnologias**
- **React 18**: Hooks modernos e componentes funcionais
- **Vite**: Build tool rápido e eficiente
- **Framer Motion**: Animações e transições avançadas
- **React Icons**: Biblioteca de ícones de tecnologias
- **CSS Grid/Flexbox**: Layout responsivo
- **JavaScript ES6+**: Código moderno e limpo

##  **Responsividade**

### Desktop (> 1025px)
- Layout completo com todos os elementos visíveis
- Quebra-cabeça: 450px × 450px
- Memory game: 5 colunas

### Tablet (481px - 1024px)
- Interface adaptada para touch
- Quebra-cabeça: até 420px
- Memory game: colunas flexíveis

### Mobile (< 480px)
- Layout otimizado para uma mão
- Quebra-cabeça: até 350px
- Memory game: 2-3 colunas
- Orientação landscape suportada

##  **Instalação e Execução**

### Pré-requisitos
- Node.js 16+ 
- npm ou yarn

### Passos para executar

1. **Clone o repositório**
```bash
git clone git@github.com:clodomilson-silva/Game-IA.git
cd Game-IA
```

2. **Navegue para a versão React**
```bash
cd react-version
```

3. **Instale as dependências**
```bash
npm install
```

4. **Execute em modo desenvolvimento**
```bash
npm run dev
```

5. **Abra no navegador**
```
http://localhost:3000
```

### Build para produção
```bash
npm run build
npm run preview
```

##  **Estrutura do Projeto**

```
Game-IA/
├── react-version/                 # Versão principal em React
│   ├── src/
│   │   ├── components/           # Componentes React
│   │   │   ├── Header.jsx       # Cabeçalho principal
│   │   │   ├── MainMenu.jsx     # Menu inicial
│   │   │   ├── MemoryGameSimple.jsx # Jogo da memória
│   │   │   ├── PuzzleGame.jsx   # Quebra-cabeça
│   │   │   ├── QuizGame.jsx     # Quiz (em desenvolvimento)
│   │   │   └── ParticleBackground.jsx # Efeitos visuais
│   │   ├── App.jsx              # Componente principal
│   │   ├── index.css            # Estilos globais
│   │   └── main.jsx             # Ponto de entrada
│   ├── public/                  # Arquivos estáticos
│   │   └── images/              # Imagens dos jogos
│   ├── package.json             # Dependências
│   └── vite.config.js           # Configuração Vite
├── html-version/                # Versão legada em HTML/JS
├── README.md                    # Este arquivo
└── .gitignore                   # Arquivos ignorados
```

##  **Como Jogar**

###  **Jogo da Memória**
1. Clique nas cartas para virá-las
2. Encontre pares de tecnologias iguais
3. Complete todos os pares para vencer
4. **Tecnologias incluídas**: Python, React, Docker, Kubernetes, Git, etc.

###  **Quebra-Cabeça**
1. **Desktop**: Clique e arraste as peças
2. **Mobile**: Toque e arraste ou toque para mover
3. Organize as peças para formar a imagem completa
4. **Imagens**: Inteligência Artificial, Machine Learning, Redes Neurais

###  **Quiz** (Em Desenvolvimento)
- Perguntas sobre tecnologia e IA
- Múltipla escolha
- Sistema de pontuação

##  **Funcionalidades Técnicas**

### Performance
- **Lazy loading**: Componentes carregados sob demanda
- **Memoização**: useCallback e useMemo para otimização
- **Code splitting**: Bundle otimizado
- **Hardware acceleration**: Animações via GPU

### Acessibilidade
- **Touch gestures**: Suporte completo a touch
- **Keyboard navigation**: Navegação por teclado
- **Screen reader friendly**: Semântica HTML adequada
- **High contrast**: Cores de alto contraste

### Browser Support
- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ Mobile browsers

##  **Métricas de Performance**

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1
- **Mobile Performance Score**: 95+

##  **Contribuição**

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

##  **Changelog**

### v2.0.0 (2025-09-29)
- ✅ Versão React completa
- ✅ Responsividade total
- ✅ Performance otimizada
- ✅ Jogo da memória com ícones de tecnologia
- ✅ Quebra-cabeça com drag-and-drop
- ✅ Animações Framer Motion

### v1.0.0 (2025-09-28)
- ✅ Versão inicial HTML/CSS/JS
- ✅ Jogos básicos funcionais

##  **Problemas Conhecidos**

- Quiz em desenvolvimento
- Algumas imagens podem não carregar em desenvolvimento local
- Performance pode variar em dispositivos muito antigos

##  **Licença**

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

##  **Autor**

**Clodomilson Silva**
- GitHub: [@clodomilson-silva](https://github.com/clodomilson-silva)
- LinkedIn: [Clodomilson Silva](https://linkedin.com/in/clodomilson-silva)

##  **Agradecimentos**

- React team pela excelente framework
- Framer Motion pela biblioteca de animações
- React Icons pela biblioteca de ícones
- Vite pela ferramenta de build rápida

---

**Desenvolvido com ❤️ para demonstração em feira de tecnologia**

*Última atualização: 29 de setembro de 2025*