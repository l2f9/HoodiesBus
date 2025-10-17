'use client';

import { useRef, useState } from 'react';

interface Design {
  id: string;
  url: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
}

interface HoodieCanvas2DProps {
  color?: string;
  fabric?: string;
  view?: 'front' | 'back';
  onDesignAdd?: (design: Design) => void;
}

export default function HoodieCanvas2D({
  color = '#ffffff',
  fabric = 'cotton',
  view = 'front',
}: HoodieCanvas2DProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [designs, setDesigns] = useState<Design[]>([]);
  const [selectedDesign, setSelectedDesign] = useState<string | null>(null);

  // Fabric texture patterns
  const getFabricPattern = (fabric: string) => {
    const patterns = {
      cotton: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9InBhdHRlcm4iIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSJyZ2JhKDAsMCwwLDAuMDIpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9InVybCgjcGF0dGVybikiLz48L3N2Zz4=',
      fleece: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9InBhdHRlcm4iIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSJyZ2JhKDAsMCwwLDAuMDUpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9InVybCgjcGF0dGVybikiLz48L3N2Zz4=',
      'french-terry': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9InBhdHRlcm4iIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSJyZ2JhKDAsMCwwLDAuMDEpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9InVybCgjcGF0dGVybikiLz48L3N2Zz4=',
      polyester: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9InBhdHRlcm4iIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9InVybCgjcGF0dGVybikiLz48L3N2Zz4=',
    };
    return patterns[fabric as keyof typeof patterns] || patterns.cotton;
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center p-8">
      <div
        ref={canvasRef}
        className="relative w-full max-w-2xl aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl"
        style={{
          backgroundColor: color,
          backgroundImage: `url("${getFabricPattern(fabric)}")`,
          backgroundSize: '20px 20px',
        }}
      >
        {/* Hoodie Template SVG Overlay */}
        <svg
          viewBox="0 0 400 600"
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.1))' }}
        >
          {/* Front View Template */}
          {view === 'front' && (
            <g className="opacity-20 stroke-current text-gray-900" strokeWidth="2" fill="none">
              {/* Body outline */}
              <path
                d="M 100 120
                   L 100 450
                   Q 100 480 120 480
                   L 280 480
                   Q 300 480 300 450
                   L 300 120
                   Q 300 100 280 100
                   L 250 100
                   Q 245 90 240 85
                   Q 235 80 230 80
                   L 170 80
                   Q 165 80 160 85
                   Q 155 90 150 100
                   L 120 100
                   Q 100 100 100 120 Z"
                fill="rgba(255,255,255,0.05)"
              />

              {/* Hood */}
              <ellipse cx="200" cy="60" rx="60" ry="40" fill="rgba(255,255,255,0.03)" />

              {/* Sleeves */}
              <path d="M 100 120 L 40 200 L 60 350 L 100 300" fill="rgba(255,255,255,0.03)" />
              <path d="M 300 120 L 360 200 L 340 350 L 300 300" fill="rgba(255,255,255,0.03)" />

              {/* Kangaroo pocket */}
              <rect x="130" y="280" width="140" height="100" rx="10" fill="rgba(0,0,0,0.05)" />

              {/* Drawstring */}
              <circle cx="180" cy="95" r="3" fill="rgba(100,100,100,0.3)" />
              <circle cx="220" cy="95" r="3" fill="rgba(100,100,100,0.3)" />
              <path d="M 180 95 Q 200 105 220 95" stroke="rgba(100,100,100,0.3)" strokeWidth="1.5" fill="none" />

              {/* Ribbed hem lines */}
              <line x1="120" y1="470" x2="280" y2="470" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
              <line x1="120" y1="475" x2="280" y2="475" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />

              {/* Cuff lines */}
              <line x1="50" y1="340" x2="70" y2="340" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
              <line x1="50" y1="345" x2="70" y2="345" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
              <line x1="330" y1="340" x2="350" y2="340" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
              <line x1="330" y1="345" x2="350" y2="345" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
            </g>
          )}

          {/* Back View Template */}
          {view === 'back' && (
            <g className="opacity-20 stroke-current text-gray-900" strokeWidth="2" fill="none">
              {/* Body outline - similar to front but no pocket */}
              <path
                d="M 100 120
                   L 100 450
                   Q 100 480 120 480
                   L 280 480
                   Q 300 480 300 450
                   L 300 120
                   Q 300 100 280 100
                   L 250 100
                   L 250 85
                   L 230 80
                   L 170 80
                   L 150 85
                   L 150 100
                   L 120 100
                   Q 100 100 100 120 Z"
                fill="rgba(255,255,255,0.05)"
              />

              {/* Hood (back) */}
              <path d="M 140 100 Q 140 60 200 40 Q 260 60 260 100" fill="rgba(255,255,255,0.03)" />

              {/* Sleeves */}
              <path d="M 100 120 L 40 200 L 60 350 L 100 300" fill="rgba(255,255,255,0.03)" />
              <path d="M 300 120 L 360 200 L 340 350 L 300 300" fill="rgba(255,255,255,0.03)" />

              {/* Ribbed hem lines */}
              <line x1="120" y1="470" x2="280" y2="470" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
              <line x1="120" y1="475" x2="280" y2="475" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
            </g>
          )}
        </svg>

        {/* Design Area Label */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="text-center text-white/20 text-6xl font-bold">
            {view === 'front' ? 'FRONT' : 'BACK'}
          </div>
          <div className="text-center text-white/30 text-sm mt-2">
            Drop your design here
          </div>
        </div>

        {/* User Designs */}
        {designs.map((design) => (
          <div
            key={design.id}
            className={`absolute cursor-move ${
              selectedDesign === design.id ? 'ring-2 ring-purple-500' : ''
            }`}
            style={{
              left: `${design.x}%`,
              top: `${design.y}%`,
              width: `${design.width}%`,
              height: `${design.height}%`,
              transform: `rotate(${design.rotation}deg)`,
            }}
            onClick={() => setSelectedDesign(design.id)}
          >
            <img
              src={design.url}
              alt="Design"
              className="w-full h-full object-contain"
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* View Toggle */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="glass neon-border rounded-full p-2 flex gap-2">
          <button
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              view === 'front'
                ? 'cosmic-button text-white'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Front
          </button>
          <button
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              view === 'back'
                ? 'cosmic-button text-white'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
