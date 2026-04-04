import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    /** SMTP server host */
    MAIL_HOST: z.string(),
    /** SMTP server port */
    MAIL_PORT: z.coerce.number(),
    /** SMTP user */
    MAIL_USER: z.email(),
    /** SMTP password (if applicable) */
    MAIL_PASSWORD: z.string().optional(),

    /** Host for redis instance (for MQ) */
    REDIS_HOST: z.coerce.string(),
    /** Port for redis instance (for MQ) */
    REDIS_PORT: z.coerce.number(),
    
    /** number of emails the service is allowed to send per period */
    MAIL_RATE_LIMIT: z.coerce.number(),
    /** Period for rate limit in milliseconds*/
    MAIL_RATE_LIMIT_PERIOD_MILLIS: z.coerce.number(),
  },
  runtimeEnv: process.env,
});
