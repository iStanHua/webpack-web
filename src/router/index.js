import UniversalRouter from 'universal-router'

import HomePage from '@/views/home'

export const routeContexts = () => {
  let contexts = require.context('./modules', true, /\.js$/)
  return contexts.keys().map(key => contexts(key).default)
}

const routes = [
  // ...routeContexts(),
  {
    path: '',
    redirect: '/'
  },
  {
    path: '/',
    action: () => HomePage
  },
  {
    path: '/about',
    action: () => import(/* webpackChunkName: "about" */ '@/views/about')
  }
]
const router = new UniversalRouter(routes, {
  // resolveRoute(context, params) {
  //   console.log(context, params)
  //   if (typeof context.route.action === 'function') {
  //     return context.route.action(context, params)
  //   }
  //   return undefined
  // },
  errorHandler(error, context) {
    console.error(error)
    console.info(context)
    return error.status === 404 ? '<h1>Page Not Found</h1>' : '<h1>Oops! Something went wrong</h1>'
  }
})

export default router
