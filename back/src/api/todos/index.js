import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Todos, { schema } from './model'

const router = new Router()
const { author, content, date, status } = schema.tree

/**
 * @api {post} /todos Create todos
 * @apiName CreateTodos
 * @apiGroup Todos
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam author Todos's author.
 * @apiParam content Todos's content.
 * @apiParam date Todos's date.
 * @apiParam status Todos's status.
 * @apiSuccess {Object} todos Todos's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Todos not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ author, content, date, status }),
  create)

/**
 * @api {get} /todos Retrieve todos
 * @apiName RetrieveTodos
 * @apiGroup Todos
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of todos.
 * @apiSuccess {Object[]} rows List of todos.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  master(),
  query(),
  index)

/**
 * @api {get} /todos/:id Retrieve todos
 * @apiName RetrieveTodos
 * @apiGroup Todos
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} todos Todos's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Todos not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  master(),
  show)

/**
 * @api {put} /todos/:id Update todos
 * @apiName UpdateTodos
 * @apiGroup Todos
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam author Todos's author.
 * @apiParam content Todos's content.
 * @apiParam date Todos's date.
 * @apiParam status Todos's status.
 * @apiSuccess {Object} todos Todos's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Todos not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  master(),
  body({ author, content, date, status }),
  update)

/**
 * @api {delete} /todos/:id Delete todos
 * @apiName DeleteTodos
 * @apiGroup Todos
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Todos not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
