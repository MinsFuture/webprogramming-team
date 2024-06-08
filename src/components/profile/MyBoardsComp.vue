<script>
export default {
  name: "MyBoardsComp"
}
</script>

<template>
  <div class="container">
    <h1 class="center-content">내가 쓴 글</h1>
    <div class="row">
      <ul class="list-group list-group-flush">
        <li class="list-group-item">웹 개발 기초 프로그램 봉사</li>
        <li class="list-group-item">자바 프로그래밍 멘토링 활동</li>
        <li class="list-group-item">데이터 분석 기초 과정</li>
        <li class="list-group-item">앱 개발 실전 프로젝트 팀</li>
        <li class="list-group-item">인공지능 기초 강의 봉사</li>
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