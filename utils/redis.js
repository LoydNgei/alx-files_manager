const redis = require('redis');

// Class RedisClient
class RedisClient {
  constructor() {
    // Create a Redis client
    this.client = redis.createClient();

    // Handle errors
    this.client.on('error', (error) => {
      console.error('Redis Error:', error);
    });
  }

  isAlive() {
    // Check if the connection is alive
    return this.client.connected;
  }

  async get(key) {
    return new Promise((resolve, reject) => {
      // Retrieve the value for the given key from Redis
      this.client.get(key, (error, value) => {
        if (error) {
          reject(error);
        } else {
          resolve(value);
        }
      });
    });
  }

  async set(key, value, durationInSeconds) {
    return new Promise((resolve, reject) => {
      // Store the value in Redis with an expiration time
      this.client.setex(key, durationInSeconds, value, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(true);
        }
      });
    });
  }

  async del(key) {
    return new Promise((resolve, reject) => {
      // Remove the value associated with the given key from Redis
      this.client.del(key, (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response === 1); // Returns true if the key was deleted, false otherwise
        }
      });
    });
  }
}

// Create and export an instance of RedisClient
const redisClient = new RedisClient();

module.exports = redisClient;
