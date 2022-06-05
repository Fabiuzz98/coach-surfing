import { createApp } from 'vue';

import router from './router.js';
import store from './store/index.js';

import App from './App.vue';

import BaseButton from './ui/BaseButton.vue';
import BaseBadge from './ui/BaseBadge.vue';
import BaseError from './ui/BaseError.vue';
import BaseLoading from './ui/BaseLoading.vue';

const app = createApp(App);

app.use(router);
app.use(store);

app.component('base-button', BaseButton);
app.component('base-badge', BaseBadge);
app.component('base-error', BaseError);
app.component('base-loading', BaseLoading);

app.mount('#app');
