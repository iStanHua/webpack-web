import './styles/base.scss'
import LogoPng from './logo.png'

window.addEventListener('DOMContentLoaded', () => {

  window.addEventListener('load', () => {
    const p = document.createElement('p')
    p.innerText = 'Hello World!'
    document.body.appendChild(p)

    const img = new Image()
    img.src = LogoPng
    document.body.appendChild(img)
  })

})