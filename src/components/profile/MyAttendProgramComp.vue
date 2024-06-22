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
        console.log("왜 안됨", this.memberProgramRecruitmentResponse);
      })
      .catch((error) => {
        console.log("내 프로그램 불러오기 오류 : " + error);
      });
  },
};
</script>

<template>
  <div class="container">
    <h2 class="center-content" style="color: #8b572a">
      내가 신청한 프로그램들
    </h2>
    <div class="content">
      <div
        @click="routingProgramDetail(program.id)"
        class="card"
        v-for="program in memberProgramRecruitmentResponse"
        :key="program.id"
      >
        <img
          :src="`${program.imageUrl}`"
          class="card-img-top fixed-size-img"
          alt="gd"
        />
        <div class="card-body">
          <h5 class="card-title">{{ program.title }}</h5>
          <h5 class="card-subtitle text-muted small">
            ⭐ {{ isNaN(program.avgRating) ? "-" : program.avgRating }} ({{
              program.ratingCnt
            }})
          </h5>
          <br />
          <p class="card-text">
            <small class="text-body-secondary">
              <span
                :class="{
                  'badge text-white bg-primary': program.open === 'OPEN',
                  'badge text-white bg-danger': program.open === 'CLOSED',
                }"
              >
                {{ program.open === "OPEN" ? "모집중" : "모집마감" }}
              </span>
            </small>
            <small class="text-body-secondary">
              <span class="badge badge-light-custom">
                {{ program.category }}
              </span>
            </small>
          </p>
        </div>
        <button @click="cancel(program.programId)" class="btn btn-danger">
          취소
        </button>
      </div>
    </div>
    <!-- <div class="row">
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
          <div class="button-container">
            <button @click="cancel(program.programId)" class="btn btn-danger">
              취소
            </button>
          </div>
        </li>
      </ul>
    </div> -->
  </div>
</template>

<style scoped>
.main-container {
  display: flex;
  margin-top: 2rem;
}

.sidebar {
  width: 200px;
  margin-right: 2rem;
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 8px; /* 둥근 모서리 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar li {
  padding: 10px 15px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
  border-radius: 4px; /* 둥근 모서리 */
}

.sidebar li:hover {
  background-color: #e9ecef;
}

.sidebar li.active {
  background-color: black;
  color: white;
}

.content {
  flex: 1;
}

.container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.card {
  width: 26rem;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.badge-light-custom {
  background-color: #f0f0f1;
  color: #555; /* 글자색 */
}

.fixed-size-img {
  width: 100%;
  height: 130px;
  object-fit: cover;
}

.list-group-item {
  padding: 30px;
  cursor: pointer;
}

.list-group-item:hover {
  background-color: #f0f0f0; /* 변경할 배경 색상 */
  transition: background-color 0.3s ease; /* 부드럽게 변화하도록 transition 추가 */
}

.button-container {
  position: absolute; /* 절대 위치 설정 */
  right: 20px; /* 오른쪽 여백 */
  top: 50%; /* 세로 중앙 정렬 */
  transform: translateY(-50%); /* 세로 중앙 정렬 보정 */
}
</style>
