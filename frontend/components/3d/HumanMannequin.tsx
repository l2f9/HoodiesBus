'use client';

import { useMemo } from 'react';
import * as THREE from 'three';

export default function HumanMannequin() {
  // Create realistic human body proportions
  const bodyGeometry = useMemo(() => {
    const body = new THREE.Group();

    // Head
    const headGeo = new THREE.SphereGeometry(0.25, 32, 32);
    const head = new THREE.Mesh(headGeo);
    head.position.set(0, 1.6, 0);
    head.scale.set(1, 1.2, 1);
    body.add(head);

    // Neck
    const neckGeo = new THREE.CylinderGeometry(0.12, 0.14, 0.2, 16);
    const neck = new THREE.Mesh(neckGeo);
    neck.position.set(0, 1.35, 0);
    body.add(neck);

    // Torso (upper body)
    const torsoGeo = new THREE.BoxGeometry(0.6, 0.8, 0.35);
    const torso = new THREE.Mesh(torsoGeo);
    torso.position.set(0, 0.85, 0);
    body.add(torso);

    // Chest (broader for realistic shoulders)
    const chestGeo = new THREE.BoxGeometry(0.7, 0.3, 0.3);
    const chest = new THREE.Mesh(chestGeo);
    chest.position.set(0, 1.15, 0);
    body.add(chest);

    // Waist
    const waistGeo = new THREE.BoxGeometry(0.55, 0.25, 0.3);
    const waist = new THREE.Mesh(waistGeo);
    waist.position.set(0, 0.3, 0);
    body.add(waist);

    // Hips
    const hipsGeo = new THREE.BoxGeometry(0.6, 0.3, 0.35);
    const hips = new THREE.Mesh(hipsGeo);
    hips.position.set(0, 0.05, 0);
    body.add(hips);

    // Left Upper Arm
    const armGeo = new THREE.CylinderGeometry(0.08, 0.09, 0.5, 12);
    const leftUpperArm = new THREE.Mesh(armGeo);
    leftUpperArm.position.set(-0.4, 1.0, 0);
    leftUpperArm.rotation.z = 0.2;
    body.add(leftUpperArm);

    // Left Lower Arm
    const leftLowerArm = new THREE.Mesh(armGeo.clone());
    leftLowerArm.position.set(-0.5, 0.6, 0.1);
    leftLowerArm.rotation.z = 0.3;
    leftLowerArm.scale.set(0.9, 1, 0.9);
    body.add(leftLowerArm);

    // Right Upper Arm
    const rightUpperArm = new THREE.Mesh(armGeo.clone());
    rightUpperArm.position.set(0.4, 1.0, 0);
    rightUpperArm.rotation.z = -0.2;
    body.add(rightUpperArm);

    // Right Lower Arm
    const rightLowerArm = new THREE.Mesh(armGeo.clone());
    rightLowerArm.position.set(0.5, 0.6, 0.1);
    rightLowerArm.rotation.z = -0.3;
    rightLowerArm.scale.set(0.9, 1, 0.9);
    body.add(rightLowerArm);

    // Left Leg
    const legGeo = new THREE.CylinderGeometry(0.11, 0.13, 0.6, 16);
    const leftUpperLeg = new THREE.Mesh(legGeo);
    leftUpperLeg.position.set(-0.15, -0.3, 0);
    body.add(leftUpperLeg);

    const leftLowerLeg = new THREE.Mesh(legGeo.clone());
    leftLowerLeg.position.set(-0.15, -0.9, 0);
    leftLowerLeg.scale.set(0.85, 1, 0.85);
    body.add(leftLowerLeg);

    // Right Leg
    const rightUpperLeg = new THREE.Mesh(legGeo.clone());
    rightUpperLeg.position.set(0.15, -0.3, 0);
    body.add(rightUpperLeg);

    const rightLowerLeg = new THREE.Mesh(legGeo.clone());
    rightLowerLeg.position.set(0.15, -0.9, 0);
    rightLowerLeg.scale.set(0.85, 1, 0.85);
    body.add(rightLowerLeg);

    return body;
  }, []);

  // Skin-like material for mannequin
  const mannequinMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: 0xe8d4c0,
      roughness: 0.7,
      metalness: 0,
      clearcoat: 0.3,
      clearcoatRoughness: 0.8,
      envMapIntensity: 0.5,
    });
  }, []);

  // Apply material to all meshes
  bodyGeometry.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material = mannequinMaterial;
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return <primitive object={bodyGeometry} />;
}
