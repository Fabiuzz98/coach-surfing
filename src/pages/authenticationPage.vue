<template>
  <base-error v-if="error" @close="closeErrorDialog">
    {{ error }}
  </base-error>

  <section class="user">
    <div class="user_options-container" v-if="!isMobile">
      <div class="user_options-text">
        <div class="user_options-unregistered">
          <h2 class="user_unregistered-title">Don't have an account?</h2>
          <p class="user_unregistered-text">
            Sign up now to start teaching and make use of your knowledge! You
            can later create your personal Coach account to start teaching
            instantly.
          </p>
          <button
            class="user_unregistered-signup"
            @click="signupButton"
            id="signup-button"
          >
            Sign up
          </button>
        </div>

        <div class="user_options-registered">
          <h2 class="user_registered-title">Welcome back</h2>
          <p class="user_registered-text">
            Login now and find out who is going to be your next student.
          </p>
          <button
            class="user_registered-login"
            id="login-button"
            @click="loginButton"
          >
            Login
          </button>
        </div>
      </div>

      <div
        class="user_options-forms"
        id="user_options-forms"
        :class="{
          bounceRight: bounceRightIsActive,
          bounceLeft: bounceLeftIsActive,
        }"
      >
        <div class="user_forms-login">
          <h2 class="forms_title">Login</h2>
          <form class="forms_form">
            <fieldset class="forms_fieldset">
              <div class="forms_field">
                <input
                  type="email"
                  placeholder="Email"
                  class="forms_field-input"
                  required
                  v-model.trim="email"
                />
              </div>
              <div class="forms_field">
                <input
                  type="password"
                  placeholder="Password"
                  class="forms_field-input"
                  required
                  v-model.trim="password"
                />
              </div>
            </fieldset>
            <div class="forms_buttons">
              <base-button
                mode="full"
                type="submit"
                value="Login"
                class="forms_buttons-action"
                @click.prevent="submitLogin"
                >Login</base-button
              >
            </div>
          </form>
        </div>
        <div class="user_forms-signup">
          <h2 class="forms_title">Sign Up</h2>
          <form class="forms_form">
            <fieldset class="forms_fieldset">
              <div class="forms_field">
                <input
                  type="email"
                  placeholder="Email"
                  class="forms_field-input"
                  v-model.trim="email"
                  required
                />
              </div>
              <div class="forms_field">
                <input
                  type="password"
                  placeholder="Password"
                  class="forms_field-input"
                  v-model.trim="password"
                  required
                />
              </div>
            </fieldset>
            <div class="forms_buttons">
              <base-button
                mode="full"
                type="submit"
                value="Sign up"
                class="forms_buttons-action"
                @click.prevent="submitSignUp"
                >Sign up</base-button
              >
            </div>
          </form>
        </div>
      </div>
    </div>

    <div v-else>
      <div class="container">
        <form class="form">
          <div class="avatar">
            <img
              src="https://res.cloudinary.com/merobusts/image/upload/v1518264117/head-659651_640.png"
              alt="avatar"
            />
          </div>
          <div class="form-item">
            <label for="email">Email</label>
            <input
              type="email"
              placeholder="Email"
              class="forms_field-input"
              v-model.trim="email"
              required
            />
          </div>
          <div class="form-item">
            <label for="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              class="forms_field-input"
              v-model.trim="password"
              required
            />
          </div>
          <div class="form-item" v-if="switchToRegister">
            <base-button
              mode="full"
              type="submit"
              value="Sign up"
              class="forms_buttons-action"
              @click.prevent="submitSignUp"
              >Sign up</base-button
            >
          </div>
          <div class="form-item" v-else>
            <base-button
              mode="full"
              type="submit"
              value="Login"
              class="forms_buttons-action"
              @click.prevent="submitLogin"
              >Login</base-button
            >
          </div>
          <div class="form-item is-link" v-if="!switchToRegister">
            Don't have an account?
            <span @click="changeAuthType">Register!</span>
          </div>
          <div class="form-item is-link" v-else>
            Don't have an account? <span @click="changeAuthType">Login!</span>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      password: '',
      email: '',
      bounceRightIsActive: false,
      bounceLeftIsActive: false,
      error: null,
      isMobile: null,
      switchToRegister: false,
    };
  },

  methods: {
    closeErrorDialog() {
      this.error = null;
    },
    changeAuthType() {
      this.switchToRegister = !this.switchToRegister;
    },
    async submitSignUp() {
      if (
        this.password.length < 6 ||
        this.email === '' ||
        !this.email.includes('@')
      ) {
        this.error =
          'Please insert a valid email and a password long at least 6 characters';
        return;
      }

      const userData = {
        email: this.email,
        password: this.password,
      };

      try {
        await this.$store.dispatch('signUp', userData);
        this.$router.replace('/');
      } catch (err) {
        this.error = err;
      }
    },

    async submitLogin() {
      if (
        this.password.length < 6 ||
        this.email === '' ||
        !this.email.includes('@')
      ) {
        this.error =
          'Please insert a valid email and a password long at least 6 characters';

        return;
      }

      const userData = {
        email: this.email,
        password: this.password,
      };

      try {
        await this.$store.dispatch('login', userData);
        this.$router.replace('/');
      } catch (err) {
        this.error = err;
      }

      this.$store.dispatch('isRegistered');
    },
    signupButton() {
      //add class bounceLeft and remove class bounceRight
      this.bounceLeftIsActive = true;
      this.bounceRightIsActive = false;
    },
    loginButton() {
      this.bounceLeftIsActive = false;
      this.bounceRightIsActive = true;
    },

    checkScreenSize() {
      if (window.innerWidth <= 710) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    },
  },
  created() {
    window.addEventListener('resize', this.checkScreenSize);

    this.checkScreenSize();
  },
};
</script>

<style scoped lang="scss">
// ----------------- for mobile------------------
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.form {
  margin: 0;
  position: relative;
  background: rgba(0, 0, 0, 0.7);
  padding: 60px 10px 20px 10px;
  color: #fff;
  display: flex;
  flex-direction: column;
  width: 300px;
  border-radius: 5px;
}
.avatar {
  position: absolute;
  background: #74b9ff;
  border-radius: 50%;
  top: -10%;
  left: 40%;
  z-index: 4;
}
.avatar img {
  width: 64px;
  height: 64px;
}

.form-item {
  padding: 15px 10px 10px 10px;
  flex: 1;
  display: flex;
  flex-direction: column;
  letter-spacing: 0.5px;
}

.form-item label {
  display: block;
  flex: 1;
  margin-bottom: 5px;
  cursor: pointer;
}

.form-item input {
  padding: 4px 0px;
  flex: 1;
  background: transparent;
  border-top: none;
  outline: none;
  border-left: none;
  border-right: none;
  caret-color: #fff;
  color: #fff;
  transition: all 200ms;
  border-bottom-color: #fff;
}

.form-item input:focus {
  border-bottom-color: coral;
}

::placeholder,
::ms-input-placeholder,
:ms-input-placeholder {
  color: #ccc;
  font-size: 12px;
}

.form-item button {
  border: 1px solid #ccc;
}

.form-item span {
  cursor: pointer;
  color: white;
}

.is-link {
  color: #ccc;
  flex: 1;
  font-size: 14px;
}

.is-link:hover span {
  text-decoration: underline;
}

// ----------desktop-------------------------------------

button {
  background-color: transparent;
  padding: 0;
  border: 0;
  outline: 0;
  cursor: pointer;
}

input {
  background-color: transparent;
  padding: 0;
  border: 0;
  outline: 0;
}
input[type='submit'] {
  cursor: pointer;
}
input::-webkit-input-placeholder {
  font-size: 1.4rem;
  font-weight: 300;
  letter-spacing: 0.1rem;
  color: #abaeb5;
}
input::-moz-placeholder {
  font-size: 1.4rem;
  font-weight: 300;
  letter-spacing: 0.1rem;
  color: #abaeb5;
}
input:-ms-input-placeholder {
  font-size: 1.4rem;
  font-weight: 300;
  letter-spacing: 0.1rem;
  color: #abaeb5;
}
input::-ms-input-placeholder {
  font-size: 1.4rem;
  font-weight: 300;
  letter-spacing: 0.1rem;
  color: #abaeb5;
}
input::placeholder {
  font-size: 1.4rem;
  font-weight: 300;
  letter-spacing: 0.1rem;
  color: #abaeb5;
}

/**
 * Bounce to the left side
 */
@-webkit-keyframes bounceLeft {
  0% {
    -webkit-transform: translate3d(100%, -50%, 0);
    transform: translate3d(100%, -50%, 0);
  }
  50% {
    -webkit-transform: translate3d(-30px, -50%, 0);
    transform: translate3d(-30px, -50%, 0);
  }
  100% {
    -webkit-transform: translate3d(0, -50%, 0);
    transform: translate3d(0, -50%, 0);
  }
}
@keyframes bounceLeft {
  0% {
    -webkit-transform: translate3d(100%, -50%, 0);
    transform: translate3d(100%, -50%, 0);
  }
  50% {
    -webkit-transform: translate3d(-30px, -50%, 0);
    transform: translate3d(-30px, -50%, 0);
  }
  100% {
    -webkit-transform: translate3d(0, -50%, 0);
    transform: translate3d(0, -50%, 0);
  }
}
/**
 * Bounce to the left side
 */
@-webkit-keyframes bounceRight {
  0% {
    -webkit-transform: translate3d(0, -50%, 0);
    transform: translate3d(0, -50%, 0);
  }
  50% {
    -webkit-transform: translate3d(calc(100% + 30px), -50%, 0);
    transform: translate3d(calc(100% + 30px), -50%, 0);
  }
  100% {
    -webkit-transform: translate3d(100%, -50%, 0);
    transform: translate3d(100%, -50%, 0);
  }
}
@keyframes bounceRight {
  0% {
    -webkit-transform: translate3d(0, -50%, 0);
    transform: translate3d(0, -50%, 0);
  }
  50% {
    -webkit-transform: translate3d(calc(100% + 30px), -50%, 0);
    transform: translate3d(calc(100% + 30px), -50%, 0);
  }
  100% {
    -webkit-transform: translate3d(100%, -50%, 0);
    transform: translate3d(100%, -50%, 0);
  }
}
/**
 * Show Sign Up form
 */
@-webkit-keyframes showSignUp {
  100% {
    opacity: 1;
    visibility: visible;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
@keyframes showSignUp {
  100% {
    opacity: 1;
    visibility: visible;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
/**
 * Page background
 */
.user {
  display: -webkit-box;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: linear-gradient(287.83deg, #8d99ae, rgba(237, 242, 244, 0));
}
.user_options-container {
  position: relative;
  width: 80%;

  .user_options-text {
    display: -webkit-box;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    width: 100%;
    background-color: #2b2d42;
    border-radius: 3px;
  }
}

/**
 * Registered and Unregistered user box and text
 */
.user_options-registered,
.user_options-unregistered {
  width: 50%;
  padding: 75px 45px;
  color: #edf2f4;
  font-weight: 300;

  .user_registered-title,
  .user_unregistered-title {
    margin-bottom: 15px;
    font-size: 3rem;
    line-height: 1em;
  }

  .user_unregistered-text,
  .user_registered-text {
    font-size: 1.8rem;
    line-height: 1.4em;
  }
  .user_registered-login,
  .user_unregistered-signup {
    font-family: 'Poppins', sans-serif;
    margin-top: 30px;
    border: 1px solid #edf2f4;
    border-radius: 3px;
    padding: 10px 30px;
    color: #edf2f4;
    text-transform: uppercase;
    line-height: 1em;
    letter-spacing: 0.2rem;
    -webkit-transition: background-color 0.2s ease-in-out,
      color 0.2s ease-in-out;
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

    &:hover,
    &:hover {
      color: #2b2d42;
      background-color: #edf2f4;
    }
  }
}

/**
 * Login and signup forms
 .*/

.forms_fieldset {
  border-radius: 5px;
  border-color: #edf2f4;
}

.user_options-forms {
  position: absolute;
  top: 50%;
  left: 30px;
  width: calc(50% - 30px);
  min-height: 420px;
  background-color: #edf2f4;
  border-radius: 3px;
  box-shadow: 2px 0 15px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  -webkit-transform: translate3d(100%, -50%, 0);
  transform: translate3d(100%, -50%, 0);
  -webkit-transition: -webkit-transform 0.4s ease-in-out;
  transition: -webkit-transform 0.4s ease-in-out;
  transition: transform 0.4s ease-in-out;
  transition: transform 0.4s ease-in-out, -webkit-transform 0.4s ease-in-out;
}
.user_options-forms .user_forms-login {
  -webkit-transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out;
  transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out;
}
.user_options-forms .forms_title {
  margin-bottom: 45px;
  font-size: 3rem;
  font-weight: 600;
  line-height: 1em;
  text-transform: uppercase;
  color: #53596c;
  letter-spacing: 0.1rem;
}
.user_options-forms .forms_field:not(:last-of-type) {
  margin-bottom: 20px;
}
.user_options-forms .forms_field-input {
  width: 100%;
  border-bottom: 1px solid #b3b6bc;
  padding: 6px 20px 6px 20px;
  font-size: 2rem;
  color: #5c6378;
  letter-spacing: 0.1rem;
  -webkit-transition: border-color 0.2s ease-in-out;
  transition: border-color 0.2s ease-in-out;
}
.user_options-forms .forms_field-input:focus {
  border-color: #404554;
}
.user_options-forms .forms_buttons {
  display: -webkit-box;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  margin-top: 35px;
}

.user_options-forms .forms_buttons-action {
  letter-spacing: 0.1rem;
  -webkit-transition: background-color 0.2s ease-in-out;
  transition: background-color 0.2s ease-in-out;
}

.user_options-forms .user_forms-signup,
.user_options-forms .user_forms-login {
  position: absolute;
  top: 75px;
  left: 40px;
  width: calc(100% - 80px);
  opacity: 0;
  visibility: hidden;
  -webkit-transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out,
    -webkit-transform 0.5s ease-in-out;
  transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out,
    -webkit-transform 0.5s ease-in-out;
  transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out,
    transform 0.5s ease-in-out;
  transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out,
    transform 0.5s ease-in-out, -webkit-transform 0.5s ease-in-out;
}
.user_options-forms .user_forms-signup {
  -webkit-transform: translate3d(120px, 0, 0);
  transform: translate3d(120px, 0, 0);
}
.user_options-forms .user_forms-signup .forms_buttons {
  -webkit-box-pack: end;
  justify-content: flex-end;
}
.user_options-forms .user_forms-login {
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  opacity: 1;
  visibility: visible;
}

/**
 * Triggers
 */
.user_options-forms.bounceLeft {
  -webkit-animation: bounceLeft 1s forwards;
  animation: bounceLeft 1s forwards;
}
.user_options-forms.bounceLeft .user_forms-signup {
  -webkit-animation: showSignUp 1s forwards;
  animation: showSignUp 1s forwards;
}
.user_options-forms.bounceLeft .user_forms-login {
  opacity: 0;
  visibility: hidden;
  -webkit-transform: translate3d(-120px, 0, 0);
  transform: translate3d(-120px, 0, 0);
}
.user_options-forms.bounceRight {
  -webkit-animation: bounceRight 1s forwards;
  animation: bounceRight 1s forwards;
}

@media screen and (max-width: 990px) {
  .user_options-forms {
    min-height: 350px;
  }
  .user_options-forms .forms_buttons {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
  }
  .user_options-forms .user_forms-login .forms_buttons-action {
    margin-top: 30px;
  }
  .user_options-forms .user_forms-signup,
  .user_options-forms .user_forms-login {
    top: 40px;
  }

  .user_options-registered,
  .user_options-unregistered {
    padding: 50px 45px;
  }
}
</style>
