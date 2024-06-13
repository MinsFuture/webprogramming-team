<script>
import axios from "axios";

export default {
  name: "MyAttendProgramComp",
  data() {
    return {
      memberProgramRecruitmentResponse : [
      ]
    }
  },
  methods : {
    routingProgramDetail(id){
      this.$router.push(`/board/${id}`)
    }
  },
  created() {
    axios.get(`${this.$store.state.host}/program/recruitment/programs`, {
      headers : {
        "Accesstoken" : this.$store.state.accessToken,
      }
    })
        .then((response) => {
          this.memberProgramRecruitmentResponse = response.data.response;
        })
        .catch((error) => {
          console.log("내 프로그램 불러오기 오류 : " + error);
        })
  }
}
</script>

<template>
  <div class="container">
    <h1 class="center-content">내가 신청한 프로그램들</h1>
    <div class="row">
      <ul class="list-group list-group-flush" v-for="program in memberProgramRecruitmentResponse" :key="program.programId">
        <li @click="routingProgramDetail(program.programId)" class="list-group-item">
          <div>{{ program.title }}</div>
          <div>카테고리: {{ program.category }}</div>
          <div>글 쓴 날짜: {{ program.programDate }}</div>
        </li>
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