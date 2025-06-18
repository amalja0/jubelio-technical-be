import Sequelize from "sequelize";
import {initAttributes, initOptions} from "./models.meta";
import {
  PRODUCT_MODEL_NAME,
  SUB_CATEGORY_BELONGS_TO_CATEGORY_ALIAS,
  SUB_CATEGORY_BELONGS_TO_CATEGORY_FK,
  SUB_CATEGORY_HAS_MANY_SUB_PRODUCT_ALIAS,
  SUB_CATEGORY_HAS_MANY_SUB_PRODUCT_FK,
  SUB_CATEGORY_MODEL_NAME,
  SUB_CATEGORY_TABLE_NAME
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
})

const schemaOptions = initOptions({
  tableName: SUB_CATEGORY_TABLE_NAME,
})

const subCategoriesModel = (sequelize) => {
  const subCategories = sequelize.define(
    SUB_CATEGORY_MODEL_NAME,
    schemaAttributes,
    schemaOptions
  )

  subCategories.associate = (associationModels) => {
    subCategories.belongsTo(associationModels[PRODUCT_MODEL_NAME], {
      foreignKey: SUB_CATEGORY_BELONGS_TO_CATEGORY_FK,
      as: SUB_CATEGORY_BELONGS_TO_CATEGORY_ALIAS
    })
  }

  subCategories.associate = (associationModels) => {
    subCategories.hasMany(associationModels[PRODUCT_MODEL_NAME], {
      foreignKey: SUB_CATEGORY_HAS_MANY_SUB_PRODUCT_FK,
      as: SUB_CATEGORY_HAS_MANY_SUB_PRODUCT_ALIAS
    })
  }

  return subCategories;
}

export default subCategoriesModel;