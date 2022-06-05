<template>
  <section class="registration-container">
    <div class="background-black"></div>

    <div class="form-container">
      <h2 class="form-title">Create Your Profile</h2>
      <form>
        <fieldset :class="{ invalid_form: !formIsValid }">
          <div>
            <input
              class="text-field"
              placeholder="Name Surname"
              type="text"
              id="fullname"
              v-model="fullName"
            />
          </div>
          <div>
            <input
              class="text-field"
              placeholder="Price"
              type="number"
              id="hourlyRate"
              v-model="price"
            />
          </div>
          <div class="form-control">
            <textarea
              class="text-field"
              placeholder="Description"
              id="description"
              v-model="description"
              rows="2"
            ></textarea>
          </div>
          <div class="checkbox-container">
            <h3>Areas of Expertise</h3>
            <div class="checkbox-element">
              <label for="frontend">Frontend Development</label>
              <input
                type="checkbox"
                id="frontend"
                value="frontend"
                v-model="areas"
              />
            </div>
            <div class="checkbox-element">
              <label for="backend">Backend Development</label>
              <input
                type="checkbox"
                id="backend"
                value="backend"
                v-model="areas"
              />
            </div>
            <div class="checkbox-element">
              <label for="fullstack">Full stack </label>
              <input
                type="checkbox"
                id="fullstack"
                value="fullstack"
                v-model="areas"
              />
            </div>
          </div>
          <div class="upload-img-container">
            <h4 class="picture-title">Select your profile picture</h4>
            <input type="file" @change="onFileChange" />
          </div>
        </fieldset>
        <p v-if="!formIsValid" :class="{ invalid: !formIsValid }">
          Please fill in all the fields before submitting
        </p>
        <div class="button-container">
          <base-button mode="full" @click.prevent="createAccount"
            >Create account</base-button
          >
        </div>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      fullName: '',
      price: '',
      description: '',
      areas: [],
      formIsValid: true,
      image: '',
    };
  },

  methods: {
    onFileChange(e) {
      const image = e.target.files; //Il file viene memorizzato in image (nel pc per essere poi letto da onload)
      if (!image.length) return;
      this.createImage(image[0]);
    },
    createImage(image) {
      const reader = new FileReader();

      //Al caricamento dell'immagine salvata nel pc(onload), l'event FileReader che contiene i file salvati nel pc dentro e.target.result, viene chiamato e permette al resto delle applicazioni di leggerne il contenuto
      reader.onload = (e) => {
        this.image = e.target.result; //Mettiamo il contenuto del file dentro la nostra stringa vuota
      };

      reader.readAsDataURL(image); //Serve per permettere di leggere il file messo dall'utente
    },
    createAccount() {
      this.formIsValid = true;
      if (
        this.fullName === '' ||
        this.price === '' ||
        this.description === '' ||
        this.areas.length === 0 ||
        this.image === ''
      ) {
        this.formIsValid = false;
        return;
      }

      const coachData = {
        fullName: this.fullName,
        price: this.price,
        description: this.description,
        areas: this.areas,
        image: this.image,
      };

      this.$store.dispatch('coaches/addCoaches', coachData);
      this.$store.dispatch('hideRegister');
      this.$router.replace('/');
    },
  },
};
</script>

<style scoped lang="scss">
.registration-container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(287.83deg, #8d99ae, rgba(237, 242, 244, 0));

  .form-container {
    padding: 4rem 3rem;
    position: absolute;
    background-color: #edf2f4;
    box-shadow: 2px 0 15px rgba(0, 0, 0, 0.25);
    border-radius: 3px;
    @media (max-width: 1020px) {
      padding: 2rem 2rem;
    }
    @media (max-width: 550px) {
      padding: 2rem 0;
    }

    .form-title {
      padding: 4.5rem 0 0 4.5rem;
      font-size: 3rem;
      font-weight: 600;
      line-height: 1em;
      text-transform: uppercase;
      color: #53596c;
      letter-spacing: 0.1rem;
      @media (max-width: 1250px) {
        padding: 2rem 4.5rem 2rem 4.5rem;
      }
      @media (max-width: 1020px) {
        padding: 1rem 4.5rem 1rem 2rem;
        font-size: 2.2rem;
      }
    }

    form {
      padding: 4rem 4.5rem 6.5rem 4.5rem;
      @media (max-width: 1250px) {
        padding: 2rem 4.5rem 2rem 4.5rem;
      }
      @media (max-width: 1020px) {
        padding: 2rem;
      }

      fieldset {
        border: 2px solid #abaeb5;
        border-radius: 5px;

        .text-field {
          border: none;
          border-bottom: 1px solid #abaeb5;
          background-color: #edf2f4;
          padding: 6px 20px 6px 20px;
          font-size: 2rem;
          padding-bottom: 0.5rem;
          color: #5c6378;
          letter-spacing: 0.1rem;
          transition: border-color 0.2s ease-in-out;
          width: 100%;

          &:focus {
            outline: none;
            border-bottom: 1px solid #5c6378;
          }

          &::-webkit-input-placeholder {
            font-size: 1.4rem;
            font-weight: 300;
            letter-spacing: 0.1rem;
            color: #abaeb5;
          }
          &::-moz-placeholder {
            font-size: 1.4rem;
            font-weight: 300;
            letter-spacing: 0.1rem;
            color: #abaeb5;
          }
          &:-ms-input-placeholder {
            font-size: 1.4rem;
            font-weight: 300;
            letter-spacing: 0.1rem;
            color: #abaeb5;
          }
          &::-ms-input-placeholder {
            font-size: 1.4rem;
            font-weight: 300;
            letter-spacing: 0.1rem;
            color: #abaeb5;
          }
          &::placeholder {
            font-size: 1.4rem;
            font-weight: 300;
            letter-spacing: 0.1rem;
            color: #abaeb5;
          }
        }

        .checkbox-container {
          display: flex;
          border-bottom: 1px solid #737b834f;
          flex-direction: column;
          padding-bottom: 1rem;
          padding-top: 0.5rem;

          h3 {
            padding: 12px 0px 6px 20px;
            font-size: 1.6rem;
            color: #6c7386;
          }

          .checkbox-element {
            display: flex;
            justify-content: space-between;
            margin-right: 15rem;
            padding: 6px 0px 4px 20px;
            font-size: 1.4rem;
            color: #abaeb5;
            letter-spacing: 0.1rem;
          }
        }

        .upload-img-container {
          border: none;
          padding: 6px 20px 6px 20px;
          font-size: 2rem;
          padding-bottom: 0.5rem;
          color: #abaeb5;
          letter-spacing: 0.1rem;
          transition: border-color 0.2s ease-in-out;

          .picture-title {
            font-size: 1.6rem;
            padding: 12px 6px 8px 0px;
            letter-spacing: 0.1px;
            color: #6c7386;
          }

          input[type='file'] {
            color: #abaeb5;
            font-size: 1.4rem;
          }
        }
      }

      .button-container {
        padding: 5rem 5rem 0 0;
        @media (max-width: 1020px) {
          padding: 2rem 0 0 0;
        }
      }
    }
  }
}

.background-black {
  width: 120rem;
  height: 35rem;
  font-size: 20rem;
  border-radius: 3px;
  background-color: #2b2d42;
  @media (max-width: 1250px) {
    width: 100rem;
  }
  @media (max-width: 1020px) {
    width: 70rem;
    height: 25rem;
  }
  @media (max-width: 550px) {
    display: none;
  }
}

.invalid_form {
  border: 2px solid #c30423;
}

.invalid {
  color: #c30423;
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin-top: 1rem;
}
</style>
