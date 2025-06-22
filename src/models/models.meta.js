import Sequelize from "sequelize";

export const initOptions = (additionalOptions) => {
  return {
    ...additionalOptions,
    timestamps: true,
    paranoid: false,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  }
}

export const initAttributes = (additionalAttributes) => {
  return {
    ...additionalAttributes,
    created_by: {
      type: Sequelize.STRING,
      defaultValue: 'SYSTEM'
    },
    updated_by: {
      type: Sequelize.STRING,
      defaultValue: 'SYSTEM'
    },
    deleted_by: { type: Sequelize.STRING },
  }
}