import { createStore } from 'vuex';
import coachesModule from './coaches/index.js';
import requestsModule from './requests/index.js';
import router from '../router.js';

import STORED_API_KEY from '../API_keys.txt';

const API_KEY = STORED_API_KEY;

const store = createStore({
  modules: {
    coaches: coachesModule,
    requests: requestsModule,
  },
  state() {
    return {
      id: null,
      token: null,
      isRegistered: null,
      navigation: true,
    };
  },
  mutations: {
    setUser(state, payload) {
      state.id = payload.id;
      state.token = payload.token;
    },

    logout(state) {
      state.id = null;
      state.token = null;
      state.isRegistered = null;
      localStorage.clear();
    },

    setStorage(_, userData) {
      const loginData = [userData.id, userData.token];
      localStorage.setItem('userLoginData', JSON.stringify(loginData));
      localStorage.setItem('expirationDate', userData.expiration);
    },

    tryLogin(state, payload) {
      state.id = payload.id;
      state.token = payload.token;
      state.isRegistered = payload.isRegistered;
    },

    autoLogout(state, payload) {
      const expirationChecker = setInterval(() => {
        payload.currentDate = payload.currentDate + 1000;

        if (payload.currentDate >= payload.expiresIn) {
          clearInterval(expirationChecker);
          state.id = null;
          state.token = null;
          localStorage.clear();
          router.replace('/');
        }
      }, 1000);
    },

    isRegistered(state, coaches) {
      const id = state.id;

      const checkIfRegistered = coaches.some((coach) => {
        return coach.id === id;
      });

      state.isRegistered = checkIfRegistered;

      localStorage.setItem('isRegistered', checkIfRegistered);
    },

    hideRegister(state) {
      state.isRegistered = true;
      localStorage.setItem('isRegistered', state.isRegistered);
    },

    showNavigation(state) {
      state.navigation = true;
    },
    hideNavigation(state) {
      state.navigation = false;
    },
  },
  actions: {
    async signUp(context, payload) {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
        {
          method: 'POST',
          body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
          }),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        const err = new Error(responseData.message);
        throw err;
      }

      const expirationTime = +responseData.expiresIn;

      const currentDate = new Date().getTime();
      const expirationDate = currentDate + expirationTime * 1000;

      const expirationData = {
        currentDate: currentDate,
        expiresIn: expirationDate,
      };

      const userData = {
        id: responseData.localId,
        token: responseData.idToken,
        expiration: expirationDate,
      };

      context.commit('setUser', userData);
      context.commit('setStorage', userData);
      context.commit('autoLogout', expirationData);
    },

    async login(context, payload) {
      const response = await fetch(
        ` https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
        {
          method: 'POST',
          body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
          }),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        const err = new Error(responseData.message || 'Failed to fetch');
        throw err;
      }

      const expirationTime = +responseData.expiresIn;

      const currentDate = new Date().getTime();
      const expirationDate = currentDate + expirationTime * 1000;

      const expirationData = {
        currentDate: currentDate,
        expiresIn: expirationDate,
      };

      const userData = {
        id: responseData.localId,
        token: responseData.idToken,
        expiration: expirationDate,
      };

      context.commit('setUser', userData);
      context.commit('setStorage', userData);
      context.commit('autoLogout', expirationData);
    },

    logout(context) {
      context.commit('logout');
    },

    tryLogin(context) {
      const storage = localStorage.getItem('userLoginData');
      const dateOfExpire = +localStorage.getItem('expirationDate');

      //Per ricavare di nuovo un boolean si deve usare JSON.parse
      const registrationCheck = JSON.parse(
        localStorage.getItem('isRegistered')
      );
      const userLoginIdentifierData = JSON.parse(storage);

      if (!userLoginIdentifierData) {
        return;
      } else {
        const currentDate = new Date().getTime();
        const timeBeforeLogout = dateOfExpire - currentDate;
        const expirationData = {
          currentDate: currentDate,
          expiresIn: dateOfExpire,
        };

        const loginDataContainer = {
          id: userLoginIdentifierData[0],
          token: userLoginIdentifierData[1],
          isRegistered: registrationCheck,
        };

        if (timeBeforeLogout <= 3000) {
          context.commit('logout');
          return;
        } else {
          context.commit('tryLogin', loginDataContainer);
          context.commit('autoLogout', expirationData);
        }
      }
    },

    isRegistered(context) {
      const coaches = context.rootState.coaches.coaches;
      context.commit('isRegistered', coaches);
    },

    hideRegister(context) {
      context.commit('hideRegister');
    },

    showNavigation(context) {
      context.commit('showNavigation');
    },

    hideNavigation(context) {
      context.commit('hideNavigation');
    },
  },
  getters: {
    id(state) {
      return state.id;
    },
    token(state) {
      return state.token;
    },
    isAuthenticated(state) {
      return !!state.token;
    },

    isRegistered(state) {
      return state.isRegistered;
    },

    navigation(state) {
      return state.navigation;
    },
  },
});

export default store;
