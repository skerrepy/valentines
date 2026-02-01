import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'

const flowers = ['🌸', '🌺', '🌻', '🌷', '🌹', '💐', '🌼', '🏵️', '🌿', '🍀']

const questionText = "Tamara would you be my valentine's date ?"

export default function QuestionPage() {
  const navigate = useNavigate()
  const noButtonRef = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [flowersPositions, setFlowersPositions] = useState([])
  const [showPopover, setShowPopover] = useState(false)
  const [displayedText, setDisplayedText] = useState('')
  const [cursorVisible, setCursorVisible] = useState(true)

  useEffect(() => {
    // Generate random flower positions
    const positions = Array.from({ length: 30 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      emoji: flowers[Math.floor(Math.random() * flowers.length)],
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2,
    }))
    setFlowersPositions(positions)
  }, [])

  // Typewriter effect
  useEffect(() => {
    if (displayedText.length < questionText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(questionText.slice(0, displayedText.length + 1))
      }, 100) // Typing speed - adjust for faster/slower
      return () => clearTimeout(timeout)
    } else {
      // Hide cursor after typing is complete
      const cursorTimeout = setTimeout(() => {
        setCursorVisible(false)
      }, 1000)
      return () => clearTimeout(cursorTimeout)
    }
  }, [displayedText])

  // Blinking cursor effect - only while typing
  useEffect(() => {
    const isTyping = displayedText.length < questionText.length
    if (!isTyping) {
      // Hide cursor after a brief delay when typing is complete
      const hideTimeout = setTimeout(() => setCursorVisible(false), 1000)
      return () => clearTimeout(hideTimeout)
    }
    
    // Blink cursor while typing
    const interval = setInterval(() => {
      setCursorVisible(prev => !prev)
    }, 530)
    return () => clearInterval(interval)
  }, [displayedText.length])

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (noButtonRef.current) {
        const button = noButtonRef.current
        const rect = button.getBoundingClientRect()
        const buttonCenterX = rect.left + rect.width / 2
        const buttonCenterY = rect.top + rect.height / 2
        
        const distance = Math.sqrt(
          Math.pow(e.clientX - buttonCenterX, 2) + 
          Math.pow(e.clientY - buttonCenterY, 2)
        )
        
        // If cursor is within 10px of the button, move it away
        if (distance < 10) {
          const angle = Math.atan2(
            e.clientY - buttonCenterY,
            e.clientX - buttonCenterX
          )
          
          // Move button in opposite direction - button stays where it moves
          const moveDistance = 200 + Math.random() * 100
          const newX = position.x + Math.cos(angle + Math.PI) * moveDistance
          const newY = position.y + Math.sin(angle + Math.PI) * moveDistance
          
          setPosition({ x: newX, y: newY })
        }
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [position])

  const handleYesClick = () => {
    navigate('/success')
  }

  const handleNoClick = () => {
    setShowPopover(true)
    // Hide popover after 3 seconds
    setTimeout(() => {
      setShowPopover(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-green-900 to-green-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated flower emojis in the background */}
      <div className="absolute inset-0 pointer-events-none">
        {flowersPositions.map((flower, index) => (
          <div
            key={index}
            className="absolute text-4xl md:text-5xl"
            style={{
              left: `${flower.x}%`,
              top: `${flower.y}%`,
              animation: `float ${flower.duration}s ease-in-out infinite`,
              animationDelay: `${flower.delay}s`,
            }}
          >
            {flower.emoji}
          </div>
        ))}
      </div>

      {/* Main card */}
      <div className="bg-white rounded-3xl shadow-2xl p-12 md:p-16 max-w-2xl w-full relative z-10 animate-fadeIn">
        <h1 className="text-4xl md:text-6xl font-bold text-center text-green-800 mb-12">
          {displayedText}
          {cursorVisible && <span className="animate-blink">|</span>}
        </h1>
        
        <div className="flex gap-6 justify-center items-center flex-wrap">
          <Button
            onClick={handleYesClick}
            className="px-12 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl text-2xl font-semibold shadow-lg transition-all duration-300 hover:scale-110 animate-pulse-slow"
          >
            Yes
          </Button>
          
          <div className="relative" style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
          }}>
            <Button
              ref={noButtonRef}
              onClick={handleNoClick}
              className="px-12 py-4 bg-red-600 hover:bg-red-500 text-white rounded-xl text-2xl font-semibold shadow-lg transition-all duration-300 relative"
              onMouseEnter={(e) => {
                // Additional escape on hover
                const randomX = position.x + (Math.random() - 0.5) * 400
                const randomY = position.y + (Math.random() - 0.5) * 400
                setPosition({ x: randomX, y: randomY })
              }}
            >
              No
            </Button>
            {showPopover && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 animate-popover">
                <div className="bg-pink-200 text-pink-800 px-6 py-3 rounded-xl shadow-lg border-2 border-pink-300 whitespace-nowrap text-xl font-semibold">
                  that's not an option 💕
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                  <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-pink-300"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }

        @keyframes blink {
          0%, 50% {
            opacity: 1;
          }
          51%, 100% {
            opacity: 0;
          }
        }

        .animate-blink {
          animation: blink 1s infinite;
        }

        .animate-pulse-slow {
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes popover {
          0% {
            opacity: 0;
            transform: translate(-50%, 10px);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -5px);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }

        .animate-popover {
          animation: popover 0.4s ease-out;
        }
      `}</style>
    </div>
  )
}
