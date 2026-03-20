'use client';

import { Suspense } from 'react';
import PackageSelectionContent from './PackageSelectionContent';

export default function PackageSelectionPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    }>
      <PackageSelectionContent />
    </Suspense>
  );
}
