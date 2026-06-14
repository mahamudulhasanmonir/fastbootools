/**
 * Fastboot Engine - Core Fastboot communication logic
 *
 * Provides methods to execute fastboot commands and interact with devices
 * in fastboot mode.
 */

import { exec } from 'child_process';

export class FastbootEngine {
  /** Execute an arbitrary fastboot command and return its stdout. */
  async executeCommand(command: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      exec(`fastboot ${command}`, { windowsHide: true }, (error, stdout, stderr) => {
        if (error) {
          reject(stderr || error.message);
        } else {
          resolve(stdout.trim());
        }
      });
    });
  }

  /** List devices in fastboot mode – returns only device IDs. */
  async listDevices(): Promise<string[]> {
    const output = await this.executeCommand('devices');
    const lines = output.split('\n');
    const ids: string[] = [];
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      const parts = trimmed.split(/\s+/);
      if (parts[0]) ids.push(parts[0]);
    }
    return ids;
  }

  /** Flash a partition with an image file. */
  async flashPartition(partition: string, imagePath: string): Promise<boolean> {
    try {
      await this.executeCommand(`flash ${partition} "${imagePath}"`);
      return true;
    } catch {
      return false;
    }
  }
}

export default FastbootEngine;