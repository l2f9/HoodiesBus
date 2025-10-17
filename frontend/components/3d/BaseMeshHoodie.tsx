'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface BaseMeshHoodieProps {
  type: 'pullover' | 'zip-up' | 'oversized' | 'cropped' | 'athletic';
  color?: string;
  fabric?: 'cotton' | 'fleece' | 'french-terry' | 'polyester';
  frontText?: string;
  editMode?: boolean;
}

export default function BaseMeshHoodie({
  type,
  color = '#ffffff',
  fabric = 'cotton',
  frontText,
  editMode = false,
}: BaseMeshHoodieProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Create proper garment topology with realistic proportions
  const createBodyMesh = () => {
    // Create torso using LatheGeometry for cylindrical body
    const points: THREE.Vector2[] = [];

    // Proportions based on type
    const isCropped = type === 'cropped';
    const isOversized = type === 'oversized';

    const shoulderWidth = isOversized ? 0.55 : 0.48;
    const waistWidth = isOversized ? 0.52 : (type === 'athletic' ? 0.42 : 0.45);
    const length = isCropped ? 0.6 : (isOversized ? 0.85 : 0.75);

    // Create smooth body curve (proper garment silhouette)
    points.push(new THREE.Vector2(waistWidth, 0)); // Bottom hem
    points.push(new THREE.Vector2(waistWidth, length * 0.15)); // Lower body
    points.push(new THREE.Vector2(shoulderWidth - 0.05, length * 0.4)); // Mid torso
    points.push(new THREE.Vector2(shoulderWidth, length * 0.7)); // Chest
    points.push(new THREE.Vector2(shoulderWidth - 0.02, length * 0.85)); // Upper chest
    points.push(new THREE.Vector2(shoulderWidth - 0.08, length)); // Neck opening

    const bodyGeo = new THREE.LatheGeometry(points, 32); // 32 segments for smoothness

    // Add proper UV mapping for textures
    const uvs = bodyGeo.attributes.uv;
    for (let i = 0; i < uvs.count; i++) {
      const u = (i % 33) / 32; // Horizontal wrap
      const v = Math.floor(i / 33) / (points.length - 1); // Vertical
      uvs.setXY(i, u, v);
    }

    return bodyGeo;
  };

  // Create sleeve with proper arm shape
  const createSleeveGeometry = () => {
    const isOversized = type === 'oversized';
    const sleeveLength = isOversized ? 0.7 : (type === 'cropped' ? 0.5 : 0.65);

    // Sleeve taper from shoulder to wrist
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0), // Shoulder
      new THREE.Vector3(0.02, -sleeveLength * 0.3, 0),
      new THREE.Vector3(0.03, -sleeveLength * 0.6, 0),
      new THREE.Vector3(0.02, -sleeveLength, 0), // Wrist
    ]);

    const radius = isOversized ? 0.14 : 0.12;
    const wristRadius = type === 'athletic' ? 0.08 : 0.09;

    // Variable radius for taper
    const radiusPath = (u: number) => {
      return THREE.MathUtils.lerp(radius, wristRadius, u);
    };

    return new THREE.TubeGeometry(curve, 24, 0.12, 16, false);
  };

  // Create hood with proper draping
  const createHoodGeometry = () => {
    const hoodShape = new THREE.Shape();

    // Hood profile - realistic draping
    hoodShape.moveTo(0, 0);
    hoodShape.bezierCurveTo(-0.15, 0.05, -0.25, 0.2, -0.28, 0.35);
    hoodShape.bezierCurveTo(-0.28, 0.5, -0.2, 0.6, -0.05, 0.65);
    hoodShape.bezierCurveTo(0, 0.66, 0.05, 0.65, 0.2, 0.6);
    hoodShape.bezierCurveTo(0.28, 0.5, 0.28, 0.35, 0.28, 0.35);
    hoodShape.bezierCurveTo(0.25, 0.2, 0.15, 0.05, 0, 0);

    return new THREE.ExtrudeGeometry(hoodShape, {
      depth: 0.35,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.015,
      bevelSegments: 5,
      curveSegments: 32,
    });
  };

  // Kangaroo pocket
  const createPocketGeometry = () => {
    const pocketShape = new THREE.Shape();
    const w = 0.45;
    const h = 0.3;

    pocketShape.moveTo(-w / 2, 0);
    pocketShape.bezierCurveTo(-w / 2, -h * 0.3, -w / 2, -h * 0.7, -w / 2 + 0.05, -h);
    pocketShape.lineTo(w / 2 - 0.05, -h);
    pocketShape.bezierCurveTo(w / 2, -h * 0.7, w / 2, -h * 0.3, w / 2, 0);
    pocketShape.lineTo(-w / 2, 0);

    return new THREE.ExtrudeGeometry(pocketShape, {
      depth: 0.08,
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.01,
      bevelSegments: 3,
    });
  };

  // Create realistic fabric material
  const fabricMaterial = useMemo(() => {
    const fabricProps = {
      cotton: {
        roughness: 0.88,
        sheen: 0.7,
        sheenRoughness: 0.8,
      },
      fleece: {
        roughness: 0.95,
        sheen: 1.0,
        sheenRoughness: 0.9,
      },
      'french-terry': {
        roughness: 0.82,
        sheen: 0.5,
        sheenRoughness: 0.7,
      },
      polyester: {
        roughness: 0.4,
        sheen: 0.3,
        sheenRoughness: 0.4,
      },
    };

    const props = fabricProps[fabric];
    const fabricColor = new THREE.Color(color);

    return new THREE.MeshPhysicalMaterial({
      color: fabricColor,

      // Base properties
      roughness: props.roughness,
      metalness: 0,

      // Fabric sheen (fuzziness)
      sheen: props.sheen,
      sheenRoughness: props.sheenRoughness,
      sheenColor: fabricColor.clone().multiplyScalar(0.3),

      // Subtle clearcoat for fabric shine
      clearcoat: fabric === 'polyester' ? 0.15 : 0.05,
      clearcoatRoughness: 0.8,

      // Slight subsurface for realism
      transmission: 0.01,
      thickness: 0.3,

      // Environment interaction
      envMapIntensity: 0.6,
      reflectivity: fabric === 'polyester' ? 0.2 : 0.08,

      side: THREE.DoubleSide,
    });
  }, [color, fabric]);

  // Ribbing material (cuffs, waistband)
  const ribbingMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(color).multiplyScalar(0.95),
      roughness: 0.7,
      metalness: 0,
      side: THREE.DoubleSide,
    });
  }, [color]);

  // Drawstring material
  const drawstringMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: 0xe8e8e8,
      roughness: 0.6,
      metalness: 0,
    });
  }, []);

  // Zipper material (for zip-up type)
  const zipperMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: 0x333333,
      roughness: 0.3,
      metalness: 0.8,
    });
  }, []);

  // Auto-rotate for showcase
  useFrame((state) => {
    if (groupRef.current && !editMode) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.4;
    }
  });

  // Calculate proportions
  const bodyY = type === 'cropped' ? 0.4 : (type === 'oversized' ? 0.5 : 0.45);
  const sleeveY = type === 'cropped' ? 0.75 : (type === 'oversized' ? 0.85 : 0.8);
  const hoodY = type === 'cropped' ? 1.0 : 1.15;
  const pocketY = type === 'cropped' ? 0.35 : 0.4;

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Main Body */}
      <mesh
        geometry={createBodyMesh()}
        material={fabricMaterial}
        position={[0, bodyY, 0]}
        castShadow
        receiveShadow
      />

      {/* Left Sleeve */}
      <mesh
        geometry={createSleeveGeometry()}
        material={fabricMaterial}
        position={[-0.48, sleeveY, 0]}
        rotation={[0, 0, Math.PI * 0.12]}
        castShadow
        receiveShadow
      />

      {/* Right Sleeve */}
      <mesh
        geometry={createSleeveGeometry()}
        material={fabricMaterial}
        position={[0.48, sleeveY, 0]}
        rotation={[0, 0, -Math.PI * 0.12]}
        castShadow
        receiveShadow
      />

      {/* Hood */}
      <mesh
        geometry={createHoodGeometry()}
        material={fabricMaterial}
        position={[0, hoodY, -0.12]}
        rotation={[-Math.PI * 0.1, 0, 0]}
        castShadow
        receiveShadow
      />

      {/* Kangaroo Pocket (not on zip-up) */}
      {type !== 'zip-up' && (
        <mesh
          geometry={createPocketGeometry()}
          material={fabricMaterial}
          position={[0, pocketY, 0.48]}
          castShadow
        />
      )}

      {/* Waistband Ribbing */}
      <mesh
        geometry={new THREE.TorusGeometry(0.45, 0.04, 16, 48)}
        material={ribbingMaterial}
        position={[0, type === 'cropped' ? 0.3 : 0.1, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      />

      {/* Cuff Ribbing - Left */}
      <mesh
        geometry={new THREE.TorusGeometry(0.09, 0.025, 12, 32)}
        material={ribbingMaterial}
        position={[-0.5, sleeveY - (type === 'cropped' ? 0.5 : 0.65), 0]}
        rotation={[Math.PI * 0.4, 0, Math.PI * 0.12]}
      />

      {/* Cuff Ribbing - Right */}
      <mesh
        geometry={new THREE.TorusGeometry(0.09, 0.025, 12, 32)}
        material={ribbingMaterial}
        position={[0.5, sleeveY - (type === 'cropped' ? 0.5 : 0.65), 0]}
        rotation={[Math.PI * 0.4, 0, -Math.PI * 0.12]}
      />

      {/* Drawstrings */}
      <mesh
        geometry={new THREE.TorusGeometry(0.06, 0.008, 8, 24)}
        material={drawstringMaterial}
        position={[0, hoodY - 0.05, 0.25]}
        rotation={[Math.PI / 2, 0, 0]}
      />

      {/* Drawstring Ends */}
      <mesh
        geometry={new THREE.CylinderGeometry(0.008, 0.008, 0.12, 8)}
        material={drawstringMaterial}
        position={[-0.04, hoodY - 0.15, 0.28]}
      />
      <mesh
        geometry={new THREE.CylinderGeometry(0.008, 0.008, 0.12, 8)}
        material={drawstringMaterial}
        position={[0.04, hoodY - 0.15, 0.28]}
      />

      {/* Zipper (only for zip-up type) */}
      {type === 'zip-up' && (
        <>
          {/* Zipper Track */}
          <mesh
            geometry={new THREE.BoxGeometry(0.02, 0.75, 0.01)}
            material={zipperMaterial}
            position={[0, pocketY + 0.15, 0.49]}
          />

          {/* Zipper Pull */}
          <mesh
            geometry={new THREE.CylinderGeometry(0.015, 0.015, 0.03, 8)}
            material={zipperMaterial}
            position={[0, pocketY + 0.52, 0.5]}
            rotation={[Math.PI / 2, 0, 0]}
          />
        </>
      )}

      {/* Front Text (if provided) */}
      {frontText && !editMode && (
        <mesh position={[0, pocketY + 0.25, 0.51]}>
          <planeGeometry args={[0.6, 0.15]} />
          <meshBasicMaterial
            color={0x000000}
            transparent
            opacity={0.8}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
}
