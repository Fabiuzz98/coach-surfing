<template>
  <button v-if="!checkIfButton" :class="mode">
    <slot></slot>
  </button>

  <router-link v-else :class="mode" :to="to">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  // props: ['mode', 'to', 'link'],
  props: {
    mode: String,
    to: String,
    link: Boolean,
  },
  computed: {
    checkIfButton() {
      return !!this.link;
    },
  },
};
</script>

<style scoped lang="scss">
.header-links {
  color: #5c6378;
  letter-spacing: 0.1rem;
  cursor: pointer;
  background-color: transparent;
}

.header-links:hover,
.header-links:active {
  color: #2b2d42;
}

a {
  font-size: 1.4rem;
  font-weight: 500;
  text-transform: uppercase;
  text-decoration: none;
  letter-spacing: 0.15rem;
  font-family: 'Poppins', sans-serif;
  @media (max-width: 750px) {
    font-size: 1.2rem;
  }
  @media (max-width: 550px) {
    font-size: 1rem;
  }
}

button {
  border: none;
  cursor: pointer;
  font-size: 1.4rem;
  font-weight: 500;
  letter-spacing: 0.05rem;
  text-transform: uppercase;
  font-family: 'Poppins', sans-serif;
  @media (max-width: 750px) {
    font-size: 1.2rem;
  }
  @media (max-width: 550px) {
    font-size: 1rem;
  }
}

.full {
  background-color: #2b2d42;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  color: #edf2f4;
  transition: all 0.4s;
  cursor: pointer;
  font-weight: 500;

  @media (max-width: 550px) {
    padding: 0.6rem 1rem;
    font-size: 1rem;
  }
}

.empty {
  outline: 2px solid #2b2d42;
  color: #2b2d42;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.4s;

  @media (max-width: 550px) {
    padding: 0.6rem 1rem;
    font-size: 1rem;
  }
}

.full:hover,
.full:active {
  background-color: #404255;
}

.empty:hover,
.empty:active {
  box-shadow: inset 0 0 0 0.1rem #2b2d42;
}

.hero-text--link {
  background-image: linear-gradient(
    200deg,
    rgba(239, 35, 59, 0.342),
    rgba(217, 4, 39, 0.856)
  );

  padding: 1.5rem 3rem;
  border-radius: 0.6rem;
  color: #edf2f4;
  transition: all 0.4s;
  cursor: pointer;
  letter-spacing: 0.05rem;
  position: relative;
  justify-items: end;

  @media (max-width: 950px) {
    padding: 1rem 2rem;
  }
  @media (max-width: 850px) {
    padding: 0.8rem 1.4rem;
    font-size: 1.2rem;
  }
}

.hero-text--link::after {
  content: '🠗';
  position: absolute;
  top: -2.5rem;
  right: 1.8rem;
  color: #edf2f4;
  opacity: 0;
  transition: all 0.4s;
}

.hero-text--link:hover {
  box-shadow: 0 15px 30px -12px rgba(217, 4, 39, 0.256);
}

.hero-text--link:hover::after {
  transform: translateY(200%);
  opacity: 1;
}
</style>
