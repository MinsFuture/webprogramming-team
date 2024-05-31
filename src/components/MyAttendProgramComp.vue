<script>
export default {
  name: "MyAttendProgramComp"
}
</script>

<template>
  <div class="container">
    <h1 class="center-content">내가 신청한 프로그램들</h1>
    <div class="row">
      <ul class="list-group list-group-flush">
        <li class="list-group-item">자바 프로그래밍 입문</li>
        <li class="list-group-item">웹 개발 기초</li>
        <li class="list-group-item">데이터 분석 입문</li>
        <li class="list-group-item">앱 개발 실전</li>
        <li class="list-group-item">인공지능 기초 강의</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.list-group-item {
  padding: 30px;
  cursor: pointer;
}
.list-group-item:hover {
  background-color: #f0f0f0; /* 변경할 배경 색상 */
  transition: background-color 0.3s ease; /* 부드럽게 변화하도록 transition 추가 */
}
</style>