<template>
    <div class="card">
        <p class="card__userName">@Riri14</p>
        <div class="card__button">
            <button class="card__button-picture button">Ajouter une photo</button>
        </div>
        <p class="card__caption">Ajouter une légende :</p>
        <div class="card__input-container">
            <input class="card__input" type="texte">
        </div>
        <div class="card__button">
            <button class="card__button-submit button">Publier</button>
        </div>
    </div>
</template>   

<script>

</script>

<style scoped>

.card{
    max-width: 700px;
    height: 550px;
    margin: 50px auto;
    background-color: #FFFFFF;
    border-radius: 20px;
    box-shadow: 0px 1px 2px 0px #656565;
    color: #707070;
}

.card__userName{
    font-size: 30px;
    font-weight: 800;
    text-align: center;
    padding-top: 30px;
}

.card__button{
    text-align: center;
    padding-bottom: 30px;
    padding-top: 20px;
}

.button{
    width: 200px;
    height: 40px;
    background-color: #FFFFFF;
    border: 1px solid #7096AA;
    border-radius: 20px;
    box-shadow: 0px 1px 2px 0px #656565;
    color: #707070;
    font-size: 20px;
}

.card__caption{
    text-align: center;
    font-size: 15px;
}

.card__input-container{
    text-align: center;
}

.card__input{
    width: 500px;
    height: 200px;
    border: 1px solid #7096AA;
    border-radius: 20px;
}

.card__button-submit{
    height: 60px;
    background-color: #7096AA;
    color: #FFFFFF;
}

</style>