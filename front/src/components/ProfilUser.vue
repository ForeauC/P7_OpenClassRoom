<template>
    <div class="card">
        <h1 class="card__title">Votre profil :</h1>
        <p class="card__userName">@{{ user.profileName }}</p>
        <div class="card__profilPicture">
            <img class="card__picture" src="../assets/profil.png" alt="" />
        </div>
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
    height: 450px;
    margin: 50px auto;
    background-color: #ffffff;
    border-radius: 20px;
    box-shadow: 0px 1px 2px 0px #656565;
    color: #707070;
}

.card__title {
    text-align: center;
    padding-top: 30px;
    margin: 0;
}

.card__userName {
    font-size: 30px;
    font-weight: 800;
    text-align: center;
    padding-top: 30px;
    padding-bottom: 20px;
    margin: 0;
}

.card__profilPicture {
    width: 120px;
    height: 120px;
    margin: 0 auto;
    border: 1px solid #7096aa;
    border-radius: 50%;
}

.card__profilPicture img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
}

.card__editText {
    text-align: center;
    padding-top: 10px;
}

.card__editPicture {
    display: flex;
    justify-content: center;
    align-items: center;
}

.card__button-submit {
    background-color: #ffffff;
    border: solid 1px #7096aa;
    border-radius: 8px;
    color: #7096aa;
    padding: 10px 20px;
    cursor: pointer;
}

.card__info {
    text-align: center;
    font-size: 20px;
    padding-top: 20px;
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
