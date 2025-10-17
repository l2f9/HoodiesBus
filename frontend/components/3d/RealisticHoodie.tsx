'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface RealisticHoodieProps {
  color?: string;
  measurements?: {
    chest: number;
    length: number;
    sleeve: number;
    shoulder: number;
  };
  hoodieType?: 'pullover' | 'zip-up' | 'oversized' | 'cropped' | 'athletic';
  fabric?: 'cotton' | 'fleece' | 'french-terry' | 'polyester';
}

export default function RealisticHoodie({
  color = '#ffffff',
  measurements = { chest: 100, length: 70, sleeve: 65, shoulder: 45 },
  hoodieType = 'pullover',
  fabric = 'cotton',
}: RealisticHoodieProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Calculate scale factors based on measurements
  const scale = useMemo(() => {
    return {
      width: measurements.chest / 100,
      height: measurements.length / 70,
      sleeve: measurements.sleeve / 65,
    };
  }, [measurements]);

  // Fabric material properties
  const fabricMaterial = useMemo(() => {
    const fabricProps = {
      cotton: { roughness: 0.85, metalness: 0.05, normalScale: 1.0 },
      fleece: { roughness: 0.95, metalness: 0.02, normalScale: 1.5 },
      'french-terry': { roughness: 0.75, metalness: 0.08, normalScale: 0.8 },
      polyester: { roughness: 0.65, metalness: 0.15, normalScale: 0.6 },
    };

    const props = fabricProps[fabric];

    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      roughness: props.roughness,
      metalness: props.metalness,
      side: THREE.DoubleSide,
    });
  }, [color, fabric]);

  // Create detailed hoodie body using parametric geometry
  const bodyGeometry = useMemo(() => {
    const shape = new THREE.Shape();

    // Front body panel - realistic torso shape
    const width = 1.0 * scale.width;
    const height = 1.4 * scale.height;

    // Start from bottom left
    shape.moveTo(-width / 2, -height / 2);

    // Left side with natural curve
    shape.lineTo(-width / 2, height * 0.3);
    shape.quadraticCurveTo(-width / 2, height * 0.45, -width * 0.4, height * 0.48);

    // Shoulder curve
    shape.quadraticCurveTo(-width * 0.3, height * 0.5, -width * 0.25, height * 0.48);

    // Neckline
    shape.quadraticCurveTo(-width * 0.15, height * 0.46, 0, height * 0.5);
    shape.quadraticCurveTo(width * 0.15, height * 0.46, width * 0.25, height * 0.48);

    // Right shoulder
    shape.quadraticCurveTo(width * 0.3, height * 0.5, width * 0.4, height * 0.48);

    // Right side
    shape.quadraticCurveTo(width / 2, height * 0.45, width / 2, height * 0.3);
    shape.lineTo(width / 2, -height / 2);

    // Bottom hem with slight curve
    shape.quadraticCurveTo(width / 2, -height / 2 - 0.05, 0, -height / 2);
    shape.quadraticCurveTo(-width / 2, -height / 2 - 0.05, -width / 2, -height / 2);

    const extrudeSettings = {
      steps: 2,
      depth: 0.3,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 3,
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, [scale]);

  // Create realistic sleeves
  const createSleeveGeometry = (side: 'left' | 'right') => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, -0.3 * scale.sleeve, -0.05),
      new THREE.Vector3(0, -0.6 * scale.sleeve, -0.08),
      new THREE.Vector3(0, -0.9 * scale.sleeve, -0.05),
      new THREE.Vector3(0, -1.1 * scale.sleeve, 0),
    ]);

    // Create sleeve shape that tapers toward wrist
    const radiusTop = 0.16;
    const radiusBottom = 0.12;

    const geometry = new THREE.TubeGeometry(
      curve,
      32, // tubular segments
      radiusTop,
      16, // radial segments
      false
    );

    return geometry;
  };

  // Create detailed hood
  const hoodGeometry = useMemo(() => {
    const shape = new THREE.Shape();

    // Hood outline
    shape.moveTo(0, 0);
    shape.quadraticCurveTo(-0.35, 0.1, -0.35, 0.35);
    shape.quadraticCurveTo(-0.35, 0.6, -0.2, 0.7);
    shape.quadraticCurveTo(0, 0.75, 0.2, 0.7);
    shape.quadraticCurveTo(0.35, 0.6, 0.35, 0.35);
    shape.quadraticCurveTo(0.35, 0.1, 0, 0);

    const extrudeSettings = {
      steps: 2,
      depth: 0.4,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelSegments: 5,
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  // Create kangaroo pocket
  const pocketGeometry = useMemo(() => {
    const width = 0.5 * scale.width;
    const height = 0.35;
    const depth = 0.08;

    const shape = new THREE.Shape();
    shape.moveTo(-width / 2, -height / 2);
    shape.lineTo(width / 2, -height / 2);
    shape.quadraticCurveTo(width / 2 + 0.02, 0, width / 2, height / 2);
    shape.lineTo(-width / 2, height / 2);
    shape.quadraticCurveTo(-width / 2 - 0.02, 0, -width / 2, -height / 2);

    const extrudeSettings = {
      steps: 1,
      depth: depth,
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.01,
      bevelSegments: 2,
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, [scale]);

  // Create ribbed waistband
  const waistbandGeometry = useMemo(() => {
    const radius = 0.48 * scale.width;
    const tube = 0.06;
    const radialSegments = 64;
    const tubularSegments = 6;

    return new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments);
  }, [scale]);

  // Create ribbed cuffs
  const cuffGeometry = useMemo(() => {
    return new THREE.TorusGeometry(0.11, 0.035, 32, 16);
  }, []);

  // Drawstring
  const drawstringGeometry = useMemo(() => {
    return new THREE.TorusGeometry(0.08, 0.012, 8, 24);
  }, []);

  // Auto-rotation animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.4;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Main Body */}
      <mesh
        geometry={bodyGeometry}
        material={fabricMaterial}
        castShadow
        receiveShadow
        position={[0, 0, -0.15]}
      />

      {/* Back Body (slightly larger for depth) */}
      <mesh
        geometry={bodyGeometry}
        material={fabricMaterial}
        castShadow
        receiveShadow
        position={[0, 0, 0.15]}
        scale={[1.02, 1, 1]}
      />

      {/* Left Sleeve */}
      <mesh
        geometry={createSleeveGeometry('left')}
        material={fabricMaterial}
        castShadow
        receiveShadow
        position={[-0.55 * scale.width, 0.5 * scale.height, 0]}
        rotation={[0, 0, Math.PI * 0.15]}
      />

      {/* Right Sleeve */}
      <mesh
        geometry={createSleeveGeometry('right')}
        material={fabricMaterial}
        castShadow
        receiveShadow
        position={[0.55 * scale.width, 0.5 * scale.height, 0]}
        rotation={[0, 0, -Math.PI * 0.15]}
      />

      {/* Hood */}
      <mesh
        geometry={hoodGeometry}
        material={fabricMaterial}
        castShadow
        receiveShadow
        position={[0, 0.75 * scale.height, -0.05]}
        rotation={[-Math.PI * 0.1, 0, 0]}
      />

      {/* Kangaroo Pocket */}
      <mesh
        geometry={pocketGeometry}
        material={fabricMaterial}
        castShadow
        position={[0, -0.1 * scale.height, 0.32]}
      />

      {/* Waistband */}
      <mesh
        geometry={waistbandGeometry}
        material={fabricMaterial}
        position={[0, -0.68 * scale.height, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      />

      {/* Left Cuff */}
      <mesh
        geometry={cuffGeometry}
        material={fabricMaterial}
        position={[-0.55 * scale.width, 0.5 * scale.height - 1.1 * scale.sleeve, 0]}
        rotation={[Math.PI * 0.4, 0, Math.PI * 0.15]}
      />

      {/* Right Cuff */}
      <mesh
        geometry={cuffGeometry}
        material={fabricMaterial}
        position={[0.55 * scale.width, 0.5 * scale.height - 1.1 * scale.sleeve, 0]}
        rotation={[Math.PI * 0.4, 0, -Math.PI * 0.15]}
      />

      {/* Drawstring */}
      <mesh
        geometry={drawstringGeometry}
        material={new THREE.MeshStandardMaterial({
          color: '#e0e0e0',
          roughness: 0.6,
          metalness: 0.1,
        })}
        castShadow
        position={[0, 0.68 * scale.height, 0.3]}
        rotation={[Math.PI / 2, 0, 0]}
      />

      {/* Drawstring ends */}
      <mesh
        geometry={new THREE.CylinderGeometry(0.012, 0.012, 0.15, 8)}
        material={new THREE.MeshStandardMaterial({ color: '#e0e0e0' })}
        position={[-0.06, 0.62 * scale.height, 0.35]}
      />
      <mesh
        geometry={new THREE.CylinderGeometry(0.012, 0.012, 0.15, 8)}
        material={new THREE.MeshStandardMaterial({ color: '#e0e0e0' })}
        position={[0.06, 0.62 * scale.height, 0.35]}
      />
    </group>
  );
}
