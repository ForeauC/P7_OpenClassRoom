<template>
    <form class="card" @submit.prevent="addPublication">
        <p class="card__userName">@{{ user.profileName }}</p>
        <div class="card__button">
            <input
                class="card__button-picture"
                id="file"
                type="file"
                ref="file"
                @input="fileUpload"
            />
        </div>
        <p class="card__caption">Ajouter une légende :</p>
        <div class="card__input-container">
            <textarea
                v-model="description"
                class="card__input"
                type="description"
                maxlength="150"
            ></textarea>
        </div>
        <div class="card__button">
            <button type="submit" class="card__button-submit button" :disabled="validatedPubli">
                Publier
            </button>
        </div>
    </form>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'Publication',
    data: function () {
        return {
            description: '',
            imageUrl: ''
        }
    },
    mounted: function () {
        if (this.$store.state.user.userId == -1) {
            this.$router.push('/')
            return
        }
        this.$store.dispatch('getUserInfos')
    },
    computed: {
        ...mapState({
            user: 'userInfos',
            publication: 'publication'
        }),
        validatedPubli: function () {
            if (this.description === '' && this.imageUrl === '') {
                return true
            } else {
                return false
            }
        }
    },
    methods: {
        fileUpload(e) {
            this.imagesUrl = e.target.files
        },
        addPublication() {
            const self = this
            this.$store
                .dispatch('postPublication', {
                    publication: {
                        profileName: this.$store.state.userInfos.profileName,
                        userId: this.$store.state.user.userId,
                        description: this.description,
                        imageUrl: this.imageUrl,
                        likes: 0,
                        userLiked: []
                    },
                    image: this.imagesUrl[0]
                })
                .then(
                    function (response) {
                        self.$router.push('/Home')
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
.card {
    max-width: 700px;
    height: 550px;
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

.card__button {
    text-align: center;
    padding-bottom: 30px;
    padding-top: 20px;
}

.card__button-picture {
    background: none;
}

.button {
    width: 200px;
    height: 40px;
    background-color: #ffffff;
    border: 1px solid #7096aa;
    border-radius: 20px;
    box-shadow: 0px 1px 2px 0px #656565;
    color: #707070;
    font-size: 20px;
}

.card__caption {
    text-align: center;
    font-size: 15px;
}

.card__input-container {
    text-align: center;
}

.card__input {
    width: 60vw;
    max-width: 600px;
    height: 200px;
    border: 1px solid #7096aa;
    border-radius: 20px;
}

.card__button-submit {
    height: 60px;
    background-color: #7096aa;
    color: #ffffff;
}

@media screen and (max-width: 800px) {
    .card {
        margin-top: 20px;
        height: 470px;
    }
    .card__userName {
        margin-top: 10px;
    }
    .card__button {
        padding-top: 10px;
        padding-bottom: 10px;
    }
    .card__button-submit {
        height: 40px;
    }
}
</style>
