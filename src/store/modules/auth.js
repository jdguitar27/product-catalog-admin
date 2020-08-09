import firebase from "firebase";

export default {
  namespaced: true,
  state: {
    user: null
  },
  getters: {
    user: state => state.user,
    loggedIn: state => state.user != null
  },
  mutations: {
    setUser: (state, user) => state.user = user,
  },
  actions: {
    /**
     * Registra el usuario en la plataforma usando firebase.
     * @param data {Object} Objeto que contiene los datos del usuario. Debe contener:
     * * email: String con el email del usuario.
     * * password: String con la contraseña del usuario.
     * * name: String con el nombre del usuario
     * @returns {Promise<void>}
     */
    async register({commit}, data) {
      if (!data.name && !data.email && !data.password)
        throw 'Todos los campos son requeridos';

      //Crea el usuario en firebase.
      const res = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password);

      if (res.user) {
        //Agrega el nombre del usuario.
        await res.user.updateProfile({
          displayName: data.name
        });

        commit('setUser', res.user);
      }
    },

    /**
     * Inicia sesion en la plataforma usando firebase.
     * @param data {Object} Objeto que contiene los datos del usuario. Debe contener:
     *
     * * email: String con el email del usuario.
     *
     * * password: String con la contraseña del usuario.
     * @returns {Promise<void>}
     */
    async login({commit}, data) {
      if (!data.email && !data.password)
        throw 'Todos los campos son requeridos';

      //Inicia la sesion.
      const res = await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
      commit('setUser', res.user);
    },

    /**
     * Cierra la sesion usando firebase.
     * @returns {Promise<void>}
     */
    async logout({commit}) {
      await firebase.auth().signOut();
      commit('setUser', null);
    },

    /**
     * Actualiza el usuario del estado global.
     * @param commit
     * @param user
     */
    updateUser({commit}, user) {
      commit('setUser', user);
    }
  }
}