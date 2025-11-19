const { Sequelize, DataTypes } = require("sequelize");
const { database: dbConfig } = require("../config/config");

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
  }
);

// Define User model
const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      defaultValue: "user",
      allowNull: false,
    },
    themePreference: {
      type: DataTypes.STRING,
      defaultValue: "light",
      allowNull: true,
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

// Define Service model
const Service = sequelize.define(
  "Service",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "services",
    timestamps: false,
  }
);

// Define Staff model
const Staff = sequelize.define(
  "Staff",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "staff",
    timestamps: false,
  }
);

// Define SavedItem model
const SavedItem = sequelize.define(
  "SavedItem",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "services",
        key: "id",
      },
    },
  },
  {
    tableName: "saved_items",
    timestamps: false,
  }
);

// Define associations
User.hasMany(SavedItem, { foreignKey: "userId", as: "savedItems" });
SavedItem.belongsTo(User, { foreignKey: "userId", as: "user" });

Service.hasMany(SavedItem, { foreignKey: "serviceId", as: "savedByUsers" });
SavedItem.belongsTo(Service, { foreignKey: "serviceId", as: "service" });

module.exports = {
  sequelize,
  User,
  Service,
  Staff,
  SavedItem,
};
