
const InventoryMovementsService = (models) => {
  const {
    InventoryMovement,
  } = models;

  const getAll = async () => {
    return await InventoryMovement.findAll();
  }

  const create = async (payload, options) => {
    const inventoryMovement = await InventoryMovement.create(payload, options);
    return inventoryMovement;
  }

  const truncate = async () => {
    await InventoryMovement.destroy({ truncate: { cascade: true } });
  }

  return {
    getAll,
    create,
    truncate,
  }
}

export default InventoryMovementsService;