import React from 'react';

/**
 * Placeholder UI for the Recovery Manager (v1.5).
 * Real implementation will expose download, verify, flash and temporary boot actions.
 */
export const Recovery: React.FC = () => {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-2">Recovery Manager</h2>
      <p className="text-gray-600">
        Download recovery images, verify checksums, flash or temporarily boot a recovery.
      </p>
      <div className="text-sm text-gray-500 italic">(Functionality coming soon)</div>
    </section>
  );
};