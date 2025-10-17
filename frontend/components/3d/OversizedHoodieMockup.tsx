'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import HumanMannequin from './HumanMannequin';

interface OversizedHoodieMockupProps {
  color?: string;
  editMode?: boolean;
  designs?: {
    front?: string;
    back?: string;
    leftSleeve?: string;
    rightSleeve?: string;
  };
}

export default function OversizedHoodieMockup({
  color = '#ffffff',
  editMode = true,
  designs,
}: OversizedHoodieMockupProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Create oversized hoodie with realistic draping
  const hoodieGeometry = useMemo(() => {
    // Oversized proportions - scaled to fit human body
    // Human torso is ~0.8 tall, hoodie should be ~1.0 for oversized fit
    const bodyWidth = 1.6;  // Wider than shoulders for oversized look
    const bodyHeight = 1.0;  // From hips to chest
    const bodyDepth = 0.5;  // Depth around body

    // Create main body with ExtrudeGeometry for fabric thickness
    const bodyShape = new THREE.Shape();

    // Oversized, boxy silhouette
    bodyShape.moveTo(-bodyWidth / 2, -bodyHeight / 2);
    bodyShape.lineTo(-bodyWidth / 2, bodyHeight / 2);
    bodyShape.quadraticCurveTo(-bodyWidth / 2 + 0.2, bodyHeight / 2 + 0.1, -bodyWidth / 2 + 0.4, bodyHeight / 2);
    bodyShape.lineTo(bodyWidth / 2 - 0.4, bodyHeight / 2);
    bodyShape.quadraticCurveTo(bodyWidth / 2 - 0.2, bodyHeight / 2 + 0.1, bodyWidth / 2, bodyHeight / 2);
    bodyShape.lineTo(bodyWidth / 2, -bodyHeight / 2);
    bodyShape.quadraticCurveTo(bodyWidth / 2 - 0.1, -bodyHeight / 2 - 0.1, bodyWidth / 2 - 0.2, -bodyHeight / 2);
    bodyShape.lineTo(-bodyWidth / 2 + 0.2, -bodyHeight / 2);
    bodyShape.quadraticCurveTo(-bodyWidth / 2 + 0.1, -bodyHeight / 2 - 0.1, -bodyWidth / 2, -bodyHeight / 2);

    const extrudeSettings = {
      depth: bodyDepth,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelSegments: 8,
      curveSegments: 64,
    };

    return new THREE.ExtrudeGeometry(bodyShape, extrudeSettings);
  }, []);

  // Create oversized sleeves with draping - scaled for human arms
  const createOversizedSleeve = () => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0.05, -0.25, -0.05),
      new THREE.Vector3(0.08, -0.5, -0.08),
      new THREE.Vector3(0.05, -0.7, -0.05),
    ]);

    return new THREE.TubeGeometry(curve, 24, 0.15, 16, false);
  };

  // Oversized hood - scaled for human head
  const hoodGeometry = useMemo(() => {
    const hoodShape = new THREE.Shape();

    // Large, dramatic hood that fits over human head
    hoodShape.moveTo(0, 0);
    hoodShape.quadraticCurveTo(-0.35, 0.15, -0.4, 0.35);
    hoodShape.quadraticCurveTo(-0.4, 0.6, -0.2, 0.75);
    hoodShape.quadraticCurveTo(0, 0.8, 0.2, 0.75);
    hoodShape.quadraticCurveTo(0.4, 0.6, 0.4, 0.35);
    hoodShape.quadraticCurveTo(0.35, 0.15, 0, 0);

    return new THREE.ExtrudeGeometry(hoodShape, {
      depth: 0.4,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelSegments: 8,
    });
  }, []);

  // Kangaroo pocket - scaled for human body
  const pocketGeometry = useMemo(() => {
    const pocketShape = new THREE.Shape();
    const w = 0.6;  // Pocket width
    const h = 0.35; // Pocket height

    pocketShape.moveTo(-w / 2, -h / 2);
    pocketShape.lineTo(w / 2, -h / 2);
    pocketShape.quadraticCurveTo(w / 2 + 0.03, 0, w / 2, h / 2);
    pocketShape.lineTo(-w / 2, h / 2);
    pocketShape.quadraticCurveTo(-w / 2 - 0.03, 0, -w / 2, -h / 2);

    return new THREE.ExtrudeGeometry(pocketShape, {
      depth: 0.1,
      bevelEnabled: true,
      bevelThickness: 0.015,
      bevelSize: 0.015,
      bevelSegments: 3,
    });
  }, []);

  // Create ultra-detailed fabric texture with weave pattern
  const fabricTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;

    // Base fabric color
    ctx.fillStyle = '#888888';
    ctx.fillRect(0, 0, 1024, 1024);

    // Create detailed cotton weave pattern
    for (let i = 0; i < 1024; i += 2) {
      for (let j = 0; j < 1024; j += 2) {
        // Weave pattern
        const isWarp = (Math.floor(i / 4) + Math.floor(j / 4)) % 2;
        const noise = Math.random() * 15 - 7;
        const base = isWarp ? 135 : 120;
        const shade = base + noise;

        ctx.fillStyle = `rgb(${shade}, ${shade}, ${shade})`;
        ctx.fillRect(i, j, 2, 2);
      }
    }

    // Add subtle thread details
    ctx.strokeStyle = 'rgba(150, 150, 150, 0.15)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < 1024; i += 8) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 1024);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(1024, i);
      ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(12, 12);
    texture.anisotropy = 16;

    return texture;
  }, []);

  // Material based on mode with advanced PBR
  const material = useMemo(() => {
    if (editMode) {
      // Transparent wireframe/pattern mode for editing
      return new THREE.MeshStandardMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.15,
        wireframe: false,
        side: THREE.DoubleSide,
        roughness: 0.8,
        metalness: 0.1,
      });
    } else {
      // ULTRA-REALISTIC PBR fabric material with subsurface scattering
      return new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(color),
        map: fabricTexture,

        // Fabric surface properties
        roughness: 0.92,
        metalness: 0,

        // Clearcoat for subtle shine
        clearcoat: 0.08,
        clearcoatRoughness: 0.7,

        // Sheen for fabric fuzziness
        sheen: 0.8,
        sheenRoughness: 0.75,
        sheenColor: new THREE.Color(color).multiplyScalar(0.4),

        // Subsurface scattering for fabric translucency
        transmission: 0.02,
        thickness: 0.5,

        // Environment reflections
        envMapIntensity: 0.8,

        // Advanced properties
        reflectivity: 0.1,
        ior: 1.45,

        side: THREE.DoubleSide,
      });
    }
  }, [editMode, color, fabricTexture]);

  // Wireframe outline material for edit mode
  const wireframeMaterial = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color: 0x8b5cf6,
      linewidth: 2,
      transparent: true,
      opacity: 0.6,
    });
  }, []);

  // Create realistic cloth folds/wrinkles using displacement
  const createClothFolds = () => {
    const foldGeometry = new THREE.PlaneGeometry(0.3, 0.15, 32, 16);
    const vertices = foldGeometry.attributes.position;

    // Add wave-like displacement for fabric folds
    for (let i = 0; i < vertices.count; i++) {
      const x = vertices.getX(i);
      const y = vertices.getY(i);
      const wave = Math.sin(x * 8) * 0.015 + Math.cos(y * 6) * 0.01;
      vertices.setZ(i, wave);
    }

    foldGeometry.computeVertexNormals();
    return foldGeometry;
  };

  // Auto-rotation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Human Mannequin - The base for the hoodie */}
      {!editMode && <HumanMannequin />}

      {/* Main Body - positioned to fit over human torso */}
      <mesh geometry={hoodieGeometry} material={material} castShadow receiveShadow position={[0, 0.6, -0.25]}>
        {editMode && <lineSegments geometry={new THREE.EdgesGeometry(hoodieGeometry)} material={wireframeMaterial} />}
      </mesh>

      {/* Back Body - positioned to wrap around human back */}
      <mesh geometry={hoodieGeometry} material={material} castShadow receiveShadow position={[0, 0.6, 0.25]} scale={[1.03, 1, 1]}>
        {editMode && <lineSegments geometry={new THREE.EdgesGeometry(hoodieGeometry)} material={wireframeMaterial} />}
      </mesh>

      {/* Left Sleeve - positioned over left arm */}
      <mesh
        geometry={createOversizedSleeve()}
        material={material}
        castShadow
        receiveShadow
        position={[-0.45, 1.0, 0]}
        rotation={[0, 0, Math.PI * 0.15]}
      >
        {editMode && <lineSegments geometry={new THREE.EdgesGeometry(createOversizedSleeve())} material={wireframeMaterial} />}
      </mesh>

      {/* Right Sleeve - positioned over right arm */}
      <mesh
        geometry={createOversizedSleeve()}
        material={material}
        castShadow
        receiveShadow
        position={[0.45, 1.0, 0]}
        rotation={[0, 0, -Math.PI * 0.15]}
      >
        {editMode && <lineSegments geometry={new THREE.EdgesGeometry(createOversizedSleeve())} material={wireframeMaterial} />}
      </mesh>

      {/* Hood - positioned over head */}
      <mesh
        geometry={hoodGeometry}
        material={material}
        castShadow
        receiveShadow
        position={[0, 1.45, -0.15]}
        rotation={[-Math.PI * 0.12, 0, 0]}
      >
        {editMode && <lineSegments geometry={new THREE.EdgesGeometry(hoodGeometry)} material={wireframeMaterial} />}
      </mesh>

      {/* Kangaroo Pocket - on front chest area */}
      <mesh
        geometry={pocketGeometry}
        material={material}
        castShadow
        position={[0, 0.35, 0.3]}
      >
        {editMode && <lineSegments geometry={new THREE.EdgesGeometry(pocketGeometry)} material={wireframeMaterial} />}
      </mesh>

      {/* Ribbed Waistband - at waist level */}
      <mesh
        geometry={new THREE.TorusGeometry(0.35, 0.05, 32, 64)}
        material={material}
        position={[0, 0.05, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      />

      {/* Ribbed Cuffs - at wrists */}
      <mesh
        geometry={new THREE.TorusGeometry(0.12, 0.03, 16, 32)}
        material={material}
        position={[-0.48, 0.3, 0]}
        rotation={[Math.PI * 0.45, 0, Math.PI * 0.15]}
      />
      <mesh
        geometry={new THREE.TorusGeometry(0.12, 0.03, 16, 32)}
        material={material}
        position={[0.48, 0.3, 0]}
        rotation={[Math.PI * 0.45, 0, -Math.PI * 0.15]}
      />

      {/* Drawstring - near neckline */}
      <mesh
        geometry={new THREE.TorusGeometry(0.08, 0.01, 8, 24)}
        material={new THREE.MeshStandardMaterial({ color: editMode ? 0xcccccc : 0xe0e0e0, roughness: 0.6 })}
        position={[0, 1.35, 0.3]}
        rotation={[Math.PI / 2, 0, 0]}
      />

      {/* Drawstring ends */}
      <mesh
        geometry={new THREE.CylinderGeometry(0.01, 0.01, 0.15, 8)}
        material={new THREE.MeshStandardMaterial({ color: editMode ? 0xcccccc : 0xe0e0e0 })}
        position={[-0.05, 1.25, 0.35]}
      />
      <mesh
        geometry={new THREE.CylinderGeometry(0.01, 0.01, 0.15, 8)}
        material={new THREE.MeshStandardMaterial({ color: editMode ? 0xcccccc : 0xe0e0e0 })}
        position={[0.05, 1.25, 0.35]}
      />

      {/* Realistic Cloth Folds - only in preview mode */}
      {!editMode && (
        <>
          {/* Armpit folds */}
          <mesh
            geometry={createClothFolds()}
            material={material}
            position={[-0.35, 0.85, 0]}
            rotation={[0, Math.PI * 0.5, Math.PI * 0.3]}
            castShadow
          />
          <mesh
            geometry={createClothFolds()}
            material={material}
            position={[0.35, 0.85, 0]}
            rotation={[0, -Math.PI * 0.5, -Math.PI * 0.3]}
            castShadow
          />

          {/* Elbow wrinkles */}
          <mesh
            geometry={createClothFolds()}
            material={material}
            position={[-0.47, 0.5, -0.05]}
            rotation={[Math.PI * 0.5, 0, Math.PI * 0.15]}
            scale={[0.8, 0.8, 0.8]}
            castShadow
          />
          <mesh
            geometry={createClothFolds()}
            material={material}
            position={[0.47, 0.5, -0.05]}
            rotation={[Math.PI * 0.5, 0, -Math.PI * 0.15]}
            scale={[0.8, 0.8, 0.8]}
            castShadow
          />

          {/* Waist bunching */}
          <mesh
            geometry={createClothFolds()}
            material={material}
            position={[0, 0.1, 0.28]}
            rotation={[0, 0, 0]}
            scale={[1.2, 0.6, 1]}
            castShadow
          />

          {/* Hood drape folds */}
          <mesh
            geometry={createClothFolds()}
            material={material}
            position={[0, 1.4, 0.1]}
            rotation={[-Math.PI * 0.2, 0, 0]}
            scale={[1, 0.7, 1]}
            castShadow
          />
        </>
      )}

      {/* Edit mode grid overlay on design areas */}
      {editMode && (
        <>
          {/* Front design area indicator */}
          <mesh position={[0, 0.7, 0.32]}>
            <planeGeometry args={[1.0, 0.8]} />
            <meshBasicMaterial
              color={0x8b5cf6}
              transparent
              opacity={0.1}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Grid lines on front */}
          <gridHelper
            args={[1.0, 10, 0x8b5cf6, 0x8b5cf6]}
            position={[0, 0.7, 0.33]}
            rotation={[Math.PI / 2, 0, 0]}
            material-opacity={0.3}
            material-transparent={true}
          />
        </>
      )}
    </group>
  );
}
