const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const app = require('../index');
const Todo = require('../models/todo');
const { todos, populateTodos } = require('./seed.test');


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
