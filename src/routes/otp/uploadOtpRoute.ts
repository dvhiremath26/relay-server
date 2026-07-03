import { Router } from 'express';

import { getDeviceSessionStore } from '../../storage';

export const otpRouter = Router();

otpRouter.post('/', (request, response) => {
  const deviceId = String(request.body?.deviceId ?? '').trim();
  const otp = String(request.body?.otp ?? '').trim();
  const message = String(request.body?.message ?? '').trim();
  const receivedAt = String(request.body?.receivedAt ?? '').trim();
  const relayUrl = String(request.body?.relayUrl ?? '').trim();

  if (!deviceId || !otp || !message || !receivedAt) {
    response.status(400).json({
      error: 'deviceId, otp, message, and receivedAt are required',
    });
    return;
  }

  try {
    const uploadedOtp = getDeviceSessionStore().uploadOtp({
      deviceId,
      otp,
      message,
      receivedAt,
      relayUrl: relayUrl || undefined,
    });

    response.status(201).json(uploadedOtp);
  } catch {
    response.status(404).json({
      error: 'device session not found',
    });
  }
});
