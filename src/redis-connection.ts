import IORedis from "ioredis";

import { env } from "./env";

export const connection = new IORedis({
  port: env.REDIS_PORT,
  maxRetriesPerRequest: null,
});
