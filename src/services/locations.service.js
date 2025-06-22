const LocationsService = (models) => {
  const {
    Location
  } = models;

  const getAll = async () => {
    return await Location.findAll();
  }

  const findOrCreate = async (payload) => {
    try {
      const [location] = await Location.findOrCreate(payload);
      return location;
    } catch (err) {
      console.log(err)
      if (err?.name === 'SequelizeUniqueConstraintError' || err?.name === 'SequelizeDatabaseError') {
        return await Location.findOne({
          where: {
            postal_code: payload.where.postal_code
          }
        });
      }
      throw err;
    }
  }

  const bulkCreate = async (payload) => {
    try {
      return await Location.bulkCreate(payload);
    } catch (err) {
      throw err;
    }
  }

  const truncate = async () => {
    await Location.destroy({ truncate: { cascade: true } });
  }

  return {
    getAll,
    findOrCreate,
    bulkCreate,
    truncate,
  }
}

export default LocationsService;