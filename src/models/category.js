import Sequelize from "sequelize";
import {initAttributes, initOptions} from "./models.meta.js";
import {
  CATEGORY_HAS_MANY_SUB_CATEGORY_ALIAS,
  CATEGORY_HAS_MANY_SUB_CATEGORY_FK,
  CATEGORY_HAS_MANY_SUB_PRODUCT_ALIAS,
  CATEGORY_HAS_MANY_SUB_PRODUCT_FK,
  CATEGORY_MODEL_NAME,
  CATEGORY_TABLE_NAME,
  PRODUCT_MODEL_NAME,
  SUB_CATEGORY_MODEL_NAME
} from "./models.constants.js";

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
})

const schemaOptions = initOptions({
  tableName: CATEGORY_TABLE_NAME,
})

const categoriesModel = (sequelize, DataTypes) => {
  const categories = sequelize.define(
    CATEGORY_MODEL_NAME,
    schemaAttributes,
    schemaOptions
  )

  categories.associate = (associationModels) => {
    categories.hasMany(associationModels[SUB_CATEGORY_MODEL_NAME], {
      foreignKey: CATEGORY_HAS_MANY_SUB_CATEGORY_FK,
      as: CATEGORY_HAS_MANY_SUB_CATEGORY_ALIAS
    })

    categories.hasMany(associationModels[PRODUCT_MODEL_NAME], {
      foreignKey: CATEGORY_HAS_MANY_SUB_PRODUCT_FK,
      as: CATEGORY_HAS_MANY_SUB_PRODUCT_ALIAS
    })
  }

  return categories;
}

export default categoriesModel;