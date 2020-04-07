import Vue from 'vue'
import Vuelayers from 'vuelayers'
import 'vuelayers/lib/style.css'

Vue.use(Vuelayers, {
    dataProjection: 'EPSG:4326',
  })

export default new Vuelayers()