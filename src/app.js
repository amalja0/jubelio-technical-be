import express from "express";
import cors from "cors";
import analyticsReportingRoute from "./routes/analytics-reporting.route.js";
import {getDB, initializeDB} from "./models/index.js";

const app = express();

async function startServer() {
  try {
    const db = await initializeDB();
    await getDB().sequelize.authenticate();

    app.locals.db = db;

    app.use(cors())
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    const analyticsRouter = analyticsReportingRoute();

    app.use('/api', analyticsRouter);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    })
  } catch (err) {
    console.error('Initialization error:', err);
    process.exit(1);
  }
}

startServer();