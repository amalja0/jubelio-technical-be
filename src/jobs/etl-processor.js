import { workerData, parentPort } from 'worker_threads';
import EtlService from "../services/etl.service.js";
import { fileURLToPath } from "url";
import path from "path";
import {getDB, initializeDB} from "../models/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const EtlProcessor = async () => {
  try {
    const { filePath, batchSize } = workerData;

    await initializeDB();

    await getDB().sequelize.authenticate();
    parentPort.postMessage({
      status: "connection-verified",
      file: filePath,
    });

    parentPort.postMessage({
      status: "started",
      file: filePath,
    });

    const etlService = EtlService(getDB().models);
    const rowCount = await etlService.processExcel(filePath, batchSize);

    parentPort.postMessage({
      status: 'completed',
      rowCount,
      file: filePath
    });
  } catch (error) {
    console.log(error)
    // Send error to main thread
    parentPort.postMessage({
      status: 'failed',
      error: error.message,
      stack: error.stack
    });
  }
}

EtlProcessor();