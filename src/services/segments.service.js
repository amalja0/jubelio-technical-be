import {getDB} from "../models/index.js";

const SegmentsService = (models) => {
  const {
    Segment
  } = models;

  const getAll = async () => {
    return await Segment.findAll();
  }

  const findOrCreate = async (payload) => {
    try {
      const [segment] = await Segment.findOrCreate(payload);
      return segment;
    } catch (err) {
      if (err?.name === 'SequelizeUniqueConstraintError' || err?.name === 'SequelizeDatabaseError') {
        return await Segment.findOne({
          where: {
            segment_name: payload.where.segment_name
          }
        });
      }
      throw err;
    }
  }

  const bulkCreate = async (payload) => {
    try {
      return await Segment.bulkCreate(payload);
    } catch (err) {
      throw err;
    }
  }

  const truncate = async () => {
    await Segment.destroy({ truncate: { cascade: true } });
  }

  return {
    getAll,
    findOrCreate,
    bulkCreate,
    truncate,
  }
}

export default SegmentsService;