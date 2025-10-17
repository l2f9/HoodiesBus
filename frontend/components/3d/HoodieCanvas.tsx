'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import { Suspense } from 'react';
import * as THREE from 'three';
import { EffectComposer, Bloom, DepthOfField, Vignette, SSAO } from '@react-three/postprocessing';
import HoodieModel from './HoodieModel';

interface HoodieCanvasProps {
  color?: string;
  texture?: string;
  frontPrint?: string;
  backPrint?: string;
  onModelLoad?: () => void;
  editMode?: boolean;
}

export default function HoodieCanvas({
  color = '#ffffff',
  texture,
  frontPrint,
  backPrint,
  onModelLoad,
  editMode = true,
}: HoodieCanvasProps) {
  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg overflow-hidden shadow-2xl">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
      >
        <Suspense fallback={null}>
          {/* Studio Lighting Setup */}
          <ambientLight intensity={0.3} />

          {/* Key Light - Main bright light from top-front */}
          <directionalLight
            position={[5, 8, 5]}
            intensity={2}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />

          {/* Fill Light - Softer light from side */}
          <directionalLight
            position={[-5, 3, 3]}
            intensity={0.8}
            color="#e6f2ff"
          />

          {/* Rim Light - Highlight edges */}
          <spotLight
            position={[0, 5, -5]}
            angle={0.5}
            penumbra={1}
            intensity={1.5}
            color="#ffeedd"
          />

          {/* Bounce lights for realism */}
          <pointLight position={[0, -2, 3]} intensity={0.5} color="#ffddcc" />
          <pointLight position={[-3, 0, -3]} intensity={0.4} color="#cce6ff" />

          {/* 3D Hoodie Model */}
          <HoodieModel
            color={color}
            texture={texture}
            frontPrint={frontPrint}
            backPrint={backPrint}
            onLoad={onModelLoad}
            editMode={editMode}
          />

          {/* Enhanced Environment for photorealism */}
          <Environment preset="studio" background={false} />

          {/* Subtle fog for depth */}
          <fog attach="fog" args={['#1a1a2e', 8, 15]} />

          {/* Ultra-realistic contact shadows */}
          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.6}
            scale={15}
            blur={2.5}
            far={4}
          />

          {/* Camera Controls */}
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.5}
            minDistance={3}
            maxDistance={10}
            autoRotate
            autoRotateSpeed={0.5}
          />

          {/* Camera */}
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />

          {/* CINEMA-GRADE POST-PROCESSING EFFECTS */}
          {!editMode && (
            <EffectComposer multisampling={8}>
              {/* SSAO - Screen Space Ambient Occlusion for realistic shadows in crevices */}
              <SSAO
                samples={31}
                radius={0.1}
                intensity={40}
                luminanceInfluence={0.6}
                color={new THREE.Color('black')}
              />

              {/* Depth of Field - Camera lens blur for photography look */}
              <DepthOfField
                focusDistance={0.01}
                focalLength={0.05}
                bokehScale={3}
                height={480}
              />

              {/* Bloom - Subtle glow on highlights */}
              <Bloom
                intensity={0.3}
                luminanceThreshold={0.9}
                luminanceSmoothing={0.9}
                height={300}
              />

              {/* Vignette - Darken edges like a camera lens */}
              <Vignette
                offset={0.3}
                darkness={0.5}
                eskil={false}
              />
            </EffectComposer>
          )}
        </Suspense>
      </Canvas>

      {/* Loading indicator */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-white text-sm">Loading 3D Model...</div>
      </div>
    </div>
  );
}
