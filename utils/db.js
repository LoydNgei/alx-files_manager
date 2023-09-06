import { MongoClient } from 'mongodb';

const HOST = process.env.DB_HOST || 'localhost';
const PORT = process.env.DB_PORT || 27017;
const DATABASE = process.env.DB_DATABASE || 'files_manager';
const url = `mongodb://${HOST}:${PORT}`;

class DBClient {
  constructor() {
    this.client = new MongoClient(url, { useUnifiedTopology: true, useNewUrlParser: true });
    this.client.connect()
      .then(() => {
        this.db = this.client.db(DATABASE);
        console.log('Connected to MongoDB');
      })
      .catch((err) => {
        console.error('MongoDB connection error:', err);
      });
  }

  async isAlive() {
    // Check if the client is connected
    return this.client.isConnected();
  }

  async nbUsers() {
    const users = this.db.collection('users');
    const countUsers = await users.countDocuments();
    return countUsers;
  }

  async nbFiles() {
    const files = this.db.collection('files');
    const countFiles = await files.countDocuments();
    return countFiles;
  }
}

const dbClient = new DBClient();
export default dbClient;
