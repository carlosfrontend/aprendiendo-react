import { useState, useEffect } from 'react'

const FollowMouse = () => {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  // pointermove
  useEffect(() => {
    const handleMove = (event) => {
      const { clientX, clientY } = event
      setPosition({ x: clientX, y: clientY })
    }
    if (enabled) {
      window.addEventListener('pointermove', handleMove)
    }

    return () => {
      setPosition({ x: 0, y: 0 })
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enabled, setPosition])

  useEffect(() => {
    document.body.classList.toggle('no-cursor', enabled)

    return () => {
      document.body.classList.remove('no-cursor')
    }
  }, [enabled])
  return (
    <>
      <div
        style={{
          position: 'absolute',
          border: '1px solid #fff',
          backgroundColor: 'rgba(0,0,0,0.5)',
          borderRadius: '50%',
          opacity: 0.8,
          pointerEvents: 'none',
          left: '-25px',
          top: '-25px',
          width: '40px',
          height: '40px',
          transform: `translate(${position.x}px, ${position.y}px)`
        }}
      />
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Desactivar' : 'Activar'} puntero
      </button>
    </>
  )
}

function App () {
  return (
    <main>
      <FollowMouse />
    </main>
  )
}

export default App
