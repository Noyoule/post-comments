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