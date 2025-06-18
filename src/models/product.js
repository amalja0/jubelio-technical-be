import Sequelize from "sequelize";
import {initAttributes, initOptions} from "./models.meta";
import {
  CATEGORY_MODEL_NAME, INVENTORY_MOVEMENT_MODEL_NAME,
  PRODUCT_BELONGS_TO_CATEGORY_ALIAS,
  PRODUCT_BELONGS_TO_CATEGORY_FK,
  PRODUCT_BELONGS_TO_SUB_CATEGORY_ALIAS,
  PRODUCT_BELONGS_TO_SUB_CATEGORY_FK, PRODUCT_HAS_MANY_INVENTORY_MOVEMENT_ALIAS, PRODUCT_HAS_MANY_INVENTORY_MOVEMENT_FK,
  PRODUCT_HAS_MANY_SALES_ALIAS,
  PRODUCT_HAS_MANY_SALES_FK,
  PRODUCT_MODEL_NAME,
  PRODUCT_TABLE_NAME,
  SALES_MODEL_NAME,
  SUB_CATEGORY_MODEL_NAME
} from "./models.constants";

const schemaAttributes = initAttributes({
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  name: {
    type: Sequelize.DATE,
    unique: true,
  },
  manufacturer: {
    type: Sequelize.STRING,
  },
  base_price: {
    type: Sequelize.FLOAT,
  }
})

const schemaOptions = initOptions({
  tableName: PRODUCT_TABLE_NAME,
})

const productsModel = (sequelize) => {
  const products = sequelize.define(
    PRODUCT_MODEL_NAME,
    schemaAttributes,
    schemaOptions
  )

  products.associate = (associationModels) => {
    products.belongsTo(associationModels[CATEGORY_MODEL_NAME], {
      foreignKey: PRODUCT_BELONGS_TO_CATEGORY_FK,
      as: PRODUCT_BELONGS_TO_CATEGORY_ALIAS
    })

    products.belongsTo(associationModels[SUB_CATEGORY_MODEL_NAME], {
      foreignKey: PRODUCT_BELONGS_TO_SUB_CATEGORY_FK,
      as: PRODUCT_BELONGS_TO_SUB_CATEGORY_ALIAS
    })

    products.hasMany(associationModels[SALES_MODEL_NAME], {
      foreignKey: PRODUCT_HAS_MANY_SALES_FK,
      as: PRODUCT_HAS_MANY_SALES_ALIAS
    })

    products.hasMany(associationModels[INVENTORY_MOVEMENT_MODEL_NAME], {
      foreignKey: PRODUCT_HAS_MANY_INVENTORY_MOVEMENT_FK,
      as: PRODUCT_HAS_MANY_INVENTORY_MOVEMENT_ALIAS
    })
  }

  return products;
}

export default productsModel;