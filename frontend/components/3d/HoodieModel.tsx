'use client';

import { useState, useEffect } from 'react';
import BaseMeshHoodie from './BaseMeshHoodie';

interface HoodieModelProps {
  color?: string;
  hoodieType?: 'pullover' | 'zip-up' | 'oversized' | 'cropped' | 'athletic';
  fabric?: 'cotton' | 'fleece' | 'french-terry' | 'polyester';
  frontPrint?: string;
  backPrint?: string;
  onLoad?: () => void;
  editMode?: boolean;
}

export default function HoodieModel({
  color = '#ffffff',
  hoodieType = 'pullover',
  fabric = 'cotton',
  frontPrint,
  backPrint,
  onLoad,
  editMode = true,
}: HoodieModelProps) {
  const [modelLoaded, setModelLoaded] = useState(false);

  useEffect(() => {
    if (!modelLoaded) {
      setModelLoaded(true);
      if (onLoad) onLoad();
    }
  }, [modelLoaded, onLoad]);

  // Use professional base mesh system
  return (
    <BaseMeshHoodie
      type={hoodieType}
      color={color}
      fabric={fabric}
      frontText={frontPrint}
      editMode={editMode}
    />
  );
}
