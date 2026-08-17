'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function FounderPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/about');
  }, [router]);

  return (
    <div className="min-h-screen bg-surface text-text-primary p-8 font-mono text-xs flex items-center justify-center">
      <div>Redirecting to About Q-Psi &amp; Ecosystem...</div>
    </div>
  );
}
