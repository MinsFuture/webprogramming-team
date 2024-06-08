import { createStore } from 'vuex'
import axios from "axios";

const store = createStore({
    state(){
        return {
            accessToken : '',
            isLogin : true
        }
    },
    mutations : {
        getAccessToken(state){
            axios.get('http://localhost:8080/googleLogin', {withCredentials : true})
                .then((response) =>
                {
                    console.log(state.accessToken = response.headers.accessToken);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    },
    actions : {
        GET_ACCESS_TOKEN({commit}){
            commit('getAccessToken');
        }
    }
})

export default store