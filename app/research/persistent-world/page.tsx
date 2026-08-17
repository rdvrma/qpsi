'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PersistentWorldResearchPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/prototype');
  }, [router]);

  return (
    <div className="min-h-screen bg-surface text-text-primary p-8 font-mono text-xs flex items-center justify-center">
      <div>Loading Persistent World Classical Reference Engine...</div>
    </div>
  );
}
