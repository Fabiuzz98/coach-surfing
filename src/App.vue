<template>
  <div class="app-container">
    <theHeader></theHeader>

    <router-view> </router-view>
  </div>
</template>

<script>
import theHeader from './layout/TheHeader.vue';
export default {
  components: {
    theHeader,
  },

  methods: {
    checkRoute() {
      if (
        this.$route.name === 'authentication' ||
        this.$route.name === 'registration'
      ) {
        this.$store.dispatch('hideNavigation');
        return;
      } else {
        this.$store.dispatch('showNavigation');
      }
    },
  },
  created() {
    this.$store.dispatch('tryLogin');
    this.checkRoute();
  },

  watch: {
    $route() {
      this.checkRoute();
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 62.5%;
}

.app-container {
  min-height: 100vh;
}

body {
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  line-height: 1;
  overflow-x: hidden;
  background: linear-gradient(287.83deg, #8d99ae, rgba(237, 242, 244, 0));
}
</style>
