import { MongoClient } from 'mongodb';

const HOST = process.env.DB_HOST || 'localhost';
const PORT = process.env.DB_PORT || 27017;
const DATABASE = process.env.DB_DATABASE || 'files_manager';
const url = `mongodb://${HOST}:${PORT}`;

class DBClient {
  constructor() {
    this.client = new MongoClient(url, { useUnifiedTopology: true, useNewUrlParser: true });
  }

  async connect() {
    try {
      await this.client.connect();
      this.db = this.client.db(DATABASE);
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error('MongoDB connection error:', err);
      throw err;
    }
  }

  async isAlive() {
    return this.client.isConnected();
  }

  async nbUsers() {
    if (!this.db || !this.client.isConnected()) {
      await this.connect();
    }

    const users = this.db.collection('users');
    const countUsers = await users.countDocuments();
    return countUsers;
  }

  async nbFiles() {
    if (!this.db || !this.client.isConnected()) {
      await this.connect();
    }

    const files = this.db.collection('files');
    const countFiles = await files.countDocuments();
    return countFiles;
  }

  async close() {
    if (this.client.isConnected()) {
      await this.client.close();
      console.log('Closed MongoDB connection');
    }
  }
}

const dbClient = new DBClient();
export default dbClient;
