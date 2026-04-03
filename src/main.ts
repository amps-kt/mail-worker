import { env } from "./env";
import { Queue } from "bullmq";

import { EMAIL_QUEUE_NAME, type EmailJob } from "./config";
import { connection } from "./redis-connection";
import { mailWorker } from "./worker";

const emailQueue = new Queue<EmailJob>(EMAIL_QUEUE_NAME, { connection });

void emailQueue.setGlobalRateLimit(
  env.MAIL_RATE_LIMIT,
  env.MAIL_RATE_LIMIT_PERIOD,
);

void mailWorker.run();

