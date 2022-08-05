import { ConsoleLogger } from '@nestjs/common';

const logger = new ConsoleLogger('HTTP');

export const httpLogCallback = (config, response) => {
  const log = `-> [${config.method}] ${config.url} ${response.status}`;
  logger.log(log);
};
