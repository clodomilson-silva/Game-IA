import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaArrowLeft, FaRedo, FaImage } from 'react-icons/fa'

const PuzzleGame = ({ onBack }) => {
  const [pieces, setPieces] = useState(Array.from({length: 9}, (_, i) => i))
  const [emptyIndex, setEmptyIndex] = useState(8)
  const [moves, setMoves] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [boardSize, setBoardSize] = useState(450)
  const puzzleBoardRef = useRef(null)

  // Calcular tamanho do board baseado no viewport
  useEffect(() => {
    const updateBoardSize = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const maxSize = Math.min(vw * 0.9, vh * 0.6, 450)
      setBoardSize(Math.floor(maxSize))
    }

    updateBoardSize()
    window.addEventListener('resize', updateBoardSize)
    return () => window.removeEventListener('resize', updateBoardSize)
  }, [])

  // Imagens do puzzle - memoizadas para performance
  const puzzleImages = useMemo(() => [
    {
      name: 'Inteligência Artificial',
      path: '/images/puzzles/ai-brain.svg'
    },
    {
      name: 'Machine Learning',
      path: '/images/puzzles/ml-network.svg'
    },
    {
      name: 'Rede Neural',
      path: '/images/puzzles/neural-network.svg'
    }
  ], [])

  // Imagem atual memoizada
  const currentImage = useMemo(() => puzzleImages[currentImageIndex], [puzzleImages, currentImageIndex])

  const shufflePuzzle = useCallback(() => {
    const newPieces = [...pieces]
    
    // Fazer 200 movimentos aleatórios válidos
    for (let i = 0; i < 200; i++) {
      const emptyPos = newPieces.indexOf(8)
      const row = Math.floor(emptyPos / 3)
      const col = emptyPos % 3
      const moves = []
      
      if (row > 0) moves.push(emptyPos - 3) // Cima
      if (row < 2) moves.push(emptyPos + 3) // Baixo
      if (col > 0) moves.push(emptyPos - 1) // Esquerda
      if (col < 2) moves.push(emptyPos + 1) // Direita
      
      const randomMove = moves[Math.floor(Math.random() * moves.length)]
      
      // Trocar peças
      ;[newPieces[emptyPos], newPieces[randomMove]] = [newPieces[randomMove], newPieces[emptyPos]]
    }
    
    setPieces(newPieces)
    setEmptyIndex(newPieces.indexOf(8))
    setMoves(0)
  }, [pieces])

  const getPossibleMoves = useCallback((emptyPos) => {
    const moves = []
    const row = Math.floor(emptyPos / 3)
    const col = emptyPos % 3
    
    if (row > 0) moves.push(emptyPos - 3) // Cima
    if (row < 2) moves.push(emptyPos + 3) // Baixo
    if (col > 0) moves.push(emptyPos - 1) // Esquerda
    if (col < 2) moves.push(emptyPos + 1) // Direita
    
    return moves
  }, [])

  const movePiece = useCallback((index) => {
    const emptyPos = pieces.indexOf(8)
    const possibleMoves = getPossibleMoves(emptyPos)
    
    if (possibleMoves.includes(index)) {
      const newPieces = [...pieces]
      ;[newPieces[emptyPos], newPieces[index]] = [newPieces[index], newPieces[emptyPos]]
      
      setPieces(newPieces)
      setEmptyIndex(index)
      setMoves(prev => prev + 1)
    }
  }, [pieces, getPossibleMoves])

  // Funções para drag and drop - versão simplificada
  const handleDragStart = useCallback((event, info) => {
    setIsDragging(true)
  }, [])

  const handleDragEnd = useCallback((event, info, index) => {
    setIsDragging(false)
    const emptyPos = pieces.indexOf(8)
    const row = Math.floor(emptyPos / 3)
    const col = emptyPos % 3
    const moves = []
    
    if (row > 0) moves.push(emptyPos - 3) // Cima
    if (row < 2) moves.push(emptyPos + 3) // Baixo
    if (col > 0) moves.push(emptyPos - 1) // Esquerda
    if (col < 2) moves.push(emptyPos + 1) // Direita
    
    // Se a peça pode se mover e foi arrastada uma distância mínima
    if (moves.includes(index)) {
      const dragDistance = Math.sqrt(info.offset.x ** 2 + info.offset.y ** 2)
      if (dragDistance > 30) {
        movePiece(index)
      }
    }
  }, [movePiece, pieces])

  const canDrag = useCallback((index) => {
    const emptyPos = pieces.indexOf(8)
    const row = Math.floor(emptyPos / 3)
    const col = emptyPos % 3
    const moves = []
    
    if (row > 0) moves.push(emptyPos - 3) // Cima
    if (row < 2) moves.push(emptyPos + 3) // Baixo
    if (col > 0) moves.push(emptyPos - 1) // Esquerda
    if (col < 2) moves.push(emptyPos + 1) // Direita
    
    return pieces[index] !== 8 && moves.includes(index)
  }, [pieces])

  const changeImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % puzzleImages.length)
    // Embaralhar quando trocar imagem
    const newPieces = [...pieces]
    
    // Fazer 200 movimentos aleatórios válidos
    for (let i = 0; i < 200; i++) {
      const emptyPos = newPieces.indexOf(8)
      const row = Math.floor(emptyPos / 3)
      const col = emptyPos % 3
      const moves = []
      
      if (row > 0) moves.push(emptyPos - 3) // Cima
      if (row < 2) moves.push(emptyPos + 3) // Baixo
      if (col > 0) moves.push(emptyPos - 1) // Esquerda
      if (col < 2) moves.push(emptyPos + 1) // Direita
      
      const randomMove = moves[Math.floor(Math.random() * moves.length)]
      
      // Trocar peças
      ;[newPieces[emptyPos], newPieces[randomMove]] = [newPieces[randomMove], newPieces[emptyPos]]
    }
    
    setPieces(newPieces)
    setEmptyIndex(newPieces.indexOf(8))
    setMoves(0)
  }, [puzzleImages.length, pieces])

  const isComplete = useCallback(() => {
    return pieces.every((piece, index) => piece === index)
  }, [pieces])

  // Inicializar apenas uma vez
  useEffect(() => {
    const initialPieces = [...pieces]
    
    // Fazer 200 movimentos aleatórios válidos para embaralhar
    for (let i = 0; i < 200; i++) {
      const emptyPos = initialPieces.indexOf(8)
      const row = Math.floor(emptyPos / 3)
      const col = emptyPos % 3
      const moves = []
      
      if (row > 0) moves.push(emptyPos - 3) // Cima
      if (row < 2) moves.push(emptyPos + 3) // Baixo
      if (col > 0) moves.push(emptyPos - 1) // Esquerda
      if (col < 2) moves.push(emptyPos + 1) // Direita
      
      const randomMove = moves[Math.floor(Math.random() * moves.length)]
      
      // Trocar peças
      ;[initialPieces[emptyPos], initialPieces[randomMove]] = [initialPieces[randomMove], initialPieces[emptyPos]]
    }
    
    setPieces(initialPieces)
    setEmptyIndex(initialPieces.indexOf(8))
    setMoves(0)
  }, []) // Executar apenas uma vez na montagem

  return (
    <div className="puzzle-game">
      <div className="game-container">
        <div className="game-header">
          <motion.button
            className="back-button"
            style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 600,
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}
            onClick={onBack}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaArrowLeft />
            VOLTAR
          </motion.button>

          <h2 
            className="game-title"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '2rem',
              fontWeight: 700,
              letterSpacing: '1.5px',
              textTransform: 'uppercase'
            }}
          >
            QUEBRA-CABEÇA IA
          </h2>

          <div className="score-display">
            <div 
              className="score-item"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                letterSpacing: '1px'
              }}
            >
              MOVIMENTOS: <span className="score">{moves}</span>
            </div>
          </div>
        </div>

        <div className="puzzle-container">
          <motion.div 
            ref={puzzleBoardRef}
            className="puzzle-board"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.4,
              ease: "easeOut"
            }}
          >
            {pieces.map((piece, index) => (
              <motion.div
                key={`${piece}-${index}`}
                className={`puzzle-piece ${piece === 8 ? 'empty' : ''} ${isComplete() && piece !== 8 ? 'correct' : ''} ${canDrag(index) ? 'draggable' : ''}`}
                drag={canDrag(index)}
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={0.1}
                dragSnapToOrigin={true}
                dragMomentum={false}
                dragTransition={{ bounceStiffness: 300, bounceDamping: 40 }}
                onDragStart={handleDragStart}
                onDragEnd={(event, info) => handleDragEnd(event, info, index)}
                onClick={() => movePiece(index)}
                data-isdragging={isDragging}
                whileHover={{ 
                  scale: piece !== 8 && canDrag(index) ? 1.02 : 1,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                whileDrag={{ 
                  scale: 1.03, 
                  zIndex: 10,
                  opacity: 0.95,
                  transition: { duration: 0.1 }
                }}
                whileTap={{ 
                  scale: 0.98,
                  transition: { duration: 0.1 }
                }}
                animate={{
                  scale: 1,
                  rotate: 0,
                  opacity: 1
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 35,
                  mass: 0.8
                }}
                style={{
                  backgroundImage: piece !== 8 ? `url(${currentImage.path})` : 'none',
                  backgroundPosition: piece !== 8 ? 
                    `-${(piece % 3) * (boardSize / 3)}px -${Math.floor(piece / 3) * (boardSize / 3)}px` : 'none',
                  backgroundSize: `${boardSize}px ${boardSize}px`,
                  cursor: canDrag(index) ? 'grab' : piece !== 8 ? 'pointer' : 'default'
                }}
              />
            ))}
          </motion.div>

          <div className="puzzle-preview">
            <img 
              src={currentImage.path} 
              alt={currentImage.name}
              onError={(e) => {
                // Fallback para quando a imagem não existe
                e.target.style.background = 'linear-gradient(135deg, var(--neon-blue), var(--neon-purple))'
                e.target.style.color = 'white'
                e.target.style.display = 'flex'
                e.target.style.alignItems = 'center'
                e.target.style.justifyContent = 'center'
                e.target.textContent = currentImage.name
              }}
            />
            <p 
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                letterSpacing: '0.5px',
                textAlign: 'center'
              }}
            >
              {currentImage.name}
            </p>
          </div>
        </div>

        <div className="game-controls">
          <motion.button
            className="control-button"
            style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 600,
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}
            onClick={shufflePuzzle}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaRedo />
            EMBARALHAR
          </motion.button>
          
          <motion.button
            className="control-button"
            style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 600,
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}
            onClick={changeImage}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaImage />
            TROCAR IMAGEM
          </motion.button>
        </div>

        {isComplete() && (
          <motion.div
            className="completion-message"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.3rem',
              fontWeight: 700,
              letterSpacing: '1px',
              textAlign: 'center'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            🎉 PARABÉNS! Você completou o quebra-cabeça em {moves} movimentos!
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default PuzzleGame