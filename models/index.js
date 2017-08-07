var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack');

const Page = db.define('page', {
  title: Sequelize.STRING,
  url: Sequelize.STRING,
  content: Sequelize.TEXT,
  status: {
    type: Sequelize.ENUM('open', 'closed')
  }
});

const User = db.define('user', {
  name: Sequelize.STRING,
  email: Sequelize.STRING
});

module.exports = {
  Page: Page,
  User: User
};
