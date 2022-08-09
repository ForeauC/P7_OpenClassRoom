import { createStore } from 'vuex'

const axios = require('axios')

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/'
})

let user = localStorage.getItem('user')
if (!user) {
    user = {
        userId: -1,
        token: ''
    }
} else {
    try {
        user = JSON.parse(user)
        instance.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
    } catch (ex) {
        user = {
            userId: -1,
            token: ''
        }
    }
}

export default createStore({
    state: {
        status: '',
        user: user,
        userInfos: {
            profilName: '',
            email: '',
            profilImageUrl: ''
        },
        publication: {
            userId: '',
            description: '',
            imagesUrl: '',
            likes: 0,
            userLiked: []
        }
    },
    mutations: {
        setStatus: function (state, status) {
            state.status = status
        },
        logUser: function (state, user) {
            instance.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
            localStorage.setItem('user', JSON.stringify(user))
            state.user = user
        },
        userInfos: function (state, userInfos) {
            state.userInfos = userInfos
        },
        logout: function (state) {
            state.user = {
                userId: -1,
                token: ''
            }
            localStorage.removeItem('user')
        },
        publication: function (state, publication) {
            state.publication.userId = state.user.userId
            state.publication = publication
        }
    },
    actions: {
        login: ({ commit }, userInfos) => {
            commit('setStatus', 'loading')
            return new Promise((resolve, reject) => {
                instance
                    .post('/auth/login', userInfos)
                    .then(function (response) {
                        commit('setStatus', '')
                        commit('logUser', response.data)
                        resolve(response)
                    })
                    .catch(function (error) {
                        commit('setStatus', 'error_login')
                        reject(error)
                    })
            })
        },
        createAccount: ({ commit }, userInfos) => {
            commit('setStatus', 'loading')
            return new Promise((resolve, reject) => {
                instance
                    .post('/auth/signup', userInfos)
                    .then(function (response) {
                        commit('setStatus', 'created')
                        resolve(response)
                    })
                    .catch(function (error) {
                        commit('setStatus', 'error_create')
                        reject(error)
                    })
            })
        },
        getUserInfos: ({ commit, state }) => {
            instance
                .get(`/auth/${state.user.userId}`)
                .then(function (response) {
                    commit('userInfos', response.data)
                })
                .catch(function () {})
        },
        postPublication: ({ commit, state }) => {
            return new Promise((resolve, reject) => {
                instance
                    .post(`/publication/${state.user.userId}`, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then(function (response) {
                        commit('publication', response.data)
                        resolve(response)
                    })
                    .catch(function (error) {
                        reject(error)
                    })
            })
        }
    }
})
