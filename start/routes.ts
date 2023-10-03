/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

/**
 * @swagger
 * components:
 *   schemas:
 *     Unauthorized:
 *       type: object
 *       properties:
 *         errors:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 * 
 *     GetPost:
 *       type: object
 *       properties:
 *         user:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               example: John Doe
 *             avatar:
 *               type: string
 *               example: path/to/avatar.jpg
 *           required:
 *             - name
 *             - avatar
 *         content:
 *           type: string
 *           example: Post content goes here
 *         likes:
 *           type: integer
 *           example: 42
 *         medias:
 *           type: array
 *           items:
 *             type: string
 *             example: path/to/media1.jpg
 *           example: ['path/to/media1.jpg', 'path/to/media2.jpg']
 *         comments:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Comment'
 *           example:
 *             - user:
 *                 name: Jane Smith
 *                 avatar: path/to/avatar.jpg
 *               content: Comment 1
 *               created_at: '2023-10-01T12:34:56'
 *             - user:
 *                 name: Bob Johnson
 *                 avatar: path/to/avatar.jpg
 *               content: Comment 2
 *               created_at: null
 *
 *     Comment:
 *       type: object
 *       properties:
 *         user:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               example: Jane Doe
 *             avatar:
 *               type: string
 *               example: path/to/avatar.jpg
 *           required:
 *             - name
 *             - avatar
 *         content:
 *           type: string
 *           example: Comment content goes here
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: '2023-10-01T12:34:56'
 *
 */
import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'


Route.get('/redis/health', async ({ response }) => {
  const report = await HealthCheck.getReport()
  
  return report.healthy
    ? response.ok(report)
    : response.badRequest(report)
})



Route.group(() => {
  Route.post('/register', 'auth/AuthenticatesController.register')
  Route.post('/login', 'auth/AuthenticatesController.login')
}).prefix('/api/v1')

Route.group(() => {
  Route.post('/logout', 'auth/AuthenticatesController.logout')

  /*Post*/
  Route.get('/post/:postId', 'post/PostsController.get')
  Route.post('/post', 'post/PostsController.create')
  Route.post('/post/like/toggle/:postId', 'post/PostsController.likeToggle')
  Route.delete('/post/delete/:postId', 'post/PostsController.deletePost')
  Route.get('/posts', 'post/PostsController.getAll')
  
  //Comments
  Route.post('/post/comment/:postId', 'post/CommentsController.create')
  Route.get('/post/comments/:postId', 'post/CommentsController.get')
}).prefix('/api/v1').middleware('auth:api')