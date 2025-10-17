'use client';

import { useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import OversizedHoodieMockup from './OversizedHoodieMockup';

interface HoodieModelProps {
  color?: string;
  texture?: string;
  frontPrint?: string;
  backPrint?: string;
  onLoad?: () => void;
  editMode?: boolean;
}

export default function HoodieModel({
  color = '#ffffff',
  texture,
  frontPrint,
  backPrint,
  onLoad,
  editMode = true,
}: HoodieModelProps) {
  const [modelLoaded, setModelLoaded] = useState(false);

  // Try to load the real model, fallback to mockup
  let scene: any = null;
  let error = false;

  try {
    const gltf = useGLTF('/models/hoodie.glb');
    scene = gltf.scene;
  } catch (e) {
    error = true;
  }

  useEffect(() => {
    if (!modelLoaded) {
      setModelLoaded(true);
      if (onLoad) onLoad();
    }
  }, [modelLoaded, onLoad]);

  // If real GLB model exists, use it
  if (scene && !error) {
    scene.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material && !editMode) {
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color(color),
            roughness: 0.7,
            metalness: 0.1,
          });
        }
      }
    });

    return (
      <group scale={1.5}>
        <primitive object={scene.clone()} />
      </group>
    );
  }

  // Use oversized hoodie mockup
  return (
    <OversizedHoodieMockup
      color={color}
      editMode={editMode}
      designs={{
        front: frontPrint,
        back: backPrint,
      }}
    />
  );
}

// Preload the model
useGLTF.preload('/models/hoodie.glb');
