'use client';

import React, { useEffect, useState } from 'react';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top horizontal line indicator */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-white/10 z-50 pointer-events-none">
        <div
          className="h-full bg-primaryWhite transition-all duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Subtle vertical indicator on desktop right edge */}
      <div className="hidden lg:flex fixed right-4 top-1/2 -translate-y-1/2 z-30 flex-col items-center space-y-2 pointer-events-none">
        <span className="text-[9px] font-mono uppercase tracking-widest text-midGray rotate-90 origin-center mb-6">
          MOMENT
        </span>
        <div className="w-[1px] h-24 bg-white/14 relative overflow-hidden">
          <div
            className="w-full bg-primaryWhite transition-all duration-150"
            style={{ height: `${progress}%` }}
          />
        </div>
        <span className="text-[9px] font-mono uppercase tracking-widest text-midGray rotate-90 origin-center mt-6">
          WORLD
        </span>
      </div>
    </>
  );
}
