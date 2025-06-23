import {Sequelize} from "sequelize";
import {SALES_BELONGS_TO_LOCATION_ALIAS, SALES_BELONGS_TO_PRODUCT_ALIAS} from "../models/models.constants.js";

const SalesService = (models) => {
  const {
    Sales,
    Product,
    Location,
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

  const truncate = async () => {
    await Sales.destroy({ truncate: { cascade: true } });
  }

  const findMostSoldProducts = async (payload) => {
    const state = payload?.state;
    try {
      const mostSoldProducts = await Sales.findAll({
        where: state ? {
          '$location.state$': state
        } : {},
        attributes: [
          'product_id',
          [Sequelize.fn('SUM', Sequelize.col('quantity')), 'total_quantity'],
          [Sequelize.fn('SUM', Sequelize.col('sales_amount')), 'total_sales'],
          [Sequelize.fn('SUM', Sequelize.col('profit')), 'profit'],
          [Sequelize.fn('MAX', Sequelize.col('location.state')), 'state'],
          [Sequelize.fn('MAX', Sequelize.col(`${SALES_BELONGS_TO_PRODUCT_ALIAS}.product_name`)), 'product_name']
        ],
        group: ['product_id'],
        order: [[Sequelize.literal('total_quantity'), 'DESC']],
        include: [
          {
            model: Product,
            as: SALES_BELONGS_TO_PRODUCT_ALIAS,
            attributes: [],
            required: true
          },
          {
            model: Location,
            as: SALES_BELONGS_TO_LOCATION_ALIAS,
            attributes: [],
            required: true,
            where: !!state ? { state } : {}
          }
        ],
        limit: 10,
        subQuery: false
      });

      return mostSoldProducts;
    } catch (err) {
      throw err;
    }
  }

  const findMostSoldProductsByState = async () => {
    try {
      const mostSoldProducts = await Sales.findAll({
        attributes: [
          'product_id',
          [Sequelize.fn('SUM', Sequelize.col('quantity')), 'total_quantity'],
        ],
        group: ['product_id'],
        order: [[Sequelize.literal('total_quantity'), 'DESC']],
        include: [ {
          model: Product,
          as: SALES_BELONGS_TO_PRODUCT_ALIAS,
          attributes: [],
          required: true
        }],
        limit: 10,
        subQuery: false
      })

      const mostSoldProductIds = mostSoldProducts.map(p => p.product_id);

      const mapLocations = await Sales.findAll({
        where: {
          product_id: mostSoldProductIds
        },
        attributes: [
          'product_id',
          [Sequelize.fn('SUM', Sequelize.col('quantity')), 'total_quantity'],
          [Sequelize.fn('MAX', Sequelize.col(`${SALES_BELONGS_TO_LOCATION_ALIAS}.state`)), 'state'],
          [Sequelize.fn('MAX', Sequelize.col(`${SALES_BELONGS_TO_PRODUCT_ALIAS}.product_name`)), 'product_name']
        ],
        group: [
          `${SALES_BELONGS_TO_LOCATION_ALIAS}.state`,
          'product_id',
          `${SALES_BELONGS_TO_PRODUCT_ALIAS}.product_name`
        ],
        order: [
          [Sequelize.literal('total_quantity'), 'DESC']
        ],
        include: [
          {
            model: Product,
            as: SALES_BELONGS_TO_PRODUCT_ALIAS,
            attributes: [],
            required: true
          },
          {
            model: Location,
            as: SALES_BELONGS_TO_LOCATION_ALIAS,
            attributes: [],
            required: true
          }
        ],
        limit: 10,
        raw: true
      })

      const states = [...new Set(mapLocations.map(d => d.state))];
      const products = [...new Set(mapLocations.map(d => d.product_name))];

      const heatmapMatrix = states.map(state => {
        return {
          state,
          data: products.map(product => {
            const item = mapLocations.find(d =>
              d.state === state && d.product_name === product
            );
            return item ? item.total_quantity : 0;
          })
        };
      });

      return {
        states,
        products,
        data: heatmapMatrix
      };
    } catch (err) {
      throw err;
    }
  }

  return {
    getAll,
    findOrCreate,
    truncate,
    findMostSoldProducts,
    findMostSoldProductsByState
  }
}

export default SalesService;