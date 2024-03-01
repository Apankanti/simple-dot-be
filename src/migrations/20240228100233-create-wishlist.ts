'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'tbl_Wish_list',
      {
        product_id: {
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'tbl_products',
            key: 'id',
          },
        },
        user_id: {
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'tbl_user',
            key: 'id',
          },
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: true,
        },
      },
      {
        underscored: true,
        uniqueKeys: {
          unique_wishlist_entry: {
            fields: ['user_id', 'product_id'],
          },
        },
      },
    );

    await queryInterface.addConstraint('tbl_Wish_list', {
      type: 'foreign key',
      fields: ['user_id'],
      references: {
        table: 'tbl_user',
        field: 'id',
      },
    });

    await queryInterface.addConstraint('tbl_Wish_list', {
      type: 'foreign key',
      fields: ['product_id'],
      references: {
        table: 'tbl_products',
        field: 'id',
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeConstraint(
      'tbl_Wish_list',
      'tbl_Wish_list_product_id_fkey',
    );
    await queryInterface.removeConstraint(
      'tbl_Wish_list',
      'tbl_Wish_list_user_id_fkey',
    );
    await queryInterface.dropTable('tbl_Wish_list');
  },
};
