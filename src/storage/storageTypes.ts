export type RegisteredDeviceSession = {
  deviceId: string;
  relayUrl: string;
  sessionId: string;
  status: 'registered' | 'online' | 'offline';
  registeredAt: string;
  lastHeartbeatAt?: string;
  lastOtp?: UploadedOtp;
};

export type RegisterDeviceInput = {
  deviceId: string;
  relayUrl?: string;
};

export type UploadedOtp = {
  deviceId: string;
  sessionId: string;
  otp: string;
  message: string;
  receivedAt: string;
  uploadedAt: string;
};

export type UploadOtpInput = {
  deviceId: string;
  otp: string;
  message: string;
  receivedAt: string;
  relayUrl?: string;
};

export interface DeviceSessionStore {
  register(input: RegisterDeviceInput): RegisteredDeviceSession;
  heartbeat(input: RegisterDeviceInput): RegisteredDeviceSession;
  uploadOtp(input: UploadOtpInput): UploadedOtp;
  getLatestOtp(): UploadedOtp | undefined;
  getByDeviceId(deviceId: string): RegisteredDeviceSession | undefined;
}
