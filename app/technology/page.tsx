'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TechnologyPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/compiler');
  }, [router]);

  return (
    <div className="min-h-screen bg-surface text-text-primary p-8 font-mono text-xs flex items-center justify-center">
      <div>Redirecting to Q-Psi Compiler Research...</div>
    </div>
  );
}
