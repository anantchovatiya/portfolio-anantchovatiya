"use client";

import { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Animated floating particles with connections
function ParticleNetwork() {
  const pointsRef = useRef<THREE.Points>(null);
  const geometryRef = useRef<THREE.BufferGeometry>(null);
  const lineRef = useRef<THREE.LineSegments>(null);
  const lineGeometryRef = useRef<THREE.BufferGeometry>(null);
  
  // Create particles and connections
  useEffect(() => {
    if (!geometryRef.current || !lineGeometryRef.current) return;
    
    // Create particles - reduced count for elegance
    const particlesCount = 100; // Further reduced particle count for elegance
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);
    const particlePositions: [number, number, number][] = [];
    
    // Create particles with different sizes and colors - ensure even distribution
    for (let i = 0; i < particlesCount; i++) {
      let x, y, z;
      
      // Create a denser concentration of particles in the center
      if (i < particlesCount * 0.1) {
        // 70% of particles in a more central area
        x = (Math.random() - 0.5) * 25;
        y = (Math.random() - 0.5) * 25;
        z = (Math.random() - 0.5) * 25;
      } else {
        // 30% of particles in a wider area
        x = (Math.random() - 0.5) * 40;
        y = (Math.random() - 0.5) * 40;
        z = (Math.random() - 0.5) * 40;
      }
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      particlePositions.push([x, y, z]);
      
      // Lighter, more elegant colors
      colors[i * 3] = 0.6 + Math.random() * 0.4; // R - increased for lighter appearance
      colors[i * 3 + 1] = 0.7 + Math.random() * 0.3; // G - increased for lighter appearance
      colors[i * 3 + 2] = 0.9 + Math.random() * 0.1; // B - increased for lighter appearance
      
      // Smaller sizes for elegance
      sizes[i] = 0.8 + Math.random() * 1.2; // Reduced size for elegance
    }
    
    geometryRef.current.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometryRef.current.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometryRef.current.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    // Create connections between nearby particles
    const connections: number[] = [];
    const connectionColors: number[] = [];
    const maxDistance = 7; // Adjusted distance for connections
    
    for (let i = 0; i < particlesCount; i++) {
      const [x1, y1, z1] = particlePositions[i];
      
      // Limit connections per particle to avoid too many lines
      let connectionCount = 0;
      const maxConnectionsPerParticle = 2; // Kept minimal for elegance
      
      for (let j = i + 1; j < particlesCount; j++) {
        if (connectionCount >= maxConnectionsPerParticle) break;
        
        const [x2, y2, z2] = particlePositions[j];
        
        const distance = Math.sqrt(
          Math.pow(x2 - x1, 2) + 
          Math.pow(y2 - y1, 2) + 
          Math.pow(z2 - z1, 2)
        );
        
        if (distance < maxDistance) {
          // Add line vertices
          connections.push(x1, y1, z1, x2, y2, z2);
          
          // Lighter, more elegant line colors
          const opacity = 0.2 - (distance / maxDistance) * 0.1; // Very subtle opacity
          connectionColors.push(
            0.7, 0.8, 0.9, opacity, // Lighter, more elegant blue
            0.7, 0.8, 0.9, opacity
          );
          
          connectionCount++;
        }
      }
    }
    
    const linePositions = new Float32Array(connections);
    const lineColors = new Float32Array(connectionColors);
    
    lineGeometryRef.current.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeometryRef.current.setAttribute('color', new THREE.BufferAttribute(lineColors, 4));
  }, []);
  
  // Animate particles and connections
  useFrame((state) => {
    if (!pointsRef.current || !lineRef.current) return;
    
    // Rotate particles very slowly for a more elegant effect
    pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.003; // Even slower rotation
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.004; // Even slower rotation
    
    // Rotate lines at the same rate
    lineRef.current.rotation.x = state.clock.getElapsedTime() * 0.003;
    lineRef.current.rotation.y = state.clock.getElapsedTime() * 0.004;
  });
  
  // Custom shader for particles with elegant visibility
  const particleMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (250.0 / -mvPosition.z); // Further reduced size multiplier
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float distanceToCenter = length(gl_PointCoord - vec2(0.5));
          if (distanceToCenter > 0.5) discard;
          float alpha = 0.5 - smoothstep(0.1, 0.5, distanceToCenter); // Reduced brightness for elegance
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, []);
  
  // Line material with elegant visibility
  const lineMaterial = useMemo(() => {
    return new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.2, // Very subtle opacity for elegance
      linewidth: 1,
    });
  }, []);
  
  return (
    <group position={[0, 0, 0]}>
      {/* Particles */}
      <points ref={pointsRef}>
        <bufferGeometry ref={geometryRef} />
        <primitive object={particleMaterial} attach="material" />
      </points>
      
      {/* Connections between particles */}
      <lineSegments ref={lineRef}>
        <bufferGeometry ref={lineGeometryRef} />
        <primitive object={lineMaterial} attach="material" />
      </lineSegments>
    </group>
  );
}

// Camera adjustment to ensure it's centered
function CameraAdjuster() {
  const { camera, size } = useThree();
  
  useEffect(() => {
    // Set camera position to look directly at the center
    camera.position.set(0, 0, 25);
    camera.lookAt(0, 0, 0);
    
    // Handle window resize to maintain centering
    const handleResize = () => {
      // Check if camera is a PerspectiveCamera before setting aspect
      if (camera instanceof THREE.PerspectiveCamera) {
        camera.aspect = size.width / size.height;
        camera.updateProjectionMatrix();
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [camera, size]);
  
  return null;
}

// Main 3D scene
function Scene() {
  return (
    <>
      {/* Camera adjuster to ensure proper centering */}
      <CameraAdjuster />
      
      {/* Gentle ambient light for elegance */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={0.4} color="#ffffff" />
      
      {/* Subtle light sources for elegance */}
      <pointLight position={[0, 0, 0]} intensity={0.5} color="#a0c0ff" distance={25} />
      <pointLight position={[-15, -5, 0]} intensity={0.3} color="#b0d0ff" distance={20} />
      <pointLight position={[15, 5, -10]} intensity={0.3} color="#b0d0ff" distance={20} />
      
      {/* Particle network */}
      <ParticleNetwork />
      
      {/* Background stars - reduced count and brightness for elegance */}
      <Stars radius={100} depth={50} count={1500} factor={3} saturation={0.3} fade speed={0.2} />
      
      {/* Camera controls - adjusted for elegant view */}
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        enableRotate={true}
        autoRotate
        autoRotateSpeed={0.03} // Very slow rotation for elegance
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 3}
      />
    </>
  );
}

// Translucent gradient background for better content visibility
function GradientBackground() {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-gray-950/60 via-gray-950/50 to-gray-950/60 z-[-20]" />
  );
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden">
      {/* Translucent gradient background for fallback and blending */}
      <GradientBackground />
      
      {/* 3D scene - adjusted camera position and FOV */}
      <Canvas 
        camera={{ position: [0, 0, 25], fov: 60 }} // Centered camera with appropriate FOV
        dpr={[1, 2]} // Responsive performance
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          preserveDrawingBuffer: true // Helps with rendering issues
        }}
        style={{ 
          width: '100vw', 
          height: '100vh',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }} // Ensure full viewport coverage and proper positioning
      >
        <Scene />
      </Canvas>
      
      {/* Additional translucent overlay for better content visibility */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-gray-950/10 pointer-events-none" />
    </div>
  );
} 