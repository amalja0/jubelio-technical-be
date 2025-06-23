import Exceljs from "exceljs";
import {EXCEL_TO_DB_MAPPING} from "../utils/transform.utils.js";
import {parseCurrency, parseDate} from "../utils/cleanse-utils.js";
import CategoriesService from "./categories.service.js";
import SubCategoriesService from "./sub-categories.service.js";
import LocationService from "./locations.service.js";
import ProductsService from "./products.service.js";
import SegmentsService from "./segments.service.js";
import _ from "lodash";
import {getDB} from "../models/index.js";
import SalesService from "./sales.service.js";
import InventoryMovementsService from "./inventory-movements.service.js";
import {Sequelize} from "sequelize";

const EtlService = ( models ) => {
  const categoriesService = CategoriesService(models);
  const subCategoriesService = SubCategoriesService(models);
  const locationsService = LocationService(models);
  const productsService = ProductsService(models);
  const segmentsService = SegmentsService(models);
  const salesService = SalesService(models);
  const inventoryMovementsService = InventoryMovementsService(models);

  let masterDataMap = null;

  const processExcel = async (filePath, batchSize = 10) => {
    const options = {
      sharedStrings: 'cache',
      hyperlinks: 'cache',
      worksheets: 'emit',
    };
    const workbookReader = new Exceljs.stream.xlsx.WorkbookReader(filePath, options);
    let batch = [];
    let rowCount = 0;
    const promises = [];

    const rows = [];
    const batches = [];

    await new Promise((resolve, reject) => {
      workbookReader.on('worksheet', worksheet => {
        if (worksheet.name === 'Tableau Superstore') {
          let headers = [];
          worksheet.on('row', row => {
            if (row.number === 1) {
              headers = row.values.slice(1);
            } else {
              try {
                const transformed = transformRow(headers, row);
                rows.push(transformed);
                batch.push(transformed);
                rowCount++;

                if (batch.length >= batchSize) {
                  batches.push(batch)
                  batch = [];
                }
              } catch (err) {
                console.error(`Error processing row ${row.number}:`, err);
              }
            }
          })
        }
      });

      workbookReader.on('finished', async () => {
        if (batch.length > 0) {
          batches.push(batch);
          batch = [];
        }
        try {
          await processMasterData(rows);

          const isSalesDataAvailable = (await salesService.getAll()).length > 0;
          const isInventoryMovementDataAvailable = (await inventoryMovementsService.getAll()).length > 0;
          if (isSalesDataAvailable || isInventoryMovementDataAvailable) {
            process.stdout.write(`\rDelete Existing Sales Data`);
            await salesService.truncate();
            process.stdout.write(`\rDelete Existing Inventory Movement Data`);
            await inventoryMovementsService.truncate();
          }
          for (const [index, batch] of batches.entries()) {
            process.stdout.write(`\rExecuting batch ${index + 1} of ${batches.length}`);
            await flushBatch(batch);
          }

          console.log('\n✅ All data flushed');
          resolve();
        } catch (e) {
          console.error('❌ Failed to flush:', e);
          reject(e);
        }
      });

      workbookReader.on('error', (err) => {
        console.log(err)
        reject(err);
      });

      workbookReader.read();
    })

    return rowCount;
  }

  const transformRow = (headers, row) => {
    const rawData = extractRowData(headers, row);
    const mappedData = mapFields(rawData);
    const cleansedData = cleanseData(mappedData);

    const categoryRecord = {
      category_name: cleansedData.category_name,
    };

    const subCategoryRecord = {
      category_name: cleansedData.category_name,
      sub_category_name: cleansedData.sub_category_name
    };

    const basePrice = cleansedData.sales_amount / cleansedData.quantity * (1 - cleansedData.discount)
    const productRecord = {
      manufacturer: cleansedData.manufacturer,
      base_price: basePrice,
      product_name: cleansedData.product_name,
    };

    const locationRecord = {
      city: cleansedData.city,
      state: cleansedData.state,
      postal_code: cleansedData.postal_code.toString(),
      region: cleansedData.region,
      country: cleansedData.country,
    };

    const inventoryMovementRecord = {
      movement_date: cleansedData.ship_date,
      quantity_change: cleansedData.quantity,
      movement_type: 'purchase'
    };

    const salesRecord = {
      ship_date: cleansedData.ship_date,
      ship_mode: cleansedData.ship_mode,
      customer_name: cleansedData.customer_name,
      quantity: cleansedData.quantity,
      sales_amount: cleansedData.sales_amount,
      discount: cleansedData.discount,
      profit: cleansedData.profit,
      profit_ratio: cleansedData.profit_ratio,
      number_of_record: cleansedData.number_of_record,
      order_id: cleansedData.order_id,
      order_date: cleansedData.order_date
    };

    const segmentRecord = {
      segment_name: cleansedData.segment_name
    };

    return {
      category: categoryRecord,
      sub_category: subCategoryRecord,
      product: productRecord,
      location: locationRecord,
      segment: segmentRecord,
      sales: salesRecord,
      inventory_movement: inventoryMovementRecord
    };
  }

  const extractRowData = (headers, row) => {
    return row.values.slice(1)
      .reduce((acc, val, idx) => {
        const key = headers[idx];
        acc[key] = (typeof val === 'object' && val?.text) ? val.text : val;
        return acc;
      }, {});
  }

  const mapFields = (row) => {
    return Object.keys(EXCEL_TO_DB_MAPPING).reduce((acc, header) => {
      const dbColumn = EXCEL_TO_DB_MAPPING[header];
      acc[dbColumn] = row[header];
      return acc;
    }, {})
  }

  const cleanseData = (row) => {
    return {
      ...row,
      order_date: parseDate(row['order_date']),
      ship_date: parseDate(row['ship_date']),
      profit: parseCurrency(row['profit']),
      sales_amount: parseCurrency(row['sales_amount']),
    }
  }

  const processMasterData = async (rows) => {
    const categoryMap = new Map();
    const subCategoryMap = new Map();
    const locationMap = new Map();
    const productMap = new Map();
    const segmentMap = new Map();

    const uniqueCategoryNames = _.uniqBy(rows.map(({ category }) => category ), 'category_name');
    const uniqueSubCategoryNames = _.uniqBy(rows.map(({ sub_category }) => sub_category ), 'sub_category_name');
    const uniqueLocationsPostalCode = _.uniqBy(rows.map(({ location }) => location ), 'postal_code');
    const uniqueProductNames = _.uniqBy(rows.map(({ product }) => product ), 'product_name');
    const uniqueSegmentNames = _.uniqBy(rows.map(({ segment }) => segment ), 'segment_name');

    try {
      const { sequelize } = getDB();

      await sequelize.authenticate()
      // Delete all Master Data if exists
      const isCategoryDataExists = (await categoriesService.getAll())?.length > 0;
      const isSubCategoryDataExists = (await subCategoriesService.getAll())?.length > 0;
      const isLocationDataExists = (await locationsService.getAll())?.length > 0;
      const isProductDataExists = (await productsService.getAll())?.length > 0;
      const isSegmentDataExists = (await segmentsService.getAll())?.length > 0;
      const isMasterDataExists = isCategoryDataExists || isSubCategoryDataExists || isLocationDataExists || isProductDataExists || isSegmentDataExists;

      if (isMasterDataExists) {
        process.stdout.write(`\rDelete Existing Master Data`);
        await categoriesService.truncate();
        await subCategoriesService.truncate();
        await locationsService.truncate();
        await productsService.truncate();
        await segmentsService.truncate();
      }

      await sequelize.transaction(async() => {
        process.stdout.write(`\rCreating Master Data of Categories`);
        const categories = await categoriesService.bulkCreate(uniqueCategoryNames);

        categories?.forEach((category) => {
          categoryMap.set(category.category_name, category.id);
        });

        process.stdout.write(`\rCreating Master Data of Sub Categories`);
        const formattedUniqueSubCategory = uniqueSubCategoryNames.map((item) => ({
          category_id: categories.find(({ category_name }) => category_name === item.category_name)?.id,
          sub_category_name: item.sub_category_name,
        }));

        const subCategories = await subCategoriesService.bulkCreate(formattedUniqueSubCategory);

        subCategories.forEach((subCategory) => {
          subCategoryMap.set(subCategory.sub_category_name, subCategory.id);
        });

        process.stdout.write(`\rCreating Master Data of Locations`);
        (await locationsService.bulkCreate(uniqueLocationsPostalCode))
          .forEach((location) => {
            locationMap.set(location.postal_code, location.id);
          });

        process.stdout.write(`\rCreating Master Data of Products`);
        const formattedUniqueProducts = uniqueProductNames.map((item) => ({
          category_id: categories.find(({ category_name }) => category_name === item.category_name)?.id,
          sub_category_id: subCategories.find(({ sub_category_name }) => sub_category_name === item.sub_category_name),
          manufacturer: item.manufacturer,
          base_price: item.base_price,
          product_name: item.product_name,
        }));

        (await productsService.bulkCreate(formattedUniqueProducts))
          ?.forEach((product) => {
            productMap.set(product.product_name, product.id)
          });

        process.stdout.write(`\rCreating Master Data of Segments`);
        (await segmentsService.bulkCreate(uniqueSegmentNames))
          ?.forEach((segment) => {
            segmentMap.set(segment.segment_name, segment.id);
          });

        masterDataMap = {
          categories: categoryMap,
          subCategories: subCategoryMap,
          locations: locationMap,
          products: productMap,
          segments: segmentMap,
        }
        process.stdout.write(`\rMaster Data Creations Done`);
      })
    } catch (err) {
      throw err;
    }
  }

  const flushBatch = async (batch) => {
    const { sequelize } = getDB();
    return await sequelize.transaction(
      {
        autocommit: true,
        isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED
      },
      async (t) => {
        const processedCount = 0
        try {
          for (const record of batch) {
            let product_id = masterDataMap?.products?.get(record?.product?.product_name);
            let location_id =  masterDataMap?.locations?.get(record?.location?.postal_code);
            let segment_id = masterDataMap?.segments?.get(record?.segment?.segment_name);

            const sales = await salesService.findOrCreate({
              where: {
                ...record?.sales,
                product_id,
                location_id,
                segment_id,
              },
              transaction: t
            });
            const sales_id = sales.id;

            const inventoryMovement = await inventoryMovementsService.create({
              ...record?.inventory_movement,
              sales_id
            }, { transaction: t })
          }
          return processedCount;
        } catch (err) {
          console.error(err);
          throw err;
        }
    })
  }

  const updateDataProperties = (existingData, data, commonKey, newKey, objectName) => {
    const comparator = data[objectName]
    const intersection = _.intersectionBy(existingData, comparator, commonKey);
    if (intersection.length > 0) {
      const commonValueMap = new Map();
      intersection.forEach((item) => {
        commonValueMap.set(item[commonKey], item[newKey]);
      })

      return data.map((item) => {
        if (commonValueMap.has(item[commonKey])) {
          item[objectName][newKey] = commonValueMap.get(item[commonKey])
          delete item[objectName][commonKey];
        }
        return {
          ...item
        }
      })
    }
    return data
  }

  return { processExcel };
}

export default EtlService;