<template>
    <div id="form__connect" class="form__container">
        <div id="form__tab" class="form__container-tab" >
            <button class="form__tab form__active-tab" >Incription</button>
            <button class="form__tab">Connection</button>
        </div>
        <form id="panel-1" class="form__tab-content form__active-tab-content">
            <div class="form__userName form">
                <label for="userName">Veuillez renseignez votre nom de profil</label>
                <input name="userName" v-model="email" placeholder="userName">
            </div>
            <div class="form__email form">
                <label for="email">Veuillez renseignez votre email</label>
                <input name="email" v-model="email" placeholder="Email">
            </div>
            <div class="form__password form">
                <label for="password">Veuillez renseignez votre mot de passe</label>
                <input name="password" v-model="password" placeholder="Mot de passe" type="password">
            </div>
            <div class="button">
                <input class="button__submit" type="submit" value="Se connecter">
            </div>
        </form>

        <form id="panel-2" class="form__tab-content">
            <div class="form__email form">
                <label for="email">Veuillez renseignez votre email</label>
                <input name="email" v-model="email" placeholder="Email">
            </div>
            <div class="form__password form">
                <label for="password">Veuillez renseignez votre mot de passe</label>
                <input name="password" v-model="password" placeholder="Mot de passe" type="password">
            </div>
            <div class="button">
                <input class="button__submit" type="submit" value="Se connecter">
            </div>
        </form>
    </div>

</template>

<script>
export default {
    
}
</script>

<style scoped>

.form__container {
    background-color: #FFFFFF;
    max-width: 600px;
    margin: 50px auto 0;
    border-radius: 20px;
    color: #707070;
    display: grid;
    grid-template-rows: min-content 1fr;
}
.form__container-tab {
    display: flex;
    border-bottom: 1px solid #ffffff3e;
}
.form__tab {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background-color: #7096AA;
    box-shadow: 2px 2px 5px 5px rgba(0, 0, 0, 0.181) inset;
    color: #FFFFFF;
    flex-basis: 100%;
    font-size: clamp(16px, 2vw, 20px);
    font-weight: 700;
    padding: 30px 0;
    cursor: pointer;
}

.form__tab:nth-child(1) {
    border-top-left-radius: 19px;
}
.form__tab:nth-child(2) {
    border-top-right-radius: 19px;
}

.form__tab-content {
    grid-area: 2 / 1 / 3 / 2;
    padding: clamp(35px, 3vw, 40px);
    min-height: 200px;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.4s ease-out;
}


/* Animations */
.form__active-tab {
    background-color: #FFFFFF;
    box-shadow: none;
    color: #707070;
    font-weight: bolder;
}
.form__active-tab-content {
    visibility: visible;
    opacity: 1;
}

.form{
    display:flex;
    flex-direction: column;
    padding: 10px;
    text-align: center;
    margin: 0 auto;
}

.form label{
    padding-bottom: 10px;
}

.form input{
    width: 60%;
    margin: 0 auto;
    padding: 10px;
    text-align: center;
    border: 1px solid #7096AA;
    border-radius: 20px;
}

.button{
    text-align: center;
    padding-top: 20px;
 
}

.button__submit{
    width: 150px;
    background-color: #7096AA;
    color: #FFFFFF;
    border: none;
    border-radius: 20px;
    padding: 10px
}

</style>