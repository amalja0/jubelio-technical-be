import Sequelize from "sequelize";
import {initAttributes, initOptions} from "./models.meta.js";
import {
  LOCATION_HAS_MANY_SUB_SALES_ALIAS,
  LOCATION_HAS_MANY_SUB_SALES_FK,
  LOCATION_MODEL_NAME,
  LOCATION_TABLE_NAME,
  SALES_MODEL_NAME
} from "./models.constants.js";

const schemaAttributes = initAttributes({
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  city: {
    type: Sequelize.STRING,
    unique: true,
  },
  state: {
    type: Sequelize.STRING,
  },
  postal_code: {
    type: Sequelize.STRING,
  },
  region: {
    type: Sequelize.STRING,
  },
  country: {
    type: Sequelize.STRING,
  }
})

const schemaOptions = initOptions({
  tableName: LOCATION_TABLE_NAME,
})

const locationsModel = (sequelize) => {
  const locations = sequelize.define(
    LOCATION_MODEL_NAME,
    schemaAttributes,
    schemaOptions
  )

  locations.associate = (associationModels) => {
    locations.hasMany(associationModels[SALES_MODEL_NAME], {
      foreignKey: LOCATION_HAS_MANY_SUB_SALES_FK,
      as: LOCATION_HAS_MANY_SUB_SALES_ALIAS
    })
  }

  return locations;
}

export default locationsModel;