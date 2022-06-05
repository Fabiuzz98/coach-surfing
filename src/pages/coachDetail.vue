<template>
  <div class="profile">
    <div class="profile-container">
      <div class="profile-img-container">
        <img class="profilePic" :src="currentCoach.img" />
      </div>

      <div class="profile-text-container">
        <h3>{{ currentCoach.fullName }}</h3>
        <p class="price">
          <span class="price-amount">${{ currentCoach.hourlyRate }}</span
          >/hour
        </p>

        <h4 class="description">{{ currentCoach.description }}</h4>

        <div class="skills">
          <base-badge
            class="skill"
            v-for="area in currentCoach.areas"
            :key="area"
            :mode="area"
            :name="area"
          ></base-badge>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id'],

  data() {
    return { currentCoach: null };
  },

  created() {
    const coaches = this.$store.getters['coaches/coaches'];
    this.currentCoach = coaches.find((coach) => {
      console.log(this.id);
      console.log(coach.id);
      return this.id === coach.id;
    });

    // console.log(coach);
    // this.currentCoach = coach;
    console.log(this.currentCoach);
    // this.currentCoach = coach;
    // return this.currentCoach;
  },
};
</script>

<style scoped lang="scss">
.profile {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10rem;
  margin-left: 25rem;
  margin-right: 25rem;
  @media (max-width: 550px) {
    margin: 10rem 5rem 0 5rem;
  }

  .profile-container {
    border-radius: 5px;
    box-shadow: 6px 7px 22px 0px rgba(0, 0, 0, 0.08);
    text-align: center;
    position: relative;
    min-width: 40rem;
    background-color: #edf2f4;
    @media (max-width: 550px) {
      min-width: 30rem;
    }

    .profile-img-container {
      width: 14rem;
      height: 14rem;
      margin-top: -7rem;
      border-radius: 50%;
      box-shadow: 6px 7px 15px 0px rgba(0, 0, 0, 0.15);
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%);
      overflow: hidden;
      display: flex;
      align-items: center;
      @media (max-width: 550px) {
        width: 10rem;
        height: 10rem;
      }

      .profilePic {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }

    .profile-text-container {
      padding: 8rem 4rem 4rem 4rem;
      @media (max-width: 550px) {
        padding: 6rem 2rem 2rem 2rem;
      }

      h3 {
        color: #404346;
        font-size: 2.2rem;
        font-weight: 700;
      }

      .price {
        font-size: 1.6em;
        margin-top: 1.2rem;
        font-weight: 500;
        color: #595f64;

        .price-amount {
          font-weight: 700;
          font-size: 1.8rem;
        }
      }

      .description {
        font-size: 1.8rem;
        color: #6c7386;
        margin-top: 2.5rem;
        font-weight: 500;
        @media (max-width: 550px) {
          font-size: 1.4rem;
        }
      }

      .skills {
        margin-top: 3rem;
        display: flex;
        justify-content: center;
        gap: 3rem;
        @media (max-width: 550px) {
          gap: 1rem;
        }

        .skill {
          @media (max-width: 550px) {
            font-size: 1.2rem;
          }
        }
      }
    }
  }
}
</style>
