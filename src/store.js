import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate';
// import axios from "axios";

const store = createStore({
    state(){
        return {
            accessToken : '',
            isLogin : false,
            loginedEmail : '',
            host : 'http://localhost:8080',
        }
    },
    mutations : {
        loginSuccessInit(state, { email, accessToken}){
            state.isLogin = true;
            state.loginedEmail = email;
            state.accessToken = accessToken;
        }
    },
    actions : {

    },
    plugins: [createPersistedState({
        paths: ['loginedEmail', 'isLogin', 'accessToken']  // 영구적으로 저장할 상태 정의
    })]
})

export default store