"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef } from "react";
import type { Group, Mesh } from "three";

function Knot() {
  const mesh = useRef<Mesh>(null);
  const group = useRef<Group>(null);

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta * 0.12;
      mesh.current.rotation.y += delta * 0.18;
    }
    // Subtle pointer parallax — the accent responds to the cursor.
    if (group.current) {
      group.current.rotation.x = state.pointer.y * 0.12;
      group.current.rotation.y = state.pointer.x * 0.18;
    }
  });

  return (
    <group ref={group}>
      <mesh ref={mesh}>
        <torusKnotGeometry args={[1, 0.32, 180, 32]} />
        <meshStandardMaterial color="#d8ff3e" roughness={0.35} metalness={0.6} wireframe />
      </mesh>
    </group>
  );
}

export default function Scene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 5], fov: 45 }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 4, 4]} intensity={30} color="#d8ff3e" />
      <pointLight position={[-4, -3, 2]} intensity={12} color="#ff5a36" />
      <Float speed={1.4} rotationIntensity={0.4} floatIntensity={1.2}>
        <Knot />
      </Float>
    </Canvas>
  );
}