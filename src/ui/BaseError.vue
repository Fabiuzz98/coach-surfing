<template>
  <div class="dialog-container" @click="closeDialog">
    <div class="backdrop"></div>
    <div class="error-container">
      <div class="error">
        <h3 class="error-title">An Error Occurred!</h3>
        <div class="error-content">
          <p class="error-message">
            <slot></slot>
          </p>
          <base-button mode="full" @click="closeDialog">Got It</base-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closeDialog() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.dialog-container {
  z-index: 999;
  position: absolute;
  width: 100%;
  height: 100vh;
}

.backdrop {
  width: 100%;
  height: 100vh;
  background-color: rgba(30, 31, 46, 0.7);
  position: absolute;
  z-index: -999;
}
.error-container {
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  text-align: center;
}

.error {
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  background-color: #edf2f4;
  width: 40%;
  margin-top: 10rem;
  overflow: hidden;
}

.error-content {
  font-size: 1.6rem;
  margin: 4rem 0;
}

.error-title {
  color: #d90429;
  background-color: #2b2d42;
  padding: 2rem 0;
  font-size: 2.2rem;
}

.error-message {
  color: #d90429;
  padding: 0 2rem 6rem 2rem;
}
</style>
