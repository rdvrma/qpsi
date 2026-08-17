'use client';

import React from 'react';
import { QuantumBlochSphere3D } from './QuantumBlochSphere3D';

export function SpatialHeroVisual() {
  return (
    <div className="relative w-full max-w-5xl mx-auto py-4 sm:py-6 select-none">
      <QuantumBlochSphere3D />
    </div>
  );
}
