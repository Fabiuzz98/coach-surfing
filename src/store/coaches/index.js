export default {
  namespaced: true,
  state() {
    return {
      lastFetch: null,
      coaches: [
        {
          id: 'c1',
          fullName: 'Gigi Rossi',
          areas: ['frontend', 'backend', 'fullstack'],
          description:
            "I'm suca and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
          hourlyRate: 30,
          img: '../../img/car.jpg',
        },
      ],
    };
  },
  mutations: {
    addCoaches(state, coach) {
      state.coaches.unshift(coach);
    },
    setCoaches(state, coaches) {
      state.coaches = coaches;
    },
    setFetchTimeStamp(state) {
      state.lastFetch = new Date().getTime();
    },
  },
  actions: {
    async addCoaches(context, coachData) {
      const userId = context.rootGetters.id;
      const token = context.rootGetters.token;

      const coach = {
        id: userId,
        fullName: coachData.fullName,
        hourlyRate: coachData.price,
        description: coachData.description,
        areas: coachData.areas,
        img: coachData.image,
      };

      const response = await fetch(
        `https://coach-surfing-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=` +
          token,
        {
          method: 'PUT',
          body: JSON.stringify(coach),
        }
      );

      if (!response.ok) {
        new Error('Failed to fetch');
      }

      context.commit('addCoaches', coach);
    },

    async loadCoaches(context) {
      //Se è passato meno di un minuto non va a fare la fetch e quindi ad aggiornare i coach
      if (!context.getters.shouldUpdate) {
        return;
      }

      const response = await fetch(
        'https://coach-surfing-default-rtdb.firebaseio.com/coaches.json'
      );

      const responseData = await response.json();

      if (!response.ok) {
        const err = new Error(
          responseData.message || 'Failed connecting to database'
        );
        throw err;
      }

      const coaches = [];

      for (const key in responseData) {
        const coach = {
          fullName: responseData[key].fullName,
          hourlyRate: responseData[key].hourlyRate,
          description: responseData[key].description,
          areas: responseData[key].areas,
          img: responseData[key].img,
          id: responseData[key].id,
        };

        coaches.unshift(coach);
        context.commit('setFetchTimeStamp');
      }

      context.commit('setCoaches', coaches);
    },
  },
  getters: {
    coaches(state) {
      return state.coaches;
    },
    shouldUpdate(state) {
      const lastFetch = state.lastFetch;
      //Al reload con il tasto del browser, essendo questo dato non tored in local storage, si azzererà sempre e quindi essendo null farà aggiornare sempr ei coach
      if (!lastFetch) {
        return true;
      }

      const currentTimeStemp = new Date().getTime();
      return (currentTimeStemp - lastFetch) / 1000 > 60; //Check se è più di 1 minuto fa, se è vero ritorna true altrimenti false
    },
  },
};
