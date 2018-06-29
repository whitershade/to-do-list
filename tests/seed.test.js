const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');
const Todo = require('../api/todos/model');
const User = require('../api/users/model');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [
  {
    _id: userOneId,
    email: 'alex@example.com',
    password: 'userOneStronPass',
    tokens: [{
      access: 'auth',
      token: jwt.sign({ _id: userOneId, access: 'auth' }, process.env.JWT_SECRET).toString(),
    }],
  },
  {
    _id: userTwoId,
    email: 'jen@example.com',
    password: 'userTwoStrongPass',
    tokens: [{
      access: 'auth',
      token: jwt.sign({ _id: userTwoId, access: 'auth' }, process.env.JWT_SECRET).toString(),
    }],
  },
];

const todos = [
  {
    _id: new ObjectID(),
    text: 'First test todo',
    _creator: userOneId,
  },
  {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333,
    _creator: userTwoId,
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
