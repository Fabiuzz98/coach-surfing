<template>
  <div class="dialog-container">
    <div class="dialog">
      <div class="image-container">
        <img v-bind:src="img" alt="profile picture" class="coaches-picture" />
      </div>

      <p class="coach-name">{{ fullName }}</p>

      <p class="coach-price">
        <span>${{ hourlyRate }}</span
        >/hour
      </p>

      <div class="specs">
        <base-badge
          v-for="area in areas"
          :key="area"
          :mode="area"
          :name="area"
        ></base-badge>
      </div>

      <div class="btn-contact">
        <base-button mode="empty" class="btn-style" link :to="goToContact"
          >Contact</base-button
        >
      </div>

      <div class="btn-detail">
        <base-button mode="full" class="btn-style" link :to="goToDetail"
          >View Detail</base-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['fullName', 'areas', 'hourlyRate', 'img', 'id'],
  computed: {
    goToContact() {
      return this.$route.path + '/' + this.id + '/contact';
    },
    goToDetail() {
      return this.$route.path + '/' + this.id + '/detail';
    },
  },
};
</script>

<style scoped lang="scss">
.dialog {
  margin: 2rem;
  display: grid;
  grid-template-columns: 0.7fr 0.55fr 0.6fr 1fr;
  grid-template-rows: 1.5fr 1fr 1fr 1fr;
  background-color: #edf2f4;
  border-radius: 5px;
  box-shadow: 6px 7px 22px 0px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 980px) {
    grid-template-columns: 0.7fr 0.55fr 0.6fr 1fr;
  }
  @media (max-width: 620px) {
    grid-template-columns: 1.3fr 0.8fr 1.5fr 0.5fr;
  }
  @media (max-width: 510px) {
    grid-template-columns: 1fr 1.5fr;
    grid-template-rows: 2fr 0.5fr;
  }

  &:hover {
    transform: translateY(-0.4rem);
    box-shadow: 6px 7px 12px 0px rgba(0, 0, 0, 0.04);

    transform: scale(1.02);
  }

  &:active {
    box-shadow: 6px 7px 22px 0px rgba(0, 0, 0, 0.08);
    transform: translateY(0);
  }

  .image-container {
    height: 17rem;
    max-width: 18rem;
    grid-row: 1 / 5;
    padding: 1rem 2rem 1rem 1rem;
    @media (max-width: 980px) {
      height: 14rem;
    }
    @media (max-width: 620px) {
      height: 13rem;
      padding: 1rem 0rem 1rem 1rem;
    }
    @media (max-width: 510px) {
      grid-column: 1;
      grid-row: 1 / 2;
      justify-self: start;
      align-self: start;
      height: 20rem;
    }

    .coaches-picture {
      height: 100%;
      width: 100%;
      object-fit: cover;
      border-radius: 5px;
    }
  }

  .coach-name {
    align-self: end;
    justify-self: start;
    font-size: 2.4rem;
    color: #11151c;
    font-weight: 500;
    grid-column: 2/4;
    text-transform: uppercase;
    padding-left: 1.5rem;
    letter-spacing: 0.18rem;

    @media (max-width: 980px) {
      font-size: 1.8rem;
    }
    @media (max-width: 510px) {
      grid-column: 2;
      grid-row: 1;
      justify-self: start;
      align-self: start;
      margin: 2rem auto 0 1rem;
      padding: 0;
      font-size: 2.4rem;
    }
  }

  .coach-price {
    grid-column: 2;
    grid-row: 2;
    align-self: start;
    justify-self: start;
    font-size: 1.5rem;
    padding-left: 1.5rem;
    padding-top: 0.8rem;
    font-weight: 500;
    @media (max-width: 980px) {
      font-size: 1.2rem;
    }
    @media (max-width: 510px) {
      grid-column: 2;
      grid-row: 1;
      align-self: center;
      padding: 0;
      font-size: 1.4rem;
      margin: 0 0 4rem 1rem;
    }

    span {
      font-weight: 600;
      font-size: 1.8rem;
      color: #5c6378;

      @media (max-width: 980px) {
        font-size: 1.2rem;
      }
      @media (max-width: 510px) {
        font-size: 1.4rem;
      }
    }
  }

  .specs {
    grid-column: 4;
    align-self: center;
    grid-row: 1 / 5;
    justify-self: end;
    text-align: center;
    padding-right: 4rem;

    @media (max-width: 620px) {
      padding-right: 1rem;
    }
    @media (max-width: 510px) {
      grid-column: 1 / 3;
      grid-row: 2;
      padding: 0;
      display: flex;
      gap: 1rem;
      justify-self: center;
      text-align: center;
    }
  }

  .btn-contact {
    grid-row: 3 / 5;
    align-self: center;
    justify-self: start;
    cursor: pointer;
    padding-left: 1.5rem;
    padding-bottom: 1rem;

    @media (max-width: 1100px) {
      margin: 0.8rem 1.5rem;
    }
    @media (max-width: 980px) {
      padding-left: 0rem;
    }
    @media (max-width: 510px) {
      grid-row: 1;
      grid-column: 2;
      align-self: end;
      justify-self: start;
      margin: 1.5rem 0 2rem 1rem;
    }
  }

  .btn-detail {
    grid-column: 3;
    grid-row: 3 / 5;
    align-self: center;
    justify-self: start;
    cursor: pointer;
    padding-left: 1.5rem;
    padding-bottom: 1rem;

    @media (max-width: 1100px) {
      padding-left: 0rem;
    }
    @media (max-width: 980px) {
    }
    @media (max-width: 510px) {
      grid-row: 1;
      grid-column: 2;
      align-self: center;
      margin: 6.5rem 0 0 1rem;
    }
  }

  .btn-style {
    @media (max-width: 980px) {
      font-size: 1.2rem;
      padding: 0.4rem 1rem;
    }
    @media (max-width: 510px) {
      padding: 0.6rem 1.2rem;
    }
  }
}
</style>
