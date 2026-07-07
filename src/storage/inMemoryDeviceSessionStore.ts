import { randomUUID } from 'node:crypto';

import type {
  DeviceSessionStore,
  RegisteredDeviceSession,
  RegisterDeviceInput,
  UploadOtpInput,
  UploadedOtp,
} from './storageTypes';

export class InMemoryDeviceSessionStore implements DeviceSessionStore {
  private readonly sessions = new Map<string, RegisteredDeviceSession>();
  private latestOtp?: UploadedOtp;

  register(input: RegisterDeviceInput): RegisteredDeviceSession {
    const existingSession = this.sessions.get(input.deviceId);
    if (existingSession) {
      const updatedSession: RegisteredDeviceSession = {
        ...existingSession,
        relayUrl: input.relayUrl ?? existingSession.relayUrl,
        registeredAt: new Date().toISOString(),
      };

      this.sessions.set(input.deviceId, updatedSession);
      return updatedSession;
    }

    const session: RegisteredDeviceSession = {
      deviceId: input.deviceId,
      relayUrl: input.relayUrl ?? '',
      sessionId: randomUUID(),
      status: 'registered',
      registeredAt: new Date().toISOString(),
    };

    this.sessions.set(input.deviceId, session);
    return session;
  }

  heartbeat(input: RegisterDeviceInput): RegisteredDeviceSession {
    const existingSession = this.sessions.get(input.deviceId);
    if (!existingSession) {
      throw new Error('Device session not found');
    }

    const updatedSession: RegisteredDeviceSession = {
      ...existingSession,
      relayUrl: input.relayUrl ?? existingSession.relayUrl,
      status: 'online',
      lastHeartbeatAt: new Date().toISOString(),
    };

    this.sessions.set(input.deviceId, updatedSession);
    return updatedSession;
  }

  uploadOtp(input: UploadOtpInput): UploadedOtp {
    const existingSession = this.sessions.get(input.deviceId);
    if (!existingSession) {
      throw new Error('Device session not found');
    }

    const uploadedOtp: UploadedOtp = {
      deviceId: input.deviceId,
      sessionId: existingSession.sessionId,
      otp: input.otp,
      message: input.message,
      receivedAt: input.receivedAt,
      uploadedAt: new Date().toISOString(),
    };

    const updatedSession: RegisteredDeviceSession = {
      ...existingSession,
      relayUrl: input.relayUrl ?? existingSession.relayUrl,
      lastOtp: uploadedOtp,
    };

    this.sessions.set(input.deviceId, updatedSession);
    this.latestOtp = uploadedOtp;
    return uploadedOtp;
  }

  deleteByDeviceId(deviceId: string): RegisteredDeviceSession | undefined {
    const existingSession = this.sessions.get(deviceId);
    if (!existingSession) {
      return undefined;
    }

    this.sessions.delete(deviceId);

    if (this.latestOtp?.deviceId === deviceId) {
      this.latestOtp = undefined;
    }

    return existingSession;
  }

  getLatestOtp(): UploadedOtp | undefined {
    return this.latestOtp;
  }

  getByDeviceId(deviceId: string): RegisteredDeviceSession | undefined {
    return this.sessions.get(deviceId);
  }
}
