<template>
  <div class="card">
    <div class="card__profil">
      <img class="card__profil-picture" src="" alt="">
      <div class="card__profil-info">
        <p class="card__profil-userName"></p>
        <p class="card__profil-datePublication"></p>
      </div>
      <div class="card__profil-icone">
      </div>
    </div>
    <p class="card__titlePublication"></p>
    <img class="card__imgPublication" src="" alt="">
    <p class="card__numberLike"></p>
  </div>
</template>

<script>

</script>

<style scoped>
.card{
  width: 520px;
  height: 600px;
  background-color: yellowgreen;
  margin: 20px auto;
}

.card__profil{
  display: flex;
  height: 20%;
  background-color: red;
}

.card__profil-picture{
  width: 25%;
}

.card__profil-info{
  width: 50%;
  background-color: brown;
}

.card__profil-icone{
  width: 25%;
  background-color: olive;
}

.card__titlePublication{
  height: 5%;
  background-color: blueviolet;
  margin: 0;
}

.card__imgPublication{
  background-color: blue;
  width: 100%;
  height: 60%;
}

.card__numberLike{
  background-color: green;
  height: 15%;
  margin: 0;
}
</style>