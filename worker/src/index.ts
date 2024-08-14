import { Worker } from "bullmq";

// the connection options for Redis
const redisOptions = {
  host: "127.0.0.1",
  port: 6379,
};

const sendEmail = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3 * 1000)); // here should be actual logic to send email. for now , delaying for 3 sec.
};

const worker = new Worker(
  "email-queue",
  async (job: any) => {
    console.log(`Processing job ${job.id} with data:`, job.data);

    // Here you can implement your logic to handle the job, for example:
    const { name, branch, email } = job.data;

    // Simulate processing
    console.log(`Sending email to ${email} with the following details:`);
    console.log(`Name: ${name}`);
    console.log(`Branch: ${branch}`);

    await sendEmail();

    console.log(`Email sent to ${email}`);
  },
  {
    connection: redisOptions,
    // Other worker options can be added here
  }
);

// Handle worker events
worker.on("completed", (job) => {
  console.log(`Job ${job.id} has been completed.`);
});

worker.on("failed", (job, err) => {
  console.error(`Job  has failed with error: ${err.message}`);
});

worker.on("error", (err) => {
  console.error("Worker encountered an error:", err);
});

// Optionally handle termination signals
process.on("SIGTERM", () => worker.close().then(() => process.exit(0)));
process.on("SIGINT", () => worker.close().then(() => process.exit(0)));
