'use client';

import { Suspense } from 'react';
import PricingContent from './PricingContent';

export default function PricingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    }>
      <PricingContent />
    </Suspense>
  );
}
