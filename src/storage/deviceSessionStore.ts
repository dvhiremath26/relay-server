import { InMemoryDeviceSessionStore } from './inMemoryDeviceSessionStore';
import type { DeviceSessionStore } from './storageTypes';

const defaultStore = new InMemoryDeviceSessionStore();

export function getDeviceSessionStore(): DeviceSessionStore {
  return defaultStore;
}
