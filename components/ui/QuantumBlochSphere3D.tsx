'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Cpu, Layers, Activity, RotateCcw, Zap } from 'lucide-react';

export type VisMode = 'dvbv' | 'compiler' | 'simon' | 'mantra';

export function QuantumBlochSphere3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeMode, setActiveMode] = useState<VisMode>('dvbv');
  const [thetaDeg, setThetaDeg] = useState(45);
  const [phiDeg, setPhiDeg] = useState(60);
  const [isRotating, setIsRotating] = useState(true);

  // Scene references
  const stateVectorRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 1, 0));
  const vectorMeshRef = useRef<THREE.Group | null>(null);
  const particleGroupRef = useRef<THREE.Points | null>(null);
  const latticeGroupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 420;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05070e, 0.08);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 3.8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // Clear previous canvas
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const cyanPointLight = new THREE.PointLight(0x00f0ff, 2.5, 10);
    cyanPointLight.position.set(2, 3, 2);
    scene.add(cyanPointLight);

    const indigoPointLight = new THREE.PointLight(0x6366f1, 2.0, 10);
    indigoPointLight.position.set(-2, -2, -2);
    scene.add(indigoPointLight);

    // 3. Main Bloch Sphere Object Group
    const blochGroup = new THREE.Group();
    scene.add(blochGroup);

    // Sphere Wireframe Outer Shell
    const sphereRadius = 1.2;
    const sphereGeo = new THREE.SphereGeometry(sphereRadius, 32, 24);
    const sphereMat = new THREE.MeshPhysicalMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
      roughness: 0.2,
      metalness: 0.8,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    blochGroup.add(sphereMesh);

    // Inner Glass Core
    const coreGeo = new THREE.SphereGeometry(sphereRadius * 0.98, 32, 32);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x0a0d18,
      transparent: true,
      opacity: 0.45,
      roughness: 0.1,
      transmission: 0.6,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    blochGroup.add(coreMesh);

    // Equatorial Ring (|0> -> |+> -> |1>)
    const ringGeo = new THREE.TorusGeometry(sphereRadius, 0.008, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.6,
    });
    const eqRing = new THREE.Mesh(ringGeo, ringMat);
    eqRing.rotation.x = Math.PI / 2;
    blochGroup.add(eqRing);

    // Meridian Ring
    const merRing = new THREE.Mesh(ringGeo, ringMat);
    blochGroup.add(merRing);

    // Coordinate Axes (X, Y, Z)
    const axisMat = new THREE.LineBasicMaterial({ color: 0x475569, transparent: true, opacity: 0.5 });
    
    // Z-Axis (Vertical |0> / |1>)
    const zGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, -sphereRadius * 1.25, 0),
      new THREE.Vector3(0, sphereRadius * 1.25, 0),
    ]);
    const zAxis = new THREE.Line(zGeo, axisMat);
    blochGroup.add(zAxis);

    // X-Axis
    const xGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-sphereRadius * 1.25, 0, 0),
      new THREE.Vector3(sphereRadius * 1.25, 0, 0),
    ]);
    const xAxis = new THREE.Line(xGeo, axisMat);
    blochGroup.add(xAxis);

    // Y-Axis
    const yGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, -sphereRadius * 1.25),
      new THREE.Vector3(0, 0, sphereRadius * 1.25),
    ]);
    const yAxis = new THREE.Line(yGeo, axisMat);
    blochGroup.add(yAxis);

    // 4. Dynamic State Vector Arrow (|psi>)
    const vectorGroup = new THREE.Group();
    blochGroup.add(vectorGroup);
    vectorMeshRef.current = vectorGroup;

    // Arrow Shaft
    const shaftGeo = new THREE.CylinderGeometry(0.015, 0.015, sphereRadius, 16);
    shaftGeo.translate(0, sphereRadius / 2, 0);
    const shaftMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.8,
      roughness: 0.2,
    });
    const shaftMesh = new THREE.Mesh(shaftGeo, shaftMat);
    vectorGroup.add(shaftMesh);

    // Arrow Tip Cone
    const tipGeo = new THREE.ConeGeometry(0.06, 0.15, 16);
    tipGeo.translate(0, sphereRadius + 0.075, 0);
    const tipMesh = new THREE.Mesh(tipGeo, shaftMat);
    vectorGroup.add(tipMesh);

    // Tip Glowing Qubit Node Sphere
    const nodeGeo = new THREE.SphereGeometry(0.07, 16, 16);
    nodeGeo.translate(0, sphereRadius + 0.075, 0);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
    vectorGroup.add(nodeMesh);

    // 5. 156-Qubit Lattice Group (Heavy-Hex Topology Display)
    const latticeGroup = new THREE.Group();
    blochGroup.add(latticeGroup);
    latticeGroupRef.current = latticeGroup;

    // Generate 156 heavy-hex nodes scattered around outer orbit
    const latticeCount = 48;
    const latticeGeo = new THREE.BufferGeometry();
    const latticePos = new Float32Array(latticeCount * 3);
    for (let i = 0; i < latticeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / latticeCount);
      const theta = Math.sqrt(latticeCount * Math.PI) * phi;
      const r = sphereRadius * (1.35 + (i % 3) * 0.08);

      latticePos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      latticePos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      latticePos[i * 3 + 2] = r * Math.cos(phi);
    }
    latticeGeo.setAttribute('position', new THREE.BufferAttribute(latticePos, 3));

    const latticeMat = new THREE.PointsMaterial({
      color: 0x6366f1,
      size: 0.05,
      transparent: true,
      opacity: 0.7,
    });
    const latticePoints = new THREE.Points(latticeGeo, latticeMat);
    latticeGroup.add(latticePoints);

    // 6. Ambient Quantum Particle Cloud
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      particlePos[i] = (Math.random() - 0.5) * 6;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.025,
      transparent: true,
      opacity: 0.45,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    particleGroupRef.current = particles;

    // 7. Interactive Orbit Controls (Mouse Drag & Pitch)
    let isMouseDown = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseDown = (e: MouseEvent) => {
      isMouseDown = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMouseDown) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      blochGroup.rotation.y += deltaX * 0.008;
      blochGroup.rotation.x += deltaY * 0.008;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isMouseDown = false;
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 420;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Continuous subtle bloch rotation
      if (isRotating && !isMouseDown) {
        blochGroup.rotation.y += 0.004;
      }

      // Precession of state vector
      if (vectorGroup) {
        const radTheta = (thetaDeg * Math.PI) / 180;
        const radPhi = (phiDeg * Math.PI) / 180 + elapsedTime * 0.5;

        const x = Math.sin(radTheta) * Math.cos(radPhi);
        const y = Math.cos(radTheta);
        const z = Math.sin(radTheta) * Math.sin(radPhi);

        const targetDir = new THREE.Vector3(x, y, z).normalize();
        const axis = new THREE.Vector3(0, 1, 0).cross(targetDir).normalize();
        const angle = Math.acos(new THREE.Vector3(0, 1, 0).dot(targetDir));

        if (axis.lengthSq() > 0) {
          vectorGroup.setRotationFromAxisAngle(axis, angle);
        }
      }

      // Rotate particles slowly
      if (particles) {
        particles.rotation.y = elapsedTime * 0.03;
      }

      // Rotate heavy-hex lattice in opposite direction
      if (latticeGroup) {
        latticeGroup.rotation.y = -elapsedTime * 0.08;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      domElem.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [thetaDeg, phiDeg, isRotating]);

  // Mode change handler
  const handleModeChange = (mode: VisMode) => {
    setActiveMode(mode);
    switch (mode) {
      case 'dvbv':
        setThetaDeg(35);
        setPhiDeg(45);
        break;
      case 'compiler':
        setThetaDeg(75);
        setPhiDeg(120);
        break;
      case 'simon':
        setThetaDeg(90);
        setPhiDeg(180);
        break;
      case 'mantra':
        setThetaDeg(15);
        setPhiDeg(270);
        break;
    }
  };

  return (
    <div className="relative w-full bg-surface-card border border-border rounded-xl p-4 sm:p-6 shadow-2xl overflow-hidden glass-panel">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-indigo/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Controls Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-border/80 pb-4 mb-4 gap-3 relative z-10">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse shadow-[0_0_10px_#00F0FF]" />
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-text-primary">
            3D QUANTUM STATE VECTOR &amp; HILBERT SPACE VISUALIZER
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsRotating(!isRotating)}
            className="p-1.5 bg-surface border border-border hover:border-accent text-text-secondary hover:text-accent rounded text-[11px] font-mono transition-colors flex items-center space-x-1"
            title="Toggle Auto-Rotation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isRotating ? 'PAUSE ROTATION' : 'ROTATE'}</span>
          </button>

          <div className="px-2.5 py-1 bg-surface border border-border rounded text-[11px] font-mono text-accent font-semibold">
            ibm_marrakesh (156Q)
          </div>
        </div>
      </div>

      {/* Main 3D Canvas Mount Point */}
      <div className="relative w-full h-[360px] sm:h-[420px] cursor-grab active:cursor-grabbing rounded-lg overflow-hidden border border-border/40 bg-surface/50">
        <div ref={mountRef} className="w-full h-full" />

        {/* Floating Telemetry Badge Overlay */}
        <div className="absolute top-3 left-3 p-3 bg-surface-glass border border-border/60 rounded-lg text-[11px] font-mono space-y-1.5 backdrop-blur-md">
          <div className="text-text-muted font-bold text-[10px] uppercase tracking-wider">
            STATE VECTOR $|\psi\rangle$ PARAMETERS
          </div>
          <div className="flex items-center space-x-3 text-text-primary">
            <span>Polar Angle &theta;: <strong className="text-accent">{thetaDeg}°</strong></span>
            <span>Phase &phi;: <strong className="text-accent">{phiDeg}°</strong></span>
          </div>
          <div className="text-[10px] text-text-secondary">
            Formula: |&psi;&rangle; = cos(&theta;/2)|0&rangle; + e<sup>i&phi;</sup>sin(&theta;/2)|1&rangle;
          </div>
        </div>

        {/* Drag Instruction Banner */}
        <div className="absolute bottom-3 right-3 px-3 py-1.5 bg-surface-glass border border-border/60 rounded text-[10px] font-mono text-text-muted pointer-events-none backdrop-blur-md">
          🖱️ DRAG MOUSE TO ROTATE 3D BLOCH SPHERE
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 relative z-10">
        <button
          onClick={() => handleModeChange('dvbv')}
          className={`p-3 border rounded-lg text-left transition-all font-mono ${
            activeMode === 'dvbv'
              ? 'bg-accent/15 border-accent text-accent glow-box-cyan'
              : 'bg-surface border-border text-text-secondary hover:border-border-hover'
          }`}
        >
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
            <span>DYNAMIC BV</span>
            <Zap className="w-3.5 h-3.5" />
          </div>
          <div className="text-xs font-bold text-text-primary mt-1">Single-Shot Vector</div>
          <div className="text-[10px] text-text-muted mt-0.5">$\alpha_Q = 0.1532$ (Advantage)</div>
        </button>

        <button
          onClick={() => handleModeChange('compiler')}
          className={`p-3 border rounded-lg text-left transition-all font-mono ${
            activeMode === 'compiler'
              ? 'bg-accent-indigo/20 border-accent-indigo text-accent-indigo glow-box-indigo'
              : 'bg-surface border-border text-text-secondary hover:border-border-hover'
          }`}
        >
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
            <span>COMPILER 6F</span>
            <Layers className="w-3.5 h-3.5" />
          </div>
          <div className="text-xs font-bold text-text-primary mt-1">Ising QUBO Spin</div>
          <div className="text-[10px] text-text-muted mt-0.5">$x_i = (1-Z_i)/2$ Mapping</div>
        </button>

        <button
          onClick={() => handleModeChange('simon')}
          className={`p-3 border rounded-lg text-left transition-all font-mono ${
            activeMode === 'simon'
              ? 'bg-status-inconclusive-bg border-status-inconclusive text-status-inconclusive'
              : 'bg-surface border-border text-text-secondary hover:border-border-hover'
          }`}
        >
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
            <span>RESTRICTED SIMON</span>
            <Cpu className="w-3.5 h-3.5" />
          </div>
          <div className="text-xs font-bold text-text-primary mt-1">56-Qubit Heavy Hex</div>
          <div className="text-[10px] text-text-muted mt-0.5">Constant-Depth 16L</div>
        </button>

        <button
          onClick={() => handleModeChange('mantra')}
          className={`p-3 border rounded-lg text-left transition-all font-mono ${
            activeMode === 'mantra'
              ? 'bg-status-exploratory-bg border-status-exploratory text-status-exploratory'
              : 'bg-surface border-border text-text-secondary hover:border-border-hover'
          }`}
        >
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
            <span>MANTRA ENCODING</span>
            <Activity className="w-3.5 h-3.5" />
          </div>
          <div className="text-xs font-bold text-text-primary mt-1">Hilbert Mapping</div>
          <div className="text-[10px] text-text-muted mt-0.5">TVD ~ 0.98-0.99</div>
        </button>
      </div>
    </div>
  );
}
