// AvatarViewer.jsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const Model = ({ url }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
};

const AvatarViewer = ({ avatarUrl }) => (
  <Canvas camera={{ position: [0, 1.5, 3] }}>
    <ambientLight intensity={0.5} />
    <directionalLight position={[2, 2, 2]} />
    <OrbitControls />
    {avatarUrl && <Model url={avatarUrl} />}
  </Canvas>
);

export default AvatarViewer;
