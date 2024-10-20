module.exports = {
    name: process.env.DB_NAME,
    host: process.env.DB_URL || 'localhost:27017',
    opts: {
      autoIndex: false,
    },
  };