<template>
  <div>
    <div class="container-hero">
      <section class="section-hero">
        <div class="hero-text">
          <div class="intro">
            <h3 class="typed-text" :class="{ typing: typeStatus }">
              {{ typeValue }}
            </h3>
          </div>

          <h2 class="hero-text--title">
            Find the
            <p class="title-highlighted-container">
              <span class="hero-text--title--highlighted">perfect coach</span>
            </p>
            for you
          </h2>

          <p class="hero-text--description">
            Search between all our coaches and choose the one that fits you
            based on your needs
          </p>

          <base-button mode="hero-text--link" @click="scrollTo('coachesDiv')">
            Go To Coaches</base-button
          >
        </div>

        <img src="../img/hero.png" alt="a computer" class="computer" />
        <img
          src="https://adityawahyuramadhan.github.io/hosted-assets/Freelanco/image-floor.svg"
          alt="a background image or the computer"
          class="background"
        />
      </section>
    </div>

    <base-error v-if="error">{{ error }}</base-error>

    <section class="section-coaches" ref="coachesDiv">
      <div class="container-coaches">
        <div class="coaches-filters">
          <p class="filters-list-title">filters</p>
          <div class="filters-container">
            <div class="filter">
              <div class="filter-text">
                <label for="frontend" class="filter-label">Frontend</label>
                <input
                  type="checkbox"
                  id="frontend"
                  checked
                  @change="setFilters"
                />
              </div>
              <div class="filter-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="filter-svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
            </div>

            <div class="filter">
              <div class="filter-text">
                <label for="backend" class="filter-label">Backend</label>
                <input
                  type="checkbox"
                  id="backend"
                  checked
                  @change="setFilters"
                />
              </div>
              <div class="filter-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="filter-svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z"
                  />
                  <path
                    d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z"
                  />
                  <path
                    d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z"
                  />
                </svg>
              </div>
            </div>

            <div class="filter">
              <div class="filter-text">
                <label for="fullstack" class="filter-label--fullstack"
                  >Full Stack</label
                >
                <input
                  type="checkbox"
                  id="fullstack"
                  checked
                  @change="setFilters"
                />
              </div>
              <div class="filter-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="filter-svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div class="coaches-list-container">
          <p class="coaches-list-title">our coaches</p>
          <div v-if="!isLoaded" class="loading-container">
            <base-loading>Loading coaches... </base-loading>
          </div>
          <div v-else>
            <coaches-list
              v-for="coach in coaches"
              :key="coach.id"
              :id="coach.id"
              :fullName="coach.fullName"
              :hourlyRate="coach.hourlyRate"
              :areas="coach.areas"
              :img="coach.img"
            ></coaches-list>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import CoachesList from '../layout/CoachesList.vue';

export default {
  components: {
    CoachesList,
  },
  data() {
    return {
      filters: { frontend: true, backend: true, fullstack: true },
      updatedFilters: { frontend: true, backend: true, fullstack: true },
      error: null,
      isLoaded: false,
      typeValue: '',
      typeStatus: false,
      typeArray: ['Welcome to Coach Surfing'],
      typingSpeed: 180,
      erasingSpeed: 20,
      nextArrayIndex: 2000,
      typeArrayIndex: 0,
      charIndex: 0,
    };
  },
  created() {
    this.isLoaded = false;
    this.loadCoaches();

    //for the auto written text
    setTimeout(this.typeText, this.newTextDelay + 200);
  },

  methods: {
    typeText() {
      if (this.charIndex < this.typeArray[this.typeArrayIndex].length) {
        if (!this.typeStatus) this.typeStatus = true;
        this.typeValue += this.typeArray[this.typeArrayIndex].charAt(
          this.charIndex
        );
        this.charIndex += 1;
        setTimeout(this.typeText, this.typingSpeed);
      } else {
        this.typeStatus = false;
        setTimeout(this.eraseText, this.newTextDelay);
      }
    },
    eraseText() {
      if (this.charIndex > 0) {
        if (!this.typeStatus) this.typeStatus = true;
        this.typeValue = this.typeArray[this.typeArrayIndex].substring(
          0,
          this.charIndex - 1
        );
        this.charIndex -= 1;
        setTimeout(this.eraseText, this.erasingSpeed);
      } else {
        this.typeStatus = false;
        this.typeArrayIndex += 1;
        if (this.typeArrayIndex >= this.typeArray.length)
          this.typeArrayIndex = 0;
        setTimeout(this.typeText, this.typingSpeed + 1000);
      }
    },

    // ------------------------------end of function for auto written text-------------------------------------
    setFilters(e) {
      const key = e.target.id;
      const value = e.target.checked;
      this.updatedFilters = { ...this.filters, [key]: value };
      this.filters = this.updatedFilters;
    },

    async loadCoaches() {
      try {
        await this.$store.dispatch('coaches/loadCoaches');
        this.isLoaded = true;
      } catch (err) {
        this.error = err;
      }
    },

    scrollTo(section) {
      const element = this.$refs[section];

      element.scrollIntoView({ behavior: 'smooth' });
    },
  },
  computed: {
    coaches() {
      const coaches = this.$store.getters['coaches/coaches'];
      return coaches.filter((coach) => {
        if (coach.areas.includes('frontend') && this.filters.frontend) {
          return true;
        }
        if (coach.areas.includes('backend') && this.filters.backend) {
          return true;
        }
        if (coach.areas.includes('fullstack') && this.filters.fullstack) {
          return true;
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  margin-top: 5rem;
}

.container-hero {
  max-width: 120rem;
  height: 80vh;
  margin: 0 auto;
  @media (max-width: 1250px) {
    height: 70vh;
  }
  @media (max-width: 1000px) {
    height: 65vh;
  }

  .section-hero {
    margin-top: 12rem;

    .hero-text {
      max-width: 58rem;
      position: relative;
      align-self: start;
      @media (max-width: 1350px) {
        padding-left: 10rem;
      }
      @media (max-width: 850px) {
        max-width: 45rem;
      }
      @media (max-width: 700px) {
        text-align: center;
        max-width: 60rem;
        margin: 0 auto;
        padding: 0;
      }
      @media (max-width: 510px) {
        padding: 0 1rem;
      }

      .intro {
        position: relative;
        height: 2rem;
        font-size: 2.4rem;
        font-weight: 400;
        color: #5c6378;
        margin-bottom: 4rem;
        @media (max-width: 1350px) {
          font-size: 1.8rem;
          margin-bottom: 3rem;
        }
        @media (max-width: 950px) {
          font-size: 1.4rem;
          margin-bottom: 1.5rem;
        }
        @media (max-width: 700px) {
          font-size: 1.6rem;
          margin-bottom: 3rem;
        }
        @media (max-width: 510px) {
          font-size: 1.4rem;
        }

        .typed-text::after {
          content: '';
          position: absolute;
          height: 145%;
          width: 0.1rem;
          border-right: 2.5px solid #5c6378;
          animation: blink 0.5s infinite ease;
          @media (max-width: 1350px) {
            height: 95%;
          }

          @media (max-width: 700px) {
            height: 80%;
          }
        }

        .typing {
          animation: none;
        }

        @keyframes blink {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      }

      .hero-text--title {
        font-size: 5rem;
        margin-bottom: 2.8rem;
        text-align: left;
        justify-self: top;
        color: #11151c;
        font-weight: 600;
        @media (max-width: 1350px) {
          font-size: 4rem;
        }
        @media (max-width: 950px) {
          font-size: 3rem;
        }
        @media (max-width: 850px) {
          font-size: 2.5rem;
        }
        @media (max-width: 700px) {
          font-size: 3.5rem;
          text-align: center;
        }
        @media (max-width: 510px) {
          font-size: 2.5rem;
        }

        .title-highlighted-container {
          display: inline;

          .hero-text--title--highlighted {
            padding: 0 0.5rem 0 0.5rem;
            border-radius: 0.5rem;
            background-color: #2b2d42;
            color: #edf2f4;
          }
        }
      }

      .hero-text--description {
        font-size: 2rem;
        margin-bottom: 6.5rem;
        color: #6c7386;
        font-weight: 500;
        @media (max-width: 1350px) {
          margin-bottom: 4.5rem;
          font-size: 1.8rem;
        }
        @media (max-width: 950px) {
          font-size: 1.4rem;
        }
        @media (max-width: 700px) {
          font-size: 1.6rem;
          padding: 0 2rem;
        }
      }
    }

    .background {
      width: 85%;
      top: 18rem;
      right: -50rem;
      z-index: -1;
      position: absolute;
      @media (max-width: 1100px) {
        width: 85%;
        right: -45rem;
        top: 21rem;
      }
      @media (max-width: 950px) {
        width: 85%;
        right: -40rem;
        top: 21rem;
      }
      @media (max-width: 850px) {
        right: -35rem;
      }
      @media (max-width: 700px) {
        display: none;
      }
    }

    .computer {
      width: 45%;
      top: 12rem;
      right: 5rem;
      position: absolute;
      @media (max-width: 1300px) {
        width: 40%;
        top: 18rem;
      }
      @media (max-width: 1100px) {
        top: 22rem;
        right: 2.5rem;
      }
      @media (max-width: 950px) {
        width: 35%;
      }
      @media (max-width: 700px) {
        display: none;
      }
    }
  }
}

.section-coaches {
  display: flex;
  @media (max-width: 1400px) {
    margin: 0 auto 10rem auto;
  }

  .container-coaches {
    display: flex;
    column-gap: 8rem;
    margin: 10rem auto;
    border-radius: 5px;
    @media (max-width: 1400px) {
      column-gap: 4rem;
      margin: 0rem auto;
    }
    @media (max-width: 1100px) {
      column-gap: 4rem;
    }
    @media (max-width: 980px) {
      column-gap: 2rem;
    }
    @media (max-width: 780px) {
      flex-direction: column;
    }

    .coaches-filters {
      display: flex;
      flex-direction: column;
      padding: 0rem 2rem 5rem 2rem;
      grid-row: 1 / last-line;
      grid-column: 1 / 2;
      @media (max-width: 780px) {
        padding: 0rem 2rem 0rem 2rem;
        text-align: center;
      }

      .filters-list-title {
        font-size: 1.6rem;
        text-transform: uppercase;
        color: #5c6378;
        margin: 5rem 0 2rem 0;
        @media (max-width: 510px) {
          font-size: 1.4rem;
        }
      }

      .filters-container {
        @media (max-width: 780px) {
          display: flex;
          justify-content: space-around;
          align-items: center;
        }
        @media (max-width: 420px) {
        }
        .filter {
          background-color: white;
          text-align: center;
          border-radius: 5px;
          box-shadow: 6px 7px 22px 0px rgba(0, 0, 0, 0.1);
          margin: 0 auto 1.5rem auto;

          &-text {
            display: flex;
            padding-left: 2.5rem;
            padding-right: 2.5rem;
            padding-top: 1rem;
            justify-content: end;
            font-size: 1.4rem;
            color: #11151c;
            font-weight: 500;
            @media (max-width: 980px) {
              font-size: 1.2rem;
              padding-left: 1.5rem;
              padding-right: 1.5rem;
            }
            @media (max-width: 420px) {
              padding-left: 1rem;
              padding-right: 1rem;
            }

            .filter-label {
              margin-right: 1rem;

              &--fullstack {
                margin-right: 0.6rem;
                @media (max-width: 980px) {
                  margin-right: 0.5rem;
                }
              }
            }
          }

          .filter-svg {
            width: 6rem;
            color: rgba(0, 0, 0, 0.856);
            padding: 0.5rem;

            @media (max-width: 980px) {
              width: 3.5rem;
            }
          }
        }
      }
    }

    .coaches-list-container {
      // max-width: 110rem;
      .coaches-list-title {
        font-size: 1.6rem;
        text-transform: uppercase;
        padding-left: 1.6rem;
        color: #5c6378;
        padding-top: 5rem;
        @media (max-width: 780px) {
          text-align: center;
          padding-top: 2rem;
          padding-left: 0rem;
        }
        @media (max-width: 510px) {
          font-size: 1.4rem;
        }
      }
    }
  }
}
</style>
