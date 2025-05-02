import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, ContactShadows } from '@react-three/drei';

// ✅ Ce composant charge dynamiquement l'avatar selon le profil
const Model = ({ profile }) => {
  const avatarFile = {
    'Silhouette très fine': '/models/avatar_xs.glb',
    'Silhouette mince': '/models/avatar_s.glb',
    'Corpulence moyenne': '/models/avatar_m.glb',
    'Silhouette sportive': '/models/avatar_l.glb',
    'Silhouette ronde': '/models/avatar_xl.glb'
  }[profile] || '/models/avatar_normal.glb'; // Fallback par défaut

  const { scene } = useGLTF(avatarFile);
  const ref = useRef();

  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.005;
  });

  scene.position.set(0, -2.3, 0);
  return <primitive ref={ref} object={scene} scale={1.1} />;
};

const Avatar3D = ({ profile }) => {
  return (
    <div style={{ height: '500px', width: '100%', marginTop: '1rem', borderRadius: '10px', overflow: 'hidden', backgroundColor: '#fff' }}>
      <Canvas camera={{ position: [0, 1.5, 6] }}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[2, 5, 5]} intensity={0.6} />
        <Suspense fallback={null}>
          <Model profile={profile} />
          <ContactShadows position={[0, -2.4, 0]} opacity={0.25} scale={10} blur={1.5} far={4.5} />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} />
      </Canvas>
    </div>
  );
};

export default Avatar3D;
