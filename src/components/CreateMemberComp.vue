<template>
  <div class="create-member">
    <h2>회원가입</h2>
    <form @submit.prevent="submitForm" ref="form" novalidate class="was-validated">
      <div class="mb-3">
        <label for="email" class="form-label">이메일:</label>
        <input type="email" id="email" v-model="form.email" class="form-control" required/>
        <div class="invalid-feedback">이메일을 입력해주세요.</div>
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">비밀번호:</label>
        <input type="password" id="password" v-model="form.password" class="form-control" pattern="[^\u3131-\uD79D]*" required/>
        <div class="invalid-feedback">비밀번호는 영문, 숫자만 입력해주세요.</div>
      </div>

      <div class="mb-3">
        <label for="nickname" class="form-label">닉네임:</label>
        <input type="text" id="nickname" v-model="form.memberName" class="form-control" required/>
        <div class="invalid-feedback">닉네임을 입력해주세요.</div>
      </div>

      <div class="mb-3">
        <label for="birthdate" class="form-label">생년월일:</label>
        <input type="date" id="birthdate" v-model="form.birth" class="form-control" required/>
        <div class="invalid-feedback">생년월일을 입력해주세요.</div>
      </div>

      <div class="mb-3">
        <label for="gender" class="form-label">성별:</label>
        <select id="gender" v-model="form.gender" class="form-select" required>
          <option value="">성별을 선택해주세요.</option>
          <option value="male">남성</option>
          <option value="female">여성</option>
          <option value="other">기타</option>
        </select>
        <div class="invalid-feedback">성별을 선택해주세요.</div>
      </div>

      <div class="mb-3">
        <label for="age" class="form-label">나이:</label>
        <input type="number" id="age" v-model="form.age" class="form-control" required/>
        <div class="invalid-feedback">나이를 입력해주세요.</div>
      </div>

      <div class="mb-3">
        <label for="location" class="form-label">위치:</label>
        <input type="text" id="location" v-model="location" class="form-control" @click="openPostcodePopup" readonly
               required/>
        <div class="invalid-feedback">위치를 입력해주세요.</div>
      </div>

      <div class="mb-3">
        <button class="btn btn-primary" type="submit">가입하기</button>
      </div>
    </form>
    <div id="daumPostcode" style="display:none;"></div>
  </div>
</template>

<script>
/* global daum */
import axios from "axios";

export default {
  name: "CreateMemberComp",
  data() {
    return {
      form: {
        email: "",
        password: "",
        memberName: "",
        birth: "",
        gender: "",
        age: 0,
        longitude: 0.0,
        latitude: 0.0,
      },
      location: "",
    };
  },
  mounted() {
    // 다음 주소 검색 API 스크립트 동적 로드
    const script = document.createElement('script');
    script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.onload = () => {
      this.daumPostcodeLoaded = true;
    };
    document.head.appendChild(script);
  },
  methods: {
    submitForm() {
      if (this.$refs.form.checkValidity()) {
        // 폼이 유효한 경우 처리 로직 (예: API 호출)
        this.getCoordinate();
        console.log(this.form);
        axios.post('http://localhost:8080/member/signup', JSON.stringify(this.form), {
          headers : {
            'Content-Type': 'application/json'
          }
        })
            .then(() => {
              alert('회원 가입 성공!')
              this.$router.push('/')
            })
            .catch((error) => {
              console.log('회원 가입 실패' + error);
            })

      } else {
        // 유효하지 않은 경우 폼 검증 트리거
        this.$refs.form.classList.add('was-validated');
      }
    },
    openPostcodePopup() {
      if (window.daum && window.daum.Postcode) {
        new daum.Postcode({
          oncomplete: (data) => {
            // 도로명 주소로 변환
            let roadAddr = data.roadAddress;
            // 변환된 주소를 폼에 적용
            this.location = roadAddr;
          }
        }).open();
      } else {
        alert('주소 검색 API 로드에 실패했습니다.');
      }
    },
    getCoordinate() {
      const headers = {
        Authorization: `KakaoAK 89812f89e48298b9f8581fa37b3270e7`
      };

      console.log(this.location);

      axios.get(`https://dapi.kakao.com/v2/local/search/address.json?query=${this.location}`, {headers})
          .then(response => {
            if (response.data.documents.length > 0) {
              const result = response.data.documents[0];
              this.form.longitude = result.x;
              this.form.latitude = result.y;
            } else {
              alert('좌표를 찾을 수 없습니다.');
            }
          })
          .catch(error => {
            console.error('좌표를 가져오는 중 오류가 발생했습니다:', error);
          });
    }

  }
};
</script>

<style scoped>
.create-member {
  max-width: 600px;
  margin: 0 auto;
  padding: 2em;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.create-member h2 {
  margin-bottom: 1em;
}

.create-member .form-label {
  margin-bottom: 0.5em;
  font-weight: bold;
}

.create-member .form-control,
.create-member .form-select {
  margin-bottom: 1em;
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.create-member .btn {
  padding: 0.7em;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.create-member .btn:hover {
  background-color: #0056b3;
}
</style>
