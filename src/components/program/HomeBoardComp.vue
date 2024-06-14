<script>

export default {
  name: "HomeBoardComp",
  props : {
    programAllReadResponse : Array
  },
  methods : {
    routingDetailsComp(id){
      this.$router.push(`/board/${id}`)
    }
  },

}
</script>

<template>
  <div class="container">
    <div @click="routingDetailsComp(program.id)" class="card" v-for="program in programAllReadResponse" :key="program.id">
      <img :src="`${program.imageUrl}`" class="card-img-top" alt="gd">
      <div class="card-body">
        <h5 class="card-title">{{ program.title }}</h5>
        <p class="card-text">{{program.category}}</p>
        <p class="card-text">{{program.open}}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin-top: 2rem;
  display: flex; /* 카드들을 가로로 나란히 정렬 */
  gap: 1rem; /* 카드들 사이에 간격 추가 */
}
.card {
  width: 12rem;
  cursor: pointer;
}
</style>