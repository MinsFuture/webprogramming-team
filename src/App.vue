<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">기부천사</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/">Home</a>
          </li>
        </ul>

        <div class="icon-group ms-auto">
          <i class="bi bi-chat-fill text-white"></i>
          <div v-if="this.$store.state.isLogin" class="dropdown-center">
            <i class="bi bi-person-circle text-white dropdown-toggle"
               data-bs-toggle="dropdown" aria-expanded="false"></i>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" @click="routingMyBoards">내가 쓴 글</a></li>
              <li><a class="dropdown-item" @click="routingMyAttendPrograms">내가 신청한 프로그램</a></li>
              <li><a class="dropdown-item" @click="routingMyRanksComp">내 등급</a></li>
              <li><a class="dropdown-item" @click="logout">로그아웃</a></li>
            </ul>
          </div>
        </div>
        <button v-if="!this.$store.state.isLogin" @click="routingLoginComp" type="button" class="btn btn-light">로그인</button>
        <button v-if="!this.$store.state.isLogin" @click="routingCreateMemberComp" type="button" class="btn btn-light">회원가입</button>
        <button v-else type="button" @click="routingCreateBoardComp" class="btn btn-light">글쓰기</button>
      </div>
    </div>
  </nav>

  <div v-if="this.$route.path === '/'">
    <div class="center-content">
      <h1>열심히 살다 죽자</h1>

      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <div class="dropdown" style="margin-right: 15px">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
              {{ selectedCategory }}
            </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" @click="selectCategory('교육')">교육</a></li>
              <li><a class="dropdown-item" @click="selectCategory('봉사')">봉사</a></li>
              <li><a class="dropdown-item" @click="selectCategory('운동')">운동</a></li>
            </ul>
          </div>

          <form class="d-flex" role="search" style="margin-bottom: 15px">
            <input class="form-control me-2" type="search" placeholder="검색어를 입력하세요" aria-label="Search">
            <button class="btn btn-outline-success" type="submit" style="width: 80px">검색</button>
          </form>
        </div>
      </nav>
    </div>
    <HomeBoardComp></HomeBoardComp>
  </div>
  <router-view></router-view>
</template>

<script>
import HomeBoardComp from "@/components/program/HomeBoardComp.vue";

export default {
  name: 'App',
  components: {
    HomeBoardComp
  },
  data() {
    return {
      selectedCategory : '카테고리'
    }
  },
  methods: {
    routingMyBoards() {
      this.$router.push('/boards/me');
    },
    routingMyAttendPrograms() {
      this.$router.push('/programs/me')
    },
    routingMyRanksComp() {
      this.$router.push('/ranks/me')
    },
    routingCreateBoardComp() {
      this.$router.push('/create/board')
    },
    routingCreateMemberComp(){
      this.$router.push('/create/member')
    },
    routingLoginComp(){
      this.$router.push('/login')
    },
    selectCategory(category){
      this.selectedCategory = category;
    },
    logout() {
      alert('로그아웃 되었습니다');
      this.$store.state.accessToken = '';
      this.$store.state.isLogin = false;
      this.$store.state.loginedEmail = '';
      this.$router.push('/');
    }
  }
}
</script>

<style>
@import "assets/bootstrap.min.css";
@import "bootstrap-icons/font/bootstrap-icons.css";
@import "assets/style.css";

.navbar {
  margin-bottom: 1rem; /* navbar 아래에 1rem 간격 추가 */
  background-color: #e3f2fd;
}

.center-content {
  display: flex;
  flex-direction: column; /* 수직 정렬 */
  justify-content: center;
  align-items: center;
  height: calc(20vh - 2rem); /* 뷰포트 높이에서 상하 1rem씩 뺀 값으로 설정 */
  text-align: center; /* 텍스트를 가로로 중앙 정렬 */
}

.center-content form {
  margin-top: 1rem; /* Search 창과 h1 사이의 간격 */
}

.icon-group {
  display: flex; /* 아이콘들을 가로로 정렬하기 위해 */
  align-items: center; /* 세로 가운데 정렬 */
  cursor: pointer;
}

.icon-group i {
  font-size: 3rem; /* 아이콘 크기 조정 */
  color: white; /* 아이콘 색상 조정 */
  margin-left: 1rem; /* 아이콘 간 간격 조정 */
}

.btn {
  margin-left: 1rem;
}
</style>
