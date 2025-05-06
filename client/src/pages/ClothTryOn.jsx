import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const Cloth = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[2, 2, 20, 20]} />
      <meshStandardMaterial color="lightblue" wireframe />
    </mesh>
  );
};

const ClothTryOn = () => {
  return (
    <div style={{ height: '600px' }}>
      <Canvas camera={{ position: [0, 1, 5] }}>
        <ambientLight />
        <directionalLight position={[2, 2, 2]} />
        <Cloth />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default ClothTryOn;
