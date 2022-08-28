<template>
    <div class="connect__container">
        <div class="h1_container">
            <h1>Votre espace pour partagez et restez en contact avec vos collègues !!</h1>
        </div>
        <div class="card__container">
            <div class="card">
                <h2 class="card__title" v-if="mode == 'login'">Connexion</h2>
                <h2 class="card__title" v-else>Inscription</h2>
                <p class="card__subtitle" v-if="mode == 'login'">
                    Tu n'as pas encore de compte ?
                    <span class="card__action" @click="switchToCreateAccount()"
                        >Créer un compte</span
                    >
                </p>
                <p class="card__subtitle" v-else>
                    Tu as déjà un compte ?
                    <span class="card__action" @click="switchToLogin()">Se connecter</span>
                </p>
                <div class="form-row">
                    <input
                        v-model="email"
                        class="form-row__input"
                        type="text"
                        placeholder="Adresse mail"
                    />
                </div>
                <div class="form-row" v-if="mode == 'create'">
                    <input
                        v-model="profileName"
                        class="form-row__input"
                        type="text"
                        placeholder="Nom de profil"
                    />
                </div>
                <div class="form-row">
                    <input
                        v-model="password"
                        class="form-row__input"
                        type="password"
                        placeholder="Mot de passe"
                    />
                </div>
                <div class="form-row" v-if="mode == 'login' && status == 'error_login'">
                    Adresse mail et/ou mot de passe invalide
                </div>
                <div class="form-row" v-if="mode == 'create' && status == 'error_create'">
                    Adresse mail déjà utilisée
                </div>
                <div class="form-row">
                    <button
                        @click="login()"
                        class="button"
                        :class="{ 'button--disabled': !validatedFields }"
                        v-if="mode == 'login'"
                    >
                        <span v-if="status == 'loading'">Connexion en cours ...</span>
                        <span>Se connecter</span>
                    </button>
                    <button
                        @click="createAccount()"
                        class="button"
                        :class="{ 'button--disabled': !validatedFields }"
                        v-else
                    >
                        <span v-if="status == 'loading'">Création en cours ...</span>
                        <span v-else>Créer mon compte</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'FormConnect',
    data: function () {
        return {
            mode: 'login',
            email: '',
            profileName: '',
            password: ''
        }
    },
    computed: {
        validatedFields: function () {
            if (this.mode == 'create') {
                if (this.email != '' && this.profileName != '' && this.password != '') {
                    return true
                } else {
                    return false
                }
            } else {
                if (this.email !== '' && this.password !== '') {
                    return true
                } else {
                    return false
                }
            }
        },
        ...mapState(['status'])
    },
    methods: {
        switchToCreateAccount: function () {
            this.mode = 'create'
        },
        switchToLogin: function () {
            this.mode = 'login'
        },
        login: function (validatedFields) {
            const self = this
            this.$store
                .dispatch('login', {
                    email: this.email,
                    password: this.password
                })
                .then(
                    function (response) {
                        self.$router.push('/Profil')
                    },
                    function (error) {
                        console.log(error)
                    }
                )
        },
        createAccount: function () {
            const self = this
            this.$store
                .dispatch('createAccount', {
                    email: this.email,
                    profileName: this.profileName,
                    password: this.password
                })
                .then(
                    function () {
                        self.login()
                    },
                    function (error) {
                        console.log(error)
                    }
                )
        }
    }
}
</script>

<style scoped>
h1 {
    text-align: center;
    padding-left: 30px;
    padding-right: 30px;
    color: #7096aa;
}

h2 {
    text-align: center;
    color: #7096aa;
    font-size: 28px;
    padding-top: 20px;
    padding-bottom: 10px;
}

hr {
    width: 80%;
    text-align: center;
}

.connect__container {
    display: flex;
    width: 100%;
    align-items: center;
}

.h1_container {
    width: 50%;
}

.card__container {
    width: 50%;
}

.card {
    background-color: #ffffff;
    max-width: 500px;
    margin: 50px auto 0;
    border-radius: 20px;
    color: #707070;
}
.card__subtitle {
    padding-left: 20px;
}
.card__action {
    color: #7096aa;
    cursor: pointer;
}
.form-row {
    display: flex;
    flex-direction: column;
    margin: 20px;
}
.form-row__input {
    padding: 15px;
    border: none;
    border-radius: 8px;
    background: #f2f2f2;
    font-weight: 500;
    font-size: 16px;
    min-width: 100px;
}

.button {
    margin: 20px auto 40px;
    width: 250px;
    background-color: #7096aa;
    color: #ffffff;
    border: none;
    border-radius: 8px;
    padding: 15px;
}

@media screen and (max-width: 800px) {
    .connect__container {
        text-align: center;
    }
    .h1_container {
        display: none;
    }
    .card__container {
        width: 100%;
    }
}
</style>
