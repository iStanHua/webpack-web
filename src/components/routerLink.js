import history from 'history/browser'

class RouterLink extends HTMLElement {
  static get observedAttributes() {
    return ['to', 'replace']
  }
  constructor() {
    super()

    // const shadow = this.attachShadow({mode: 'open'})
    // const a = document.createElement('a')
    // shadow.appendChild(a)

    this.addEventListener('click', this.onClick, false)
  }
  connectedCallback() {
    console.log('Custom square element added to page.')
  }
  disconnectedCallback() {
    console.log('Custom square element removed from page.')

    this.removeEventListener('click', this.onClick, false)
  }
  adoptedCallback() {
    console.log('Custom square element moved to new page.')

    this.removeEventListener('click', this.onClick, false)
  }
  attributeChangedCallback(name, oldValue, newValue) {
    console.log('Custom square element attributes changed.', name, oldValue, newValue)
  }
  onClick() {
    const to = this.getAttribute('to')
    const replace = this.getAttribute('replace')
    console.log(replace)
    if (to) {
      if (replace !== null) history.replace(to)
      else history.push(to)
    }
  }
}

customElements.define('router-link', RouterLink)