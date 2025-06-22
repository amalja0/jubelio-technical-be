'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "deleted_at" from table "categories"
 * removeColumn "deleted_at" from table "inventory_movement"
 * removeColumn "deleted_at" from table "locations"
 * removeColumn "deleted_at" from table "products"
 * removeColumn "deleted_at" from table "sales"
 * removeColumn "deleted_at" from table "segments"
 * removeColumn "deleted_at" from table "sub_categories"
 *
 **/

var info = {
    "revision": 3,
    "name": "remove-paranoid-true",
    "created": "2025-06-22T14:19:59.698Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
            fn: "removeColumn",
            params: [
                "categories",
                "deleted_at",
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "removeColumn",
            params: [
                "inventory_movement",
                "deleted_at",
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "removeColumn",
            params: [
                "locations",
                "deleted_at",
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "removeColumn",
            params: [
                "products",
                "deleted_at",
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "removeColumn",
            params: [
                "sales",
                "deleted_at",
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "removeColumn",
            params: [
                "segments",
                "deleted_at",
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "removeColumn",
            params: [
                "sub_categories",
                "deleted_at",
                {
                    transaction: transaction
                }
            ]
        }
    ];
};
var rollbackCommands = function(transaction) {
    return [{
            fn: "addColumn",
            params: [
                "categories",
                "deleted_at",
                {
                    "type": Sequelize.DATE,
                    "field": "deleted_at"
                },
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "addColumn",
            params: [
                "inventory_movement",
                "deleted_at",
                {
                    "type": Sequelize.DATE,
                    "field": "deleted_at"
                },
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "addColumn",
            params: [
                "locations",
                "deleted_at",
                {
                    "type": Sequelize.DATE,
                    "field": "deleted_at"
                },
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "addColumn",
            params: [
                "products",
                "deleted_at",
                {
                    "type": Sequelize.DATE,
                    "field": "deleted_at"
                },
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "addColumn",
            params: [
                "sales",
                "deleted_at",
                {
                    "type": Sequelize.DATE,
                    "field": "deleted_at"
                },
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "addColumn",
            params: [
                "segments",
                "deleted_at",
                {
                    "type": Sequelize.DATE,
                    "field": "deleted_at"
                },
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "addColumn",
            params: [
                "sub_categories",
                "deleted_at",
                {
                    "type": Sequelize.DATE,
                    "field": "deleted_at"
                },
                {
                    transaction: transaction
                }
            ]
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
