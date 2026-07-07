import express from 'express';

import {
  deregisterDeviceRouter,
  heartbeatRouter,
  healthRouter,
  latestOtpRouter,
  otpRouter,
  registerDeviceRouter,
} from '../routes';

export function createApp(): express.Express {
  const app = express();

  app.use(express.json());
  app.use('/health', healthRouter);
  app.use('/heartbeat', heartbeatRouter);
  app.use('/otp/latest', latestOtpRouter);
  app.use('/otp', otpRouter);
  app.use('/register', registerDeviceRouter);
  app.use('/register', deregisterDeviceRouter);

  return app;
}
