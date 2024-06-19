<template>
  <div>
    <div class="login-form">
      <h2>로그인</h2>
      <form
        @submit.prevent="submitForm"
        ref="form"
        novalidate
        class="was-validated"
      >
        <div class="mb-3">
          <label for="email" class="form-label">이메일:</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            class="form-control"
            required
          />
          <div class="invalid-feedback">이메일을 입력해주세요.</div>
        </div>

        <div class="mb-3">
          <label for="password" class="form-label">비밀번호:</label>
          <input
            type="password"
            id="password"
            v-model="form.password"
            class="form-control"
            required
          />
          <div class="invalid-feedback">비밀번호를 입력해주세요.</div>
        </div>

        <div class="mb-3">
          <button class="btn btn-primary" type="submit">로그인</button>
        </div>
      </form>
    </div>
    <NotificationComponent v-if="this.$store.state.isLogin" />
  </div>
</template>

<script>
import axios from "axios";
import NotificationComponent from "./NotificationComponent.vue"; // 알림 컴포넌트 경로

export default {
  name: "LoginForm",
  components: {
    NotificationComponent,
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    submitForm() {
      if (this.$refs.form.checkValidity()) {
        this.login();
      } else {
        this.$refs.form.classList.add("was-validated");
      }
    },
    login() {
      axios
        .post("http://localhost:8080/login", JSON.stringify(this.form), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          alert("로그인 성공!");
          this.$router.push("/");
          this.$store.commit("loginSuccessInit", {
            email: this.form.email,
            accessToken: response.headers.get("accessToken"),
          });
        })
        .catch((error) => {
          alert("로그인 실패! 비밀번호를 확인해주세요");
          console.log("로그인 에러 " + error);
        });
    },
  },
};
</script>

<style scoped>
.login-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 2em;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.login-form h2 {
  margin-bottom: 1em;
}

.login-form .form-label {
  margin-bottom: 0.5em;
  font-weight: bold;
}

.login-form .form-control {
  margin-bottom: 1em;
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.login-form .btn {
  padding: 0.7em;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.login-form .btn:hover {
  background-color: #0056b3;
}
</style>
