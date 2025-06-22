
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

  return {
    getAll,
    create
  }
}

export default InventoryMovementsService;