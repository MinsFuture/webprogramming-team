<script>
import axios from "axios";

export default {
  name: "CreatingBoardComp",
  data() {
    return {
      ProgramSaveRequest: {
        title: '',
        content: '',
        category: '',
        maximum: 0,
        recruitmentStartDate: '',
        recruitmentEndDate: '',
        programDate: '',
        open : 'OPEN',
      },
      files: [],
      isFormValid: false,
    }
  },
  methods: {
    submitForm(event) {
      event.preventDefault(); // 기본 제출 동작을 막습니다.
      // 양식 제출 전에 유효성 검사 실행
      this.checkFormValidity();
      console.log(this.ProgramSaveRequest)
      console.log(this.files)

      // 유효성 검사를 통과한 경우에만 제출
      if (this.isFormValid) {
        let formData = new FormData();

        formData.append('ProgramSaveRequest', new Blob([JSON.stringify(this.ProgramSaveRequest)], { type: "application/json" }));
        for (let i = 0; i < this.files.length; i++) {
          formData.append("images", this.files[i]);
        }

        axios
            .post("http://localhost:8080/program", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                "Accesstoken" : this.$store.state.accessToken,
              }
            })
            .then((response) => {
              console.log(response);
              alert("글 등록에 성공하였습니다");
              this.$router.push(`/board/${response.data.response}`);
            })
            .catch((error) => {
              console.error(error);
              alert("글 등록에 실패하였습니다");
            });
      } else {
        // 유효성 검사를 통과하지 못한 경우 사용자에게 메시지 표시
        alert("양식을 다시 확인해주세요.");
      }
    },

    handleFileChange(event) {
      // 파일 선택 이벤트 핸들러
      this.files = event.target.files;
    },

    checkFormValidity() {
      // 모집 기간의 유효성 확인
      this.recruitmentPeriodValid = this.ProgramSaveRequest.recruitmentStartDate !== '' &&
          this.ProgramSaveRequest.recruitmentEndDate !== '' &&
          this.ProgramSaveRequest.recruitmentStartDate <= this.ProgramSaveRequest.recruitmentEndDate;

      // 모든 필드가 유효한지 확인하여 isFormValid 업데이트
      this.isFormValid = this.ProgramSaveRequest.title.trim().length > 0 &&
          this.ProgramSaveRequest.content.trim().length > 0 &&
          this.ProgramSaveRequest.category !== '' &&
          this.ProgramSaveRequest.maximum > 0 &&
          this.ProgramSaveRequest.programDate !== ''
    }
  }
}
</script>

<template>
  <div class="container">
    <h1 class="center-content">프로그램 개설</h1>
    <form class="was-validated" @submit="submitForm">
      <div class="mb-3">
        <label for="title" class="form-label">제목</label>
        <textarea v-model="ProgramSaveRequest.title" class="form-control" id="title"
                  placeholder="제목을 입력하세요" required style="height: 15px"></textarea>
        <div class="invalid-feedback">
          제목을 입력하세요
        </div>
      </div>

      <div class="mb-3">
        <label for="content" class="form-label">내용</label>
        <textarea v-model="ProgramSaveRequest.content" class="form-control" id="content"
                  placeholder="내용을 입력하세요" required style="height: 200px"></textarea>
        <div class="invalid-feedback">
          내용을 입력하세요
        </div>
      </div>

      <div class="mb-3">
        <select v-model="ProgramSaveRequest.category" class="form-select" required aria-label="select example">
          <option value="">카테고리를 선택하세요</option>
          <option value="0">SPORTS</option>
          <option value="1">COMPUTER</option>
          <option value="2">ART</option>
        </select>
        <div class="invalid-feedback">카테고리를 선택해주세요</div>
      </div>

      <div class="mb-3">
        <label for="maxParticipants" class="form-label">최대 참가자 수</label>
        <input type="number" v-model="ProgramSaveRequest.maximum" class="form-control" id="maxParticipants"
               placeholder="최대 참가자 수를 입력하세요" min="1" max="99" required>
        <div class="invalid-feedback">
          최대 참가자 수를 입력하세요 (1부터 99까지 가능합니다)
        </div>
      </div>

      <div class="mb-3">
        <label for="recruitmentPeriod" class="form-label">모집 기간</label>
        <div class="d-flex align-items-center">
          <input type="datetime-local" v-model="ProgramSaveRequest.recruitmentStartDate" class="form-control"
                 id="recruitmentStartDate"
                 required>
          <span class="mx-2">~</span>
          <input type="datetime-local" v-model="ProgramSaveRequest.recruitmentEndDate" class="form-control"
                 id="recruitmentEndDate"
                 required>
        </div>
      </div>

      <div class="mb-3">
        <label for="startDate" class="form-label">프로그램 시작 날짜</label>
        <input type="datetime-local" v-model="ProgramSaveRequest.programDate" class="form-control" id="startDate" required>
        <div class="invalid-feedback">
          프로그램 시작 날짜를 선택하세요
        </div>
      </div>

      <div class="mb-3">
        <input type="file" class="form-control" aria-label="file example" multiple required ref="fileInput"
               @change="handleFileChange">
        <div class="invalid-feedback">사진을 최소 하나이상 첨부해주세요</div>
      </div>

      <div class="mb-3">
        <button class="btn btn-primary" type="submit">신청하기</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
/* 여기에 필요한 스타일을 추가하세요 */
.d-flex {
  display: flex;
}

.align-items-center {
  align-items: center;
}

.mx-2 {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
</style>
