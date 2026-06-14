import React from 'react';
import { Terminal } from './Terminal';

/**
 * Main dashboard UI for the desktop application.
 * It provides placeholder sections for the core v1.0 features.
 */
export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-600">DroidForge Desktop</h1>
        <nav className="space-x-4">
          <button className="text-sm font-medium hover:text-blue-500">Device Overview</button>
          <button className="text-sm font-medium hover:text-blue-500">ADB Center</button>
          <button className="text-sm font-medium hover:text-blue-500">Fastboot Center</button>
        </nav>
      </header>

      {/* Main content */}
      <main className="p-6">
        {/* Device Overview placeholder */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Device Overview</h2>
          <p className="text-gray-600">
            Device name, codename, Android version, battery level, storage usage, etc.
          </p>
        </section>

        {/* ADB Center placeholder */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">ADB Center</h2>
          <p className="text-gray-600">Reboot, install APK, file manager, shell console, …</p>
        </section>

        {/* Fastboot Center placeholder */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Fastboot Center</h2>
          <p className="text-gray-600">Flash partitions, list/backup/restore partitions, slot switch, …</p>
        </section>

        {/* Terminal placeholder – part of Shell Console */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Shell Console</h2>
          <Terminal />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white text-center py-3 text-sm text-gray-500">
        © 2026 DroidForge – Modern Android Device Management Platform
      </footer>
    </div>
  );
};
