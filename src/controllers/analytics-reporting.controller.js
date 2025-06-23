import SalesService from "../services/sales.service.js";

const AnalyticsReportingController = (models) => {
  const salesService = SalesService(models);

  const getMostSoldProducts = async (req, res) => {
    try {
      const mostSoldProducts = await salesService.findMostSoldProducts(req.query);
      res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
      res.set('Pragma', 'no-cache');
      res.status(200).json(mostSoldProducts);
    } catch (e) {
      console.log(e)
      res.status(500).send({});
    }
  }

  const getMostSoldProductsByState = async (req, res) => {
    try {
      const mostSoldProductsByState = await salesService.findMostSoldProductsByState();
      res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
      res.set('Pragma', 'no-cache');
      res.status(200).json(mostSoldProductsByState);
    } catch (e) {
      console.log(e)
      res.status(500).send({});
    }
  }

  return {
    getMostSoldProducts,
    getMostSoldProductsByState
  }
}

export default AnalyticsReportingController;