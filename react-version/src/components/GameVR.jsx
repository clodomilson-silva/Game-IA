import React, { Suspense, useState, useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { XR, VRButton, Controllers, Hands } from '@react-three/xr'
import { Environment, Text, Center, MeshWobbleMaterial, Sphere, PresentationControls, OrbitControls, Box } from '@react-three/drei'
import * as THREE from 'three'

// Componente do Menu Principal VR
const VRMainMenu = ({ onGameSelect, onExitVR }) => {
  const [hovered, setHovered] = useState(null)
  
  const MenuButton = ({ position, text, color, onClick, gameType }) => (
    <mesh 
      position={position}
      onClick={() => onClick(gameType)}
      onPointerEnter={() => setHovered(gameType)}
      onPointerLeave={() => setHovered(null)}
    >
      <boxGeometry args={[2, 0.8, 0.2]} />
      <meshStandardMaterial 
        color={hovered === gameType ? '#ff00ff' : color}
        emissive={hovered === gameType ? '#330033' : '#000011'}
        metalness={0.8}
        roughness={0.2}
      />
      <Text
        position={[0, 0, 0.11]}
        fontSize={0.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </mesh>
  )

  return (
    <group>
      {/* Título Principal */}
      <Text
        position={[0, 3, 0]}
        fontSize={0.8}
        color="#00ffff"
        anchorX="center"
        anchorY="middle"
      >
        GAME IA VR
      </Text>

      {/* Subtítulo */}
      <Text
        position={[0, 2, 0]}
        fontSize={0.25}
        color="#ff00ff"
        anchorX="center"
        anchorY="middle"
      >
        FEIRA DE TECNOLOGIA
      </Text>

      {/* Botões do Menu */}
      <MenuButton 
        position={[0, 0.5, 0]} 
        text="JOGO DA MEMÓRIA" 
        color="#0088ff"
        onClick={onGameSelect}
        gameType="memory"
      />
      
      <MenuButton 
        position={[0, -0.5, 0]} 
        text="QUEBRA-CABEÇA" 
        color="#ff8800"
        onClick={onGameSelect}
        gameType="puzzle"
      />
      
      <MenuButton 
        position={[0, -1.5, 0]} 
        text="QUIZ IA" 
        color="#88ff00"
        onClick={onGameSelect}
        gameType="quiz"
      />

      <MenuButton 
        position={[0, -2.5, 0]} 
        text="SAIR VR" 
        color="#ff0088"
        onClick={onExitVR}
        gameType="exit"
      />

      {/* Esferas decorativas */}
      <Sphere position={[-4, 2, -2]} args={[0.5]}>
        <MeshWobbleMaterial factor={1} speed={2} color="#ff00ff" />
      </Sphere>
      
      <Sphere position={[4, 1, -2]} args={[0.3]}>
        <MeshWobbleMaterial factor={1.5} speed={3} color="#00ffff" />
      </Sphere>
      
      <Sphere position={[-3, -1, -3]} args={[0.4]}>
        <MeshWobbleMaterial factor={0.8} speed={1.5} color="#ffff00" />
      </Sphere>
    </group>
  )
}

// Componente do Jogo da Memória VR
const VRMemoryGame = ({ onBack }) => {
  const [cards, setCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [matchedCards, setMatchedCards] = useState([])
  const [moves, setMoves] = useState(0)

  // Dados das cartas
  const cardData = [
    { id: 1, tech: 'React', color: '#61dafb' },
    { id: 2, tech: 'Python', color: '#3776ab' },
    { id: 3, tech: 'Docker', color: '#2496ed' },
    { id: 4, tech: 'AI/ML', color: '#ff6b35' },
    { id: 5, tech: 'Node.js', color: '#339933' },
    { id: 6, tech: 'MongoDB', color: '#47a248' }
  ]

  useEffect(() => {
    // Criar pares de cartas
    const gameCards = []
    cardData.forEach((card, index) => {
      gameCards.push({ ...card, uniqueId: `${card.id}-a`, isFlipped: false })
      gameCards.push({ ...card, uniqueId: `${card.id}-b`, isFlipped: false })
    })
    
    // Embaralhar
    const shuffled = gameCards.sort(() => Math.random() - 0.5)
    setCards(shuffled)
  }, [])

  const flipCard = (cardIndex) => {
    if (flippedCards.length >= 2 || cards[cardIndex].isFlipped) return

    const newCards = [...cards]
    newCards[cardIndex].isFlipped = true
    setCards(newCards)

    const newFlipped = [...flippedCards, cardIndex]
    setFlippedCards(newFlipped)

    if (newFlipped.length === 2) {
      setMoves(prev => prev + 1)
      
      setTimeout(() => {
        const [first, second] = newFlipped
        if (cards[first].id === cards[second].id) {
          // Match!
          setMatchedCards(prev => [...prev, first, second])
        } else {
          // No match
          const resetCards = [...newCards]
          resetCards[first].isFlipped = false
          resetCards[second].isFlipped = false
          setCards(resetCards)
        }
        setFlippedCards([])
      }, 1500)
    }
  }

  const MemoryCard = ({ card, index, position }) => {
    const isMatched = matchedCards.includes(index)
    const isFlipped = card.isFlipped || isMatched

    return (
      <mesh 
        position={position}
        onClick={() => flipCard(index)}
        rotation={isFlipped ? [0, 0, 0] : [0, Math.PI, 0]}
      >
        <boxGeometry args={[0.8, 1.2, 0.05]} />
        <meshStandardMaterial 
          color={isFlipped ? card.color : '#333333'}
          emissive={isMatched ? '#003300' : '#000000'}
          metalness={0.1}
          roughness={0.7}
        />
        {isFlipped && (
          <Text
            position={[0, 0, 0.026]}
            fontSize={0.12}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            {card.tech}
          </Text>
        )}
        {!isFlipped && (
          <Text
            position={[0, 0, 0.026]}
            fontSize={0.2}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            ?
          </Text>
        )}
      </mesh>
    )
  }

  return (
    <group>
      <Text
        position={[0, 3, 0]}
        fontSize={0.3}
        color="#00ffff"
        anchorX="center"
        anchorY="middle"
      >
        JOGO DA MEMÓRIA VR
      </Text>

      <Text
        position={[0, 2.5, 0]}
        fontSize={0.15}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        Movimentos: {moves}
      </Text>

      {/* Grid de cartas */}
      {cards.map((card, index) => {
        const row = Math.floor(index / 4)
        const col = index % 4
        const x = (col - 1.5) * 1
        const y = (1.5 - row) * 1.5
        
        return (
          <MemoryCard
            key={card.uniqueId}
            card={card}
            index={index}
            position={[x, y, 0]}
          />
        )
      })}

      {/* Botão Voltar */}
      <mesh position={[0, -2.5, 0]} onClick={onBack}>
        <boxGeometry args={[1.5, 0.5, 0.1]} />
        <meshStandardMaterial color="#ff0088" />
        <Text
          position={[0, 0, 0.06]}
          fontSize={0.15}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          VOLTAR
        </Text>
      </mesh>
    </group>
  )
}

// Componente principal VR
const VRGameApp = ({ currentGame, onGameSelect, onBack, onExitVR }) => {
  return (
    <Suspense fallback={null}>
      <Environment preset="city" />
      
      {/* Iluminação */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} color="#00ffff" intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#ff00ff" intensity={0.5} />
      
      {/* Controladores VR */}
      <Controllers />
      <Hands />
      
      {/* Renderizar jogo atual */}
      {currentGame === 'menu' && (
        <VRMainMenu onGameSelect={onGameSelect} onExitVR={onExitVR} />
      )}
      
      {currentGame === 'memory' && (
        <VRMemoryGame onBack={onBack} />
      )}
      
      {currentGame === 'puzzle' && (
        <group>
          <Text position={[0, 0, 0]} fontSize={0.5} color="#ffffff">
            QUEBRA-CABEÇA VR
          </Text>
          <Text position={[0, -1, 0]} fontSize={0.2} color="#ffff00">
            EM DESENVOLVIMENTO
          </Text>
          <mesh position={[0, -2, 0]} onClick={onBack}>
            <boxGeometry args={[1.5, 0.5, 0.1]} />
            <meshStandardMaterial color="#ff0088" />
            <Text
              position={[0, 0, 0.06]}
              fontSize={0.15}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
            >
              VOLTAR
            </Text>
          </mesh>
        </group>
      )}
    </Suspense>
  )
}

// Componente principal de VR com fallback para desktop
const GameVR = () => {
  const [currentGame, setCurrentGame] = useState('menu')
  const [isVRMode, setIsVRMode] = useState(false)

  const handleGameSelect = (game) => {
    setCurrentGame(game)
  }

  const handleBack = () => {
    setCurrentGame('menu')
  }

  const handleExitVR = () => {
    setIsVRMode(false)
    setCurrentGame('menu')
  }

  const handleEnterVR = () => {
    setIsVRMode(true)
  }

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000011' }}>
      {!isVRMode ? (
        // Interface para entrar no VR
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '100%',
          color: '#ffffff',
          fontFamily: 'var(--font-heading)'
        }}>
          <h1 style={{ color: '#00ffff', fontSize: '3rem', marginBottom: '2rem' }}>
            🥽 GAME IA VR
          </h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '3rem', textAlign: 'center' }}>
            Experiência imersiva para HTC Vive Cosmos Elite
          </p>
          
          <button
            onClick={handleEnterVR}
            style={{
              padding: '1rem 2rem',
              fontSize: '1.5rem',
              background: 'linear-gradient(45deg, #ff00ff, #00ffff)',
              border: 'none',
              borderRadius: '10px',
              color: '#ffffff',
              cursor: 'pointer',
              marginBottom: '1rem'
            }}
          >
            🚀 ENTRAR NO VR
          </button>
          
          <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
            Certifique-se de que o HTC Vive Cosmos Elite esteja conectado
          </p>
        </div>
      ) : (
        // Canvas VR simplificado para melhor compatibilidade
        <Canvas 
          camera={{ position: [0, 1.6, 3], fov: 75 }} 
          style={{ background: '#000011' }}
        >
          <XR
            onSessionStart={() => {
              console.log('XR Session Started')
              setIsVRMode(true)
            }}
            onSessionEnd={() => {
              console.log('XR Session Ended')
              setIsVRMode(false)
            }}
          >
            <VRGameApp 
              currentGame={currentGame}
              onGameSelect={handleGameSelect}
              onBack={handleBack}
              onExitVR={handleExitVR}
            />
          </XR>
        </Canvas>
      )}
      
      {/* Botão VR (sempre visível para ativar WebXR) */}
      <VRButton 
        onSessionStart={() => {
          console.log('VR Session iniciada!')
          setIsVRMode(true)
        }}
        onSessionEnd={() => {
          console.log('VR Session finalizada!')
          setIsVRMode(false)
        }}
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '12px 24px',
          fontSize: '16px',
          background: isVRMode ? '#00ff00' : '#ff00ff',
          border: 'none',
          borderRadius: '8px',
          color: '#ffffff',
          cursor: 'pointer',
          fontWeight: 'bold',
          zIndex: 1000,
          boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
        }}
      >
        {isVRMode ? 'VR ATIVO' : 'ENTRAR EM VR'}
      </VRButton>
    </div>
  )
}

export default GameVR