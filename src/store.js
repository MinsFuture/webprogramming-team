import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
// import axios from "axios";

const store = createStore({
  state() {
    return {
      accessToken: "",
      isLogin: false,
      loginedEmail: "",
      latitude: 0.0,
      longitude: 0.0,
      // 지현 :35.216.104.192
      //규리 : 34.64.250.226
      //규리 new ; 34.64.201.129
      host: "http://34.64.201.129:8080",
      ws: "ws://34.64.201.129:8080",
    };
  },
  mutations: {
    loginSuccessInit(state, { email, accessToken }) {
      state.isLogin = true;
      state.loginedEmail = email;
      state.accessToken = accessToken;
    },
  },
  actions: {},
  plugins: [
    createPersistedState({
      paths: [
        "loginedEmail",
        "isLogin",
        "accessToken",
        "latitude",
        "longitude",
      ], // 영구적으로 저장할 상태 정의
    }),
  ],
});

export default store;
