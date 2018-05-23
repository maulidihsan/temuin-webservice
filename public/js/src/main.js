const Vue = require('vue');
const Vuetify = require('vuetify');
const axios = require('axios').default;

const App = require('./components/App.vue');

Vue.prototype.$eventBus = new Vue();
Vue.prototype.$session = {
   accessToken: String
};
Vue.prototype.$axios = axios;

Vue.use(Vuetify);

new Vue({
   el: '#app',
   render: function(createElement){
      return createElement(App);
   }
})

//register worker
if ('serviceWorker' in navigator) {
   navigator.serviceWorker
            .register('/public/js/dist/worker.js')
            .then(function() { console.log('Service Worker Registered'); })
            .catch(err => {
               console.log(err)
            });
}
