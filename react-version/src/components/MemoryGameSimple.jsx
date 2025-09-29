import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaRedo, FaTrophy } from 'react-icons/fa';
import { 
  SiTensorflow, 
  SiPython, 
  SiJavascript, 
  SiReact, 
  SiDocker, 
  SiKubernetes, 
  SiAmazonaws, 
  SiMicrosoftazure, 
  SiGooglecloud, 
  SiOpenai,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiGit,
  SiGithub,
  SiLinux,
  SiUbuntu,
  SiAndroid,
  SiApple,
  SiWindows
} from 'react-icons/si';

const MemoryGame = ({ onBack }) => {
  const [cards, setCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [matchedPairs, setMatchedPairs] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [isBlocked, setIsBlocked] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)

  // Dados dos pares de cartas com ícones de tecnologias relacionadas - memoizado para performance
  const memoryPairs = useMemo(() => [
    { 
      id: 1, 
      content: { icon: SiPython, name: 'Python' }, 
      pair: { icon: SiPython, name: 'Python' }
    },
    { 
      id: 2, 
      content: { icon: SiJavascript, name: 'JavaScript' }, 
      pair: { icon: SiJavascript, name: 'JavaScript' }
    },
    { 
      id: 3, 
      content: { icon: SiReact, name: 'React' }, 
      pair: { icon: SiReact, name: 'React' }
    },
    { 
      id: 4, 
      content: { icon: SiDocker, name: 'Docker' }, 
      pair: { icon: SiDocker, name: 'Docker' }
    },
    { 
      id: 5, 
      content: { icon: SiKubernetes, name: 'Kubernetes' }, 
      pair: { icon: SiKubernetes, name: 'Kubernetes' }
    },
    { 
      id: 6, 
      content: { icon: SiAmazonaws, name: 'AWS' }, 
      pair: { icon: SiAmazonaws, name: 'AWS' }
    },
    { 
      id: 7, 
      content: { icon: SiMicrosoftazure, name: 'Azure' }, 
      pair: { icon: SiMicrosoftazure, name: 'Azure' }
    },
    { 
      id: 8, 
      content: { icon: SiGooglecloud, name: 'Google Cloud' }, 
      pair: { icon: SiGooglecloud, name: 'Google Cloud' }
    },
    { 
      id: 9, 
      content: { icon: SiMongodb, name: 'MongoDB' }, 
      pair: { icon: SiMongodb, name: 'MongoDB' }
    },
    { 
      id: 10, 
      content: { icon: SiGit, name: 'Git' }, 
      pair: { icon: SiGit, name: 'Git' }
    }
  ], [])

  // Virar carta - otimizada com useCallback
  const flipCard = useCallback((cardId) => {
    if (isBlocked || flippedCards.includes(cardId) || flippedCards.length >= 2) {
      return
    }

    const newFlippedCards = [...flippedCards, cardId]
    setFlippedCards(newFlippedCards)

    // Atualizar estado das cartas
    setCards(prevCards =>
      prevCards.map(card =>
        card.id === cardId ? { ...card, isFlipped: true } : card
      )
    )

    if (newFlippedCards.length === 2) {
      setIsBlocked(true)
      setAttempts(prev => prev + 1)
      checkMatch(newFlippedCards)
    }
  }, [isBlocked, flippedCards])

  // Verificar se as cartas combinam - otimizada com useCallback
  const checkMatch = useCallback((flippedCardIds) => {
    const [firstCardId, secondCardId] = flippedCardIds
    const firstCard = cards.find(card => card.id === firstCardId)
    const secondCard = cards.find(card => card.id === secondCardId)

    setTimeout(() => {
      if (firstCard.pairId === secondCard.pairId) {
        // Match encontrado - marcar como matched primeiro
        setCards(prevCards =>
          prevCards.map(card =>
            flippedCardIds.includes(card.id)
              ? { ...card, isMatched: true }
              : card
          )
        )
        setMatchedPairs(prev => prev + 1)
        
        // Depois de um tempo, remover as cartas (fazê-las desaparecer)
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(card =>
              flippedCardIds.includes(card.id)
                ? { ...card, isHidden: true }
                : card
            )
          )
        }, 1000) // Aguarda 1 segundo antes de fazer desaparecer
        
      } else {
        // Não é match - virar cartas de volta
        setCards(prevCards =>
          prevCards.map(card =>
            flippedCardIds.includes(card.id)
              ? { ...card, isFlipped: false }
              : card
          )
        )
      }

      setFlippedCards([])
      setIsBlocked(false)
    }, 1500)
  }, [cards])

  // Inicializar jogo - otimizada com useCallback
  const initGame = useCallback(() => {
    const gameCards = []
    memoryPairs.forEach((pair, index) => {
      gameCards.push({
        id: `${index}-a`,
        content: pair.content,
        pairId: index,
        isFlipped: false,
        isMatched: false,
        isHidden: false
      })
      gameCards.push({
        id: `${index}-b`,
        content: pair.pair,
        pairId: index,
        isFlipped: false,
        isMatched: false,
        isHidden: false
      })
    })
    
    // Embaralhar cartas
    const shuffledCards = gameCards.sort(() => Math.random() - 0.5)
    setCards(shuffledCards)
    setFlippedCards([])
    setMatchedPairs(0)
    setAttempts(0)
    setIsBlocked(false)
    setGameComplete(false)
  }, [memoryPairs])

  // Verificar se o jogo terminou - otimizado com dependências
  useEffect(() => {
    if (matchedPairs === memoryPairs.length) {
      setGameComplete(true)
    }
  }, [matchedPairs, memoryPairs.length])

  // Inicializar jogo ao montar componente
  useEffect(() => {
    initGame()
  }, [initGame])

  return (
    <div className="memory-game">
      <div className="game-container">
        <div className="game-header">
          <motion.button
            className="back-button"
            onClick={onBack}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaArrowLeft />
            VOLTAR
          </motion.button>

          <h2 className="game-title">
            JOGO DA MEMÓRIA IA
          </h2>

          <div className="score-display">
            <div className="score-item">
              TENTATIVAS: <span className="score">{attempts}</span>
            </div>
            <div className="score-item">
              PARES: <span className="score">{matchedPairs}/{memoryPairs.length}</span>
            </div>
          </div>
        </div>

        <motion.div 
          className="memory-board"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.4,
            ease: "easeOut",
            staggerChildren: 0.05
          }}
        >
          <AnimatePresence mode="wait">
            {cards.map((card, index) => (
              !card.isHidden && (
                <motion.div
                  key={card.id}
                  className={`memory-card ${card.isFlipped ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''}`}
                  onClick={() => flipCard(card.id)}
                  layout
                  initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    rotateY: 0
                  }}
                  exit={{ 
                    opacity: 0, 
                    scale: 0.3,
                    rotate: 360,
                    transition: { duration: 0.6, ease: "easeInOut" }
                  }}
                  transition={{ 
                    delay: index * 0.03, 
                    duration: 0.5,
                    ease: "easeOut"
                  }}
                  whileHover={{ 
                    scale: 1.03, 
                    y: -4,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ 
                    scale: 0.98,
                    transition: { duration: 0.1 }
                  }}
                >
                  <div className="card-inner">
                    <div className="card-back">
                      <div className="card-back-content">?</div>
                    </div>
                    <div className="card-front">
                      <div className="card-content">
                        {card.content && card.content.icon && (
                          <card.content.icon className="card-tech-icon" />
                        )}
                        {card.isMatched && !card.isHidden && (
                          <motion.span
                            className="match-indicator"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            style={{
                              position: 'absolute',
                              top: '8px',
                              right: '8px',
                              color: 'var(--neon-green)',
                              fontSize: '1.2rem',
                              textShadow: '0 0 8px var(--neon-green)'
                            }}
                          >
                            ✓
                          </motion.span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="game-controls">
          <motion.button
            className="restart-button"
            onClick={initGame}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaRedo />
            REINICIAR
          </motion.button>
        </div>
      </div>

      {/* Modal de Vitória */}
      {gameComplete && (
        <motion.div className="victory-modal">
          <motion.div className="victory-content">
            <FaTrophy className="victory-icon" />
            <h3>🎉 PARABÉNS!</h3>
            <p>Você completou o jogo da memória em {attempts} tentativas!</p>
            <div className="victory-buttons">
              <button className="btn btn-primary" onClick={initGame}>
                JOGAR NOVAMENTE
              </button>
              <button className="btn btn-secondary" onClick={onBack}>
                MENU PRINCIPAL
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default MemoryGame;