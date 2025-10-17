'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import AIChatModal from '@/components/ui/AIChatModal';
import Starfield from '@/components/ui/Starfield';
import CosmicDust from '@/components/ui/CosmicDust';

// Dynamically import 3D canvas
const HoodieCanvas = dynamic(() => import('@/components/3d/HoodieCanvas'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center glass rounded-3xl">
      <div className="text-center">
        <div className="text-6xl mb-4 animate-pulse-glow">👕</div>
        <div className="text-white text-xl gradient-text font-bold">Loading 3D Mockup...</div>
      </div>
    </div>
  ),
});

export default function DesignerPage() {
  const [hoodieColor, setHoodieColor] = useState('#ffffff');
  const [hoodieType, setHoodieType] = useState<'pullover' | 'zip-up' | 'oversized' | 'cropped' | 'athletic'>('pullover');
  const [fabric, setFabric] = useState<'cotton' | 'fleece' | 'french-terry' | 'polyester'>('cotton');
  const [frontText, setFrontText] = useState('');
  const [showAIChat, setShowAIChat] = useState(false);
  const [editMode, setEditMode] = useState(true);

  const colors = [
    { name: 'White', value: '#ffffff' },
    { name: 'Black', value: '#000000' },
    { name: 'Navy', value: '#001f3f' },
    { name: 'Red', value: '#FF4136' },
    { name: 'Pink', value: '#FF69B4' },
    { name: 'Purple', value: '#B10DC9' },
    { name: 'Green', value: '#2ECC40' },
    { name: 'Yellow', value: '#FFDC00' },
    { name: 'Orange', value: '#FF851B' },
    { name: 'Gray', value: '#AAAAAA' },
  ];

  const hoodieTypes = [
    { name: 'Pullover', value: 'pullover' as const },
    { name: 'Zip-Up', value: 'zip-up' as const },
    { name: 'Oversized', value: 'oversized' as const },
    { name: 'Cropped', value: 'cropped' as const },
    { name: 'Athletic', value: 'athletic' as const },
  ];

  const fabrics = [
    { name: 'Cotton (Soft & Breathable)', value: 'cotton' as const },
    { name: 'Fleece (Warm & Cozy)', value: 'fleece' as const },
    { name: 'French Terry (Lightweight)', value: 'french-terry' as const },
    { name: 'Polyester Blend (Athletic)', value: 'polyester' as const },
  ];

  return (
    <div className="min-h-screen relative text-white">
      {/* Galactic Background */}
      <Starfield />
      <CosmicDust />

      {/* Header */}
      <header className="relative z-20 glass border-b border-white/10 sticky top-0 backdrop-blur-2xl">
        <div className="container mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl font-bold">
              <span className="text-white">🚍</span> <span className="gradient-text">HoodiesBus</span>
            </h1>
            <div className="hidden md:block px-4 py-1 glass rounded-full neon-border">
              <span className="text-sm font-semibold text-purple-300">✨ Designer Studio</span>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowAIChat(!showAIChat)}
              className="cosmic-button px-6 py-3 rounded-xl font-bold transition-all hover:scale-105 flex items-center gap-2"
            >
              <span className="text-xl">🤖</span>
              <span className="hidden sm:inline">AI Assistant</span>
            </button>
            <button className="glass px-6 py-3 rounded-xl font-bold hover-lift transition-all border border-white/20 flex items-center gap-2">
              <span className="text-xl">💾</span>
              <span className="hidden sm:inline">Save</span>
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - 3D Canvas */}
          <div className="lg:col-span-2">
            <div className="glass neon-border rounded-3xl p-8 border-2 border-purple-500/30 relative overflow-hidden">
              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-purple-400/50 rounded-tl-3xl"></div>
              <div className="absolute top-0 right-0 w-20 h-20 border-r-2 border-t-2 border-pink-400/50 rounded-tr-3xl"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 border-l-2 border-b-2 border-blue-400/50 rounded-bl-3xl"></div>
              <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-purple-400/50 rounded-br-3xl"></div>

              <div className="aspect-square w-full relative">
                <HoodieCanvas
                  color={hoodieColor}
                  frontPrint={frontText}
                  editMode={editMode}
                />
              </div>

              {/* Quick Actions */}
              <div className="mt-8 flex gap-4 justify-center flex-wrap">
                <button
                  onClick={() => setEditMode(!editMode)}
                  className={`px-6 py-3 rounded-xl hover-lift transition-all border group ${
                    editMode
                      ? 'cosmic-button border-purple-500'
                      : 'glass border-white/20'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-xl">{editMode ? '✏️' : '👁️'}</span>
                    <span className="font-semibold">{editMode ? 'Edit Mode' : 'Preview'}</span>
                  </span>
                </button>
                <button className="glass px-6 py-3 rounded-xl hover-lift transition-all border border-white/20 group">
                  <span className="flex items-center gap-2">
                    <span className="text-xl group-hover:scale-125 transition-transform">📸</span>
                    <span className="font-semibold">Capture</span>
                  </span>
                </button>
                <button className="glass px-6 py-3 rounded-xl hover-lift transition-all border border-white/20 group">
                  <span className="flex items-center gap-2">
                    <span className="text-xl group-hover:scale-110 transition-transform">🎯</span>
                    <span className="font-semibold">AR View</span>
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel - Customization Controls */}
          <div className="space-y-6">
            {/* Hoodie Type */}
            <div className="glass neon-border rounded-2xl p-6 border border-purple-500/30 hover-lift transition-all">
              <h3 className="text-xl font-bold mb-5 gradient-text flex items-center gap-2">
                <span className="text-2xl">👕</span>
                Hoodie Type
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {hoodieTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setHoodieType(type.value)}
                    className={`px-4 py-3 rounded-xl transition-all font-semibold ${
                      hoodieType === type.value
                        ? 'cosmic-button'
                        : 'glass border border-white/20 hover:border-purple-400/50'
                    }`}
                  >
                    {type.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Picker */}
            <div className="glass neon-border rounded-2xl p-6 border border-purple-500/30 hover-lift transition-all">
              <h3 className="text-xl font-bold mb-5 gradient-text flex items-center gap-2">
                <span className="text-2xl">🎨</span>
                Base Color
              </h3>
              <div className="grid grid-cols-5 gap-3">
                {colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setHoodieColor(color.value)}
                    className={`w-14 h-14 rounded-full border-4 transition-all transform hover:scale-110 ${
                      hoodieColor === color.value
                        ? 'border-white scale-125 shadow-lg shadow-purple-500/50'
                        : 'border-white/30 hover:border-white/70'
                    }`}
                    style={{
                      backgroundColor: color.value,
                      boxShadow: hoodieColor === color.value ? `0 0 20px ${color.value}80` : 'none'
                    }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Fabric Selection */}
            <div className="glass neon-border rounded-2xl p-6 border border-purple-500/30 hover-lift transition-all">
              <h3 className="text-xl font-bold mb-5 gradient-text flex items-center gap-2">
                <span className="text-2xl">🧵</span>
                Fabric Type
              </h3>
              <select
                value={fabric}
                onChange={(e) => setFabric(e.target.value)}
                className="w-full px-4 py-3 glass border border-white/30 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all text-white font-semibold cursor-pointer"
              >
                {fabrics.map((f) => (
                  <option key={f.value} value={f.value} className="bg-gray-900">
                    {f.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Text Customization */}
            <div className="glass neon-border rounded-2xl p-6 border border-purple-500/30 hover-lift transition-all">
              <h3 className="text-xl font-bold mb-5 gradient-text flex items-center gap-2">
                <span className="text-2xl">✍️</span>
                Add Text & Graphics
              </h3>
              <input
                type="text"
                value={frontText}
                onChange={(e) => setFrontText(e.target.value)}
                placeholder="Enter text for front..."
                className="w-full px-4 py-3 glass border border-white/30 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all mb-3 text-white placeholder-white/50"
              />
              <button className="w-full cosmic-button px-4 py-3 rounded-xl font-bold transition-all hover:scale-105 flex items-center justify-center gap-2">
                <span className="text-xl">📤</span>
                <span>Upload Image</span>
              </button>
            </div>


            {/* Order Button */}
            <button className="w-full cosmic-button px-8 py-5 rounded-2xl font-bold text-xl transition-all transform hover:scale-105 shadow-2xl group">
              <span className="flex items-center justify-center gap-3">
                <span className="text-2xl">🛒</span>
                <span>Place Order - $49.99</span>
                <span className="text-2xl group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* AI Chat Modal */}
      <AIChatModal isOpen={showAIChat} onClose={() => setShowAIChat(false)} />
    </div>
  );
}
