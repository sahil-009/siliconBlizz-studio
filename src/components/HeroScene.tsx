import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function Node({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5 + position[0] * 2) * 0.25;
      ref.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * 0.8 + position[2]) * 0.1;
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.15;
      ref.current.scale.setScalar(scale);
    }
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.1, 20, 20]} />
      <meshStandardMaterial color="#a78bfa" emissive="#7c3aed" emissiveIntensity={1.2} toneMapped={false} />
    </mesh>
  );
}

function Connections({ nodes }: { nodes: [number, number, number][] }) {
  const lines = useMemo(() => {
    const pairs: [THREE.Vector3, THREE.Vector3][] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = new THREE.Vector3(...nodes[i]).distanceTo(new THREE.Vector3(...nodes[j]));
        if (dist < 2.5) {
          pairs.push([new THREE.Vector3(...nodes[i]), new THREE.Vector3(...nodes[j])]);
        }
      }
    }
    return pairs;
  }, [nodes]);

  return (
    <>
      {lines.map((pair, i) => {
        const points = [pair[0], pair[1]];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        return (
          <primitive key={i} object={new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: "#a78bfa", transparent: true, opacity: 0.35 }))} />
        );
      })}
    </>
  );
}

function NetworkGraph() {
  const groupRef = useRef<THREE.Group>(null);
  const nodes: [number, number, number][] = useMemo(
    () => [
      [-2, 0.5, 0], [-1, -0.8, 0.5], [0, 0.8, -0.3],
      [1, -0.3, 0.4], [2, 0.2, -0.2], [-0.5, 1.2, 0.3],
      [0.8, 1, -0.5], [-1.5, -0.2, -0.4], [1.5, -0.8, 0.2],
      [0, -0.5, -0.6], [-1.2, 0.9, -0.2], [1.2, 0.6, 0.3],
    ],
    []
  );

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.4;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.8}>
      <group ref={groupRef}>
        {nodes.map((pos, i) => (
          <Node key={i} position={pos} />
        ))}
        <Connections nodes={nodes} />
      </group>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }} style={{ width: "100%", height: "100%" }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#8b5cf6" />
      <pointLight position={[-5, -5, 3]} intensity={0.5} color="#6d28d9" />
      <pointLight position={[0, 3, 4]} intensity={0.3} color="#a78bfa" />
      <NetworkGraph />
    </Canvas>
  );
}
