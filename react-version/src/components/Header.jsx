import React from 'react'
import { motion } from 'framer-motion'
import { FaBrain } from 'react-icons/fa'

const Header = () => {
  return (
    <motion.header 
      className="header"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container">
        <motion.div 
          className="logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="logo-icon"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "linear" 
            }}
          >
            <FaBrain />
          </motion.div>
          <h1 className="logo-text" style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900 }}>
            <span className="text-gradient">GAME IA</span>
          </h1>
        </motion.div>
        
        <motion.p 
          className="subtitle"
          style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', letterSpacing: '0.5px' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Descubra o mundo da Inteligência Artificial de forma divertida!
        </motion.p>
      </div>
    </motion.header>
  )
}

export default Header