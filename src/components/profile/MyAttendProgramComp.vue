<script>
import axios from "axios";

export default {
  name: "MyAttendProgramComp",
  data() {
    return {
      memberProgramRecruitmentResponse: [],
    };
  },
  methods: {
    routingProgramDetail(id) {
      this.$router.push(`/board/${id}`);
    },
    cancel(id) {
      if (confirm("취소하시겠습니까?")) {
        axios
          .post(
            `${this.$store.state.host}/program/recruitment/cancel/${id}`,
            null,
            {
              headers: {
                Accesstoken: this.$store.state.accessToken,
              },
            }
          )
          .then(() => {
            alert("취소 성공!");
            this.$router.push("/programs/me");
          })
          .catch((error) => {
            console.log("취소 에러 : " + error);
          });
      } else {
        alert("취소를 중단하셨습니다.");
      }
    },
  },
  created() {
    axios
      .get(`${this.$store.state.host}/program/recruitment/programs`, {
        headers: {
          Accesstoken: this.$store.state.accessToken,
        },
      })
      .then((response) => {
        this.memberProgramRecruitmentResponse = response.data.response;
        console.log(this.memberProgramRecruitmentResponse);
      })
      .catch((error) => {
        console.log("내 프로그램 불러오기 오류 : " + error);
      });
  },
};
</script>

<template>
  <div class="container">
    <h1 class="center-content">내가 신청한 프로그램들</h1>
    <div class="row">
      <ul
        class="list-group list-group-flush"
        v-for="program in memberProgramRecruitmentResponse"
        :key="program.programId"
      >
        <li
          @click="routingProgramDetail(program.programId)"
          class="list-group-item"
        >
          <img
            :src="`${program.imageUrl}`"
            style="width: 100px; height: 100px"
          />
          <div>{{ program.title }}</div>
          <div>카테고리: {{ program.category }}</div>
          <div>프로그램 날짜: {{ program.programDate }}</div>
          <button @click="cancel(program.programId)" class="btn btn-danger">
            취소
          </button>
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
