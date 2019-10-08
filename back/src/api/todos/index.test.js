import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Todos } from '.'

const app = () => express(apiRoot, routes)

let todos

beforeEach(async () => {
  todos = await Todos.create({})
})

test('POST /todos 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, author: 'test', content: 'test', date: 'test', status: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.author).toEqual('test')
  expect(body.content).toEqual('test')
  expect(body.date).toEqual('test')
  expect(body.status).toEqual('test')
})

test('POST /todos 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /todos 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /todos 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /todos/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${todos.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(todos.id)
})

test('GET /todos/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${todos.id}`)
  expect(status).toBe(401)
})

test('GET /todos/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /todos/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${todos.id}`)
    .send({ access_token: masterKey, author: 'test', content: 'test', date: 'test', status: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(todos.id)
  expect(body.author).toEqual('test')
  expect(body.content).toEqual('test')
  expect(body.date).toEqual('test')
  expect(body.status).toEqual('test')
})

test('PUT /todos/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${todos.id}`)
  expect(status).toBe(401)
})

test('PUT /todos/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, author: 'test', content: 'test', date: 'test', status: 'test' })
  expect(status).toBe(404)
})

test('DELETE /todos/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${todos.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /todos/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${todos.id}`)
  expect(status).toBe(401)
})

test('DELETE /todos/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
