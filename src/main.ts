import { Queue } from "bullmq";
import "dotenv/config";

import { EMAIL_QUEUE_NAME, type EmailJob } from "./config";
import { env } from "./env";
import { connection } from "./redis-connection";
import { mailWorker } from "./worker";

const emailQueue = new Queue<EmailJob>(EMAIL_QUEUE_NAME, { connection });

(async () => {
  await emailQueue.setGlobalRateLimit(
    env.MAIL_RATE_LIMIT,
    env.MAIL_RATE_LIMIT_PERIOD_MILLIS,
  );

  if (!mailWorker.isRunning()) {
    await mailWorker.run();
  }
})();
