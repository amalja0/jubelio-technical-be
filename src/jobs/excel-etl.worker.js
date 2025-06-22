import { Worker } from 'worker_threads';
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const EtlWorker = async () => {
  const workerPath = path.resolve(__dirname, 'etl-processor.js');
  const activeWorkers = new Map();

  const processFile = async (filePath, batchSize = 100) => {
    return new Promise((resolve, reject) => {
      const worker = new Worker(workerPath, {
        workerData: { filePath, batchSize }
      });

      const workerId = Date.now();
      activeWorkers.set(workerId, worker);

      worker.on('message', (message) => {
        switch (message.status) {
          case 'completed':
            resolve(message.rowCount);
            cleanupWorker(workerId);
            break;
          case 'failed':
            reject(new Error(message.error));
            cleanupWorker(workerId);
            break;
          default:
            console.log('Worker progress:', message);
        }
      });

      worker.on('error', (error) => {
        reject(error);
        cleanupWorker(workerId);
      });

      worker.on('exit', (code) => {
        if (code !== 0) {
          reject(new Error(`Worker stopped with code ${code}`));
        }
        cleanupWorker(workerId);
      });
    })
  }

  const cleanupWorker = (workerId) => {
    const worker = activeWorkers.get(workerId);
    if (worker) {
      worker.terminate();
      activeWorkers.delete(workerId);
    }
  }

  return { processFile, cleanupWorker };
}

export default EtlWorker;