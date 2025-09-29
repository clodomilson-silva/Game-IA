import React, { useState, useEffect, useRef } from 'react'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

const VRPuzzleGame = ({ onBack }) => {
  const [pieces, setPieces] = useState(Array.from({length: 9}, (_, i) => i))
  const [emptyIndex, setEmptyIndex] = useState(8)
  const [moves, setMoves] = useState(0)
  
  // Embaralhar quebra-cabeça
  useEffect(() => {
    const shufflePuzzle = () => {
      const newPieces = [...pieces]
      
      for (let i = 0; i < 200; i++) {
        const emptyPos = newPieces.indexOf(8)
        const row = Math.floor(emptyPos / 3)
        const col = emptyPos % 3
        const possibleMoves = []
        
        if (row > 0) possibleMoves.push(emptyPos - 3)
        if (row < 2) possibleMoves.push(emptyPos + 3)
        if (col > 0) possibleMoves.push(emptyPos - 1)
        if (col < 2) possibleMoves.push(emptyPos + 1)
        
        const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)]
        ;[newPieces[emptyPos], newPieces[randomMove]] = [newPieces[randomMove], newPieces[emptyPos]]
      }
      
      setPieces(newPieces)
      setEmptyIndex(newPieces.indexOf(8))
    }
    
    shufflePuzzle()
  }, [])

  const canMove = (index) => {
    const emptyPos = pieces.indexOf(8)
    const pieceRow = Math.floor(index / 3)
    const pieceCol = index % 3
    const emptyRow = Math.floor(emptyPos / 3)
    const emptyCol = emptyPos % 3
    
    return (
      (Math.abs(pieceRow - emptyRow) === 1 && pieceCol === emptyCol) ||
      (Math.abs(pieceCol - emptyCol) === 1 && pieceRow === emptyRow)
    )
  }

  const movePiece = (index) => {
    if (!canMove(index)) return
    
    const emptyPos = pieces.indexOf(8)
    const newPieces = [...pieces]
    ;[newPieces[emptyPos], newPieces[index]] = [newPieces[index], newPieces[emptyPos]]
    
    setPieces(newPieces)
    setEmptyIndex(index)
    setMoves(prev => prev + 1)
  }

  const isComplete = () => {
    return pieces.every((piece, index) => piece === index)
  }

  const PuzzlePiece = ({ piece, index, position }) => {
    const isEmpty = piece === 8
    const canMoveThisPiece = canMove(index)
    
    // Cores baseadas na posição correta
    const getColor = () => {
      if (isEmpty) return '#111111'
      if (piece === index) return '#00ff00' // Peça na posição correta
      if (canMoveThisPiece) return '#ffff00' // Peça que pode ser movida
      return '#ff6600' // Peça normal
    }

    return (
      <mesh 
        position={position}
        onClick={() => movePiece(index)}
        onPointerEnter={(e) => {
          e.object.material.emissive.setHex(canMoveThisPiece ? 0x003300 : 0x330000)
        }}
        onPointerLeave={(e) => {
          e.object.material.emissive.setHex(0x000000)
        }}
      >
        <boxGeometry args={[0.8, 0.8, 0.1]} />
        <meshStandardMaterial 
          color={getColor()}
          emissive="#000000"
          metalness={0.3}
          roughness={0.7}
          transparent={isEmpty}
          opacity={isEmpty ? 0.3 : 1}
        />
        
        {!isEmpty && (
          <Text
            position={[0, 0, 0.06]}
            fontSize={0.3}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            {piece + 1}
          </Text>
        )}
        
        {isEmpty && (
          <Text
            position={[0, 0, 0.06]}
            fontSize={0.15}
            color="#666666"
            anchorX="center"
            anchorY="middle"
          >
            VAZIO
          </Text>
        )}
      </mesh>
    )
  }

  return (
    <group>
      {/* Título */}
      <Text
        position={[0, 3, 0]}
        fontSize={0.3}
        color="#00ffff"
        anchorX="center"
        anchorY="middle"
      >
        QUEBRA-CABEÇA VR
      </Text>

      {/* Informações do jogo */}
      <Text
        position={[0, 2.5, 0]}
        fontSize={0.15}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        Movimentos: {moves}
      </Text>

      {/* Status do jogo */}
      {isComplete() && (
        <Text
          position={[0, 2, 0]}
          fontSize={0.2}
          color="#00ff00"
          anchorX="center"
          anchorY="middle"
        >
          🎉 PARABÉNS! PUZZLE COMPLETO! 🎉
        </Text>
      )}

      {/* Grid do quebra-cabeça 3x3 */}
      {pieces.map((piece, index) => {
        const row = Math.floor(index / 3)
        const col = index % 3
        const x = (col - 1) * 0.9
        const y = (1 - row) * 0.9
        
        return (
          <PuzzlePiece
            key={index}
            piece={piece}
            index={index}
            position={[x, y, 0]}
          />
        )
      })}

      {/* Instruções */}
      <Text
        position={[0, -2, 0]}
        fontSize={0.12}
        color="#cccccc"
        anchorX="center"
        anchorY="middle"
      >
        Aponte e clique nas peças amarelas para movê-las
      </Text>

      {/* Botão Embaralhar */}
      <mesh position={[-2.5, -2.8, 0]} onClick={() => window.location.reload()}>
        <boxGeometry args={[1.8, 0.4, 0.1]} />
        <meshStandardMaterial color="#0088ff" />
        <Text
          position={[0, 0, 0.06]}
          fontSize={0.12}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          EMBARALHAR
        </Text>
      </mesh>

      {/* Botão Voltar */}
      <mesh position={[2.5, -2.8, 0]} onClick={onBack}>
        <boxGeometry args={[1.8, 0.4, 0.1]} />
        <meshStandardMaterial color="#ff0088" />
        <Text
          position={[0, 0, 0.06]}
          fontSize={0.12}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          VOLTAR
        </Text>
      </mesh>

      {/* Efeitos visuais */}
      <pointLight position={[0, 0, 2]} color="#ffffff" intensity={0.5} />
      <pointLight position={[3, 3, 1]} color="#00ffff" intensity={0.3} />
      <pointLight position={[-3, -3, 1]} color="#ff00ff" intensity={0.3} />
    </group>
  )
}

export default VRPuzzleGame