import { createStore } from 'vuex'

export default createStore({
  state: {
    token:localStorage.getItem('token'),
    username:localStorage.getItem('username'),
    rol:localStorage.getItem('rol')
  },
  getters: {
    isLogin(state){
      return state.token !== null && state.token !=="";
    }
  },
  mutations: {
    doLogin(state,data) {
      localStorage.setItem('token',data.token);
      localStorage.setItem('username',data.username);
      localStorage.setItem('rol',data.rol);
      state.token = data.token;
      state.username = data.username;
      state.rol = data.rol;
    },
    doLogout(state) {
      localStorage.setItem('token',null);
      localStorage.setItem('username',null);
      state.token = null;
      state.username = null;
      state.rol = null;
    }
  },
  actions: {
    doLogin({ commit }, data) {
      commit("doLogin",data);
    },
    doLogout({ commit }) {
      commit("doLogout");
    }
  },
  modules: {
  }
})
