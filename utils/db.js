const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const HOST = process.env.DB_HOST || 'localhost';
    const PORT = process.env.DB_PORT || 27017;
    this.DATABASE = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${HOST}:${PORT}`;

    this.connected = false;
    this.client = new MongoClient(url, { useUnifiedTopology: true })
      .then(() => {
        this.connected = true;
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  isAlive() {
    // Check if the client is connected
    return this.connected();
  }

  async nbUsers() {
    await this.client.connect();
    const users = await this.client.db(this.DATABASE).collection('users').countDocuments();
    return users;
  }

  async nbFiles() {
    await this.client.connect();
    const users = await this.client.db(this.DATABASE).collection('files').countDocuments();
    return users;
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
