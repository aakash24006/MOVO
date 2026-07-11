'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

/* slowly rotating particle field */
function Particles({ count = 450 }) {
  const ref = useRef()

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 8
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6
      arr[i * 3 + 2] = r * Math.cos(phi) - 4
    }
    return arr
  }, [count])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.03
    ref.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.05) * 0.08
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#34d399"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

/* the "recovery orb" — breathing distorted sphere + wireframe shell */
function RecoveryOrb({ mouse }) {
  const group = useRef()

  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    // gentle idle rotation + follow the cursor slightly
    group.current.rotation.y = t * 0.12 + mouse.current.x * 0.4
    group.current.rotation.x = mouse.current.y * 0.25
    group.current.position.y = Math.sin(t * 0.6) * 0.15
  })

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={group} position={[3.1, 0.3, -1.6]}>
        {/* core */}
        <mesh scale={1.05}>
          <icosahedronGeometry args={[1, 24]} />
          <MeshDistortMaterial
            color="#0b7a4e"
            emissive="#0a5c3c"
            emissiveIntensity={0.3}
            roughness={0.2}
            metalness={0.7}
            distort={0.42}
            speed={1.6}
            transparent
            opacity={0.92}
          />
        </mesh>
        {/* wireframe shell */}
        <mesh scale={1.45}>
          <icosahedronGeometry args={[1, 2]} />
          <meshBasicMaterial
            color="#34d399"
            wireframe
            transparent
            opacity={0.12}
          />
        </mesh>
        {/* orbit ring */}
        <mesh rotation={[Math.PI / 2.4, 0, 0.4]} scale={1.85}>
          <torusGeometry args={[1, 0.006, 12, 120]} />
          <meshBasicMaterial color="#35e0d8" transparent opacity={0.35} />
        </mesh>
      </group>
    </Float>
  )
}

function Scene() {
  const mouse = useRef({ x: 0, y: 0 })

  useFrame((state) => {
    // r3f normalizes pointer to [-1, 1]
    mouse.current.x += (state.pointer.x - mouse.current.x) * 0.05
    mouse.current.y += (state.pointer.y - mouse.current.y) * 0.05
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 5]} intensity={1.4} color="#b9ffd6" />
      <pointLight position={[-6, -3, -2]} intensity={1.2} color="#35e0d8" />
      <RecoveryOrb mouse={mouse} />
      <Particles />
    </>
  )
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ pointerEvents: 'none' }}
        eventSource={typeof document !== 'undefined' ? document.body : undefined}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
