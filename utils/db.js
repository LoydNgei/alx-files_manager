// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({});
const fileSchema = new mongoose.Schema({});

const User = mongoose.model('users', userSchema);
const File = mongoose.model('files', fileSchema);

class DBClient {
  constructor() {
    // Get MongoDB connection details from environment variables or use defaults
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const uri = `mongodb://${host}:${port}/${database}`;

    // Connect to MongoDB
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Check for connection errors
    const db = mongoose.connection;
    db.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });
    db.once('open', () => {
      console.log('Connected to MongoDB');
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async isAlive() {
    // Check if mongoose.connection is available and the readyState is connected (1)
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      return true;
    }
    return false;
  }

  // eslint-disable-next-line class-methods-use-this
  async nbUsers() {
    try {
      const count = await User.countDocuments().maxTimeMS(30000);
      return count;
    } catch (error) {
      console.error('Error in nbUsers:', error);
      throw error;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async nbFiles() {
    try {
      const count = await File.countDocuments();
      return count;
    } catch (error) {
      console.error('Error in nbFiles:', error);
      throw error;
    }
  }
}

const dbClient = new DBClient(); // Create an instance of DBClient

module.exports = dbClient;
