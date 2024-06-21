<template>
  <h3 class="center-content">
    {{ this.$route.params.email }}님이 개최한 프로그램
  </h3>
  <div class="content">
    <div class="container">
      <div
        @click="routingProgramDetail(program.id)"
        class="card"
        v-for="program in ProgramAllReadResponse"
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
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MembersPrograms",
  data() {
    return {
      ProgramAllReadResponse: [],
    };
  },
  methods: {
    routingProgramDetail(id) {
      this.$router.push(`/program/detail/${id}`);
    },
  },
  created() {
    axios
      .get(`${this.$store.state.host}/program/view/programs`, {
        params: {
          email: this.$route.params.email,
        },
      })
      .then((response) => {
        this.ProgramAllReadResponse = response.data.response;
        console.log("Program list: ", this.ProgramAllReadResponse);
      })
      .catch((error) => {
        console.log("Error fetching programs: ", error);
      });
  },
};
</script>

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
</style>
