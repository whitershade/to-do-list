const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const app = require('../index');
const Todo = require('../api/todos/model');
const User = require('../api/users/model');

const {
  todos, populateTodos, users, populateUsers,
} = require('./seed.test');


beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /api/todos', () => {
  it('should create a new todo', (done) => {
    const text = 'Test todo text';

    request(app)
      .post('/api/todos')
      .send({ text })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
      })
      .end((err, res) => {
        if (err) return done(err);

        Todo
          .find({ text })
          .then((todos) => {
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          })
          .catch(e => done(e));
      });
  });

  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/api/todos')
      .send()
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        Todo
          .find()
          .then((todos) => {
            expect(todos.length).toBe(todos.length);
            done();
          })
          .catch(e => done(e));
      });
  });
});

describe('GET /api/todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/api/todos')
      .expect(200)
      .expect((res) => {
        expect(Object.keys(res.body.todos).length).toBe(todos.length);
      })
      .end(done);
  });
});


describe('GET /api/todos/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
      .get(`/api/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    request(app)
      .get(`/api/todos/${new ObjectID().toHexString()}`)
      .expect(404)
      .end(done);
  });

  it('should return 418 for non-object ids', (done) => {
    request(app)
      .get('/api/todos/333')
      .expect(418)
      .end(done);
  });
});

describe('DELETE /todos/:id', () => {
  it('should remove a todo', (done) => {
    const hexId = todos[0]._id.toHexString();

    request(app)
      .delete(`/api/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) return done(err);

        Todo
          .findById(hexId)
          .then((todo) => {
            expect(todo).toBeFalsy();
            done();
          })
          .catch(e => done(e));
      });
  });

  it('should return 404 if todo not found', (done) => {
    request(app)
      .delete(`/api/todos/${new ObjectID().toHexString()}`)
      .expect(404)
      .end(done);
  });

  it('should return 418 if object id is invalid', (done) => {
    request(app)
      .delete('/api/todos/333')
      .expect(418)
      .end(done);
  });
});

describe('PATCH /api/todos/:id', () => {
  it('should update the todo', (done) => {
    const hexId = todos[0]._id.toHexString();
    const text = 'This should be the new text';

    request(app)
      .patch(`/api/todos/${hexId}`)
      .send({
        completed: true,
        text,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
        expect(typeof res.body.todo.completedAt).toBe('number');
      })
      .end(done);
  });

  it('should return 418 if object id is invalid', (done) => {
    request(app)
      .patch('/api/todos/333')
      .expect(418)
      .end(done);
  });

  it('should clear completedAt when todo is not completed', (done) => {
    const hexId = todos[1]._id.toHexString();
    const text = 'This should be the new text';

    request(app)
      .patch(`/api/todos/${hexId}`)
      .send({
        completed: false,
        text,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toBe(null);
      })
      .end(done);
  });
});


describe('GET /api/users/me', () => {
  it('should return user if authenticated', (done) => {
    request(app)
      .get('/api/users/me')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  });

  it('should return 401 if not authenticated', (done) => {
    request(app)
      .get('/api/users/me')
      .expect(401)
      .expect((res) => {
        expect(res.body).toEqual({});
      })
      .end(done);
  });
});

describe('POST /api/users', () => {
  it('should create a user', (done) => {
    const email = 'example@example.com';
    const password = 'very strong password';

    request(app)
      .post('/api/users')
      .send({ email, password })
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toBeTruthy();
        expect((res.body._id)).toBeTruthy();
        expect(res.body.email).toBe(email);
      })
      .end((err) => {
        if (err) return done(err);

        User
          .findOne({ email })
          .then((user) => {
            expect(user).toBeTruthy();
            expect(String(user.password) === String(password)).toBeFalsy();
            done();
          })
          .catch(error => done(error));
      });
  });

  it('should return validation errors if request invalid', (done) => {
    const email = 'not an email';
    const password = '123';

    request(app)
      .post('/api/users')
      .send({ email, password })
      .expect(400)
      .end(done);
  });

  it('should not create user if email in use', (done) => {
    const password = 'very strong password';

    request(app)
      .post('/api/users')
      .send({
        email: users[0].email,
        password,
      })
      .expect(400)
      .end(done);
  });
});

describe('POST /api/users/login', () => {
  it('should login user and return auth token', (done) => {
    request(app)
      .post('/api/users/login')
      .send({
        email: users[1].email,
        password: users[1].password,
      })
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toBeTruthy();
      })
      .end((err, res) => {
        if (err) return done(err);

        User
          .findById(users[1]._id).then((user) => {
            expect(user.tokens[0]).toMatchObject({
              access: 'auth',
              token: res.headers['x-auth'],
            });

            done();
          })
          .catch(error => done(error));
      });
  });

  it('should reject invalid login', (done) => {
    request(app)
      .post('/api/users/login')
      .send({
        email: users[1].email,
        password: users[1].password + 1,
      })
      .expect(400)
      .expect((res) => {
        expect(res.headers['x-auth']).toBeFalsy();
      })
      .end((err, res) => {
        if (err) return done(err);

        User
          .findById(users[1]._id).then((user) => {
            expect(user.tokens.length).toBe(0);
            done();
          })
          .catch(error => done(error));
      });
  });
});

describe('DELETE /api/users/me/token', () => {
  it('should remove auth token on logout', (done) => {
    request(app)
      .delete('/api/users/me/token')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        User
          .findById(users[0]._id)
          .then((user) => {
            expect(user.tokens.length).toBe(0);
            done();
          })
          .catch(e => done(e));
      });
  });
});
