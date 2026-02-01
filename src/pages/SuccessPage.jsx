import { useState, useEffect } from 'react'

const flowers = ['🌸', '🌺', '🌻', '🌷', '🌹', '💐', '🌼', '🏵️', '🌿', '🍀']

export default function SuccessPage() {
  const [flowersPositions, setFlowersPositions] = useState([])

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
        <div className="text-center">
          <div className="mb-8">
            <span 
              className="inline-block text-9xl md:text-[12rem]"
              style={{
                animation: 'heartbeat 1.5s ease-in-out infinite',
              }}
            >
              ❤️
            </span>
          </div>
          <p className="text-2xl md:text-4xl font-bold text-green-800 animate-slideDown">
            thank you my beautiful princess for being my date & i love you so much you are my everything & i adore u
          </p>
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

        @keyframes heartbeat {
          0%, 100% {
            transform: scale(1);
          }
          10%, 30% {
            transform: scale(1.1);
          }
          20%, 40% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.15);
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

        .animate-slideDown {
          animation: slideDown 1s ease-out 0.3s both;
        }
      `}</style>
    </div>
  )
}
