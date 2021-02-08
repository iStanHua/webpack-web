import history from 'history/browser'

import './components/routerLink'

import router from './router'

import './styles/base.scss'

window.addEventListener('DOMContentLoaded', () => {

  window.addEventListener('load', () => {
    console.log(router)

    const $app = document.getElementById('app')

    routerResolve()

    history.listen(({ action, location }) => {
      console.log('listen', action, location)
      routerResolve()
    })

    function routerResolve() {
      router.resolve(location.pathname).then(async DOM => {
        if (typeof DOM === 'string') $app.innerHTML = DOM
        else if (typeof DOM === 'object') $app.innerHTML = new DOM.default().render()
        else if (typeof DOM === 'function') $app.innerHTML = new DOM().render()
      }).catch(err => {
        console.log(err)
      })
    }
  })

})