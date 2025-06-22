import Sequelize from "sequelize";
import {initAttributes, initOptions} from "./models.meta.js";
import {
  CATEGORY_MODEL_NAME,
  PRODUCT_MODEL_NAME,
  SUB_CATEGORY_BELONGS_TO_CATEGORY_ALIAS,
  SUB_CATEGORY_BELONGS_TO_CATEGORY_FK,
  SUB_CATEGORY_HAS_MANY_PRODUCT_ALIAS,
  SUB_CATEGORY_HAS_MANY_PRODUCT_FK,
  SUB_CATEGORY_MODEL_NAME,
  SUB_CATEGORY_TABLE_NAME
} from "./models.constants.js";

const schemaAttributes = initAttributes({
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  sub_category_name: {
    type: Sequelize.STRING,
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
    subCategories.belongsTo(associationModels[CATEGORY_MODEL_NAME], {
      foreignKey: SUB_CATEGORY_BELONGS_TO_CATEGORY_FK,
      as: SUB_CATEGORY_BELONGS_TO_CATEGORY_ALIAS
    })

    subCategories.hasMany(associationModels[PRODUCT_MODEL_NAME], {
      foreignKey: SUB_CATEGORY_HAS_MANY_PRODUCT_FK,
      as: SUB_CATEGORY_HAS_MANY_PRODUCT_ALIAS,
      onDelete: 'CASCADE',
    })
  }

  return subCategories;
}

export default subCategoriesModel;