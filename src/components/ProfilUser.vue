<template>
    <div class="card">
        <p class="card__userName">@{{ user.profileName }}</p>
        <div class="card__profilPicture">
            <img class="card__picture" src="" alt="" />
        </div>
        <p class="card__editPicture">Modifier votre photo profil</p>
        <div class="card__infoUser">
            <p class="card__info">Email : {{ user.email }}</p>
        </div>
        <div class="card__button">
            <button @click="logout()" class="button">Déconnexion</button>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'Profile',
    mounted: function () {
        if (this.$store.state.user.userId == -1) {
            this.$router.push('/')
            return
        }
        this.$store.dispatch('getUserInfos')
    },
    computed: {
        ...mapState({
            user: 'userInfos'
        })
    },
    methods: {
        logout: function () {
            this.$store.commit('logout')
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
.card {
    max-width: 700px;
    height: 500px;
    margin: 50px auto;
    background-color: #ffffff;
    border-radius: 20px;
    box-shadow: 0px 1px 2px 0px #656565;
    color: #707070;
}

.card__userName {
    font-size: 30px;
    font-weight: 800;
    text-align: center;
    padding-top: 30px;
}

.card__profilPicture {
    width: 200px;
    height: 200px;
    margin: 0 auto;
    border: 1px solid #7096aa;
    border-radius: 50%;
}

.card__editPicture {
    text-align: center;
    cursor: pointer;
}

.card__info {
    text-align: center;
    font-size: 20px;
}

.card__button {
    text-align: center;
    padding-top: 20px;
    padding-bottom: 20px;
}

.button {
    width: 250px;
    background-color: #7096aa;
    color: #ffffff;
    border: none;
    border-radius: 8px;
    padding: 15px;
}
</style>
