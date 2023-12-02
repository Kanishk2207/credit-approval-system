// config.js
require('dotenv').config(); // For using environment variables

const redisConfig = {
  port: process.env.REDIS_PORT, 
  host: process.env.REDIS_HOST,  
};

module.exports = { redisConfig };
