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
            profileName: '',
            email: '',
            profilImageUrl: ''
        },
        publication: {
            userId: '',
            profileName: '',
            profilImageUrl: '',
            description: '',
            imageUrl: '',
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
        publication: function (state, playload) {
            state.publication = playload
            state.publication.userId = state.user.userId
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
        postPublication: ({ commit }, playload) => {
            let formdData = new FormData()
            formdData.append('publication', JSON.stringify(playload.publication))
            formdData.append('image', playload.image)
            return new Promise((resolve, reject) => {
                instance
                    .post('/publication', formdData, {
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
        },
        getPublications: ({ commit }) => {
            instance
                .get(`/publication`)
                .then(function (response) {
                    commit('publication', response.data.reverse())
                })
                .catch(function () {})
        },
        deletePublication: ({ commit, state }) => {
            instance
                .delete(`/publication/${state.publication._id}`)
                .then(function (response) {
                    commit('publication', response.data)
                })
                .catch(function () {})
        }
    }
})
