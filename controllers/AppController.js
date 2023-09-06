const DBClient = require('../utils/db');
const redisClient = require('../utils/redis');

const AppController = {
  async getStatus(req, res) {
    const dbAlive = await DBClient.isAlive();
    const redisAlive = await redisClient.isAlive();

    if (dbAlive && redisAlive) {
      return res.status(200).json({ redis: true, db: true });
    }
    return res.status(500).json({ redis: redisAlive, db: dbAlive });
  },

  async getStats(req, res) {
    try {
      const dbClient = new DBClient();
      await dbClient.connect();

      const usersCount = await dbClient.nbUsers();
      const filesCount = await dbClient.nbFiles();

      return res.status(200).json({ users: usersCount, files: filesCount });
    } catch (error) {
      console.error('Error in getStats:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = AppController;
