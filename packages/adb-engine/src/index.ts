/**
 * ADB Engine – real implementation using Node's child_process.
 * Provides thin wrappers around the `adb` CLI.
 */
import { exec } from 'child_process';

export class AdbEngine {
  /** Execute an arbitrary adb command and return its stdout. */
  async executeCommand(command: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      exec(`adb ${command}`, { windowsHide: true }, (error, stdout, stderr) => {
        if (error) {
          reject(stderr || error.message);
        } else {
          resolve(stdout.trim());
        }
      });
    });
  }

  /** List connected devices (returns only the device IDs). */
  async listDevices(): Promise<string[]> {
    try {
      // Prefer the detailed list; if it fails, fall back to the simple list.
      const output = await this.executeCommand('devices -l');
      return this.parseDeviceList(output);
    } catch {
      // Fallback to simple `adb devices` output.
      const output = await this.executeCommand('devices');
      return this.parseDeviceList(output);
    }
  }

  /** Parse the output of `adb devices` (both simple and -l formats). */
  private parseDeviceList(output: string): string[] {
    const lines = output.split('\n').slice(1); // skip header line
    const ids: string[] = [];
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      const parts = trimmed.split(/\s+/);
      if (parts[0]) ids.push(parts[0]);
    }
    return ids;
  }

  /** Check if a specific device is in the "device" state. */
  async isDeviceConnected(deviceId: string): Promise<boolean> {
    try {
      const state = await this.executeCommand(`-s ${deviceId} get-state`);
      return state.toLowerCase() === 'device';
    } catch {
      return false;
    }
  }

  /** Retrieve a system property from a device. */
  async getProp(deviceId: string, prop: string): Promise<string> {
    const value = await this.executeCommand(`-s ${deviceId} shell getprop ${prop}`);
    return value;
  }
}

export default AdbEngine;