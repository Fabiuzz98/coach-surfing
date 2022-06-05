<template>
  <section class="header-container">
    <div class="header" v-if="navigation">
      <router-link to="/"
        ><img src="../img/logo.png" class="logo"
      /></router-link>

      <ul>
        <li v-if="isAuthenticated && isRegistered">
          <base-button mode="header-links" link to="/requests"
            >requests</base-button
          >
        </li>

        <!-- <li>
          <base-button mode="header-links" link to="/">Coaches</base-button>
        </li> -->

        <li v-if="isAuthenticated && !isRegistered">
          <base-button mode="empty" link to="/registration"
            >Register as a Coach</base-button
          >
        </li>

        <li v-if="!isAuthenticated">
          <base-button mode="full" link to="/authentication">Login</base-button>
        </li>

        <li v-if="isAuthenticated">
          <base-button mode="full" link to="/" @click="logout"
            >Logout</base-button
          >
        </li>
      </ul>
    </div>

    <div v-if="!navigation && !isMobile" class="backBtn">
      <span class="line tLine"></span>
      <span class="line mLine"></span>
      <span @click="goBack" class="label">Back</span>
      <span class="line bLine"></span>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isMobile: null,
    };
  },
  methods: {
    goBack() {
      history.back();
    },
    logout() {
      this.$store.dispatch('logout');
    },

    checkScreenSize() {
      if (window.innerWidth <= 1000) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    },
  },

  created() {
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize);
  },

  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },

    isRegistered() {
      return this.$store.getters.isRegistered;
    },

    navigation() {
      return this.$store.getters.navigation;
    },
  },
};
</script>

<style scoped lang="scss">
.header {
  padding: 4rem 12rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  @media (max-width: 900px) {
    padding: 2.5rem 4rem;
  }
  @media (max-width: 550px) {
    padding: 2rem 1.5rem;
  }

  .logo {
    width: 13rem;

    @media (max-width: 1100px) {
      width: 11rem;
    }
    @media (max-width: 820px) {
      width: 10rem;
    }
    @media (max-width: 550px) {
      width: 8rem;
    }
  }

  ul {
    display: flex;
    list-style: none;
    justify-content: center;
    align-items: center;
    gap: 1.6rem;
  }
}

/* button */
.backBtn {
  width: 10rem;
  left: 5rem;
  top: 6rem;
  background-color: #f4f4f4;
  transition: all 0.4s ease;
  position: fixed;
  cursor: pointer;

  span.line {
    bottom: auto;
    right: auto;
    top: auto;
    left: auto;
    background-color: #404255;
    border-radius: 10px;

    width: 100%;
    left: 0px;
    height: 0.3rem;
    display: block;
    position: absolute;
    transition: width 0.2s ease 0.1s, left 0.2s ease, transform 0.2s ease 0.3s,
      background-color 0.2s ease;
  }

  span.tLine {
    top: -3px;
  }

  span.mLine {
    top: 13px;
    opacity: 0;
  }

  span.bLine {
    top: 24px;
  }

  .label {
    position: absolute;
    font-family: 'Poppins', sans-serif;
    left: 0px;
    top: 5px;
    width: 100%;
    text-align: center;
    transition: all 0.4s ease;
    font-size: 1.8rem;
    text-transform: uppercase;
    font-weight: 600;
    color: #404255;
  }

  &:hover span.label {
    left: 25px;
  }

  &:hover span.line {
    left: -10px;
    height: 5px;
    background-color: #404255;
  }

  &:hover span.tLine {
    width: 25px;
    transform: rotate(-45deg);
    left: -15px;
    top: 6px;
  }

  &:hover span.mLine {
    opacity: 1;
    width: 40px;
  }

  &:hover span.bLine {
    width: 25px;
    transform: rotate(45deg);
    left: -15px;
    top: 20px;
  }
}
</style>
