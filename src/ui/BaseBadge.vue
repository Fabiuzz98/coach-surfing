<template>
  <div class="badge-container basic-style">
    <div class="dot" :class="mode"></div>

    <p>
      {{ title }}
    </p>
  </div>
</template>

<script>
export default {
  props: ['mode', 'name'],
  methods: {},
  computed: {
    title() {
      const spec = this.name.slice(0, 1).toUpperCase() + this.name.slice(1);
      // const specArr = spec.split('');
      // specArr.slice(1, 1).toUpperCase();
      return spec;
    },
  },
};
</script>

<style scoped lang="scss">
.basic-style {
  font-size: 1.6rem;
  color: #2b2d42;
  border-radius: 5px;
  padding: 1rem 1.5rem;
  box-shadow: 6px 7px 22px 0px rgba(0, 0, 0, 0.02);
  margin-bottom: 1rem;
  background-color: #f8f8f8;
  @media (max-width: 980px) {
    margin-top: 1rem;
    font-size: 1.4rem;
    padding: 0.8rem 1.2rem;
  }
}

.badge-container {
  display: flex;
  align-items: center;
  justify-content: center;

  .dot {
    content: '';
    color: blue;
    border-radius: 50%;
    display: inline-block;
    padding: 0.33rem;
    justify-self: center;
    align-self: center;
    @media (max-width: 980px) {
      padding: 0.28rem;
    }
  }

  p {
    padding-left: 1.2rem;
    @media (max-width: 980px) {
      padding-left: 0.8rem;
    }
    @media (max-width: 510px) {
      padding-left: 0.4rem;
    }
  }

  .frontend {
    background-color: #26c5f3;
  }

  .backend {
    background-color: #ef233c;
  }

  .fullstack {
    background-color: #f8f32b;
  }
}
</style>
