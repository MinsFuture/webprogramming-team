<script>
import axios from "axios";

export default {
  name: "HomeBoardComp",
  data(){
    return {
      programAllReadResponse : []
    }
  },
  methods : {
    routingDetailsComp(id){
      this.$router.push(`/board/${id}`)
    }
  },
  mounted() {
    axios.get(`${this.$store.state.host}/program/view`)
        .then((response) => {
          this.programAllReadResponse =  response.data.response;
        })
        .catch((error) => {
          console.log('홈 화면 불러오기 오류 : ' + error);
        })
  }
}
</script>

<template>
  <div class="container">
    <div @click="routingDetailsComp(program.id)" class="card" v-for="program in programAllReadResponse" :key="program.id">
      <img :src="`https://picsum.photos/100?random=${program.id}`" class="card-img-top" alt="gd">
      <div class="card-body">
        <h5 class="card-title">{{ program.title }}</h5>
        <p class="card-text">{{program.category}}</p>
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