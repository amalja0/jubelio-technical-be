import Sequelize from "sequelize";
import {initAttributes, initOptions} from "./models.meta.js";
import {
  INVENTORY_MOVEMENT_MODEL_NAME,
  LOCATION_MODEL_NAME,
  PRODUCT_MODEL_NAME,
  SALES_BELONGS_TO_LOCATION_ALIAS,
  SALES_BELONGS_TO_LOCATION_FK,
  SALES_BELONGS_TO_PRODUCT_ALIAS,
  SALES_BELONGS_TO_PRODUCT_FK,
  SALES_BELONGS_TO_SEGMENT_ALIAS,
  SALES_BELONGS_TO_SEGMENT_FK,
  SALES_HAS_MANY_INVENTORY_MOVEMENT_ALIAS,
  SALES_HAS_MANY_INVENTORY_MOVEMENT_FK,
  SALES_HAS_MANY_INVENTORY_MOVEMENT_SOURCE_KEY,
  SALES_MODEL_NAME,
  SALES_TABLE_NAME,
  SEGMENT_MODEL_NAME
} from "./models.constants.js";

const schemaAttributes = initAttributes({
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  ship_date: {
    type: Sequelize.DATE,
  },
  ship_mode: {
    type: Sequelize.STRING,
  },
  customer_name: {
    type: Sequelize.STRING,
  },
  quantity: {
    type: Sequelize.SMALLINT,
  },
  sales_amount: {
    type: Sequelize.FLOAT,
  },
  discount: {
    type: Sequelize.FLOAT,
    validate: {
      min: 0,
      max: 1
    }
  },
  profit: {
    type: Sequelize.FLOAT,
  },
  profit_ratio: {
    type: Sequelize.FLOAT,
    validate: {
      min: 0,
      max: 1
    }
  },
  number_of_record: {
    type: Sequelize.SMALLINT,
  },
  order_id: {
    type: Sequelize.STRING,
    unique: true
  },
  order_date: {
    type: Sequelize.DATE,
  },
})

const schemaOptions = initOptions({
  tableName: SALES_TABLE_NAME,
})

const salesModel = (sequelize) => {
  const sales = sequelize.define(
    SALES_MODEL_NAME,
    schemaAttributes,
    schemaOptions
  )

  sales.associate = (associationModels) => {
    sales.belongsTo(associationModels[PRODUCT_MODEL_NAME], {
      foreignKey: SALES_BELONGS_TO_PRODUCT_FK,
      as: SALES_BELONGS_TO_PRODUCT_ALIAS
    })

    sales.belongsTo(associationModels[LOCATION_MODEL_NAME], {
      foreignKey: SALES_BELONGS_TO_LOCATION_FK,
      as: SALES_BELONGS_TO_LOCATION_ALIAS
    })

    sales.belongsTo(associationModels[SEGMENT_MODEL_NAME], {
      foreignKey: SALES_BELONGS_TO_SEGMENT_FK,
      as: SALES_BELONGS_TO_SEGMENT_ALIAS
    })

    sales.hasMany(associationModels[INVENTORY_MOVEMENT_MODEL_NAME], {
      sourceKey: SALES_HAS_MANY_INVENTORY_MOVEMENT_SOURCE_KEY,
      foreignKey: SALES_HAS_MANY_INVENTORY_MOVEMENT_FK,
      as: SALES_HAS_MANY_INVENTORY_MOVEMENT_ALIAS
    })
  }

  return sales;
}

export default salesModel;