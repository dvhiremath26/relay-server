import { Router } from 'express';

import { getDeviceSessionStore } from '../../storage';

export const registerDeviceRouter = Router();

registerDeviceRouter.post('/', (request, response) => {
  const deviceId = String(request.body?.deviceId ?? '').trim();
  const relayUrl = String(request.body?.relayUrl ?? '').trim();

  if (!deviceId) {
    response.status(400).json({
      error: 'deviceId is required',
    });
    return;
  }

  const session = getDeviceSessionStore().register({
    deviceId,
    relayUrl: relayUrl || undefined,
  });

  response.status(201).json(session);
});
