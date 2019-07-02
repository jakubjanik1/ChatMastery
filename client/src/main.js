import Vue from 'vue';
import App from './App.vue';
import VueSocketIO from 'vue-socket.io';
import VueScroll from 'vuescroll';
import Vuebar from 'vuebar';

Vue.use(Vuebar);

Vue.use(VueScroll, {
  ops: {
    bar: {
      size: 0
    }
  }
});

Vue.use(new VueSocketIO({
  connection: 'http://192.168.0.103:8888'
}));

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
