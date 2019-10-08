import { Todos } from '.'

let todos

beforeEach(async () => {
  todos = await Todos.create({ author: 'test', content: 'test', date: 'test', status: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = todos.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(todos.id)
    expect(view.author).toBe(todos.author)
    expect(view.content).toBe(todos.content)
    expect(view.date).toBe(todos.date)
    expect(view.status).toBe(todos.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = todos.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(todos.id)
    expect(view.author).toBe(todos.author)
    expect(view.content).toBe(todos.content)
    expect(view.date).toBe(todos.date)
    expect(view.status).toBe(todos.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
