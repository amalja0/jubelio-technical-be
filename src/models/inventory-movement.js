import Sequelize from "sequelize";
import {initAttributes, initOptions} from "./models.meta.js";
import {
  INVENTORY_MOVEMENT_BELONGS_TO_PRODUCT_ALIAS,
  INVENTORY_MOVEMENT_BELONGS_TO_PRODUCT_FK,
  INVENTORY_MOVEMENT_BELONGS_TO_SALES_ALIAS,
  INVENTORY_MOVEMENT_BELONGS_TO_SALES_FK,
  INVENTORY_MOVEMENT_MODEL_NAME,
  INVENTORY_MOVEMENT_TABLE_NAME,
  PRODUCT_MODEL_NAME,
  SALES_MODEL_NAME
} from "./models.constants.js";

const schemaAttributes = initAttributes({
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  movement_date: {
    type: Sequelize.DATE,
  },
  quantity_change: {
    type: Sequelize.INTEGER,
  },
  movement_type: {
    type: Sequelize.STRING,
  },
  current_stock: {
    type: Sequelize.INTEGER,
  }
})

const schemaOptions = initOptions({
  tableName: INVENTORY_MOVEMENT_TABLE_NAME,
})

const inventoryMovementsModel = (sequelize) => {
  const inventoryMovements = sequelize.define(
    INVENTORY_MOVEMENT_MODEL_NAME,
    schemaAttributes,
    schemaOptions
  )

  inventoryMovements.associate = (associationModels) => {
    inventoryMovements.belongsTo(associationModels[PRODUCT_MODEL_NAME], {
      foreignKey: INVENTORY_MOVEMENT_BELONGS_TO_PRODUCT_FK,
      as: INVENTORY_MOVEMENT_BELONGS_TO_PRODUCT_ALIAS
    })

    inventoryMovements.belongsTo(associationModels[SALES_MODEL_NAME], {
      foreignKey: INVENTORY_MOVEMENT_BELONGS_TO_SALES_FK,
      as: INVENTORY_MOVEMENT_BELONGS_TO_SALES_ALIAS
    })
  }

  return inventoryMovements;
}

export default inventoryMovementsModel;