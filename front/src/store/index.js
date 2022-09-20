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
            admin: ''
        },
        publication: {
            userId: '',
            profileName: '',
            description: '',
            imageUrl: '',
            likes: 0,
            userLiked: []
        },
        editingPublication: {
            _id: '',
            description: ''
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
        editProfilImageUrl: function (state, editingPublication) {
            state.editingPublication = editingPublication
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
        },
        editingPublication: function (state, editingPublication) {
            state.editingPublication = editingPublication
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
                .catch(function (error) {
                    location.reload()
                    localStorage.removeItem('user')
                    this.$router.push('/')
                })
        },
        modifyImageProfil: ({ commit, state }, editProfilImageUrl) => {
            let formdData = new FormData()
            formdData.append('image', editProfilImageUrl.image)
            return new Promise((resolve, reject) => {
                instance
                    .put(`/auth/${state.user.userId}`, formdData, {
                        headers: { 'Content-Type': 'multipart/form-data' }
                    })
                    .then(function (response) {
                        commit('image', response.data)
                        resolve(response)
                    })
                    .catch(function (error) {
                        reject(error)
                    })
            })
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
                        location.reload()
                        localStorage.removeItem('user')
                        this.$router.push('/')
                    })
            })
        },
        getPublications: ({ commit }) => {
            instance
                .get(`/publication`)
                .then(function (response) {
                    commit('publication', response.data.reverse())
                })
                .catch(function () {
                    location.reload()
                    localStorage.removeItem('user')
                    this.$router.push('/')
                })
        },
        modifyPost: ({ commit, state }, playload) => {
            let formdData = new FormData()
            formdData.append('publication', JSON.stringify(playload.publication))
            formdData.append('image', playload.image)
            console.log(state.editingPublication._id)
            return new Promise((resolve, reject) => {
                instance
                    .put(`/publication/${state.editingPublication._id}`, formdData, {
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
                        location.reload()
                        localStorage.removeItem('user')
                        this.$router.push('/')
                    })
            })
        }
    }
})
