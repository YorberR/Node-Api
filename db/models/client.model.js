const { Model, DataTypes, Sequelize } = require('sequelize');

const { USER_TABLE } =  require('./user.model');

const CLIENT_TABLE = 'clientes';

const ClientSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'last_name',
  },
  phone: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  userId: {
    field: 'user_id',
    allowNull:false,
    type: DataTypes.INTEGER,
    references:{
      model: USER_TABLE,
      key: 'id'
    },

  }
}


class Client extends Model {
  static associate(models){
    this.belongsTo(models.Users, {as:'users'})
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: CLIENT_TABLE,
      modelName: 'Client',
      timestamps: false
    }
  }
}

module.exports = { Client, ClientSchema, CLIENT_TABLE };