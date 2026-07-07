import { Router } from 'express';

import { getDeviceSessionStore } from '../../storage';

export const deregisterDeviceRouter = Router();

deregisterDeviceRouter.delete('/', (request, response) => {
  const deviceId = String(request.body?.deviceId ?? request.query?.deviceId ?? '').trim();

  if (!deviceId) {
    response.status(400).json({
      error: 'deviceId is required',
    });
    return;
  }

  const deletedSession = getDeviceSessionStore().deleteByDeviceId(deviceId);
  if (!deletedSession) {
    response.status(404).json({
      error: 'device session not found',
    });
    return;
  }

  response.status(200).json({
    deviceId: deletedSession.deviceId,
    sessionId: deletedSession.sessionId,
    status: 'deleted',
  });
});
