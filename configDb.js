const config = {};

config.mongoURI = {
  development: 'mongodb://pangestu1134:test@pangestu-shard-00-00-xdp8x.mongodb.net:27017,pangestu-shard-00-01-xdp8x.mongodb.net:27017,pangestu-shard-00-02-xdp8x.mongodb.net:27017/backend-test-kumparan?ssl=true&replicaSet=pangestu-shard-0&authSource=admin',
  test: 'mongodb://pangestu1134:test@pangestu-shard-00-00-xdp8x.mongodb.net:27017,pangestu-shard-00-01-xdp8x.mongodb.net:27017,pangestu-shard-00-02-xdp8x.mongodb.net:27017/backend-testing?ssl=true&replicaSet=pangestu-shard-0&authSource=admin'
};

module.exports = config;