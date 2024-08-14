import { Queue } from "bullmq";

const notificationQueue = new Queue("email-queue", {
  connection: {
    host: "127.0.0.1",
    port: 6379,
  },
});

async function init() {
  const res = await notificationQueue.add("new message", {
    name: "anonymous",
    branch: "cse general",
    email: "abc@gmail.com",
  });
  console.log("task added to the queue ", res.id);
}
init();
