import { getServerConfig } from '../config';
import { createApp } from '../http';

const activeServers: ReturnType<ReturnType<typeof createApp>['listen']>[] = [];

export function startServer(): void {
  const { host, port } = getServerConfig();
  const app = createApp();

  const server = app.listen(port, host, () => {
    console.log(`OTP Relay Server listening on ${host}:${port}`);
  });

  activeServers.push(server);
}
