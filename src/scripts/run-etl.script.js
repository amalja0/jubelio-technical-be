import EtlWorker from "../jobs/excel-etl.worker.js";

(async () => {
  try {
    const excelEtlWorker = await EtlWorker();
    const rowCount = await excelEtlWorker.processFile('public/kaggle_supermarket_dataset.xlsx');
    console.log(`Processed ${rowCount} rows`);
  } catch (err) {
    console.error('ETL failed:', err);
  }
})();