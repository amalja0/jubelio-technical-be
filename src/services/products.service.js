const ProductsService = (models) => {
  const {
    Product
  } = models;

  const getAll = async () => {
    return await Product.findAll();
  }

  const findOrCreate = async (payload) => {
    try {
      const [product] = await Product.findOrCreate(payload);
      return product;
    } catch (err) {
      console.log(err)
      if (err?.name === 'SequelizeUniqueConstraintError' || err?.name === 'SequelizeDatabaseError') {
        return await Product.findOne({
          where: {
            product_name: payload.where.product_name
          }
        });
      }
      throw err;
    }
  }

  const bulkCreate = async (payload) => {
    try {
      return await Product.bulkCreate(payload);
    } catch (err) {
      throw err;
    }
  }

  const truncate = async () => {
    await Product.destroy({ truncate: { cascade: true } });
  }

  return {
    getAll,
    findOrCreate,
    bulkCreate,
    truncate,
  }
}

export default ProductsService;