<template>
  <div class="detail-board">
    <h2>게시글 상세 정보</h2>
    <div>
      <h3>{{ board.title }}</h3>
      <p>{{ board.content }}</p>
      <p>카테고리: {{ getCategoryText(board.category) }}</p>
      <p>최대 참가자 수: {{ board.maxParticipants }}</p>
      <p>모집 기간: {{ board.recruitmentPeriodStart }} ~ {{ board.recruitmentPeriodEnd }}</p>
      <p>프로그램 시작 날짜: {{ board.startDate }}</p>
      <h1>상세</h1>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DetailBoardComp",
  data(){
    return{
      board : {}
    }
  },
  methods: {
    getCategoryText(category) {
      switch (category) {
        case 1:
          return "교육";
        case 2:
          return "봉사";
        case 3:
          return "운동";
        default:
          return "기타";
      }
    },
    mounted(){
      let id = this.$route.param;

      axios.get(`http://localhost:8080/program/${id}`)
          .then((response) => {
            this.board = response.data;
          })
          .catch((error) => {
            console.log('글을 불러는데 실패했습니다' + error)
          })
    },
  }
};
</script>

<style scoped>
.detail-board {
  max-width: 600px;
  margin: 0 auto;
  padding: 2em;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.detail-board h2 {
  margin-bottom: 1em;
}
.detail-board div {
  margin-top: 1em;
}
</style>
