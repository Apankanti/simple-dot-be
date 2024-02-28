'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'tbl_auth_tokens',
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        user_id: {
          type: Sequelize.UUID,
          references: {
            model: 'tbl_user',
            key: 'id',
          },
        },
        token: {
          type: Sequelize.STRING,
        },
        token_active: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
        },
        refresh_token: {
          type: Sequelize.STRING,
        },
        created_at: {
          type: Sequelize.DATE,

          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updated_at: {
          type: Sequelize.DATE,
        },
        deleted_at: {
          type: Sequelize.DATE,
        },
        created_by: {
          type: Sequelize.STRING,
        },
        updated_by: {
          type: Sequelize.STRING,
        },
        deleted_by: {
          type: Sequelize.STRING,
        },
      },
      {
        underscored: true,
      },
    );
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('tbl_auth_tokens');
  },
};
