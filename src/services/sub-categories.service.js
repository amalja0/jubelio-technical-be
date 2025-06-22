const SubCategoriesService = (models) => {
  const {
    SubCategory
  } = models;

  const getAll = async () => {
    return await SubCategory.findAll();
  }

  const findOrCreate = async (payload) => {
    try {
      const [subCategory] = await SubCategory.findOrCreate(payload);
      return subCategory;
    } catch (err) {
      console.log(err)
      if (err?.name === 'SequelizeUniqueConstraintError' || err?.name === 'SequelizeDatabaseError') {
        return await SubCategory.findOne({
          where: {
            sub_category_name: payload.where.sub_category_name
          }
        });
      }
      throw err;
    }
  }

  const bulkCreate = async (payload) => {
    try {
      return await SubCategory.bulkCreate(payload);
    } catch (err) {
      throw err;
    }
  }

  const truncate = async () => {
    await SubCategory.destroy({ truncate: { cascade: true } });
  }

  return {
    getAll,
    findOrCreate,
    bulkCreate,
    truncate,
  }
}

export default SubCategoriesService;