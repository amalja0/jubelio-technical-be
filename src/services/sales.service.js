const SalesService = (models) => {
  const {
    Sales
  } = models;

  const getAll = async () => {
    return await Sales.findAll();
  }

  const findOrCreate = async (payload) => {
    try {
      const [sales] = await Sales.findOrCreate(payload);
      return sales;
    } catch (err) {
      console.log(err)
      if (err?.name === 'SequelizeUniqueConstraintError' || err?.name === 'SequelizeDatabaseError') {
        return await Sales.findOne({
          where: {
            postal_code: payload.where.postal_code
          }
        });
      }
      throw err;
    }
  }

  return {
    getAll,
    findOrCreate
  }
}

export default SalesService;