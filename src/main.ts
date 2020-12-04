// bootstrap
import 'popper.js/dist/popper.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'

import App from './App.svelte'

const app = new App({
  target: document.body,
  props: {
    name: 'world'
  }
})

export default app
