import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaArrowLeft, FaRedo, FaTrophy } from 'react-icons/fa'

const QuizGame = ({ onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [score, setScore] = useState(0)
  const [isAnswered, setIsAnswered] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  const questions = [
    {
      question: "O que é Inteligência Artificial?",
      options: [
        "Um tipo de computador muito rápido",
        "A capacidade de máquinas simularem a inteligência humana",
        "Um programa de edição de imagens",
        "Uma linguagem de programação"
      ],
      correct: 1,
      explanation: "Inteligência Artificial é a capacidade de máquinas de simular a inteligência humana para realizar tarefas."
    },
    {
      question: "Qual destas é uma aplicação comum de IA no dia a dia?",
      options: [
        "Assistentes virtuais como Siri e Alexa",
        "Calculadoras simples",
        "Editores de texto básicos",
        "Relógios digitais"
      ],
      correct: 0,
      explanation: "Assistentes virtuais usam IA para entender e responder comandos de voz."
    },
    {
      question: "O que é Machine Learning?",
      options: [
        "Ensinar máquinas a funcionarem",
        "Um tipo de algoritmo que aprende com dados",
        "Programar computadores manualmente",
        "Reparar equipamentos"
      ],
      correct: 1,
      explanation: "Machine Learning é quando algoritmos aprendem e melhoram automaticamente através da experiência com dados."
    },
    {
      question: "Onde você pode encontrar IA no seu smartphone?",
      options: [
        "Apenas na bateria",
        "No reconhecimento facial e assistentes de voz",
        "Somente no carregador",
        "Apenas na tela"
      ],
      correct: 1,
      explanation: "Smartphones usam IA para reconhecimento facial, assistentes de voz, recomendações de apps e muito mais."
    },
    {
      question: "O que são dados em IA?",
      options: [
        "Apenas números",
        "Informações usadas para treinar algoritmos",
        "Códigos secretos",
        "Apenas textos"
      ],
      correct: 1,
      explanation: "Dados são informações (números, textos, imagens, etc.) usadas para treinar e melhorar algoritmos de IA."
    }
  ]

  const selectAnswer = (answerIndex) => {
    if (isAnswered) return

    setSelectedAnswer(answerIndex)
    setIsAnswered(true)
    
    if (answerIndex === questions[currentQuestion].correct) {
      setScore(prev => prev + 1)
    }
    
    // Mostrar explicação após um delay
    setTimeout(() => {
      setShowExplanation(true)
    }, 1000)
  }

  const nextQuestion = () => {
    if (currentQuestion + 1 >= questions.length) {
      setGameComplete(true)
    } else {
      setCurrentQuestion(prev => prev + 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
      setShowExplanation(false)
    }
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setScore(0)
    setIsAnswered(false)
    setGameComplete(false)
    setShowExplanation(false)
  }

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100
    if (percentage >= 80) return '🏆 Excelente! Você é um expert em IA!'
    if (percentage >= 60) return '👍 Muito bem! Você tem um bom conhecimento sobre IA!'
    if (percentage >= 40) return '📚 Bom trabalho! Continue aprendendo sobre IA!'
    return '💪 Continue estudando! A IA é fascinante!'
  }

  const currentQ = questions[currentQuestion]

  if (gameComplete) {
    return (
      <div className="quiz-game">
        <div className="game-container">
          <motion.div
            className="quiz-result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="result-icon"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <FaTrophy />
            </motion.div>
            
            <h3>Resultado Final</h3>
            
            <div className="final-score">
              {score}/{questions.length}
            </div>
            
            <p className="score-message">{getScoreMessage()}</p>
            
            <div className="result-buttons">
              <motion.button
                className="btn btn-primary"
                onClick={restartQuiz}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaRedo />
                Jogar Novamente
              </motion.button>
              
              <motion.button
                className="btn btn-secondary"
                onClick={onBack}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Menu Principal
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="quiz-game">
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
            QUIZ SOBRE IA
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
              QUESTÃO: <span className="score">{currentQuestion + 1}/{questions.length}</span>
            </div>
            <div 
              className="score-item"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                letterSpacing: '1px'
              }}
            >
              PONTUAÇÃO: <span className="score">{score}</span>
            </div>
          </div>
        </div>

        <motion.div 
          className="quiz-content"
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="question-section">
            <h3 
              className="question-text"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.5rem',
                fontWeight: 600,
                letterSpacing: '0.8px',
                lineHeight: '1.4'
              }}
            >
              {currentQ.question}
            </h3>
          </div>

          <div className="options-section">
            {currentQ.options.map((option, index) => (
              <motion.button
                key={index}
                className={`quiz-option ${selectedAnswer === index ? 'selected' : ''} ${
                  isAnswered && index === currentQ.correct ? 'correct' : ''
                } ${
                  isAnswered && selectedAnswer === index && index !== currentQ.correct ? 'incorrect' : ''
                }`}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  fontWeight: 500,
                  letterSpacing: '0.5px',
                  textAlign: 'left'
                }}
                onClick={() => selectAnswer(index)}
                disabled={isAnswered}
                whileHover={!isAnswered ? { 
                  scale: 1.02,
                  x: 10
                } : {}}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {option}
              </motion.button>
            ))}
          </div>

          <AnimatePresence>
            {showExplanation && (
              <motion.div
                className="explanation"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  letterSpacing: '0.5px',
                  lineHeight: '1.5'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <strong style={{ fontFamily: 'var(--font-heading)' }}>EXPLICAÇÃO:</strong> {currentQ.explanation}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="quiz-controls">
            <motion.button
              className="next-button"
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '1rem',
                fontWeight: 700,
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}
              onClick={nextQuestion}
              disabled={!isAnswered}
              whileHover={isAnswered ? { scale: 1.1 } : {}}
              whileTap={isAnswered ? { scale: 0.9 } : {}}
            >
              {currentQuestion + 1 >= questions.length ? 'VER RESULTADO' : 'PRÓXIMA QUESTÃO'}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default QuizGame