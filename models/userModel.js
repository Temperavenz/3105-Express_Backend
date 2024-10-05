let users = require('../data/users.json');

module.exports = {
  getUsers: () => users,
  addUser: (user) => {
    users.push(user);
  },
  findUserByUsername: (username) => {
    return users.find(user => user.username === username);
  },
  findUserById: (id) => {
    return users.find(user => user.id === id);
  }
};