// CATEGORY
export const CATEGORY_MODEL_NAME = 'Category';
export const CATEGORY_TABLE_NAME = 'categories';
export const CATEGORY_HAS_MANY_SUB_CATEGORY_FK = 'id';
export const CATEGORY_HAS_MANY_SUB_CATEGORY_ALIAS = 'subCategories';
export const CATEGORY_HAS_MANY_SUB_PRODUCT_FK = 'id';
export const CATEGORY_HAS_MANY_SUB_PRODUCT_ALIAS = 'products';

// INVENTORY_MOVEMENT
export const INVENTORY_MOVEMENT_MODEL_NAME = 'InventoryMovement';
export const INVENTORY_MOVEMENT_TABLE_NAME = 'inventory_movement';
export const INVENTORY_MOVEMENT_BELONGS_TO_PRODUCT_FK = 'product_id'
export const INVENTORY_MOVEMENT_BELONGS_TO_PRODUCT_ALIAS = 'product'
export const INVENTORY_MOVEMENT_BELONGS_TO_SALES_FK = 'sales_Id'
export const INVENTORY_MOVEMENT_BELONGS_TO_SALES_ALIAS = 'sales'
export const INVENTORY_MOVEMENT_BELONGS_TO_SALES_TARGET_KEY = 'order_id'

// LOCATION_MOVEMENT
export const LOCATION_MODEL_NAME = 'Location';
export const LOCATION_TABLE_NAME = 'locations';
export const LOCATION_HAS_MANY_SUB_SALES_FK = 'id';
export const LOCATION_HAS_MANY_SUB_SALES_ALIAS = 'sales';

// PRODUCT
export const PRODUCT_MODEL_NAME = 'Product';
export const PRODUCT_TABLE_NAME = 'products';
export const PRODUCT_HAS_MANY_SALES_FK = 'id';
export const PRODUCT_HAS_MANY_SALES_ALIAS = 'sales';
export const PRODUCT_BELONGS_TO_CATEGORY_FK = 'category_id';
export const PRODUCT_BELONGS_TO_CATEGORY_ALIAS = 'category';
export const PRODUCT_BELONGS_TO_SUB_CATEGORY_FK = 'sub_category_id';
export const PRODUCT_BELONGS_TO_SUB_CATEGORY_ALIAS = 'subCategory';
export const PRODUCT_HAS_MANY_INVENTORY_MOVEMENT_FK = 'id';
export const PRODUCT_HAS_MANY_INVENTORY_MOVEMENT_ALIAS = 'inventoryMovements';

// SALES
export const SALES_MODEL_NAME = 'Sales';
export const SALES_TABLE_NAME = 'sales';
export const SALES_BELONGS_TO_PRODUCT_FK = 'product_id';
export const SALES_BELONGS_TO_PRODUCT_ALIAS = 'products';
export const SALES_BELONGS_TO_LOCATION_FK = 'location_id';
export const SALES_BELONGS_TO_LOCATION_ALIAS = 'location';
export const SALES_BELONGS_TO_SEGMENT_FK = 'segment_id';
export const SALES_BELONGS_TO_SEGMENT_ALIAS = 'segment';
export const SALES_HAS_MANY_INVENTORY_MOVEMENT_FK = 'id';
export const SALES_HAS_MANY_INVENTORY_MOVEMENT_ALIAS = 'inventoryMovements';
export const SALES_HAS_MANY_INVENTORY_MOVEMENT_SOURCE_KEY = 'order_id';


// SEGMENT
export const SEGMENT_MODEL_NAME = 'Segment';
export const SEGMENT_TABLE_NAME = 'segments';
export const SEGMENT_HAS_MANY_SUB_SALES_FK = 'id';
export const SEGMENT_HAS_MANY_SUB_SALES_ALIAS = 'sales';


// SUB_CATEGORY
export const SUB_CATEGORY_MODEL_NAME = 'SubCategory';
export const SUB_CATEGORY_TABLE_NAME = 'sub_categories';
export const SUB_CATEGORY_BELONGS_TO_CATEGORY_FK = 'category_id';
export const SUB_CATEGORY_BELONGS_TO_CATEGORY_ALIAS = 'category';
export const SUB_CATEGORY_HAS_MANY_SUB_PRODUCT_FK = 'id';
export const SUB_CATEGORY_HAS_MANY_SUB_PRODUCT_ALIAS = 'products';