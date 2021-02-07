import history from 'history/browser'

import './components/routerLink'

import router from './router'

import './styles/base.scss'

window.addEventListener('DOMContentLoaded', () => {

  window.addEventListener('load', () => {

    console.log(router)

    routerResolve()

    history.listen(({ action, location }) => {
      console.log('listen', action, location)
      routerResolve()
    })

    function routerResolve() {
      router.resolve(location.pathname).then(async content => {
        if (typeof content === 'string') document.getElementById('app').innerHTML = content
        else if (typeof content === 'object') document.getElementById('app').innerHTML = await content.default
      }).catch(err => {
        console.log(err)
      })
    }
  })

})