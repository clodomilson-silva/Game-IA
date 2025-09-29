import React, { useState, Suspense, lazy } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import MainMenu from './components/MainMenu'
// Lazy loading para melhor performance
const MemoryGame = lazy(() => import('./components/MemoryGameSimple'))
const PuzzleGame = lazy(() => import('./components/PuzzleGame'))
const QuizGame = lazy(() => import('./components/QuizGame'))
import ParticleBackground from './components/ParticleBackground'
import './App.css'

// Componente de loading
const LoadingSpinner = () => (
  <motion.div
    className="loading-container"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '50vh',
      flexDirection: 'column',
      gap: '1rem'
    }}
  >
    <motion.div
      className="loading-spinner"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      style={{
        width: '40px',
        height: '40px',
        border: '3px solid rgba(138, 43, 226, 0.3)',
        borderTop: '3px solid var(--neon-purple)',
        borderRadius: '50%'
      }}
    />
    <p style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-ui)' }}>
      Carregando...
    </p>
  </motion.div>
)

function App() {
  const [currentGame, setCurrentGame] = useState('menu')

  const gameComponents = {
    menu: <MainMenu onGameSelect={setCurrentGame} />,
    memory: (
      <Suspense fallback={<LoadingSpinner />}>
        <MemoryGame onBack={() => setCurrentGame('menu')} />
      </Suspense>
    ),
    puzzle: (
      <Suspense fallback={<LoadingSpinner />}>
        <PuzzleGame onBack={() => setCurrentGame('menu')} />
      </Suspense>
    ),
    quiz: (
      <Suspense fallback={<LoadingSpinner />}>
        <QuizGame onBack={() => setCurrentGame('menu')} />
      </Suspense>
    )
  }

  return (
    <div className="app">
      <ParticleBackground />
      <Header />
      
      <main className="main-content">
        <div className="container">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentGame}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {gameComponents[currentGame]}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}

export default App