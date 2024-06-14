<script>
import axios from "axios";

export default {
  name: "MyBoardsComp",
  data() {
    return {
      ProgramAllReadResponse : [],
      RecruitmentMembers : [],
    }
  },
  methods : {
    routingProgramDetail(id){
      this.$router.push(`/board/${id}`)
    },
    getRecruitmentMembers(id){
      axios.get(`${this.$store.state.host}/program/recruitment/members/${id}`, {
        headers : {
          "Accesstoken" : this.$store.state.accessToken,
        }
      })
          .then((response) => {
              this.RecruitmentMembers = response.data.response;
          })
          .catch((error) => {
            console.log('지원자 리스트 불러오기 에러 : ' + error);
          })
    }

  },
  created() {
    axios.get(`${this.$store.state.host}/program/mine`, {
      headers : {
        "Accesstoken" : this.$store.state.accessToken,
      }
    })
        .then((response) => {
          this.ProgramAllReadResponse = response.data.response;
        })
        .catch((error) => {
          console.log("내 프로그램 불러오기 오류 : " + error);
        })
  },

}
</script>

<template>
  <div class="container">
    <h1 class="center-content">내가 개최한 프로그램들</h1>
    <div class="row">
      <ul class="list-group list-group-flush" v-for="(program, index) in ProgramAllReadResponse" :key="index">
        <li @click="routingProgramDetail(program.id)" class="list-group-item">
          <div>{{ program.title }}</div>
          <div>카테고리: {{ program.category }}</div>
          <div>글 쓴 날짜: {{ program.writingTime }}</div>
          <div>모집 상태 : {{program.open}}</div>
          <img :src="`${program.imageUrl}`" style="width: 100px; height: 100px">

          <button @click="getRecruitmentMembers(program.id)" class="btn btn-primary"> 프로그램 지원자 보기</button>
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