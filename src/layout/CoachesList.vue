<template>
  <div class="dialog">
    <div class="image-container">
      <img v-bind:src="img" alt="profile picture" class="coaches-picture" />
    </div>

    <div class="text-container">
      <div class="name-price">
        <p class="coach-name">{{ fullName }}</p>

        <p class="coach-price">
          <span>${{ hourlyRate }}</span
          >/hour
        </p>
      </div>
      <div class="btn-container">
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
    <div class="specs">
      <base-badge
        v-for="area in areas"
        :key="area"
        :mode="area"
        :name="area"
      ></base-badge>
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
  display: grid;
  grid-template-columns: minmax(min-content, 20rem) 1fr 1fr;
  margin: 2rem;
  background-color: #edf2f4;
  border-radius: 5px;
  box-shadow: 6px 7px 22px 0px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;

  @media (max-width: 550px) {
    grid-template-columns: minmax(min-content, 20rem) minmax(min-content, 40rem);
    grid-template-rows: minmax(14rem, max-content) 1fr;
    margin: 2rem 1rem;
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
    grid-column: 1 / 2;
    padding: 1rem;
    min-width: 11rem;
    max-height: 23rem;

    .coaches-picture {
      height: 100%;
      width: 100%;
      object-fit: cover;
      border-radius: 5px;
    }
  }

  .text-container {
    display: grid;
    grid-column: 2 / 3;
    grid-template-columns:
      minmax(0.5rem, 5rem) repeat(2, minmax(max-content, 1fr))
      1fr;
    grid-template-rows: 1fr 1fr;
    align-items: center;
    @media (max-width: 550px) {
      grid-row: 1 / 2;
    }

    .name-price {
      grid-column: 2 / span 2;
      margin-top: 1.5rem;
      .coach-name {
        font-size: 2.4rem;
        color: #11151c;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 3px;

        @media (max-width: 550px) {
          letter-spacing: 1px;
          font-size: 2rem;
        }
      }

      .coach-price {
        font-size: 1.5rem;
        margin-top: 1.5rem;
        font-weight: 500;

        span {
          font-weight: 600;
          font-size: 1.8rem;
          color: #5c6378;
        }
      }
    }

    .btn-container {
      grid-row: 2;
      grid-column: 2 / span 2;
      display: flex;
      align-items: center;
      justify-self: start;
      gap: 2rem;

      .btn-contact {
        cursor: pointer;
      }

      .btn-detail {
        cursor: pointer;
      }
    }
  }

  .specs {
    grid-column: 3 / -1;
    justify-self: center;
    align-self: center;
    grid-row: 1 / -1;
    margin: 0 2rem;

    @media (max-width: 550px) {
      grid-column: 1 / -1;
      grid-row: 2 / span 1;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 0 1rem 0;
      gap: 1rem;
    }
  }
}
</style>
