import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import firebase from 'firebase'
import './firebase/init'

Vue.config.productionTip = false


let app = null
firebase.auth().onAuthStateChanged((user) => {
  if (!app) {
    if (user)
      store.dispatch('auth/updateUser', user);

    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }
});

