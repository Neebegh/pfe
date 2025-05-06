// AvatarTryOnPage.jsx
import React, { useState } from 'react';
import AvatarForm from '../components/AvatarForm';
import AvatarCreator from '../components/AvatarCreator';
import AvatarViewer from '../components/AvatarViewer';

const AvatarTryOnPage = () => {
  const [mensurations, setMensurations] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
      <h1>👤 Essayez virtuellement vos vêtements</h1>

      <section>
        <AvatarForm onSubmit={setMensurations} />
      </section>

      {mensurations && (
        <section style={{ marginTop: '2rem' }}>
          <h2>🎨 Créez votre avatar</h2>
          <AvatarCreator onAvatarCreated={setAvatarUrl} />
        </section>
      )}

      {avatarUrl && (
        <section style={{ marginTop: '2rem' }}>
          <h2>👗 Aperçu de votre avatar</h2>
          <div style={{ height: '600px' }}>
            <AvatarViewer avatarUrl={avatarUrl} />
          </div>
        </section>
      )}
    </div>
  );
};

export default AvatarTryOnPage;
