import { Router } from 'express';

import { getDeviceSessionStore } from '../../storage';

export const heartbeatRouter = Router();

heartbeatRouter.post('/', (request, response) => {
  const deviceId = String(request.body?.deviceId ?? '').trim();
  const relayUrl = String(request.body?.relayUrl ?? '').trim();

  if (!deviceId) {
    response.status(400).json({
      error: 'deviceId is required',
    });
    return;
  }

  try {
    const session = getDeviceSessionStore().heartbeat({
      deviceId,
      relayUrl: relayUrl || undefined,
    });

    response.status(200).json(session);
  } catch {
    response.status(404).json({
      error: 'device session not found',
    });
  }
});
