<template>
    <div class="card" id="publication" v-for="publi in publication" :key="publi._id">
        <div class="card__profil">
            <div class="card__profil-picture">
                <img src="../assets/ape1.png" alt="" />
            </div>
            <div class="card__profil-info">
                <p class="card__profil-userName">@{{ publi.profileName }}</p>
            </div>
            <div class="card__profil-icone">
                <svg
                    v-if="$store.state.user.userId === publi.userId"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="25"
                    height="25"
                    viewBox="0 0 172 172"
                    style="fill: #000000"
                >
                    <g
                        fill="none"
                        fill-rule="nonzero"
                        stroke="none"
                        stroke-width="1"
                        stroke-linecap="butt"
                        stroke-linejoin="miter"
                        stroke-miterlimit="10"
                        stroke-dasharray=""
                        stroke-dashoffset="0"
                        font-family="none"
                        font-weight="none"
                        font-size="none"
                        text-anchor="none"
                        style="mix-blend-mode: normal"
                    >
                        <path d="M0,172v-172h172v172z" fill="none"></path>
                        <g fill="#7096aa">
                            <path
                                d="M131.96744,14.33333c-1.83376,0 -3.66956,0.69853 -5.06706,2.09961l-12.23372,12.23372l28.66667,28.66667l12.23372,-12.23372c2.80217,-2.80217 2.80217,-7.33911 0,-10.13412l-18.53255,-18.53255c-1.40108,-1.40108 -3.23329,-2.09961 -5.06706,-2.09961zM103.91667,39.41667l-82.41667,82.41667v28.66667h28.66667l82.41667,-82.41667z"
                            ></path>
                        </g>
                    </g>
                </svg>
                <svg
                    v-if="$store.state.user.userId === publi.userId"
                    @click.prevent="deleteButton(publi._id)"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="25"
                    height="25"
                    viewBox="0 0 172 172"
                    style="fill: #000000"
                >
                    <g
                        fill="none"
                        fill-rule="nonzero"
                        stroke="none"
                        stroke-width="1"
                        stroke-linecap="butt"
                        stroke-linejoin="miter"
                        stroke-miterlimit="10"
                        stroke-dasharray=""
                        stroke-dashoffset="0"
                        font-family="none"
                        font-weight="none"
                        font-size="none"
                        text-anchor="none"
                        style="mix-blend-mode: normal"
                    >
                        <path d="M0,172v-172h172v172z" fill="none"></path>
                        <g fill="#7096aa">
                            <path
                                d="M85.91042,14.25495c-3.16203,0.04943 -5.68705,2.6496 -5.64375,5.81172v2.86667h-31.53333c-1.53406,-0.02082 -3.01249,0.574 -4.10468,1.65146c-1.09219,1.07746 -1.70703,2.54767 -1.70704,4.08187h-8.52161c-2.06765,-0.02924 -3.99087,1.05709 -5.03322,2.843c-1.04236,1.78592 -1.04236,3.99474 0,5.78066c1.04236,1.78592 2.96558,2.87225 5.03322,2.843h103.2c2.06765,0.02924 3.99087,-1.05709 5.03322,-2.843c1.04236,-1.78592 1.04236,-3.99474 0,-5.78066c-1.04236,-1.78592 -2.96558,-2.87225 -5.03322,-2.843h-8.52161c-0.00001,-1.53421 -0.61486,-3.00442 -1.70704,-4.08187c-1.09219,-1.07746 -2.57061,-1.67228 -4.10468,-1.65146h-31.53333v-2.86667c0.02122,-1.54972 -0.58581,-3.04203 -1.68279,-4.1369c-1.09698,-1.09487 -2.59045,-1.69903 -4.14013,-1.67482zM34.4,51.6l10.27969,87.34375c0.67653,5.77347 5.56348,10.12292 11.37708,10.12292h59.88646c5.8136,0 10.69482,-4.34945 11.37708,-10.12292l10.27969,-87.34375z"
                            ></path>
                        </g>
                    </g>
                </svg>
            </div>
        </div>
        <p class="card__titlePublication">{{ publi.description }}</p>
        <div class="card__imgPublication">
            <img :src="publi.imageUrl" />
        </div>
        <hr />
        <div class="card__Like">
            <p class="card__Like-counter">{{ publi.likes }}</p>
            <img src="../assets/like.png" alt="" />
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'AllPublication',
    mounted: async function () {
        if (this.$store.state.user.userId == -1) {
            this.$router.push('/')
            return
        }
        await this.$store.dispatch('getPublications')
    },
    computed: {
        ...mapState({
            publication: 'publication'
        })
    },
    methods: {
        deleteButton(id) {
            fetch(`http://localhost:3000/api/publication/${id}`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + this.$store.state.user.token
                }
            }).then(() => {
                alert('supprimé !')
                document.location.reload()
            })
        }
    }
}
</script>

<style scoped>
.card {
    width: 520px;
    height: 600px;
    background-color: #ffffff;
    margin: 20px auto;
    border-radius: 20px;
}

.card__profil {
    display: flex;
    height: 20%;
}

.card__profil-picture {
    width: 25%;
    text-align: center;
    padding-top: 20px;
}

.card__profil-picture img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
}

.card__profil-info {
    width: 50%;
}

.card__profil-userName {
    color: #707070;
    font-size: 30px;
    font-weight: 800;
}

.card__profil-icone {
    width: 25%;
    text-align: end;
    padding-top: 20px;
}

.card__profil-icone svg {
    margin-right: 20px;
}

.card__titlePublication {
    height: auto;
    max-height: 10%;
    padding: 0 20px 20px 30px;
    margin: 0;
    font-size: 18px;
    color: #707070;
}

.card__imgPublication {
    width: 100%;
    height: 60%;
    border-radius: 20px;
    text-align: center;
    margin-bottom: 10px;
}

.card__imgPublication img {
    width: 90%;
    height: 100%;
    border-radius: 20px;
}

hr {
    width: 90%;
    background-color: #7096aa;
    text-align: center;
    margin: 0 auto;
}

.card__Like {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    width: 100%;
    height: 10%;
    padding-top: 5px;
}

.card__Like p {
    color: #707070;
}

.card__Like img {
    width: 30px;
    height: 30px;
}
</style>
