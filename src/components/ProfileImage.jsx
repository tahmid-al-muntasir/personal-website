'use client';

import { useState } from 'react';

export default function ProfileImage() {
  const [failedToLoad, setFailedToLoad] = useState(false);

  if (failedToLoad) {
    return (
      <div
        aria-label="Tahmid Al Muntasir initials"
        style={{
          width: '100%',
          aspectRatio: '1 / 1',
          display: 'grid',
          placeItems: 'center',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--line)',
          background: 'rgba(148, 163, 184, 0.08)',
          margin: '0.85rem 0 1rem',
        }}
      >
        <div
          style={{
            width: '6.5rem',
            height: '6.5rem',
            borderRadius: '999px',
            display: 'grid',
            placeItems: 'center',
            fontWeight: 700,
            letterSpacing: '0.16em',
            color: 'var(--text)',
            border: '1px solid var(--line-strong)',
            background: 'linear-gradient(160deg, rgba(34, 211, 238, 0.18), rgba(148, 163, 184, 0.12))',
          }}
        >
          TAM
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        width: '100%',
        aspectRatio: '1 / 1',
        overflow: 'hidden',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--line)',
        background: 'rgba(148, 163, 184, 0.08)',
        margin: '0.85rem 0 1rem',
      }}
    >
      <img
        src="/media/profile.jpg"
        alt="Tahmid Al Muntasir"
        onError={() => setFailedToLoad(true)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />
    </div>
  );
}