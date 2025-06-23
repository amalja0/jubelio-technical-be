import express from "express";
import AnalyticsReportingController  from '../controllers/analytics-reporting.controller.js'
import {getDB} from "../models/index.js";

const router = express.Router();

export default function analyticsReportingRoute () {
  const db = getDB();
  const models = db?.sequelize?.models
  const analyticsReportingController = AnalyticsReportingController(models);

  router.get(
    "/most-sold-products",
    analyticsReportingController.getMostSoldProducts
  );

  router.get(
    "/most-sold-products-by-state",
    analyticsReportingController.getMostSoldProductsByState
  );

  return router;
}