import React from 'react'
import { motion } from 'framer-motion'
import { FaMemory, FaPuzzlePiece, FaQuestionCircle, FaSearch } from 'react-icons/fa'

const MainMenu = ({ onGameSelect }) => {
  const games = [
    {
      id: 'memory',
      title: 'Jogo da Memória',
      description: 'Combine pares de conceitos de IA e suas aplicações',
      icon: <FaMemory />,
      color: 'var(--neon-blue)',
      glow: 'var(--glow-blue)'
    },
    {
      id: 'puzzle',
      title: 'Quebra-Cabeça',
      description: 'Monte imagens relacionadas ao mundo da IA',
      icon: <FaPuzzlePiece />,
      color: 'var(--neon-purple)',
      glow: 'var(--glow-purple)'
    },
    {
      id: 'quiz',
      title: 'Quiz IA',
      description: 'Teste seus conhecimentos sobre inteligência artificial',
      icon: <FaQuestionCircle />,
      color: 'var(--neon-green)',
      glow: 'var(--glow-green)'
    },
    {
      id: 'crossword',
      title: 'Caça-Palavras',
      description: 'Encontre palavras de tecnologia escondidas no grid de letras',
      icon: <FaSearch />,
      color: 'var(--neon-orange)',
      glow: 'var(--glow-orange)'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  }

  return (
    <motion.div 
      className="main-menu"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2 
        className="menu-title"
        style={{ 
          fontFamily: 'var(--font-heading)', 
          fontSize: '2.5rem', 
          fontWeight: 700,
          letterSpacing: '2px',
          textTransform: 'uppercase'
        }}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        Escolha seu <span className="text-gradient">JOGO</span>
      </motion.h2>
      
      <motion.div className="games-grid">
        {games.map((game, index) => (
          <motion.div
            key={game.id}
            className="game-card"
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05,
              y: -10,
              transition: { type: "spring", stiffness: 300 }
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onGameSelect(game.id)}
            style={{
              '--game-color': game.color,
              '--game-glow': game.glow
            }}
          >
            <motion.div 
              className="game-icon"
              whileHover={{ 
                rotate: [0, -10, 10, 0],
                scale: 1.1
              }}
              transition={{ duration: 0.5 }}
            >
              {game.icon}
            </motion.div>
            
            <h3 
              className="game-title"
              style={{ 
                fontFamily: 'var(--font-heading)', 
                fontSize: '1.4rem',
                fontWeight: 600,
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}
            >
              {game.title}
            </h3>
            <p 
              className="game-description"
              style={{ 
                fontFamily: 'var(--font-body)', 
                fontSize: '0.95rem',
                letterSpacing: '0.5px'
              }}
            >
              {game.description}
            </p>
            
            <motion.button 
              className="play-button"
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '1rem',
                fontWeight: 700,
                letterSpacing: '1.5px',
                textTransform: 'uppercase'
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <span>JOGAR</span>
              <motion.div
                className="button-glow"
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.button>
            
            <motion.div
              className="card-glow"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default MainMenu