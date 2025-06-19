'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "categories", deps: []
 * createTable "locations", deps: []
 * createTable "segments", deps: []
 * createTable "sub_categories", deps: [categories]
 * createTable "products", deps: [categories, categories, sub_categories]
 * createTable "sales", deps: [locations, products, locations, segments]
 * createTable "inventory_movement", deps: [products, products, sales]
 *
 **/

var info = {
    "revision": 1,
    "name": "initial-migrations",
    "created": "2025-06-19T01:45:52.484Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
            fn: "createTable",
            params: [
                "categories",
                {
                    "id": {
                        "type": Sequelize.UUID,
                        "field": "id",
                        "primaryKey": true,
                        "defaultValue": Sequelize.UUIDV4
                    },
                    "name": {
                        "type": Sequelize.DATE,
                        "field": "name",
                        "unique": true
                    },
                    "created_by": {
                        "type": Sequelize.STRING,
                        "field": "created_by",
                        "defaultValue": "SYSTEM"
                    },
                    "updated_by": {
                        "type": Sequelize.STRING,
                        "field": "updated_by",
                        "defaultValue": "SYSTEM"
                    },
                    "deleted_by": {
                        "type": Sequelize.STRING,
                        "field": "deleted_by"
                    },
                    "created_at": {
                        "type": Sequelize.DATE,
                        "field": "created_at",
                        "allowNull": false
                    },
                    "updated_at": {
                        "type": Sequelize.DATE,
                        "field": "updated_at",
                        "allowNull": false
                    },
                    "deleted_at": {
                        "type": Sequelize.DATE,
                        "field": "deleted_at"
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "locations",
                {
                    "id": {
                        "type": Sequelize.UUID,
                        "field": "id",
                        "primaryKey": true,
                        "defaultValue": Sequelize.UUIDV4
                    },
                    "city": {
                        "type": Sequelize.STRING,
                        "field": "city",
                        "unique": true
                    },
                    "state": {
                        "type": Sequelize.STRING,
                        "field": "state"
                    },
                    "postal_code": {
                        "type": Sequelize.STRING,
                        "field": "postal_code"
                    },
                    "region": {
                        "type": Sequelize.STRING,
                        "field": "region"
                    },
                    "country": {
                        "type": Sequelize.STRING,
                        "field": "country"
                    },
                    "created_by": {
                        "type": Sequelize.STRING,
                        "field": "created_by",
                        "defaultValue": "SYSTEM"
                    },
                    "updated_by": {
                        "type": Sequelize.STRING,
                        "field": "updated_by",
                        "defaultValue": "SYSTEM"
                    },
                    "deleted_by": {
                        "type": Sequelize.STRING,
                        "field": "deleted_by"
                    },
                    "created_at": {
                        "type": Sequelize.DATE,
                        "field": "created_at",
                        "allowNull": false
                    },
                    "updated_at": {
                        "type": Sequelize.DATE,
                        "field": "updated_at",
                        "allowNull": false
                    },
                    "deleted_at": {
                        "type": Sequelize.DATE,
                        "field": "deleted_at"
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "segments",
                {
                    "id": {
                        "type": Sequelize.UUID,
                        "field": "id",
                        "primaryKey": true,
                        "defaultValue": Sequelize.UUIDV4
                    },
                    "name": {
                        "type": Sequelize.DATE,
                        "field": "name",
                        "unique": true
                    },
                    "created_by": {
                        "type": Sequelize.STRING,
                        "field": "created_by",
                        "defaultValue": "SYSTEM"
                    },
                    "updated_by": {
                        "type": Sequelize.STRING,
                        "field": "updated_by",
                        "defaultValue": "SYSTEM"
                    },
                    "deleted_by": {
                        "type": Sequelize.STRING,
                        "field": "deleted_by"
                    },
                    "created_at": {
                        "type": Sequelize.DATE,
                        "field": "created_at",
                        "allowNull": false
                    },
                    "updated_at": {
                        "type": Sequelize.DATE,
                        "field": "updated_at",
                        "allowNull": false
                    },
                    "deleted_at": {
                        "type": Sequelize.DATE,
                        "field": "deleted_at"
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "sub_categories",
                {
                    "id": {
                        "type": Sequelize.UUID,
                        "onUpdate": "CASCADE",
                        "onDelete": "CASCADE",
                        "references": {
                            "model": "categories",
                            "key": "id"
                        },
                        "allowNull": true,
                        "field": "id",
                        "primaryKey": true,
                        "defaultValue": Sequelize.UUIDV4
                    },
                    "name": {
                        "type": Sequelize.DATE,
                        "field": "name",
                        "unique": true
                    },
                    "created_by": {
                        "type": Sequelize.STRING,
                        "field": "created_by",
                        "defaultValue": "SYSTEM"
                    },
                    "updated_by": {
                        "type": Sequelize.STRING,
                        "field": "updated_by",
                        "defaultValue": "SYSTEM"
                    },
                    "deleted_by": {
                        "type": Sequelize.STRING,
                        "field": "deleted_by"
                    },
                    "created_at": {
                        "type": Sequelize.DATE,
                        "field": "created_at",
                        "allowNull": false
                    },
                    "updated_at": {
                        "type": Sequelize.DATE,
                        "field": "updated_at",
                        "allowNull": false
                    },
                    "deleted_at": {
                        "type": Sequelize.DATE,
                        "field": "deleted_at"
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "products",
                {
                    "id": {
                        "type": Sequelize.UUID,
                        "onUpdate": "CASCADE",
                        "onDelete": "CASCADE",
                        "references": {
                            "model": "categories",
                            "key": "id"
                        },
                        "allowNull": true,
                        "field": "id",
                        "primaryKey": true,
                        "defaultValue": Sequelize.UUIDV4
                    },
                    "name": {
                        "type": Sequelize.STRING,
                        "field": "name",
                        "unique": true
                    },
                    "manufacturer": {
                        "type": Sequelize.STRING,
                        "field": "manufacturer"
                    },
                    "base_price": {
                        "type": Sequelize.FLOAT,
                        "field": "base_price"
                    },
                    "created_by": {
                        "type": Sequelize.STRING,
                        "field": "created_by",
                        "defaultValue": "SYSTEM"
                    },
                    "updated_by": {
                        "type": Sequelize.STRING,
                        "field": "updated_by",
                        "defaultValue": "SYSTEM"
                    },
                    "deleted_by": {
                        "type": Sequelize.STRING,
                        "field": "deleted_by"
                    },
                    "created_at": {
                        "type": Sequelize.DATE,
                        "field": "created_at",
                        "allowNull": false
                    },
                    "updated_at": {
                        "type": Sequelize.DATE,
                        "field": "updated_at",
                        "allowNull": false
                    },
                    "deleted_at": {
                        "type": Sequelize.DATE,
                        "field": "deleted_at"
                    },
                    "category_id": {
                        "type": Sequelize.UUID,
                        "field": "category_id",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "categories",
                            "key": "id"
                        },
                        "allowNull": true
                    },
                    "sub_category_id": {
                        "type": Sequelize.UUID,
                        "field": "sub_category_id",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "sub_categories",
                            "key": "id"
                        },
                        "allowNull": true
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "sales",
                {
                    "id": {
                        "type": Sequelize.UUID,
                        "onUpdate": "CASCADE",
                        "onDelete": "CASCADE",
                        "references": {
                            "model": "locations",
                            "key": "id"
                        },
                        "allowNull": true,
                        "field": "id",
                        "primaryKey": true,
                        "defaultValue": Sequelize.UUIDV4
                    },
                    "ship_date": {
                        "type": Sequelize.DATE,
                        "field": "ship_date"
                    },
                    "ship_mode": {
                        "type": Sequelize.STRING,
                        "field": "ship_mode"
                    },
                    "customer_name": {
                        "type": Sequelize.STRING,
                        "field": "customer_name"
                    },
                    "quantity": {
                        "type": Sequelize.SMALLINT,
                        "field": "quantity"
                    },
                    "sales_amount": {
                        "type": Sequelize.FLOAT,
                        "field": "sales_amount"
                    },
                    "discount": {
                        "type": Sequelize.FLOAT,
                        "field": "discount"
                    },
                    "profit": {
                        "type": Sequelize.FLOAT,
                        "field": "profit"
                    },
                    "profit_ratio": {
                        "type": Sequelize.FLOAT,
                        "field": "profit_ratio"
                    },
                    "number_of_record": {
                        "type": Sequelize.SMALLINT,
                        "field": "number_of_record"
                    },
                    "order_id": {
                        "type": Sequelize.STRING,
                        "field": "order_id",
                        "unique": true
                    },
                    "order_date": {
                        "type": Sequelize.DATE,
                        "field": "order_date"
                    },
                    "created_by": {
                        "type": Sequelize.STRING,
                        "field": "created_by",
                        "defaultValue": "SYSTEM"
                    },
                    "updated_by": {
                        "type": Sequelize.STRING,
                        "field": "updated_by",
                        "defaultValue": "SYSTEM"
                    },
                    "deleted_by": {
                        "type": Sequelize.STRING,
                        "field": "deleted_by"
                    },
                    "created_at": {
                        "type": Sequelize.DATE,
                        "field": "created_at",
                        "allowNull": false
                    },
                    "updated_at": {
                        "type": Sequelize.DATE,
                        "field": "updated_at",
                        "allowNull": false
                    },
                    "deleted_at": {
                        "type": Sequelize.DATE,
                        "field": "deleted_at"
                    },
                    "product_id": {
                        "type": Sequelize.UUID,
                        "field": "product_id",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "products",
                            "key": "id"
                        },
                        "allowNull": true
                    },
                    "location_id": {
                        "type": Sequelize.UUID,
                        "field": "location_id",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "locations",
                            "key": "id"
                        },
                        "allowNull": true
                    },
                    "segment_id": {
                        "type": Sequelize.UUID,
                        "field": "segment_id",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "segments",
                            "key": "id"
                        },
                        "allowNull": true
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "inventory_movement",
                {
                    "id": {
                        "type": Sequelize.UUID,
                        "onUpdate": "CASCADE",
                        "onDelete": "CASCADE",
                        "references": {
                            "model": "products",
                            "key": "id"
                        },
                        "allowNull": true,
                        "field": "id",
                        "primaryKey": true,
                        "defaultValue": Sequelize.UUIDV4
                    },
                    "movement_date": {
                        "type": Sequelize.DATE,
                        "field": "movement_date"
                    },
                    "quantity_change": {
                        "type": Sequelize.INTEGER,
                        "field": "quantity_change"
                    },
                    "movement_type": {
                        "type": Sequelize.STRING,
                        "field": "movement_type"
                    },
                    "current_stock": {
                        "type": Sequelize.INTEGER,
                        "field": "current_stock"
                    },
                    "created_by": {
                        "type": Sequelize.STRING,
                        "field": "created_by",
                        "defaultValue": "SYSTEM"
                    },
                    "updated_by": {
                        "type": Sequelize.STRING,
                        "field": "updated_by",
                        "defaultValue": "SYSTEM"
                    },
                    "deleted_by": {
                        "type": Sequelize.STRING,
                        "field": "deleted_by"
                    },
                    "created_at": {
                        "type": Sequelize.DATE,
                        "field": "created_at",
                        "allowNull": false
                    },
                    "updated_at": {
                        "type": Sequelize.DATE,
                        "field": "updated_at",
                        "allowNull": false
                    },
                    "deleted_at": {
                        "type": Sequelize.DATE,
                        "field": "deleted_at"
                    },
                    "product_id": {
                        "type": Sequelize.UUID,
                        "field": "product_id",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "products",
                            "key": "id"
                        },
                        "allowNull": true
                    },
                    "sales_Id": {
                        "type": Sequelize.STRING,
                        "field": "sales__id",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "sales",
                            "key": "order_id"
                        },
                        "allowNull": true
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        }
    ];
};
var rollbackCommands = function(transaction) {
    return [{
            fn: "dropTable",
            params: ["categories", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["inventory_movement", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["locations", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["products", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["sales", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["segments", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["sub_categories", {
                transaction: transaction
            }]
        }
    ];
};

module.exports = {
    pos: 0,
    useTransaction: true,
    execute: function(queryInterface, Sequelize, _commands)
    {
        var index = this.pos;
        function run(transaction) {
            const commands = _commands(transaction);
            return new Promise(function(resolve, reject) {
                function next() {
                    if (index < commands.length)
                    {
                        let command = commands[index];
                        console.log("[#"+index+"] execute: " + command.fn);
                        index++;
                        queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                    }
                    else
                        resolve();
                }
                next();
            });
        }
        if (this.useTransaction) {
            return queryInterface.sequelize.transaction(run);
        } else {
            return run(null);
        }
    },
    up: function(queryInterface, Sequelize)
    {
        return this.execute(queryInterface, Sequelize, migrationCommands);
    },
    down: function(queryInterface, Sequelize)
    {
        return this.execute(queryInterface, Sequelize, rollbackCommands);
    },
    info: info
};
