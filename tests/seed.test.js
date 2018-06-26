const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');
const Todo = require('../models/todo');
const User = require('../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [
  {
    _id: userOneId,
    email: 'alex@example.com',
    password: 'userOneStronPass',
    tokens: [{
      access: 'auth',
      token: jwt.sign({ _id: userOneId, access: 'auth' }, 'abc123').toString(),
    }],
  },
  {
    _id: userTwoId,
    email: 'jen@example.com',
    password: 'userTwoStrongPass',
  },
];

const todos = [
  {
    _id: new ObjectID(),
    text: 'First test todo',
  },
  {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333,
  },
];


const populateTodos = (done) => {
  Todo.remove({}).then(() => Todo.insertMany(todos)).then(() => done());
};

const populateUsers = (done) => {
  User.remove({}).then(() => {
    const userOne = new User(users[0]).save();
    const userTwo = new User(users[1]).save();

    Promise.all([userOne, userTwo]).then(() => { console.log('done'); done(); });
  });
};


module.exports = {
  todos, populateTodos, users, populateUsers,
};
