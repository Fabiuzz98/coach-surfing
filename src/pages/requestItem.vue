<template>
  <div class="requests-container">
    <div class="requests">
      <div class="requests-content">
        <a :href="emailLink" class="requests-email">{{ email }}</a>
        <p class="requests-message">{{ message }}</p>
      </div>
      <div class="icon-container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="delete-icon"
          viewBox="0 0 20 20"
          fill="currentColor"
          @click="deleteMessage()"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id', 'email', 'message'],
  methods: {
    deleteMessage() {
      this.$store.dispatch('requests/deleteMessage', this.id);
    },
  },
  computed: {
    emailLink() {
      return 'mailto:' + this.email;
    },
  },
};
</script>

<style scoped lang="scss">
.requests-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4rem auto;

  .requests {
    box-shadow: 2px 0 15px rgba(0, 0, 0, 0.25);
    background-color: #edf2f4;
    border-radius: 5px;
    position: relative;
    margin-bottom: 2rem;

    .icon-container {
      cursor: pointer;

      .delete-icon {
        width: 2rem;
        height: 2rem;
        position: absolute;
        top: 1.5rem;
        right: 1.5rem;
        border-radius: 5px;
        color: #7d8293;
        background-color: #dddfe1;
        transition: all 0.4s;

        &:hover {
          color: #2b2d42;
          background-color: #b1b2b4;
        }
      }
    }

    .requests-content {
      display: flex;
      flex-direction: column;
      text-align: center;
      width: 80rem;
      padding: 5rem;
      @media (max-width: 900px) {
        width: 60rem;
      }
      @media (max-width: 600px) {
        max-width: 35rem;
        padding: 3.5rem;
      }

      .requests-email {
        font-size: 1.8rem;
        font-weight: 500;
        color: #5c6378;
        text-decoration: none;
      }

      .requests-message {
        margin-top: 2rem;
        font-size: 1.8rem;
        font-weight: 400;
        color: #8d99ae;
        overflow: hidden;
        @media (max-width: 600px) {
          font-size: 1.4rem;
        }
      }
    }
  }
}
</style>
