<template>
    <div class="card">
        <p class="card__userName"></p>
        <div class="card__profilPicture">
            <img class="card__picture" src="" alt="">
        </div>
        <p  class="card__editPicture">Modifier votre photo profil</p>
        <div class="card__infoUser">
            <p class="card__info">Email : </p>
            <p class="card__info">Date d'incription :</p>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Profile',
  mounted: function () {
    console.log(this.$store.state.user);
    if (this.$store.state.user.userId == -1) {
      this.$router.push('/');
      return ;
    }
    this.$store.dispatch('getUserInfos');
  },
}


</script>

<style scoped>

.card{
    max-width: 700px;
    height: 500px;
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

.card__profilPicture{
    width: 200px;
    height: 200px;
    margin: 0 auto;
    border: 1px solid #7096AA;
    border-radius: 50%;
}

.card__editPicture{
    text-align: center;
    cursor: pointer;
}

.card__infoUser{
    padding-top: 20px;
}

.card__info{
    text-align: center;
    font-size: 20px;
}

</style>