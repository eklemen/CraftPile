const SnakeNamingStrategy =
  require('typeorm-naming-strategies').SnakeNamingStrategy;

module.exports = {
  namingStrategy: new SnakeNamingStrategy(),
};
