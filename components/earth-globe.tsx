'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { useRef, useState } from 'react'
import type { Mesh } from 'three'

const GlobeMesh = ({ onSelect }: { onSelect: () => void }) => {
  const mesh = useRef<Mesh>(null)
  useFrame((_, delta) => { if (mesh.current) mesh.current.rotation.y += delta * 0.08 })
  return <mesh ref={mesh} onClick={onSelect}><sphereGeometry args={[1.7, 64, 64]} /><meshStandardMaterial color="#126782" roughness={0.72} metalness={0.12} wireframe /></mesh>
}

export const EarthGlobe = () => {
  const [selected, setSelected] = useState(false)
  return <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#050d18] p-4"><div className="flex items-center justify-between"><div><h2 className="text-2xl font-semibold">Globe météo immersif</h2><p className="mt-1 text-sm text-slate-400">Cliquez sur le globe pour simuler une sélection locale.</p></div>{selected && <span className="rounded-full bg-cyan-400/15 px-3 py-1 text-xs text-cyan-200">Zone sélectionnée</span>}</div><div className="mt-3 h-[360px]"><Canvas camera={{ position: [0, 0, 4.5], fov: 42 }}><color attach="background" args={['#050d18']} /><ambientLight intensity={1.1} /><pointLight position={[4, 3, 4]} intensity={18} color="#8de6ff" /><Stars radius={80} depth={25} count={1800} factor={3} saturation={0} fade /><GlobeMesh onSelect={() => setSelected(true)} /><OrbitControls enablePan={false} minDistance={3.2} maxDistance={6} /></Canvas></div></section>
}
