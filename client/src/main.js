import Vue from 'vue';
import App from './App.vue';
import VueSocketIO from 'vue-socket.io';
import VueScroll from 'vuescroll';

Vue.use(VueScroll, {
  ops: {
    bar: {
      size: 0
    }
  }
});

Vue.use(new VueSocketIO({
  connection: 'http://localhost:8888'
}));

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
