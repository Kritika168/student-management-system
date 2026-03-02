// Redis Cloud Caching Configuration  
// Tech Stack: Redis (Caching Layer)
// DSAI Summer Internship 2026

const redis = require('redis');

let redisClient;

const connectRedis = async () => {
  try {
    const redisUrl = process.env.REDIS_URL || null;
    const redisHost = process.env.REDIS_HOST || 'localhost';
    const redisPort = process.env.REDIS_PORT || 6379;
    const redisPassword = process.env.REDIS_PASSWORD || undefined;

    let redisConfig;

    if (redisUrl) {
      // Use full URL if provided (for cloud Redis)
      redisConfig = { url: redisUrl };
    } else {
      redisConfig = {
        socket: {
          host: redisHost,
          port: parseInt(redisPort),
        },
      };
      if (redisPassword) {
        redisConfig.password = redisPassword;
      }
    }

    redisClient = redis.createClient(redisConfig);

    redisClient.on('error', (err) => {
      console.error('Redis Client Error:', err);
    });

    redisClient.on('connect', () => {
      console.log('Redis Connected Successfully');
    });

    await redisClient.connect();
  } catch (error) {
    console.error('Redis Connection Error:', error.message);
  }
};

const getRedisClient = () => {
  return redisClient;
};

module.exports = { connectRedis, getRedisClient };
