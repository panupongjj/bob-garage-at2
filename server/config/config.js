require("dotenv").config();
const cloudinary = require("cloudinary").v2;

// Database configuration for Sequelize CLI
const dbConfig = {
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "bobs_garage",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  dialect: "mysql",
  logging: console.log,
};

const config = {
  // JWT Configuration
  jwt: {
    secret:
      process.env.JWT_SECRET || "your-secret-key-change-this-in-production",
    expiresIn: "7d",
  },

  // Database Configuration (for application use)
  database: dbConfig,

  // Cloudinary Configuration
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    folder: "bobs-garage",
    sub_folder_services: "bobs-garage/services",
    sub_folder_staff: "bobs-garage/staff",
  },
};

// Configure Cloudinary instance
cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
});

// Export configured cloudinary instance
config.cloudinaryInstance = cloudinary;

// Export main config object (for application use)
module.exports = config;

// // Export Sequelize CLI compatible format (for compatibility)
// module.exports.development = dbConfig;
// module.exports.production = {
//   ...dbConfig,
//   // Override with production env vars if needed
//   username: process.env.DB_USER || dbConfig.username,
//   password: process.env.DB_PASSWORD || dbConfig.password,
//   database: process.env.DB_NAME || dbConfig.database,
//   host: process.env.DB_HOST || dbConfig.host,
// };
// module.exports.test = {
//   ...dbConfig,
//   database: process.env.DB_NAME_TEST || "bobs_garage_test",
// };
