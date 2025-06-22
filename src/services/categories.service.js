
const CategoriesService = (models) => {
  const {
    Category,
  } = models;

  const getAll = async () => {
    return await Category.findAll();
  }

  const findOrCreate = async (payload) => {
    try {
      const [category] = await Category.findOrCreate(payload);
      return category;
    } catch (err) {
      if (err?.name === 'SequelizeUniqueConstraintError' || err?.name === 'SequelizeDatabaseError') {
        return await Category.findOne({
          where: {
            category_name: payload.where.category_name
          }
        });
      }
      throw err;
    }
  }

  const bulkCreate = async (payload) => {
    try {
      return await Category.bulkCreate(payload, { validate: true });
    } catch (err) {
      throw err;
    }
  }

  const truncate = async () => {
    await Category.destroy({ truncate: { cascade: true } });
  }

  return {
    getAll,
    findOrCreate,
    bulkCreate,
    truncate,
  }
}

export default CategoriesService;