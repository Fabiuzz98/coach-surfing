<template>
  <div class="messages-container">
    <base-error v-if="error" @close="closeErrorDialog">
      {{ error }}
    </base-error>

    <div v-if="requests.length > 0">
      <div class="loading-spinner" v-if="!isLoaded">
        <base-loading>Loading requests...</base-loading>
      </div>
      <div v-else>
        <request-item
          v-for="request in requests"
          :key="request.id"
          :id="request.id"
          :email="request.email"
          :message="request.message"
        ></request-item>
      </div>
    </div>
    <div class="no-requests-container" v-else>
      <div>
        <p class="message">There are no requests yet</p>
      </div>
    </div>
  </div>
</template>

<script>
import requestItem from './requestItem.vue';
export default {
  data() {
    return {
      isLoaded: false,
      error: null,
    };
  },

  components: {
    requestItem,
  },

  methods: {
    closeErrorDialog() {
      this.error = null;
      this.isLoaded = true;
    },

    async loadRequests() {
      try {
        await this.$store.dispatch('requests/loadRequests');
        this.isLoaded = true;
      } catch (err) {
        this.error = err;
      }
    },
  },

  created() {
    this.isLoaded = false;
    this.loadRequests();
  },

  computed: {
    requests() {
      return this.$store.getters['requests/requests'];
    },
  },
};
</script>

<style scoped lang="scss">
.messages-container {
  margin: 10rem 0;
}

.no-requests-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 18rem;

  .message {
    font-size: 2.6rem;
    color: #8d99ae;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.308);
    @media (max-width: 550px) {
      font-size: 1.8rem;
    }
  }
}

.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;
}
</style>
