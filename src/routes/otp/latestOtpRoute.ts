import { Router } from 'express';

import { getDeviceSessionStore } from '../../storage';

export const latestOtpRouter = Router();

latestOtpRouter.get('/', (_request, response) => {
  const latestOtp = getDeviceSessionStore().getLatestOtp();

  if (!latestOtp) {
    response.status(404).json({
      error: 'no otp available',
    });
    return;
  }

  response.status(200).json(latestOtp);
});
