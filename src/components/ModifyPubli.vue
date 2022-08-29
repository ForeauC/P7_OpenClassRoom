<template>
    <form class="card" @submit.prevent="modifyPost()">
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
            <textarea v-model="description" class="card__input" type="description"></textarea>
        </div>
        <div class="card__button">
            <button type="submit" class="card__button-submit button">Publier</button>
        </div>
    </form>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'ModifyPubli',
    data: function () {
        return {
            description: '',
            imagesUrl: ''
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
        })
    },
    methods: {
        fileUpload(e) {
            this.imagesUrl = e.target.files
        },
        modifyPost() {
            const self = this
            const id = this.$store.state.EditingPublication
            console.log(id)
            let formdData = new FormData()
            formdData.append('publication', JSON.stringify(this.description))
            formdData.append('image', this.imagesUrl)

            fetch(`http://localhost:3000/api/publication/${id}/`, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + this.$store.state.user.token
                },
                body: JSON.stringify({ formdData })
            }).then((res) => {
                console.log(res)
            })
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
    width: 500px;
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
    .card__input {
        width: 400px;
    }
}
@media screen and (max-width: 470px) {
    .card__input {
        width: 250px;
    }
}
</style>
