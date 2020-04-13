import Chart from 'chart.js';

export default {
    install: function(Vue, ){
        Object.defineProperty(Vue.prototype, '$chart', { value: Chart });
    }
}