import React, { useEffect } from 'react'
import './ParticleBackground.css'

const ParticleBackground = () => {
  useEffect(() => {
    const createParticle = () => {
      const particle = document.createElement('div')
      particle.className = 'particle'
      
      // Random position
      particle.style.left = Math.random() * 100 + '%'
      particle.style.top = Math.random() * 100 + '%'
      
      // Random size
      const size = Math.random() * 4 + 1
      particle.style.width = size + 'px'
      particle.style.height = size + 'px'
      
      // Random color
      const colors = ['#00d4ff', '#b829ff', '#39ff14', '#ff1493']
      particle.style.background = colors[Math.floor(Math.random() * colors.length)]
      
      // Random animation duration
      particle.style.animationDuration = (Math.random() * 20 + 10) + 's'
      
      document.querySelector('.particles-container').appendChild(particle)
      
      // Remove particle after animation
      setTimeout(() => {
        particle.remove()
      }, 30000)
    }

    // Create initial particles
    for (let i = 0; i < 50; i++) {
      setTimeout(() => createParticle(), i * 200)
    }

    // Create new particles periodically
    const interval = setInterval(createParticle, 2000)

    return () => clearInterval(interval)
  }, [])

  return <div className="particles-container"></div>
}

export default ParticleBackground