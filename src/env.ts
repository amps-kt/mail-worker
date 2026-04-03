import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  skipValidation: !process.env.VALIDATE_ENV_VARS,
  server: {
    /** SMTP server host */
    MAIL_HOST: z.string(),
    /** SMTP server port */
    MAIL_PORT: z.coerce.number(),
    /** SMTP user */
    MAIL_USER: z.email(),
    /** SMTP password (if applicable) */
    MAIL_PASSWORD: z.string().optional(),
    /** Port for redis instance (for MQ) */
    REDIS_PORT: z.coerce.number(),
    /** How many emails is the service allowed to send per period? */
    MAIL_RATE_LIMIT: z.coerce.number(),
    /** What is the period for the email rate limit? */
    MAIL_RATE_LIMIT_PERIOD: z.coerce.number(),
  },
  runtimeEnv: process.env,
});
