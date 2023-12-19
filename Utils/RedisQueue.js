const redis = require('redis');

// Create Redis client without explicit configurations
const client = redis.createClient();

// Example usage of the Redis client
client.on('connect', () => {
  console.log('Connected to Redis');
});

client.on('error', (err) => {
  console.error('Redis error:', err);
});