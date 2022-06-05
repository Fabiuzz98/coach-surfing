<template>
  <div class="container">
    <div class="message-container" v-if="successMessage">
      <div class="success-message">You have succesfully sent the message</div>
    </div>
    <div v-else class="contact-container">
      <div class="right-col">
        <div class="title-container">
          <h3>
            Interested? <br />
            Reach out now!
          </h3>
        </div>
        <form :class="{ form_invalid: !formIsValid }">
          <div class="text-container">
            <fieldset>
              <div>
                <input
                  id="email"
                  type="email"
                  class="text-field"
                  placeholder="Email"
                  v-model="email"
                />
              </div>

              <div>
                <textarea
                  id="message"
                  class="text-field"
                  rows="5"
                  placeholder="Message"
                  v-model="message"
                />
              </div>
            </fieldset>
          </div>
          <p v-if="!formIsValid" class="invalid-message">
            Please insert a valid email and fill in all the fields
          </p>

          <div class="btn-container">
            <base-button mode="full" @click.prevent="sendRequest"
              >contact</base-button
            >
          </div>
        </form>
      </div>
      <div class="left-col">
        <img
          :src="selectedCoach.img"
          class="coach-img"
          alt="coach profile image"
        />
        <figcaption class="coach-name">{{ selectedCoach.fullName }}</figcaption>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id'],

  data() {
    return {
      selectedCoach: null,
      email: '',
      message: '',
      formIsValid: true,
      successMessage: false,
    };
  },

  methods: {
    sendRequest() {
      this.formIsValid = true;

      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.message === ''
      ) {
        this.formIsValid = false;
        return;
      }

      const request = { email: this.email, message: this.message, id: this.id };
      this.$store.dispatch('requests/sendRequest', request);
      this.successMessage = true;
      this.successPopUp();
    },

    successPopUp() {
      setTimeout(() => {
        this.successMessage = false;
        this.$router.replace('/');
      }, 2500);
    },
  },

  created() {
    const coach = this.$store.getters['coaches/coaches'];

    this.selectedCoach = coach.find((coach) => {
      return this.id === coach.id;
    });
  },
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  text-align: center;
  justify-content: center;
  margin: 5rem 0 10rem 0;
  @media (max-width: 510px) {
    margin: 8rem auto 0 auto;
  }

  .success-message {
    box-shadow: 2px 0 15px rgba(0, 0, 0, 0.15);
    border-radius: 5px;
    padding: 2rem 4rem;
    font-size: 2.6rem;
    color: #53596c;
    padding: 4.5rem 6rem;
  }

  .contact-container {
    margin: 0 auto;
    position: relative;

    .right-col {
      background-color: #f4f4f4;
      width: 50rem;
      padding: 10rem 0 5rem 0;
      box-shadow: 6px 7px 22px 0px rgba(0, 0, 0, 0.08);
      border-radius: 5px;
      @media (max-width: 510px) {
        width: 30rem;
      }

      &:hover + .left-col .coach-img {
        filter: blur(3px) brightness(80%);
        transform: scale(1);
      }

      &:hover + .left-col .coach-name {
        opacity: 1;
        transform: translate(-50%, -60%);
      }

      .title-container {
        text-align: center;
        h3 {
          padding-bottom: 2.5rem;
          font-size: 3rem;
          font-weight: 500;
          color: #53596c;
          font-weight: 600;
          letter-spacing: 0.1rem;
          @media (max-width: 510px) {
            font-size: 2rem;
          }
        }
      }

      .text-container {
        display: flex;
        justify-content: center;
        margin-bottom: 4rem;
        fieldset {
          border-bottom: 2px solid #abaeb5;
          width: 80%;
          border-radius: 5px;
          @media (max-width: 510px) {
            width: 90%;
          }

          .text-field {
            border: none;
            border-bottom: 1px solid #737b834f;
            padding: 6px 20px 6px 20px;
            font-size: 2rem;
            padding-bottom: 0.5rem;
            color: #737b83;
            letter-spacing: 0.1rem;
            transition: border-color 0.2s ease-in-out;
            width: 100%;

            &:focus {
              outline: none;
              border-bottom: 1.5px solid #5c6378;
            }

            &::-webkit-input-placeholder {
              font-size: 2rem;
              font-weight: 300;
              letter-spacing: 0.1rem;
              color: #abaeb5;
              @media (max-width: 510px) {
                font-size: 1.4rem;
              }
            }
            &::-moz-placeholder {
              font-size: 2rem;
              font-weight: 300;
              letter-spacing: 0.1rem;
              color: #abaeb5;
              @media (max-width: 510px) {
                font-size: 1.4rem;
              }
            }
            &:-ms-input-placeholder {
              font-size: 2rem;
              font-weight: 300;
              letter-spacing: 0.1rem;
              color: #abaeb5;
              @media (max-width: 510px) {
                font-size: 1.4rem;
              }
            }
            &::-ms-input-placeholder {
              font-size: 2rem;
              font-weight: 300;
              letter-spacing: 0.1rem;
              color: #abaeb5;
              @media (max-width: 510px) {
                font-size: 1.4rem;
              }
            }
            &::placeholder {
              font-size: 2rem;
              font-weight: 300;
              letter-spacing: 0.1rem;
              color: #abaeb5;
              @media (max-width: 510px) {
                font-size: 1.4rem;
              }
            }
          }
        }
      }
      .btn-container {
        padding: 10px 20px;
        margin-top: 20px;
      }
    }
    .left-col {
      width: 16rem;
      height: 16rem;
      margin-top: -7rem;
      border-radius: 50%;
      box-shadow: 6px 7px 15px 0px rgba(0, 0, 0, 0.15);
      position: absolute;
      top: -1rem;
      left: 50%;
      transform: translate(-50%);
      overflow: hidden;
      display: flex;
      align-items: center;
      @media (max-width: 580px) {
        width: 10rem;
        height: 10rem;
        margin-top: -4rem;
      }

      .coach-img {
        height: 100%;
        width: 100%;
        transition: all 0.5s;
        object-fit: cover;
        transform: scale(1.2);
      }

      .coach-name {
        position: absolute;
        top: 60%;
        left: 50%;
        transform: translate(-50%, 20%);
        color: #edf2f4;
        text-transform: uppercase;
        font-size: 1.7rem;
        text-align: center;
        opacity: 0;
        transition: all 0.5s;
      }
    }
  }

  .form_invalid fieldset {
    color: red;
    border: 3px solid #c30423;
  }

  .invalid-message {
    color: #c30423;
    font-size: 1.6rem;
    font-weight: 500;
    text-align: center;
  }
}
</style>
