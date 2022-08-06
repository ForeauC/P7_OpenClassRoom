import { createStore } from 'vuex'

const axios = require('axios');

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/'
  });

export default createStore({
  state: {
    status : '',
    user : {
        userId: -1,
        token: ''
    },
    userInfos :{
        profilName :'',
        email : '',
        profilImageUrl : '',
    }
  },
  mutations: {
    setStatus: function (state, status) {
        state.status = status;
    },
    logUser: function (state, user) {
        instance.defaults.headers.common['Authorization'] = user.token;
        state.user = user;
    },
    userInfos : function (state, userInfos) {
        state.userInfos = userInfos;
    },
  },
  actions: {
    login: ({commit}, userInfos) => {
        commit('setStatus', 'loading');
        return new Promise((resolve, reject) => {
        instance.post('/auth/login', userInfos)
            .then(function(response) {
                commit('setStatus', "")
                commit('logUser', response.data)
                resolve(response)
            })
            .catch(function (error) {
                commit('setStatus', 'error_login')
                reject(error);
            });
        })
    },
    createAccount: ({commit}, userInfos) => {
        commit('setStatus', 'loading');
        return new Promise((resolve, reject) => {
        instance.post('/auth/signup', userInfos)
            .then(function(response) {
                commit('setStatus', "created")
                resolve(response)
            })
            .catch(function (error) {
                commit('setStatus', 'error_create')
                reject(error);
            });
        })
    },
    getUserInfos : ({commit}, user) => {
        instance.post('/auth/infos', user.userId)
            .then(function(response) {
                commit('userInfos', response.data)
                resolve(response)
            })
            .catch(function (error) {
                commit('setStatus', 'error_create')
                reject(error);
            });
    }
  },
  
})