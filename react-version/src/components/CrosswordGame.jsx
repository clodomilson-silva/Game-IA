import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaArrowLeft, FaRedo, FaLightbulb, FaCheck } from 'react-icons/fa'

const WordSearchGame = ({ onBack }) => {
  const wordsToFind = useMemo(() => [
    "JAVASCRIPT",
    "PYTHON", 
    "REACT",
    "HTML",
    "CSS",
    "NODE",
    "GIT",
    "API"
  ], [])

  const [grid, setGrid] = useState([])
  const [foundWords, setFoundWords] = useState(new Set())
  const [selectedCells, setSelectedCells] = useState([])
  const [isSelecting, setIsSelecting] = useState(false)
  const [currentSelection, setCurrentSelection] = useState([])
  const [score, setScore] = useState(0)
  const GRID_SIZE = 15

  // Gerar letras aleatórias
  const getRandomLetter = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    return letters[Math.floor(Math.random() * letters.length)]
  }

  // Verificar se posição está dentro do grid
  const isValidPosition = (row, col) => {
    return row >= 0 && row < GRID_SIZE && col >= 0 && col < GRID_SIZE
  }

  // Tentar colocar palavra no grid
  const tryPlaceWord = (grid, word, startRow, startCol, direction) => {
    const directions = {
      horizontal: [0, 1],
      vertical: [1, 0],
      diagonal: [1, 1],
      diagonalUp: [-1, 1]
    }
    
    const [rowDir, colDir] = directions[direction]
    
    // Verificar se a palavra cabe
    for (let i = 0; i < word.length; i++) {
      const row = startRow + (rowDir * i)
      const col = startCol + (colDir * i)
      
      if (!isValidPosition(row, col)) return false
      if (grid[row][col] !== '' && grid[row][col] !== word[i]) return false
    }
    
    // Colocar a palavra
    for (let i = 0; i < word.length; i++) {
      const row = startRow + (rowDir * i)
      const col = startCol + (colDir * i)
      grid[row][col] = word[i]
    }
    
    return true
  }

  // Criar grid de caça-palavras
  const createWordSearchGrid = useCallback(() => {
    const newGrid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(''))
    const directions = ['horizontal', 'vertical', 'diagonal', 'diagonalUp']
    
    // Tentar colocar cada palavra
    wordsToFind.forEach(word => {
      let placed = false
      let attempts = 0
      
      while (!placed && attempts < 100) {
        const direction = directions[Math.floor(Math.random() * directions.length)]
        const startRow = Math.floor(Math.random() * GRID_SIZE)
        const startCol = Math.floor(Math.random() * GRID_SIZE)
        
        if (tryPlaceWord(newGrid, word, startRow, startCol, direction)) {
          placed = true
        }
        attempts++
      }
    })
    
    // Preencher células vazias com letras aleatórias
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        if (newGrid[row][col] === '') {
          newGrid[row][col] = getRandomLetter()
        }
      }
    }
    
    return newGrid
  }, [wordsToFind])

  const initializeGame = useCallback(() => {
    const newGrid = createWordSearchGrid()
    setGrid(newGrid)
    setFoundWords(new Set())
    setSelectedCells([])
    setCurrentSelection([])
    setIsSelecting(false)
    setScore(0)
  }, [createWordSearchGrid])

  useEffect(() => {
    initializeGame()
  }, [initializeGame])

  const handleCellClick = (row, col) => {
    if (!isSelecting) {
      // Iniciar seleção
      setIsSelecting(true)
      setCurrentSelection([{ row, col }])
    }
  }

  const handleCellHover = (row, col) => {
    if (isSelecting && currentSelection.length > 0) {
      const start = currentSelection[0]
      const newSelection = getSelectionPath(start.row, start.col, row, col)
      setCurrentSelection(newSelection)
    }
  }

  const handleCellRelease = () => {
    if (isSelecting && currentSelection.length > 1) {
      checkSelectedWord()
    }
    setIsSelecting(false)
    setCurrentSelection([])
  }

  // Obter caminho de seleção (linha reta)
  const getSelectionPath = (startRow, startCol, endRow, endCol) => {
    const path = []
    const rowDiff = endRow - startRow
    const colDiff = endCol - startCol
    const steps = Math.max(Math.abs(rowDiff), Math.abs(colDiff))
    
    if (steps === 0) return [{ row: startRow, col: startCol }]
    
    const rowStep = rowDiff === 0 ? 0 : rowDiff / Math.abs(rowDiff)
    const colStep = colDiff === 0 ? 0 : colDiff / Math.abs(colDiff)
    
    // Verificar se é uma linha válida (horizontal, vertical ou diagonal)
    if (Math.abs(rowDiff) !== Math.abs(colDiff) && rowDiff !== 0 && colDiff !== 0) {
      return [{ row: startRow, col: startCol }]
    }
    
    for (let i = 0; i <= steps; i++) {
      path.push({
        row: startRow + (rowStep * i),
        col: startCol + (colStep * i)
      })
    }
    
    return path
  }

  // Verificar se a palavra selecionada é válida
  const checkSelectedWord = () => {
    const selectedLetters = currentSelection.map(cell => grid[cell.row][cell.col]).join('')
    const reversedLetters = selectedLetters.split('').reverse().join('')
    
    const foundWord = wordsToFind.find(word => 
      word === selectedLetters || word === reversedLetters
    )
    
    if (foundWord && !foundWords.has(foundWord)) {
      setFoundWords(prev => new Set([...prev, foundWord]))
      setSelectedCells(prev => [...prev, ...currentSelection])
      setScore(prev => prev + foundWord.length * 10)
    }
  }

  const isCellSelected = (row, col) => {
    return currentSelection.some(cell => cell.row === row && cell.col === col)
  }

  const isCellFound = (row, col) => {
    return selectedCells.some(cell => cell.row === row && cell.col === col)
  }

  if (grid.length === 0) {
    return (
      <div className="word-search-game">
        <div className="game-header">
          <button onClick={onBack} className="back-button">
            <FaArrowLeft /> Voltar
          </button>
          <h2>Carregando...</h2>
        </div>
      </div>
    )
  }

  return (
    <motion.div 
      className="word-search-game"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="game-header">
        <motion.button 
          onClick={onBack} 
          className="back-button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaArrowLeft /> Voltar
        </motion.button>
        
        <div className="game-title">
          <h2>Caça-Palavras Tech</h2>
          <div className="game-stats">
            <span>Pontuação: {score}</span>
            <span>Encontradas: {foundWords.size}/{wordsToFind.length}</span>
          </div>
        </div>
      </div>

      <div className="word-search-container">
        <div className="word-search-grid" 
             onMouseUp={handleCellRelease}
             onMouseLeave={handleCellRelease}>
          {grid.map((row, rowIndex) => (
            <div key={rowIndex} className="word-search-row">
              {row.map((letter, colIndex) => {
                const isSelected = isCellSelected(rowIndex, colIndex)
                const isFound = isCellFound(rowIndex, colIndex)
                
                return (
                  <motion.div
                    key={`${rowIndex}-${colIndex}`}
                    className={`word-search-cell ${isSelected ? 'selected' : ''} ${isFound ? 'found' : ''}`}
                    onMouseDown={() => handleCellClick(rowIndex, colIndex)}
                    onMouseEnter={() => handleCellHover(rowIndex, colIndex)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="cell-letter">{letter}</span>
                  </motion.div>
                )
              })}
            </div>
          ))}
        </div>

        <div className="words-list">
          <h3>Palavras para Encontrar</h3>
          <div className="words-grid">
            {wordsToFind.map(word => (
              <motion.div 
                key={word} 
                className={`word-item ${foundWords.has(word) ? 'found' : ''}`}
                whileHover={{ scale: 1.05 }}
              >
                {foundWords.has(word) && <FaCheck className="check-icon" />}
                <span>{word}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="game-controls">
        <motion.button 
          onClick={initializeGame}
          className="control-button restart-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaRedo /> Novo Jogo
        </motion.button>
        
        {foundWords.size === wordsToFind.length && (
          <motion.div 
            className="victory-message"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            🎉 Parabéns! Você encontrou todas as palavras!
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default WordSearchGame
