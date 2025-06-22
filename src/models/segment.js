import Sequelize from "sequelize";
import {initAttributes, initOptions} from "./models.meta.js";
import {
  SALES_MODEL_NAME,
  SEGMENT_HAS_MANY_SALES_ALIAS,
  SEGMENT_HAS_MANY_SALES_FK,
  SEGMENT_MODEL_NAME,
  SEGMENT_TABLE_NAME
} from "./models.constants.js";

const schemaAttributes = initAttributes({
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  segment_name: {
    type: Sequelize.STRING,
    unique: true,
  }
})

const schemaOptions = initOptions({
  tableName: SEGMENT_TABLE_NAME,
})

const segmentsModel = (sequelize) => {
  const segments = sequelize.define(
    SEGMENT_MODEL_NAME,
    schemaAttributes,
    schemaOptions
  )

  segments.associate = (associationModels) => {
    segments.hasMany(associationModels[SALES_MODEL_NAME], {
      foreignKey: SEGMENT_HAS_MANY_SALES_FK,
      as: SEGMENT_HAS_MANY_SALES_ALIAS,
      onDelete: 'CASCADE',
    })
  }

  return segments;
}

export default segmentsModel;