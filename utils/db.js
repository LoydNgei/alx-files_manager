const { MongoClient } = require('mongodb');

const HOST = process.env.DB_HOST || 'localhost';
const PORT = process.env.DB_PORT || 27017;
const DATABASE = process.env.DB_DATABASE || 'files_manager';
const url = `mongodb://${HOST}:${PORT}`;

class DBClient {
  constructor() {
    this.client = new MongoClient(url, { useUnifiedTopology: true, useNewUrlParser: true });
    this.isConnected = false; // Add a flag to track connection status

    // Initialize the database connection
    this.initConnection();
  }

  async initConnection() {
    try {
      await this.client.connect();
      this.db = this.client.db(DATABASE);
      this.isConnected = true; // Update the connection status flag
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error('MongoDB connection error:', err);
    }
  }

  async isAlive() {
    // Check the connection status flag
    return this.isConnected;
  }

  async nbUsers() {
    // Wait for the connection to be established
    await this.waitForConnection();

    const users = this.db.collection('users');
    const countUsers = await users.countDocuments();
    return countUsers;
  }

  async nbFiles() {
    // Wait for the connection to be established
    await this.waitForConnection();

    const files = this.db.collection('files');
    const countFiles = await files.countDocuments();
    return countFiles;
  }

  async waitForConnection() {
    return new Promise((resolve) => {
      const checkConnection = () => {
        if (this.isConnected) {
          resolve();
        } else {
          setTimeout(checkConnection, 1000);
        }
      };
      checkConnection();
    });
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
