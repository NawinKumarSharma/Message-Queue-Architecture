# Message Queue Architecture with BullMQ

This repository contains a basic setup for a message queue architecture using BullMQ and Redis. The setup includes a worker and a producer script that demonstrate how to enqueue and process tasks.

## Overview

- **Worker**: The worker processes jobs from a queue and performs actions based on the job data. In this example, the worker simulates sending an email.
- **Producer**: The producer adds jobs to the queue, which the worker then processes.
![image](https://github.com/user-attachments/assets/48fa9f8c-62d3-409d-9c49-890402e3261f)

## Prerequisites

Before running the scripts, ensure you have the following installed:

- **Node.js** (v14 or higher recommended)
- **Redis** (installed and running on the default port 6379)

## Installation

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install Dependencies**

   Ensure you are in the directory containing the `package.json` file and install the required packages using npm:

   ```bash
   cd producer
   npm install
   ```

   ```bash
    cd ..
   ```

   ```bash
   cd worker
   npm install
   ```

## Configuration

Both the worker and producer scripts are configured to use Redis running locally on the default port (6379). You can modify the `redisOptions` and `connection` objects if your Redis instance is hosted elsewhere or requires different settings.

## Running the Producer

The producer script adds a job to the `email-queue` queue. To run the producer and add a job, execute:

```bash
npm run dev
```

You can close and run multiple time for the more number of job added to the queue.

## Running the Worker

The worker script listens to the `email-queue` queue and processes jobs. To run the worker, execute:

```bash
npm run dev
```

## How It Works

1. **Producer**:

   - Adds a job to the `email-queue` queue with the data required to simulate sending an email.
   - Logs the job ID upon successful addition.

2. **Worker**:
   - Listens to the `email-queue` queue.
   - Processes each job by simulating email sending after logging job details.
   - Logs the completion or failure of each job.

## Event Handling

The worker script handles various events:

- **completed**: Logs when a job has been successfully completed.
- **failed**: Logs when a job fails and includes the error message.
- **error**: Logs any errors encountered by the worker.

Additionally, the worker handles termination signals (`SIGTERM` and `SIGINT`) to ensure graceful shutdown.

## Example Output

When running the producer:

```
task added to the queue  <job-id>
```

When running the worker:

```
Processing job <job-id> with data: { name: 'anonymous', branch: 'cse general', email: 'abc@gmail.com' }
Sending email to abc@gmail.com with the following details:
Name: anonymous
Branch: cse general
Email sent to abc@gmail.com
Job <job-id> has been completed.
```

## Notes

- The `sendEmail` function is a placeholder and currently just simulates a delay. Replace this with actual email sending logic in a production environment.
- Modify the logging and error handling as needed for your use case.

## Troubleshooting

- Ensure Redis is running and accessible.
- Check for typos or incorrect configurations in the Redis connection settings.
- Review error logs for additional insights if the worker or producer encounter issues.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [BullMQ](https://github.com/OptimalBits/bullmq) for the powerful job and queue management.
- [Redis](https://redis.io/) for the in-memory data structure store.

- Message queuing makes it possible for applications to communicate asynchronously, by sending messages to each other via a queue. A message queue provides temporary storage between the sender and the receiver so that the sender can keep operating without interruption when the destination program is busy or not connected. Asynchronous processing allows a task to call a service, and move on to the next task while the service processes the request at its own pace.
  