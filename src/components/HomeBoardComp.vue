<script>
export default {
  name: "HomeBoardComp"
}
</script>

<template>
  <div class="container">
  <div @click="this.$router.push('/board/1')" class="card" style="width: 12rem;" >
    <img src="https://picsum.photos/100?random=0" class="card-img-top" alt="gd">
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">Some quick </p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>
    <div class="card" style="width: 12rem;" >
      <img src="https://picsum.photos/100?random=0" class="card-img-top" alt="gd">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">Some quick </p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
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
</style>