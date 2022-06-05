export default {
  namespaced: true,
  state() {
    return {
      requests: [
        {
          email: 'ciccio.pasticcio@gmail.com',
          message:
            'Super cali fragi listi che spirali toso  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea hic provident veniam laboriosam, nam saepe et, sequi repudiandae, animi velit modi ipsum sit ad iure voluptatibus nihil tempora corrupti incidunt! Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt laboriosam nostrum voluptatibus eligendi doloribus quis esse explicabo ullam magnam non, dolor quod illo vero quisquam praesentium? Provident quo assumenda delectus.',
        },
        {
          email: 'ciccio.pasticcio@gmail.com',
          message: 'Super cali fragi listi che spirali toso  ',
        },
      ],
    };
  },
  mutations: {
    sendRequest(state, request) {
      state.requests.unshift(request);
      console.log(state.requests);
    },
    setRequests(state, requests) {
      state.requests = requests;
    },

    deleteMessage(state, messageId) {
      const messageToDelete = state.requests.findIndex(function (message) {
        return messageId === message.id;
      });

      state.requests.splice(messageToDelete, 1);
    },
  },
  actions: {
    sendRequest(context, payload) {
      const request = {
        email: payload.email,
        message: payload.message,
      };

      fetch(
        `https://coach-surfing-default-rtdb.firebaseio.com/requests/${payload.id}.json`,
        {
          method: 'POST',
          body: JSON.stringify(request),
        }
      );

      context.commit('sendRequest', request);
    },

    async loadRequests(context) {
      const token = context.rootGetters.token;
      const userId = context.rootGetters.id;

      const response = await fetch(
        ` https://coach-surfing-default-rtdb.firebaseio.com/requests/${userId}.json?auth=` +
          token
      );
      const responseData = await response.json();

      if (!response.ok) {
        const err = new Error(responseData.message);
        throw err;
      }

      const requests = [];

      for (const key in responseData) {
        const request = {
          id: key,
          email: responseData[key].email,
          message: responseData[key].message,
        };
        requests.push(request);
      }

      context.commit('setRequests', requests);
    },

    async deleteMessage(context, messageId) {
      const token = context.rootGetters.token;
      const userId = context.rootGetters.id;

      const response = await fetch(
        ` https://coach-surfing-default-rtdb.firebaseio.com/requests/${userId}/${messageId}.json?auth=` +
          token,
        { method: 'DELETE' }
      );

      const responseData = await response.json();

      if (!response.ok) {
        console.log(responseData.message || 'Failed to fetch');
      }

      context.commit('deleteMessage', messageId);
    },
  },
  getters: {
    requests(state) {
      return state.requests;
    },
  },
};
