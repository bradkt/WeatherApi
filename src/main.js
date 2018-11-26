import Vue from 'vue';
import App from './App.vue';
import Weather from './components/Weather.vue';
import Response from './components/Response.vue';
import Form from './components/Form.vue';
import Placeholder from './components/Placeholder.vue';
import Vuelidate from 'vuelidate';
export const apiKey = 'appid=7b74044f257192db0e510ee45df33d0b';

Vue.use(Vuelidate);
Vue.config.productionTip = false;
Vue.component('Weather', Weather);
Vue.component('Response', Response);
Vue.component('Form', Form);
Vue.component('Placeholder', Placeholder);

new Vue({
  render: h => h(App)
}).$mount('#app');
